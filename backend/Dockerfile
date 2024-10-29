# Używamy obrazu PHP z Apache dla Laravel
FROM php:8.2-apache

# Instalacja Composer i rozszerzeń PHP potrzebnych do Laravel
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd

# Ustawienie katalogu roboczego
WORKDIR /var/www/html

# Kopiowanie plików Laravela do katalogu
COPY . /var/www/html

# Instalacja zależności Laravel
RUN composer install

# Instalacja Laravel Sanctum
RUN composer require laravel/sanctum

# Włączenie modułu mod_rewrite Apache, wymaganego przez Laravel
RUN a2enmod rewrite

# Dodanie konfiguracji Apache dla Laravel
COPY ./apache/laravel.conf /etc/apache2/sites-available/000-default.conf

# Ustawienie praw do katalogów storage i bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache


# Eksponowanie portu 80
EXPOSE 80

# Uruchomienie Apache
CMD ["apache2-foreground"]
