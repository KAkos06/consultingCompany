<#
.SYNOPSIS
    Securely sets or updates environment variables (like Cloudflare Turnstile keys) on the VPS.

.DESCRIPTION
    Prompts for the VPS password, Cloudflare Turnstile Site Key, and Secret Key.
    Connects to the VPS via SSH, writes them securely into /opt/consultingcompany/.env,
    ensures proper file permissions (chmod 600), and optionally triggers deployment.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\set-vps-secrets.ps1
#>

[CmdletBinding()]
param(
    [string]$HostName = "185.187.72.85",
    [string]$UserName = "admin",
    [int]$Port = 22,
    [string]$RemotePath = "/opt/consultingcompany"
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

function Write-Step {
    param([string]$Message)
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-WarningMsg {
    param([string]$Message)
    Write-Host "[!] $Message" -ForegroundColor Yellow
}

function Write-ErrorMsg {
    param([string]$Message)
    Write-Host "[X] $Message" -ForegroundColor Red
}

Write-Host @"
================================================================================
  VPS SECRETS CONFIGURATION (Turnstile / Environment Variables)
  Target: $UserName@$HostName (Port: $Port)
  Path:   $RemotePath/.env
================================================================================
"@ -ForegroundColor Magenta

# 1. Prompt for VPS Password (masked)
$securePassword = Read-Host "Enter SSH password for $UserName@$HostName" -AsSecureString
if (-not $securePassword) {
    Write-ErrorMsg "Cannot connect without a password!"
    exit 1
}

$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)

# 2. Prompt for Turnstile Keys
Write-Host "`n--- Cloudflare Turnstile Keys ---" -ForegroundColor Yellow
Write-Host "Enter the keys below (press Enter to keep existing / leave blank):`n"

$turnstileSiteKey = Read-Host "Turnstile Site Key (public, e.g. 0x4AAAAAA...)"

$secureSecretKey = Read-Host "Turnstile Secret Key (secret, masked)" -AsSecureString
$turnstileSecretKey = ""
if ($secureSecretKey) {
    $bstrSecret = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureSecretKey)
    $turnstileSecretKey = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstrSecret)
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstrSecret)
}

if (-not $turnstileSiteKey -and -not $turnstileSecretKey) {
    Write-WarningMsg "No keys provided. Nothing to update."
    exit 0
}

# 3. Automate password input via SSH_ASKPASS
$tempAskPass = Join-Path $env:TEMP "ssh-askpass-$([System.Guid]::NewGuid().ToString('N').Substring(0,8)).bat"
"@echo $plainPassword" | Set-Content -Path $tempAskPass -Encoding ASCII -Force

$env:SSH_ASKPASS = $tempAskPass
$env:SSH_ASKPASS_REQUIRE = "force"
$env:DISPLAY = "dummy:0"

$sshBaseArgs = @("-p", $Port.ToString(), "-o", "StrictHostKeyChecking=accept-new", "-o", "BatchMode=no")
$RemoteTarget = "$UserName@$HostName"

function Invoke-RemoteBash {
    param(
        [string]$BashCode,
        [string[]]$ScriptArgs = @()
    )
    $normalizedBash = $BashCode.Replace("`r`n", "`n").Replace("`r", "`n")
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($normalizedBash)
    $b64 = [System.Convert]::ToBase64String($bytes)
    $escapedArgs = ($ScriptArgs | ForEach-Object { "'$_'" }) -join " "
    & ssh.exe @sshBaseArgs $RemoteTarget "echo $b64 | base64 -d | bash -s -- $escapedArgs"
    if ($LASTEXITCODE -ne 0) {
        throw "The remote script failed with exit code $LASTEXITCODE."
    }
}

try {
    Write-Step "Updating environment variables in $RemotePath/.env on VPS..."

    $updateScript = @'
set -eu

REMOTE_PATH="$1"
SITE_KEY="$2"
SECRET_KEY="$3"

SUDO=""
if [ "$(id -u)" -ne 0 ]; then
    SUDO="sudo"
fi

if [ ! -d "$REMOTE_PATH" ]; then
    $SUDO mkdir -p "$REMOTE_PATH"
fi

cd "$REMOTE_PATH"

if [ ! -f .env ]; then
    if [ -f .env.production.example ]; then
        cp .env.production.example .env
    else
        touch .env
    fi
fi

update_env_var() {
    local key="$1"
    local val="$2"
    local file=".env"
    if grep -q "^${key}=" "$file"; then
        grep -v "^${key}=" "$file" > "${file}.tmp" || true
        echo "${key}=${val}" >> "${file}.tmp"
        mv "${file}.tmp" "$file"
    else
        echo "${key}=${val}" >> "$file"
    fi
}

if [ -n "$SITE_KEY" ]; then
    update_env_var "TURNSTILE_SITE_KEY" "$SITE_KEY"
    echo "==> Updated TURNSTILE_SITE_KEY in .env"
fi

if [ -n "$SECRET_KEY" ]; then
    update_env_var "TURNSTILE_SECRET_KEY" "$SECRET_KEY"
    echo "==> Updated TURNSTILE_SECRET_KEY in .env"
fi

chmod 600 .env

echo "==> Secrets safely configured in .env."
'@

    Invoke-RemoteBash -BashCode $updateScript -ScriptArgs @($RemotePath, $turnstileSiteKey, $turnstileSecretKey)
    Write-Success "VPS .env updated successfully with file permissions 600!"

    Write-Host @"

================================================================================
  SECRETS CONFIGURED ON VPS!
================================================================================
  - The Turnstile keys have been safely written to $RemotePath/.env.
  - The keys are NOT in Git and will NEVER be committed.
  - To apply the latest code changes (dashboard, CSV export, Turnstile C# logic)
    and rebuild the Docker containers, run:
      powershell -ExecutionPolicy Bypass -File .\deploy.ps1
================================================================================
"@ -ForegroundColor Green

    $deployNow = Read-Host "Would you like to run the full deployment (deploy.ps1) now? (y/N)"
    if ($deployNow -eq "y" -or $deployNow -eq "Y") {
        Write-Step "Triggering deploy.ps1..."
        & (Join-Path $ScriptDir "deploy.ps1") -HostName $HostName -UserName $UserName -Port $Port -RemotePath $RemotePath
    }

} finally {
    if (Test-Path $tempAskPass) {
        Remove-Item $tempAskPass -Force -ErrorAction SilentlyContinue
    }
    $env:SSH_ASKPASS = $null
    $env:SSH_ASKPASS_REQUIRE = $null
}
