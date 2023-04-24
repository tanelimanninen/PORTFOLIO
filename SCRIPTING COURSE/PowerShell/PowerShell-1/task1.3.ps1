$eka = Read-Host ("Give a integer: ")
$eka = [int]$eka
$toka = Read-Host ("Give an another integer: ")
$toka= [int]$toka

$sum = $eka + $toka 
$sub = $eka - $toka
$mul = $eka * $toka
$div = $eka / $toka

Write-Host ("Sum is $sum")
Write-Host ("Subtraction is $sub")
Write-Host ("Multiplication is $mul")
Write-Host ("Division is $div")