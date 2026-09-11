<#
.SYNOPSIS
    Deploys the consultingCompany Umbraco Docker environment to the VPS (185.187.72.85).

.DESCRIPTION
    Prompts for the admin password, prepares the Linux server (Sudo, Swap, Firewall, Docker),
    packages and uploads the source code, configures the environment, and launches the containers.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\deploy.ps1
#>

[CmdletBinding()]
param(
    [string]$HostName = "185.187.72.85",
    [string]$UserName = "admin",
    [int]$Port = 22,
    [string]$RemotePath = "/opt/consultingcompany",
    [string]$Domain = "executiveinsight.hu"
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
  CONSULTINGCOMPANY VPS DEPLOYMENT
  Target: $UserName@$HostName (Port: $Port)
  Path:   $RemotePath
================================================================================
"@ -ForegroundColor Magenta

# 1. Prompt for password (masked)
$securePassword = Read-Host "Enter password for $UserName@$HostName" -AsSecureString
if (-not $securePassword) {
    Write-ErrorMsg "Cannot connect without a password!"
    exit 1
}

$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)

# Automate password input via SSH_ASKPASS so it only needs to be entered once
$tempAskPass = Join-Path $env:TEMP "ssh-askpass-$([System.Guid]::NewGuid().ToString('N').Substring(0,8)).bat"
"@echo $plainPassword" | Set-Content -Path $tempAskPass -Encoding ASCII -Force

$env:SSH_ASKPASS = $tempAskPass
$env:SSH_ASKPASS_REQUIRE = "force"
$env:DISPLAY = "dummy:0"

$sshBaseArgs = @("-p", $Port.ToString(), "-o", "StrictHostKeyChecking=accept-new", "-o", "BatchMode=no")
$scpBaseArgs = @("-P", $Port.ToString(), "-o", "StrictHostKeyChecking=accept-new", "-o", "BatchMode=no")
$RemoteTarget = "$UserName@$HostName"

# Helper function: Clean Base64 execution without quoting or character encoding issues
function Invoke-RemoteBash {
    param(
        [string]$BashCode,
        [string[]]$ScriptArgs = @()
    )
    # Convert Windows CRLF (\r\n) to Linux LF (\n)
    $normalizedBash = $BashCode.Replace("`r`n", "`n").Replace("`r", "`n")
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($normalizedBash)
    $b64 = [System.Convert]::ToBase64String($bytes)
    $escapedArgs = ($ScriptArgs | ForEach-Object { "'$_'" }) -join " "
    & ssh.exe @sshBaseArgs $RemoteTarget "echo $b64 | base64 -d | bash -s -- $escapedArgs"
    if ($LASTEXITCODE -ne 0) {
        throw "The remote script failed with exit code $LASTEXITCODE."
    }
}

$tempArchive = $null

