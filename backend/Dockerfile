# Używamy obrazu PHP z Apache dla backendu
FROM php:8.2-apache

# Instalacja Composer i rozszerzeń PHP potrzebnych do Laravela
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql gd

# Ustawienie katalogu roboczego
WORKDIR /var/www/html

# Kopiowanie plików Laravela do katalogu
COPY . /var/www/html

# Instalacja zależności Laravel
RUN composer install

# Ustawienie praw do katalogów
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Eksponowanie portu 80
EXPOSE 80

# Uruchomienie Apache
CMD ["apache2-foreground"]
