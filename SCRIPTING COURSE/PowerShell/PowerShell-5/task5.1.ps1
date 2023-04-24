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
    $user3 = $lastnames[2].ToLower()+$firstnames[2].ToLower()

    New-LocalUser -Name $user1 -NoPassword
    New-LocalUser -Name $user2 -NoPassword
    New-LocalUser -Name $user3 -NoPassword

    $CSV | ForEach-Object {Write-Host "Hello" $_.Firstname $_.Lastname ". Your new username is found below!"}
}

else {
    Write-Host "Error. The file doesn't exist!"
}