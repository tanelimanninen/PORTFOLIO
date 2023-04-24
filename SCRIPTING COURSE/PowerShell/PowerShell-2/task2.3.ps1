$p1 = $args[0]
$p2 = $args[1]
$p3 = $args[2]

Write-Host "Parameters are:" $p1 $p2 $p3
$parameters = "$p1", "$p2", "$p3"
$ordered = $parameters | Sort-Object -Property Length
Write-Host "Ordered parameters by length: " $ordered[0] $ordered[1] $ordered[2]