try {
    # 2. Prepare Linux server (Sudo, Swap, Firewall, Docker)
    Write-Step "1/4 Connecting and preparing Linux server ($RemoteTarget)..."

    $prepScript = @'
set -eu

USER_PW="$1"
SUDO=""
if [ "$(id -u)" -ne 0 ]; then
    SUDO="sudo"
    # Activate sudo with password and set up NOPASSWD for deployment
    echo "$USER_PW" | sudo -S sh -c "echo '$USER ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/99-deploy-nopasswd && chmod 0440 /etc/sudoers.d/99-deploy-nopasswd" 2>/dev/null || true
fi

# 1. Create 2GB Swap if not already configured
if [ $(swapon --show | wc -l) -eq 0 ]; then
    echo "==> Creating 2GB Swap file for system stability..."
    if [ ! -f /swapfile ]; then
        $SUDO fallocate -l 2G /swapfile 2>/dev/null || $SUDO dd if=/dev/zero of=/swapfile bs=1M count=2048
        $SUDO chmod 600 /swapfile
        $SUDO mkswap /swapfile
    fi
    $SUDO swapon /swapfile || true
    if ! grep -q '/swapfile' /etc/fstab 2>/dev/null; then
        echo '/swapfile none swap sw 0 0' | $SUDO tee -a /etc/fstab >/dev/null
    fi
fi

# 2. Allow firewall ports (22, 80, 443)
if which ufw >/dev/null 2>&1; then
    $SUDO ufw allow 22/tcp >/dev/null 2>&1 || true
    $SUDO ufw allow 80/tcp >/dev/null 2>&1 || true
    $SUDO ufw allow 443/tcp >/dev/null 2>&1 || true
fi

# 3. Install Docker engine if missing
if ! which docker >/dev/null 2>&1; then
    echo "==> Installing Docker Engine..."
    curl -fsSL https://get.docker.com | $SUDO sh
    $SUDO systemctl enable --now docker
    $SUDO usermod -aG docker "$USER" || true
fi

# 4. Check Docker Compose plugin
if ! docker compose version >/dev/null 2>&1 && ! $SUDO docker compose version >/dev/null 2>&1; then
    echo "==> Installing Docker Compose plugin..."
    $SUDO apt-get update -y
    $SUDO apt-get install -y docker-compose-plugin
fi

echo "==> Server preparation complete."
'@

    Invoke-RemoteBash -BashCode $prepScript -ScriptArgs @($plainPassword)
    Write-Success "Server preparation successful (Sudo, Swap, Firewall, Docker ready)."

    # 3. Package source code
    Write-Step "2/4 Packaging project source code..."
    $tempArchive = Join-Path $env:TEMP "consultingcompany-deploy-$([System.Guid]::NewGuid().ToString('N').Substring(0,8)).tar.gz"

    $excludes = @(
        "--exclude=bin",
        "--exclude=obj",
        "--exclude=.git",
        "--exclude=.vs",
        "--exclude=.idea",
        "--exclude=umbraco/Data",
        "--exclude=umbraco/Logs",
        "--exclude=*.sqlite.db*",
        "--exclude=scratch",
        "--exclude=deploy.ps1",
        "--exclude=set-vps-secrets.ps1",
        "--exclude=.env"
    )

    $tarCmd = @("-czf", $tempArchive) + $excludes + @("-C", $ScriptDir, ".")
    & tar.exe @tarCmd

    if (-not (Test-Path $tempArchive)) {
        throw "Failed to create tar archive."
    }

    $archiveSize = [math]::Round((Get-Item $tempArchive).Length / 1MB, 2)
    Write-Success "Archive created ($archiveSize MB)."

    # 4. Upload via SCP
    Write-Step "3/4 Uploading package to VPS ($RemotePath)..."
    $remoteArchive = "/tmp/consultingcompany-deploy.tar.gz"
    & scp.exe @scpBaseArgs $tempArchive "$RemoteTarget`:$remoteArchive"
    if ($LASTEXITCODE -ne 0) {
        throw "File upload interrupted."
    }
    Remove-Item $tempArchive -Force -ErrorAction SilentlyContinue
    $tempArchive = $null
    Write-Success "Upload complete."

    # 5. Extract and launch Docker stack
    Write-Step "4/4 Extracting and launching Docker stack on VPS..."

    $deployScript = @'
set -eu

REMOTE_PATH="$1"
HOST_NAME="$2"
DOMAIN="$3"
EFFECTIVE_DOMAIN="$4"
REMOTE_ARCHIVE="/tmp/consultingcompany-deploy.tar.gz"

SUDO=""
if [ "$(id -u)" -ne 0 ]; then
    SUDO="sudo"
fi

# Stop any previously running containers cleanly
if [ -f "$REMOTE_PATH/docker-compose.yml" ]; then
    echo "==> Stopping any previously running containers cleanly..."
    (cd "$REMOTE_PATH" && $SUDO docker compose down --remove-orphans 2>/dev/null || true)
fi

$SUDO mkdir -p "$REMOTE_PATH"
$SUDO chown -R "$(id -un):$(id -gn)" "$REMOTE_PATH"

tar -xzf "$REMOTE_ARCHIVE" -C "$REMOTE_PATH"
rm -f "$REMOTE_ARCHIVE"

cd "$REMOTE_PATH"

if [ ! -f .env ]; then
    cp .env.production.example .env
fi

grep -q "^HTTP_PORT=" .env || echo "HTTP_PORT=80" >> .env
grep -q "^HTTPS_PORT=" .env || echo "HTTPS_PORT=443" >> .env

if [ -n "$DOMAIN" ]; then
    SITE_DOMAINS="$DOMAIN, www.$DOMAIN"
else
    SITE_DOMAINS="$EFFECTIVE_DOMAIN"
fi

sed -i "s|UMBRACO_APPLICATION_URL=.*|UMBRACO_APPLICATION_URL=https://$EFFECTIVE_DOMAIN|g" .env
sed -i "s|CADDY_SITE_ADDRESS=.*|CADDY_SITE_ADDRESS=$SITE_DOMAINS|g" .env
sed -i "s|OPENIDDICT_DISABLE_TRANSPORT_SECURITY_REQUIREMENT=.*|OPENIDDICT_DISABLE_TRANSPORT_SECURITY_REQUIREMENT=true|g" .env

cat << EOF > deploy/Caddyfile
http://$HOST_NAME, http://185.187.72.85.sslip.io {
    redir https://$EFFECTIVE_DOMAIN{uri} permanent
}

$SITE_DOMAINS {
    encode zstd gzip
    reverse_proxy umbraco:8080
}
EOF

echo "==> Building and starting Docker Compose services..."
$SUDO docker compose build umbraco
$SUDO docker compose up -d --force-recreate

echo "==> Waiting for container initialization (15s)..."
sleep 15

sed -i 's|BOOTSTRAP_CONTENT=.*|BOOTSTRAP_CONTENT=false|g' .env
sed -i 's|USYNC_IMPORT_AT_STARTUP=.*|USYNC_IMPORT_AT_STARTUP=None|g' .env

echo "==> Cleaning up unused dangling Docker images..."
$SUDO docker image prune -f >/dev/null 2>&1 || true

$SUDO docker compose ps
'@

    $effectiveDomain = if ($Domain) { $Domain } else { "$HostName.sslip.io" }
    Invoke-RemoteBash -BashCode $deployScript -ScriptArgs @($RemotePath, $HostName, $Domain, $effectiveDomain)
    Write-Success "All containers started successfully!"

    $targetUrl = "https://$effectiveDomain"

    Write-Host @"

================================================================================
  DEPLOYMENT SUCCESSFUL!
================================================================================
  VPS Server:     $targetUrl
  Umbraco Login:  $targetUrl/umbraco
  Username:       akos.kiss.in@gmail.com
  Password:       Found in $RemotePath/.env on the server

  Note:
  The site is secured with an official Let's Encrypt certificate for
  $effectiveDomain. Direct IP accesses (http://$HostName) automatically
  redirect to this secure URL.
================================================================================
"@ -ForegroundColor Green

} finally {
    if ($tempArchive -and (Test-Path $tempArchive)) {
        Remove-Item $tempArchive -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path $tempAskPass) {
        Remove-Item $tempAskPass -Force -ErrorAction SilentlyContinue
    }
    $env:SSH_ASKPASS = $null
    $env:SSH_ASKPASS_REQUIRE = $null
}
