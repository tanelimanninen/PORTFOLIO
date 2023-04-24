$filename = $args[0]
$firstnames = @()
$lastnames = @()

$test = Test-Path -Path $filename

if ($test -eq "True") {
    $CSV = Import-Csv "$filename"
    $CSV | ForEach-Object {
        $firstnames += $_.Firstname.Substring(0,2) 
        $lastnames += $_.Lastname.Substring(0,4)
    }

    $user1 = $lastnames[0].ToLower()+$firstnames[0].ToLower()
    $user2 = $lastnames[1].ToLower()+$firstnames[1].ToLower()

    $inputti = $CSV | ForEach-Object {Read-Host "Username will be created for" $_.Firstname $_.Lastname ". Y/n?"}

    if ($inputti -eq "Y") {
        New-LocalUser -Name $user1 -NoPassword
        New-LocalUser -Name $user2 -NoPassword
    }
}

else {
    Write-Host "Error error! The file doesn't exist!"
}