$foldername = $args[0]

$test = Test-Path -Path $foldername

if ($test -eq "True") {
    $files = Join-Path -Path $HOME -ChildPath "files.txt"
    Get-ChildItem $foldername | Format-Table Name | Out-File -FilePath $files
    Write-Host "Chosen files have been copied to the home directory!"
}

else {
    Write-Host "Sorry mate, $foldername doesn't exist!"
}