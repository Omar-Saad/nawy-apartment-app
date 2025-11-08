# Nawy Apartment Listing App

A simple full-stack application to list apartments and view their details. Built with **NestJS** for the backend, **Next.js** for the frontend, and a **PostgreSQL** database. The app is fully containerized using Docker and can be run with a single command.

---

## Features

- **Backend (NestJS + TypeScript)**:
  - List all apartments
  - Get details of a single apartment
  - Add a new apartment
  - Search and filter apartments by unit name, unit number, or project.

- **Frontend (Next.js + React)**:
  - Apartment listing page
  - Apartment details page

- **Database**:
  - PostgreSQL

---

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup & Run

1. Create a `.env` file in the backend and frontend directories. Example:

Backend `.env`:

```bash
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nawydb
DB_HOST=db
DB_PORT=5432
PORT=3001
```

Frontend `.env`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

2. Start the application using Docker Compose:

```bash
docker-compose up --build
```

This will start three services:

- Backend: http://localhost:3000
- Frontend: http://localhost:3001
- Database: PostgreSQL running inside Docker

3. To stop the application

```bash
docker-compose down
```