# Vantage CRM - Final Term MERN + Next.js Project

Vantage CRM is a premium dark SaaS customer relationship management system built for the Full Stack final term project. It uses a Next.js App Router frontend, an Express backend, MongoDB persistence, JWT cookie authentication, shadcn/ui components, Lottie motion, toast notifications, invoice PDF generation, and a rule-based dashboard assistant.

## Stack

- Frontend: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lottie, Sonner, Lucide
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- Database: `final_term_crm`
- Mongo connection string: `mongodb://127.0.0.1:27017/final_term_crm`

## Local Setup

1. Start MongoDB locally. In MongoDB Compass, connect to:

```bash
mongodb://127.0.0.1:27017
```

2. Install and seed the backend:

```bash
cd backend
npm install
npm run seed
npm run dev
```

3. In a second terminal, start the frontend:

```bash
cd frontend
npm install
npm run dev
```

4. Open:

```bash
http://localhost:3000
```

## Login

- Email: `abdullah@vantagecrm.local`
- Password: `Abdullah@12345`

## Environment Files

Backend local `.env`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/final_term_crm
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:3000
GROQ_API_KEY=optional_private_key_not_used_by_assignment_chatbot
```

Frontend local `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The chatbot is intentionally rule-based because the assignment says no external AI API usage is allowed.

## Features

- JWT authentication with HttpOnly cookie sessions
- Protected dashboard routing
- Customer CRUD with validation
- Search customers by name, company, or email
- Filter customers by `Lead`, `Active`, and `Inactive`
- Seed script with one admin user and 15 customer records
- Invoice generation for selected customers
- Invoice PDF download
- Toast success/error notifications
- Rule-based CRM assistant for predefined commands
- Responsive premium dashboard UI

## API Summary

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Customers:

- `GET /api/customers?search=&status=`
- `POST /api/customers`
- `GET /api/customers/:id`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

Invoices:

- `GET /api/invoices`
- `POST /api/invoices`
- `GET /api/invoices/:id`

## Submission Notes

Add screenshots from the running app to your Word/PDF report, include your GitHub repository URL, and upload the document to GCR.
