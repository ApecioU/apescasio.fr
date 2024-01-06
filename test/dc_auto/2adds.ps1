#
# Script pour créer un AD DS
#

Install-WindowsFeature -name AD-Domain-Services –IncludeManagementTools
Install-ADDSForest `
-CreateDnsDelegation:$false `
-SafeModeAdministratorPassword:(ConvertTo-SecureString -String Pescasio1 -AsPlainText -Force) `
-DatabasePath "C:\Windows\NTDS" `
-DomainMode "WinThreshold" `
-DomainName "et.fr" `
-DomainNetbiosName "ET" `
-ForestMode "WinThreshold" `
-InstallDns:$true `
-LogPath "C:\Windows\NTDS" `
-NoRebootOnCompletion:$false `
-SysvolPath "C:\Windows\SYSVOL" `
-Force:$true

schtasks /delete /tn "2adds" /f

schtasks /create /tn "3dns" /tr "powershell.exe -ExecutionPolicy Bypass -File C:%HOMEPATH%\Downloads\dc_auto\3dns.ps1" /rl highest /sc onlogon

Restart-Computer -Force
