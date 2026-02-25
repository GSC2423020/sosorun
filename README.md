# SOSORUN (Laravel Full-Stack Renewal)

SOSORUN is a running community web application.

This repository continues from the existing history (previous environment setup commits remain),
and now pivots to a Laravel v11 full-stack monorepo (Blade + Vite) with an API-first backend design.

## Tech Stack

- Windows, WSL2 (Ubuntu 24.04)
- Docker Desktop (WSL2 integration)
- Nginx, PHP-FPM, PostgreSQL
- Composer, Laravel v11
- Blade, HTML, CSS, Vanilla JavaScript
- Node.js, npm, Vite
- Git, VS Code, Postman

## Repository Policy (This Thread)

- This repo keeps previous commits and continues with Laravel migration commits.
- Single monorepo (full-stack in Laravel: Blade + Vite).
- Work is executed step-by-step with clear checkpoints and conventional commit messages.

## Next

- Step 1: Repository base template (README / gitignore / editorconfig / gitattributes)
- Step 2: Docker infra baseline (nginx + php-fpm + postgres)
- Step 3: Laravel v11 scaffold
- Step 4: Nginx ↔ PHP-FPM routing check
- Step 5: PostgreSQL connection + health check
- Step 6: Standardize dev workflow (scripts/docs/postman)
