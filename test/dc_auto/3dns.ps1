Add-DnsServerPrimaryZone -NetworkId "192.168.31.0/24" -ReplicationScope 'Domain'

$IP = (Get-NetIPAddress -InterfaceIndex 5 -AddressFamily 'IPv4').IPV4Address
$PTRIP = $IP.Split('.',6)[3] 

#$PTRIP = $IP.Split('.',2)[1] # Afficher seulement 3 octets de l'@IP pour /8
#$PTRIP = $IP.Split('.',3)[4] # Afficher seulement 2 derniers octet de l'@IP pour /16
#$PTRIP = $IP.Split('.',6)[3] # Afficher seulement 1 dernier octet de l'@IP pour /24

$fqdn = (Get-ADComputer $(hostname)).DNSHostName
 
Add-DnsServerResourceRecordPtr -Name "$PTRIP" -ZoneName "31.168.192.in-addr.arpa" -PtrDomainName "$fqdn"

Set-DnsClientServerAddress -InterfaceIndex 5 -ServerAddresses 192.168.31.10, 127.0.0.1

schtasks /delete /tn "3dns" /f

#Restart-Computer -Force

#Script créé par Aaron Pescasio

