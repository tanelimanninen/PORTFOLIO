$foldername = $args[0]
$filename = $args[1]

$test = Test-Path -Path $foldername/$filename

if ($test) {
    Write-Host "$filename does exist in the $foldername folder"
}

else {
    $inputti = Read-Host "$filename doesn't exist. Do you want to create one? Y/n?"
    if ($inputti -eq "Y") {
        New-Item -Path $foldername/$filename -ItemType File
    }
}