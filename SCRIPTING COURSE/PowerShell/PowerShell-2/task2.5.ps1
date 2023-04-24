param (
  [string]$ip = '192.168.1.1',
  [int]$loops = 1
  )
Write-Host("Pinging address $ip, $loops times, Okay?")
$permission = Read-Host("[Y/n]")

if ($permission -eq 'Y')
    {for ($i = 0; $i -lt $loops; $i++)
        {Write-Output("Try " + ($i +1) + ", pinging: " + $ip)}}