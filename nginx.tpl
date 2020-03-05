server {
  listen 2333;
  server_name localhost;
  access_log /data/log/nginx/host.access.log main;
  charset utf-8;

  location / {
    charset utf-8;
    root /opt/app/;
    gzip on;
    gzip_http_version 1.1;
    gzip_min_length 1k;
    gzip_comp_level 5;
    gzip_types *;
    expires 30d;
    autoindex on;
    add_header 'Access-Control-Allow-Origin' '*';
    index index.html;
    try_files $uri $uri/ /index.html;
  }

  location ^~/dashboard {
    proxy_pass http://$API_HOST:$API_PORT/;
    proxy_set_header Host $host;
    rewrite ^/(.*) /$1 break;
  }
}
