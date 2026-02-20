# SOSORUN (Renewal)

SOSORUN is a running community web service.  
This project aims to redesign an existing PHP-based backend into an API-centered architecture,
and expand it into a full-stack application with a clear separation between frontend and backend
using NestJS and Next.js.

---

## 📌 Project Overview

- **Project Name**: SOSORUN (Renewal)
- **Type**: Full-stack Web Application (Monorepo)
- **Architecture**: API-centered backend with separated frontend
- **Goals**
  - Design a scalable and maintainable backend architecture
  - Clearly separate frontend and backend responsibilities
  - Build a production-ready infrastructure using Docker and Nginx

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- TypeScript (planned)

### Backend
- NestJS
- Node.js
- TypeScript

### Database
- PostgreSQL

### Infra / DevOps
- Docker
- Docker Compose
- Nginx

### Environment
- Windows
- WSL2 (Ubuntu)

---

## 📂 Project Structure

```
sosorun/
├── apps/
│   ├── web/               # Next.js (frontend)
│   └── api/               # NestJS (backend)
├── infra/
│   ├── nginx/
│   │   └── default.conf   # Nginx configuration
│   └── postgres/
│       └── init.sql       # Database configuration
├── docs/                  # Architecture, ERD, API documentation
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

# 🚀 Local Development (Docker Compose)

The entire stack runs via Docker Compose.

Nginx works as a **single entry point**.

## 🔹 Access Point

Open in browser:

```
http://localhost:8080
```

Routing:

- `/` → Web (Next.js)
- `/api/*` → API (NestJS)

---

# 🔌 Ports (Reference)

| Service      | Port |
|--------------|------|
| Nginx        | 8080 |
| Web          | 3000 |
| API          | 3001 |
| PostgreSQL   | 5432 |

> In normal development, access only through port **8080**.

---

# ▶ How to Run

## 1. Start Containers

```bash
cd ~/projects/sosorun
docker compose up -d
```

## 2. Check Status

```bash
docker compose ps
```

## 3. Health Check (via Nginx)

```bash
curl -s http://localhost:8080/api/health
curl -s http://localhost:8080/api/health/db
```

Expected:

```
{"ok":true}
{"ok":true,"db":"connected"}
```

---

# ⚠️ Important: 0.0.0.0 Binding

When running inside Docker, services must bind to **0.0.0.0**.

If bound to `127.0.0.1`, Nginx cannot reach them → results in 502 Bad Gateway.

## API (NestJS)

`apps/api/src/main.ts`

```ts
await app.listen(port, '0.0.0.0');
```

## Web (Next.js)

`apps/web/package.json`

```json
"dev": "next dev -H 0.0.0.0 -p 3000"
```

---

# 🧪 Troubleshooting

## 🔴 502 Bad Gateway

Possible Causes:
- Container not running
- Wrong upstream port
- Service bound to 127.0.0.1

Check logs:

```bash
docker compose logs --tail=80 nginx
docker compose logs --tail=120 web
docker compose logs --tail=120 api
```

Test connectivity from Nginx container:

```bash
docker compose exec nginx sh -lc "wget -qO- http://api:3001/health || echo FAIL"
docker compose exec nginx sh -lc "wget -qO- http://web:3000 || echo FAIL"
```

---

## 🔴 EADDRINUSE (Port already in use)

Cause:
- Running local `pnpm run dev:web` while Docker container already occupies port 3000.

Solution:
- Use Docker OR local pnpm — not both simultaneously.

---

## 🔴 EACCES permission denied (dist unlink)

Cause:
- Permission mismatch between host and container.

Fix:

```bash
docker compose down
docker compose up -d --force-recreate
```

If necessary:

```bash
docker compose down -v
```

---

# 🗂 Recommended Dev Workflow

Always:

```bash
docker compose up -d
```

Access only:

```
http://localhost:8080
```

Avoid mixing:
- Docker Compose
- Local pnpm dev servers

---

# 📌 Current Status

## ✅ Infrastructure Completed

- Monorepo structure
- Web + API separation
- PostgreSQL container
- Prisma integration
- Nginx reverse proxy
- Health check endpoints
- Full Docker-based stack

Infrastructure is now production-style ready.

---

# 🔜 Next Step

We will now begin actual application development:

1. Finalize Prisma schema
2. Create first migration
3. Seed initial data
4. Implement first domain (auth or runs)
5. Connect Web ↔ API

---

# 👨‍💻 Author

Seongbin Yoon  
Department of Global System Convergence  
Yeungjin College
