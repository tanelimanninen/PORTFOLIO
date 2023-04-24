$a = Get-ChildItem -Path $home
$b = $home
$c = $a.Count
Write-Host ("$c files/folders in $b folder")