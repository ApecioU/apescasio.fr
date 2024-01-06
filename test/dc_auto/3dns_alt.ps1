
$ServerName = hostname
$domain = $env:USERDNSDOMAIN
Import-Csv C:\Users\Administrateur\Downloads\dcc\srv.csv -Delimiter ";"| ForEach-Object { 
 
#Def variable 
$Computer = "$($_.Computer).$domain" 
$addr = $_.IP -split "\." 
$rzone = "$($addr[2]).$($addr[1]).$($addr[0]).in-addr.arpa" 
 
#Create Dns entries 
 
write-host "dnscmd $Servername /recordadd $domain "$($_.Computer)" A "$($_.IP)"" 
C:\windows\sysnative\dnscmd.exe $Servername /recordadd $domain "$($_.Computer)" A "$($_.IP)"

#Create New Reverse Zone if zone already exist, system return a normal error 
#write-host "dnscmd $Servername /zonedelete $rzone /f "
#dnscmd $Servername /zonedelete $rzone /f


write-host "dnscmd $Servername /zoneadd $rzone /primary "
C:\windows\sysnative\dnscmd.exe $Servername /zoneadd $rzone /primary
 
#Create reverse DNS 
write-host "dnscmd $Servername /recordadd $rzone "$($addr[3])" PTR $Computer "
C:\windows\sysnative\dnscmd.exe $Servername /recordadd $rzone "$($addr[3])" PTR $Computer
}


#restart-computer
