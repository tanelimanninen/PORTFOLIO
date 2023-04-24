$filename = $args[0]
$inputs = @()

do {
    $inp = Read-Host "Give workstation names, press Enter to quit: "
    $inputs += $inp
}
 while ($inp -ne "")

Add-Content -Path $HOME/$filename -Value $inputs
Write-Host "$filename was created sucessfully!"