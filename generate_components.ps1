$components = @(
    @{ Name="QuoteSlider Component"; Alias="quoteSliderComponent"; Key="b5555555-5555-5555-5555-555555555555"; Icon="icon-quote" },
    @{ Name="Methodology Component"; Alias="methodologyComponent"; Key="b6666666-6666-6666-6666-666666666666"; Icon="icon-network-alt" },
    @{ Name="Testimonials Component"; Alias="testimonialsComponent"; Key="b7777777-7777-7777-7777-777777777777"; Icon="icon-chat-active" },
    @{ Name="Contact Component"; Alias="contactComponent"; Key="b8888888-8888-8888-8888-888888888888"; Icon="icon-message" },
    @{ Name="PageHero Component"; Alias="pageHeroComponent"; Key="b9999999-9999-9999-9999-999999999999"; Icon="icon-presentation" },
    @{ Name="CtaBand Component"; Alias="ctaBandComponent"; Key="b0000000-0000-0000-0000-000000000000"; Icon="icon-megaphone" }
)

$template = @"
<?xml version="1.0" encoding="utf-8"?>
<ContentType Key="{Key}" Alias="{Alias}" Level="2">
  <Info>
    <Name>{Name}</Name>
    <Icon>{Icon}</Icon>
    <Thumbnail>folder.png</Thumbnail>
    <Description></Description>
    <AllowAtRoot>False</AllowAtRoot>
    <IsListView>False</IsListView>
    <Variations>Nothing</Variations>
    <IsElement>True</IsElement>
    <Folder>Components</Folder>
    <Compositions />
    <DefaultTemplate></DefaultTemplate>
    <AllowedTemplates />
  </Info>
  <Structure />
  <GenericProperties>
    <GenericProperty>
      <Key>$([guid]::NewGuid().ToString().ToLower())</Key>
      <Name>Title</Name>
      <Alias>title</Alias>
      <Definition>c6bac0dd-4ab9-45b1-8e30-e4b619ee5da3</Definition>
      <Type>Umbraco.TextArea</Type>
      <Mandatory>false</Mandatory>
      <Validation></Validation>
      <Description><![CDATA[]]></Description>
      <SortOrder>0</SortOrder>
      <Tab Alias="content">Content</Tab>
    </GenericProperty>
    <GenericProperty>
      <Key>$([guid]::NewGuid().ToString().ToLower())</Key>
      <Name>Subtitle</Name>
      <Alias>subtitle</Alias>
      <Definition>c6bac0dd-4ab9-45b1-8e30-e4b619ee5da3</Definition>
      <Type>Umbraco.TextArea</Type>
      <Mandatory>false</Mandatory>
      <Validation></Validation>
      <Description><![CDATA[]]></Description>
      <SortOrder>1</SortOrder>
      <Tab Alias="content">Content</Tab>
    </GenericProperty>
  </GenericProperties>
  <Tabs>
    <Tab>
      <Key>$([guid]::NewGuid().ToString().ToLower())</Key>
      <Caption>Content</Caption>
      <Alias>content</Alias>
      <Type>Group</Type>
      <SortOrder>0</SortOrder>
    </Tab>
  </Tabs>
</ContentType>
"@

$outDir = "c:\Users\Akos\Documents\GitHub\consultingCompany\ExecutiveInsightsUmbraco\uSync\v17\ContentTypes\"

foreach ($comp in $components) {
    $xml = $template.Replace("{Key}", $comp.Key).Replace("{Alias}", $comp.Alias).Replace("{Name}", $comp.Name).Replace("{Icon}", $comp.Icon)
    $path = Join-Path $outDir "$($comp.Alias).config"
    Set-Content -Path $path -Value $xml
    Write-Host "Created $path"
}
