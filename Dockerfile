FROM nginx

# Copy Nginx Configuration File
COPY nginx.conf /etc/nginx/nginx.conf
COPY src/ /usr/share/nginx/html/haystack/

EXPOSE 80 443
