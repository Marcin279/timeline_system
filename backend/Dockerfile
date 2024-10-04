# Używamy obrazu PHP z Apache
FROM php:8.2-apache

# Instalacja rozszerzeń PHP dla MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Kopiujemy pliki backendu do katalogu serwowanego przez Apache
COPY . /var/www/html

# Ustawiamy prawa do plików
RUN chown -R www-data:www-data /var/www/html

# Apache domyślnie będzie nasłuchiwał na porcie 80
EXPOSE 80
