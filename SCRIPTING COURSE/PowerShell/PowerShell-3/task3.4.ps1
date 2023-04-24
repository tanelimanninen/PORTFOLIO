$foldername = $args[0]
$filename = $args[1]
[int]$number = $args[2]

$test = Test-Path -Path $foldername
Write-Host "$test"
if ($test -ne "True") {
    New-Item -Path $foldername -ItemType Directory
    
    $a = Get-ChildItem -Path $foldername
    $c = $a.Count

    do
    {
        New-Item -Path $foldername/$filename -ItemType File
    }
    while ($c -ne $number)
    
    
}

else {
    Write-Host "$foldername exists"
}