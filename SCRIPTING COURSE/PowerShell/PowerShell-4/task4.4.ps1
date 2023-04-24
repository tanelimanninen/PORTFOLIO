$inputit = @()
$d = Get-Date -UFormat "%d/%m/%Y %R"

do {
    $inps = Read-Host "Give file names, press Enter to quit: "
    New-Item -Path $HOME\$inps -ItemType File
    Add-Content -Path $HOME\$inps -Value $d
    $inputit += $inps
}
 while ($inps -ne "")

$c = $inputit.Count
Write-Host "$c were created!"