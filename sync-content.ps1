$ErrorActionPreference = "Stop"

$SourceVault = "C:\Users\Chuan\OneDrive\AI-Knowledge"
$PublishRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ContentRoot = Join-Path $PublishRoot "content"

if (-not (Test-Path $SourceVault)) {
  throw "Source vault not found: $SourceVault"
}

if (-not ((Resolve-Path $ContentRoot).Path.StartsWith((Resolve-Path $PublishRoot).Path))) {
  throw "Unexpected content root: $ContentRoot"
}

Remove-Item -LiteralPath (Join-Path $ContentRoot "wiki") -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath (Join-Path $ContentRoot "raw") -Recurse -Force -ErrorAction SilentlyContinue

New-Item -ItemType Directory -Force -Path $ContentRoot | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $ContentRoot "raw\zotero") | Out-Null

Copy-Item -LiteralPath (Join-Path $SourceVault "wiki") -Destination (Join-Path $ContentRoot "wiki") -Recurse -Force
Copy-Item -LiteralPath (Join-Path $SourceVault "raw\zotero\images") -Destination (Join-Path $ContentRoot "raw\zotero\images") -Recurse -Force

Get-ChildItem -LiteralPath (Join-Path $ContentRoot "raw\zotero\images") -Recurse -Filter "*.json" -ErrorAction SilentlyContinue |
  Remove-Item -Force

Write-Host "Synced public content from $SourceVault to $ContentRoot"
