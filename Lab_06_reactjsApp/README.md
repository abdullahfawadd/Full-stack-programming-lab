# Lab 06: React Application Architecture

Lab 06 delivers a multi-task React application with dashboard navigation, feature-based module separation, and route-driven interaction patterns.

## Student Information

- Name: M Abdullah
- Registration ID: 232052
- Institution: Air University Islamabad

## Included Tasks

| Task | Topic | Route | Task README |
| --- | --- | --- | --- |
| Task 1 | Counter Application | `/counter-app` | [src/features/counter-app/README.md](src/features/counter-app/README.md) |
| Task 2 | User Form App | `/user-form-app` | [src/features/user-form-app/README.md](src/features/user-form-app/README.md) |
| Task 3 | Interactive Buttons App | `/event-app` | [src/features/event-app/README.md](src/features/event-app/README.md) |
| Task 4 | Multi-Page Website (Routing) | `/routing-app/*` | [src/features/routing-app/README.md](src/features/routing-app/README.md) |

## Project Structure

```
Lab_06_reactjsApp/
|-- src/
|   |-- components/
|   |-- data/
|   |-- features/
|   |   |-- counter-app/
|   |   |-- user-form-app/
|   |   |-- event-app/
|   |   `-- routing-app/
|   |-- pages/
|   |-- App.jsx
|   `-- main.jsx
|-- package.json
`-- README.md
```

## Run Instructions

```bash
npm install
npm run dev
```

Optional quality checks:

```bash
npm run lint
npm run build
```

## Technology Stack

- React 19
- React Router
- Vite
- ESLint
