FROM php:8.3-fpm

# 1) 패키지 설치 (PostgreSQL 확장, zip 등 Laravel에 자주 필요)
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
  && docker-php-ext-install pdo pdo_pgsql zip \
  && rm -rf /var/lib/apt/lists/*

# 2) Composer 설치 (공식 이미지에서 복사)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 3) php.ini 적용
COPY php.ini /usr/local/etc/php/conf.d/custom.ini
