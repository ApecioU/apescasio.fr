# 
# Script pour changer le nom de PC + configurer l'IP, mettre IP + masque + passerelle... en statique (IP est dynamique normalement par défaut)
#

$nom = Read-Host("Entrez le nouveau nom de PC portable")

Rename-Computer $nom

Disable-NetAdapterBinding –InterfaceAlias “Ethernet0” –ComponentID ms_tcpip6

New-NetIPAddress -InterfaceIndex 5 -IPAddress 192.168.31.10 -PrefixLength 24

Set-DnsClientServerAddress -InterfaceIndex 5 -ServerAddresses 192.168.31.10

schtasks /create /tn "2adds" /tr "powershell.exe -ExecutionPolicy Bypass -File C:%HOMEPATH%\Downloads\dc_auto\2adds.ps1" /rl highest /sc onlogon

Restart-Computer -Force
