# Проект Mesto фронтенд + бэкенд


## frontend
https://kurs.nomoredomains.rocks

## backend
https://kus.nomoredomains.rocks

## crash-test
https://kus.nomoredomains.rocks/crash-test




config with:



### notes
configs: 

```
sudo vim /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl restart nginx 

vim  ~/react-mesto-api-full/backend/.env
vim  ~/react-mesto-api-full/frontend/src/config.js
 
pm2 restart app
```

Обновление сертификата

```
sudo certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start"
```

 
