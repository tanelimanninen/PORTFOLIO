$foldername = $args[0]
$filename = $args[1]

$test = Test-Path -Path $foldername
$test2 = Test-Path -Path $foldername/$filename

if ($test) {
    if ($test2) {
        Write-Host "$filename was found in $foldername"
    }
    else {
        Write-Host "$foldername was found, but $filename was not"
    }
}



else {
    Write-Host "Apologies, but $filename in the $foldername doesn't exist"
}