$filename = $args[0]

$testi = Test-Path -Path $filename

if ($testi -eq "True") {
    Write-Host "$filename was found! Opening urls in browser..."
    $filu = Join-Path -Path "C:\kakka" -ChildPath "urls.txt"
    $f = Get-Content $filu
    Start-Process -FilePath Firefox -ArgumentList $f
}

else {
    Write-Host "Error! The filename you gave doesn't exist."
}