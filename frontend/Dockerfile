# Wybieramy obraz Nginx do serwowania plików statycznych
FROM nginx:alpine

# Kopiujemy pliki HTML, CSS, JS do katalogu serwowanego przez Nginx
COPY . /usr/share/nginx/html

# Domyślnie Nginx będzie serwował pliki na porcie 80
EXPOSE 80
