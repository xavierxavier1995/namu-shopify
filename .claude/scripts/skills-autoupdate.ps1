# Auto-update Shopify skills weekly
# Triggered by SessionStart hook in .claude/settings.local.json
# Reinstalls latest from Shopify/shopify-ai-toolkit if last update > 7 days ago

$ErrorActionPreference = 'SilentlyContinue'

$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$stampFile   = Join-Path $projectRoot '.claude\.skills-last-update'
$logFile     = Join-Path $projectRoot '.claude\.skills-update.log'
$intervalDays = 7

# Decide whether to run
$shouldUpdate = $false
if (-not (Test-Path $stampFile)) {
    $shouldUpdate = $true
} else {
    $lastRun = Get-Item $stampFile | Select-Object -ExpandProperty LastWriteTime
    $age = (Get-Date) - $lastRun
    if ($age.TotalDays -ge $intervalDays) { $shouldUpdate = $true }
}

if (-not $shouldUpdate) {
    # Silent skip — keeps SessionStart fast
    exit 0
}

# Run npx in background; log output, don't block session
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
"[$timestamp] Auto-updating Shopify skills..." | Out-File -FilePath $logFile -Append -Encoding utf8

Start-Process -FilePath 'cmd.exe' `
    -ArgumentList '/c','npx','--yes','skills','add','Shopify/shopify-ai-toolkit' `
    -WorkingDirectory $projectRoot `
    -RedirectStandardOutput $logFile `
    -RedirectStandardError $logFile `
    -NoNewWindow `
    -PassThru | Out-Null

# Touch stamp file so next session waits 7 days
Set-Content -Path $stampFile -Value (Get-Date -Format 'o') -Encoding utf8

Write-Output "[skills-autoupdate] Started background update. Logs: .claude\.skills-update.log"
