param (
  [string]$name = 'unknown',
  [int]$loops = 1
  )
for ($i = 0; $i -lt $loops; $i++)
  {Write-Output("Hello " + $name)}