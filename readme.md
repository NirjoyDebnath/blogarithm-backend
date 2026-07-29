# Blogarithm Backend

A REST API for a blog platform built with Node.js, Express and TypeScript. Supports stories, comments, likes and user management with JWT authentication.

## Features

- JWT authentication with sign up and login
- Stories with full CRUD
- Comments and likes on stories
- Role-based authorization
- Request validation with Joi
- Unit tests for controllers and services
- Docker support

## Tech Stack

Node.js, Express, TypeScript, MySQL, Knex, JWT, Jest, Docker

## Getting Started

**Requirements:** Node.js, MySQL

```bash
git clone https://github.com/NirjoyDebnath/blogarithm-backend.git
cd blogarithm-backend
npm install
cp .env.example .env   # fill in your values
npx knex migrate:latest
npm run dev
```

## Scripts

```bash
npm run dev       # start development server
npm run build     # compile TypeScript
npm start         # run compiled build
npm test          # run tests
npm run lint      # lint
npm run format    # format with Prettier
```

## Endpoints

**Auth**
- `POST /auth/signUp` — register
- `POST /auth/logIn` — login

**Users**
- `GET /users/` — list users
- `GET /users/:id` — user detail
- `PATCH /users/:id` — update user
- `DELETE /users/:id` — delete user

**Stories**
- `GET /stories/` — list stories
- `POST /stories/` — create story
- `GET /stories/:id` — story detail
- `PATCH /stories/:id` — update story
- `DELETE /stories/:id` — delete story

**Comments**
- `GET /stories/:id/comments/` — list comments
- `POST /stories/:id/comments/` — add comment
- `PATCH /stories/:id/comments/:commentId` — update comment
- `DELETE /stories/:id/comments/:commentId` — delete comment

**Likes**
- `POST /stories/:id/likes/` — like a story
- `DELETE /stories/:id/likes/` — unlike a story
