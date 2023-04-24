function dirf2 {
    param ([string]$s)
    Get-ChildItem $HOME -Filter *$s | Format-Table Name, Length, LastWriteTime

    }

dirf2