# Lab 08: Next.js Dashboard and Dynamic Routing

Lab 08 is a production-style Next.js App Router project with a dashboard-first flow, multi-page task structure, reusable layout components, and dynamic product route generation.

## Student Information

- Name: M Abdullah
- Registration ID: 232052
- Institution: Air University Islamabad

## Flow Overview

1. Dashboard landing page (`/`)
2. Task 1 page (`/task-1`) with links to Home, About, and Contact
3. Task 2 page (`/task-2`) with ProductList and dynamic product routes

## Task Documentation

| Task | Scope | Route | Task README |
| --- | --- | --- | --- |
| Task 1 | Multi-page app with global layout | `/task-1` | [docs/task-1/README.md](docs/task-1/README.md) |
| Task 2 | ProductList and dynamic routing | `/task-2` | [docs/task-2/README.md](docs/task-2/README.md) |

## Key Routes

- `/` Dashboard
- `/home` Task 1 Home page
- `/about` About page
- `/contact` Contact page
- `/products` ProductList page
- `/products/[slug]` Dynamic product detail route

## Project Structure

```
Lab_08_NEXTjsApp/
|-- src/
|   |-- app/
|   |   |-- about/
|   |   |-- contact/
|   |   |-- home/
|   |   |-- products/
|   |   |-- task-1/
|   |   `-- task-2/
|   |-- components/
|   `-- data/
|-- docs/
|   |-- task-1/
|   `-- task-2/
|-- package.json
`-- README.md
```

## Run Instructions

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Optional quality checks:

```bash
npm run lint
npm run build
```

## Technology Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS Modules
- ESLint
