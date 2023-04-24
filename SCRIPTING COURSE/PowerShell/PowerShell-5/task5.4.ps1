$filename = $args[0]

$u = Get-LocalUser * | Where-Object Enabled | Select-Object -Property Name,FullName,SID,lastlogon

$u | Export-Csv -Path C:\kakka\$filename -Delimiter ';' 
Import-Csv C:\kakka\$filename
