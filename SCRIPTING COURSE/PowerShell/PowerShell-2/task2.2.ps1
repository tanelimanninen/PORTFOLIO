$k = Read-Host ("Give a folder of your choice: ")
$n = Get-ChildItem -Path $k
$c = $n.Count
Write-Host ("$c files/folders in the $k folder")