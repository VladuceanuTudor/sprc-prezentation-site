# Site Prezentare Proiect SPRC

Site web pentru prezentarea infrastructurii proiectului SPRC 2025-2026.

## Instalare

```bash
# Clonează repository-ul
git clone <url-repo>
cd sprc-site

# Instalează dependențele
npm install

# Build pentru producție
npm run build
```

## Rulare

### Development (local)
```bash
npm run dev
```
Accesează http://localhost:3000

### Producție (pe VM)
```bash
# Instalează PM2 (o singură dată)
npm install -g pm2

# Pornește aplicația
pm2 start "npm run start" --name "sprc-site"

# Configurează pornire automată la boot
pm2 startup
pm2 save
```

## Actualizare

Când repository-ul primește modificări:

```bash
cd ~/sprc-prezentation-site

# Preia ultimele modificări
git pull

# Rebuild
npm run build

# Repornește aplicația
pm2 restart sprc-site
```

Dacă ai modificări locale:
```bash
git stash
git pull
git stash pop
npm run build
pm2 restart sprc-site
```

## Configurare Nginx (Reverse Proxy)

Pentru a accesa site-ul pe portul 80:

```bash
sudo nano /etc/nginx/sites-available/sprc-site
```

Conținut:
```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activează configurația:
```bash
sudo ln -s /etc/nginx/sites-available/sprc-site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Comenzi utile PM2

```bash
pm2 list              # Vezi toate aplicațiile
pm2 logs sprc-site    # Vezi logurile
pm2 restart sprc-site # Repornește
pm2 stop sprc-site    # Oprește
pm2 delete sprc-site  # Șterge din PM2
```

## Tehnologii

- Next.js 16
- React 19
- Tailwind CSS
- Framer Motion
- Lucide Icons
