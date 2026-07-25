FROM php:8.4-cli

# System dependencies + SQLite extensions install karein
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev sqlite3 libsqlite3-dev \
    && docker-php-ext-install zip pdo pdo_mysql pdo_sqlite \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

# Storage & Database folder ko create + full permission do
RUN mkdir -p database storage/logs bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache database

EXPOSE 10000

# Container start hote hi sqlite file create hogi aur migrations chalenge
CMD sh -c "touch /app/database/database.sqlite && php artisan migrate --force && php artisan config:clear && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"