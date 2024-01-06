# 
# Script pour automatiser/simplifier la mise en place d'un Windows Serveur avec AD DS, DNS, DHCP préconfiguré
#

# Demande à l'user: le nouveau nom de PC

$nom = ""

while ($nom -eq "") {
    $nom = Read-Host "`nEntrez le nouveau nom de PC (ne peut pas être vide)"
}

Rename-Computer $nom
Get-ChildItem
# Configure l'IP de serveur et le masque

New-NetIPAddress -InterfaceAlias "Ethernet0" -IPAddress 192.168.31.10 -PrefixLength 24 -DefaultGateway 192.168.31.254

# Configure le DNS de serveur 

Set-DnsClientServerAddress -InterfaceAlias "Ethernet0" -ServerAddresses 192.168.31.10

# Demander à l'user le mot de passe 

$Password = Read-Host -Prompt "Veuillez entrer votre mot de passe"

# Modifier le registre de Windows pour autoriser le "Autologon", cela va faire en sorte qu'après le redémarrage, le PC va s'ouvrir une session automatiquement

$RegistryPath = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon'

Set-ItemProperty $RegistryPath 'AutoAdminLogon' -Value "1" -Type String

Set-ItemProperty $RegistryPath 'DefaultUsername' -Value "$env:USERNAME" -Type String

Set-ItemProperty $RegistryPath 'DefaultPassword' -Value "$Password" -type String

# Créer un dossier "script" pour mettre la suite des scripts la-dessus

New-Item -ItemType Directory -Path "C:\ap_script" -Force

# Créer le script "2adds.ps1" qui créera le AD DS

New-Item -ItemType File -Path "C:\ap_script\2adds.ps1" -Force | Out-Null

# Mettre ce contenu à l'intérieur du script

Set-Content -Path "C:\ap_script\2adds.ps1" -Value @"
#
# Script pour créer le AD DS avec "apes.loc" comme nom domaine et "APE" comme NETBIOS
#

Install-WindowsFeature -name AD-Domain-Services –IncludeManagementTools
Install-ADDSForest ``
-CreateDnsDelegation:`$false ``
-SafeModeAdministratorPassword:(ConvertTo-SecureString -String "${Password}" -AsPlainText -Force) ``
-DatabasePath "C:\Windows\NTDS" ``
-DomainMode "WinThreshold" ``
-DomainName "apes.loc" ``
-DomainNetbiosName "APES" ``
-ForestMode "WinThreshold" ``
-InstallDns:`$true ``
-LogPath "C:\Windows\NTDS" ``
-NoRebootOnCompletion:`$false ``
-SysvolPath "C:\Windows\SYSVOL" ``
-Force:`$true

# Supprimer la tâche planifiée "2adds" pour éviter des erreurs et des conflits

schtasks /delete /tn "2adds" /f

# Créer une tâche planifiée qui va s'executer à l'ouverture d'une session => la tâche planifiée va exécuter le 3ème script qui configurera le DNS Primary Zone, DNS PTR... de serveur à l'ouverture de session  

schtasks /create /tn "3dns" /tr "powershell.exe -ExecutionPolicy Bypass -File C:\ap_script\3dns.ps1" /rl highest /sc onlogon

# Ajouter le DefaultDomainName dans le registre pour l'Autologon

Set-ItemProperty -Path "${RegistryPath}" 'DefaultDomainName' -Value "apes.loc" -Type String

# Redémarrer le PC

Restart-Computer -Force

"@


# Créer le script "3dns.ps1" qui configuera le DNS Zone de serveur et installera le DHCP également

New-Item -ItemType File -Path "C:\ap_script\3dns.ps1" -Force | Out-Null

# Mettre ce contenu à l'intérieur du script

Set-Content -Path "C:\ap_script\3dns.ps1" -Value @"
# 
# Script pour mettre en place la Zone DNS, l'enregistrement PTR, DHCP... du serveur
#

Add-DnsServerPrimaryZone -NetworkId "192.168.31.0/24" -ReplicationScope 'Domain'

`$IP = (Get-NetIPAddress -InterfaceAlias "Ethernet0" -AddressFamily 'IPv4').IPV4Address
`$PTRIP = `$IP.Split('.',6)[3] 

`$fqdn = (Get-ADComputer `$(hostname)).DNSHostName
 
Add-DnsServerResourceRecordPtr -Name "`$PTRIP" -ZoneName "31.168.192.in-addr.arpa" -PtrDomainName "`$fqdn"

Set-DnsClientServerAddress -InterfaceAlias "Ethernet0" -ServerAddresses 192.168.31.10, 127.0.0.1

schtasks /delete /tn "3dns" /f

# Installation et configuration DHCP du serveur + création de Plage DHCP "31.100" => "31.200" 

Install-WindowsFeature DHCP -IncludeManagementTools

`$DNSName = "`$env:COMPUTERNAME.apes.loc"
Add-DHCPServerInDC -DNSName `$DNSName

Set-DhcpServerv4OptionValue -DNSServer 192.168.31.10 -DNSDomain apes.loc -Router 192.168.31.254

Add-DhcpServerv4Scope -Name "PlagePCs" -StartRange 192.168.31.100 -EndRange 192.168.31.200 -SubnetMask 255.255.255.0 -Description "Plage DHCP des ordinateurs du domaine APES"

# Désactiver l'Autologon et enlever le mot de passe et l'identifiant du registre Windows

Set-ItemProperty `$RegistryPath 'AutoAdminLogon' -Value "0" -Type String

Set-ItemProperty `$RegistryPath 'DefaultUsername' -Value "No" -Type String

Set-ItemProperty `$RegistryPath 'DefaultPassword' -Value "No" -type String

# Mettre le fichier 1ip.ps1 dans le dossier ap_script

Copy-Item C:`$env:HOMEPATH\Downloads\1ip.ps1 C:\ap_script\1ip.ps1

Remove-Item C:`$env:HOMEPATH\Downloads\1ip.ps1

Pause

"@ 

# Créer une tâche planifiée qui va s'executer à l'ouverture d'une session => la tâche planifiée va exécuter le 2ème script qui installera Active Directory à l'ouverture de session 

schtasks /create /tn "2adds" /tr "powershell.exe -ExecutionPolicy Bypass -File C:\ap_script\2adds.ps1" /rl highest /sc onlogon

# Redémarrer le PC

Restart-Computer -Force
