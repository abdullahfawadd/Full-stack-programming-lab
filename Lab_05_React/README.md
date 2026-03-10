# Lab 05 - React Fundamentals

**Student:** M Abdullah Fawad  
**Registration ID:** 232052  
**University:** Air University, Islamabad

## Overview

This lab covers React fundamentals including component creation, props, list rendering, and conditional rendering. Built with React + Vite.

## Tasks

### Task 1: Student Information Card App

- Reusable `StudentCard` component with `name`, `rollNo`, `department`, `university` props
- Displays 3 student cards using the same component
- Bonus: `color` prop to set card accent color

### Task 2: Course List App

- `CourseItem` component with `courseName`, `instructor`, `duration` props
- Array of 5 courses mapped to render components
- Bonus: `type` prop (Online/Offline) displayed as a badge

### Task 3: Dynamic Greeting App

- `Greeting` component with `name` and `timeOfDay` props
- Conditional rendering based on time of day (Morning, Afternoon, Evening, Night)
- 4 Greeting components rendered with different props
- Bonus: `bgColor` prop to set card background

## Setup

```bash
npm install
npm run dev
```

## Tech Stack

- React 19
- React Router
- Vite

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
