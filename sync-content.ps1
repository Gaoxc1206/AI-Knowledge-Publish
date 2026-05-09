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

$UpdateIndexScript = Join-Path $SourceVault "scripts\update_index.py"
if (-not (Test-Path $UpdateIndexScript)) {
  throw "Index updater not found: $UpdateIndexScript"
}

$PythonCandidates = @(
  "D:\Users\Chuan\miniconda3\envs\test\python.exe",
  "C:\Users\Chuan\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe",
  "python"
)
$Python = $PythonCandidates | Where-Object {
  if ($_ -eq "python") {
    $command = Get-Command python -ErrorAction SilentlyContinue
    $command -and ($command.Source -notlike "*\WindowsApps\python.exe")
  } else {
    Test-Path $_
  }
} | Select-Object -First 1

if (-not $Python) {
  throw "No usable Python found. Activate your conda env first, or install Python."
}

& $Python $UpdateIndexScript --vault $SourceVault

Remove-Item -LiteralPath (Join-Path $ContentRoot "wiki") -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath (Join-Path $ContentRoot "raw") -Recurse -Force -ErrorAction SilentlyContinue

New-Item -ItemType Directory -Force -Path $ContentRoot | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $ContentRoot "raw\zotero") | Out-Null

Copy-Item -LiteralPath (Join-Path $SourceVault "wiki") -Destination (Join-Path $ContentRoot "wiki") -Recurse -Force
Copy-Item -LiteralPath (Join-Path $SourceVault "raw\zotero\images") -Destination (Join-Path $ContentRoot "raw\zotero\images") -Recurse -Force
& $Python $UpdateIndexScript --vault $SourceVault --public --output (Join-Path $ContentRoot "index.md")
& $Python $UpdateIndexScript --vault $SourceVault --public --output (Join-Path $ContentRoot "wiki\index.md")

Get-ChildItem -LiteralPath (Join-Path $ContentRoot "raw\zotero\images") -Recurse -Filter "*.json" -ErrorAction SilentlyContinue |
  Remove-Item -Force

Write-Host "Synced public content from $SourceVault to $ContentRoot"
