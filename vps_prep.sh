#!/bin/bash

# 1. Script pour préparer et sécuriser un VPS

# Prérequis: -VPS sous Linux, -Connexion SSH, -Accès 'root'

# Après avoir connecté sur le VPS avec ssh, je me connecte avec le compte 'root' : 'sudo su' 

# Je modifie le mot de passe de mon compte 'root'

echo "Entrez un nouveau mot de passe pour le compte 'root'"

passwd 

# Je mets à jour le timezone de mon VPS

timedatectl set-timezone Europe/Paris

# Je mets à jour mon .bashrc (ce que j'ai ajouté: mes raccourcis, mes modifications concernant la commande history pour qu'ils affichent la date à coté de la commande executé)

cd ~

mv /etc/bash.bashrc /etc/bash.bashrc.backup

wget -O /etc/bash.bashrc https://raw.githubusercontent.com/ApecioU/configfiles/main/bash.bashrc

source /etc/bash.bashrc

# Je modifie le port d'écoute SSH par défaut 

while true; do
  read -p "Enter a number between 49152 and 65535: " port
  if [[ "$port" -ge 49152 && "$port" -le 65535 ]]; then # Pour plus de sécurité, utilisez un numéro entre 49152 et 65535.
    echo "Valid port: $port"
    break
  else
    echo "Invalid port. Please enter a number between 49152 and 65535."
  fi
done

sed -i "s/^#Port 22/Port $port/" /etc/ssh/sshd_config

# N'oubliez pas que vous devrez indiquer le nouveau port à chaque demande de connexion SSH à votre serveur, par exemple :
# ssh nomdutilisateur@IPv4_de_votre_VPS -p NouveauPort

# Je désactive la connexion 'root' dans la config SSH 

sed -i 's/^#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config

# Après 120s d'inactivité, déconnecte l'user

sed -i 's/^#ClientAliveInterval 0/ClientAliveInterval 120/' /etc/ssh/sshd_config

# Je définis une variable pour la création d'un compte perso

read -p "Entrez un identifiant pour la création d'un compte perso : " perso

# Je modifie la config ssh pour définir le nom d'utilisateurs qui peuvent utiliser ssh ; tous les autres utilisants sont bloqué

echo "AllowUsers $perso" | sudo tee -a /etc/ssh/sshd_config

# Je redémarre le service pour que cela s'applique 

systemctl restart sshd

# Je mets à jour la liste des paquets 

apt update

# Je mets à jour des paquets à proprement parler

apt upgrade -y

# J'installe tous les paquets que j'aurai besoin pour sécuriser mon VPS et l'utiliser pour héberger mon site web

apt install -y ufw fail2ban # (fail2ban je laisse la config par défaut)

# Avant d'activer le firewall ufw, j'autorise la connexion SSH sur le port que j'ai selectionné

ufw allow $port/tcp && ufw allow 'Nginx Full'  # Cette commande permet la connexion SSH et HTTP+S sur les port selectionné et pour tous les autres ports : c'est bloqué :) 

# Régler le 'Invalid argument' de NGINX à première installation 

mkdir /etc/systemd/system/nginx.service.d
printf "[Service]\nExecStartPost=/bin/sleep 0.1\n" > /etc/systemd/system/nginx.service.d/override.conf
systemctl daemon-reload
systemctl restart nginx 

# Maintenant on peut activer le pare feu après avoir autorisé le nouveau port SSH 

ufw enable

# Je crée un compte perso et je l'ajoute dans le groupe 'sudo' 

sudo useradd -m -s /bin/bash -G sudo $perso && echo "Entrez un mot de passe pour $perso" && passwd $perso && sudo usermod -c "$perso" $perso

# Je me connecte avec mon compte perso

su $perso
