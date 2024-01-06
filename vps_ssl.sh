#!/bin/bash

# 2.1 SSL Certificat Renew

domain_name='lethimcook.fr'

cd /var/www

mkdir $domain_name && mkdir $domain_name/public 

cd $domain_name/public

echo '<h1>Test</h1>' >> index.html

sudo sh -c "echo 'server {
    listen 80;
    server_name $domain_name www.$domain_name;

    root /var/www/$domain_name/public;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
        error_page 404 /404/index.html;
    }
}' > /etc/nginx/sites-available/$domain_name.conf"

sudo ln -s /etc/nginx/sites-available/$domain_name.conf /etc/nginx/sites-enabled/

sudo nginx -t && sudo systemctl reload nginx

sudo apt-get install python-certbot-nginx -y

sudo certbot --nginx -d $domain_name -d www.$domain_name

# Only valid for 90 days, test the renewal process with

echo "Certificat SSL LetsEncrypt est seulement valable pour 90 jours, test de renouvellement de certificat SSL"

sudo certbot renew --dry-run