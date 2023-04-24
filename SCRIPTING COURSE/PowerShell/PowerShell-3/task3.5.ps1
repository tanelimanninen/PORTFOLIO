$foldername = $args[0]
$newname = $args[1]

$test = Test-Path -Path $foldername

if ($test -ne "True") {
    Write-Host "Folder doesn't exist."
}

else {
    $a = Get-ChildItem -Path $foldername
    $f = $a.Count
    $inputti = Read-Host "All $f files in the $foldername folder will be renamed as $newname. Y/n"

    if ($inputti -eq "Y") {
        $a | Rename-Item -NewName $newname
    }

}