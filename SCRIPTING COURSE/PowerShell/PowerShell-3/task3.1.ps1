$foldername = $args[0]
$test = Test-Path -Path $foldername
if ($test -eq "True") {
    $files = Get-ChildItem -Path $foldername
    $count = $files.Count
    Write-Host "$count files in folder called: $foldername"
    Write-Host "Files:"
    foreach($file in $files)
        {$file.Name}
}

else {
    Write-Host "Apologies, but $foldername seems to not exist"
}