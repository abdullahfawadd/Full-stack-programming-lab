# Lab 11 - MERN Stack Node MongoDB Lab

Full-stack ecommerce web application built for the Full Stack Programming lab submission.

## Student Details

- Name: M Abdullah
- Registration ID: 232052

## Project Structure

```text
Lab_11_MERN_Stack_Node_MongoDB_Lab/
└── ecommerce-app/
    ├── backend/
    └── frontend/
```

## Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: Next.js App Router, TypeScript, Tailwind CSS, Axios
- Database: Local MongoDB database named `ecommerce`
- Collection: `products`

## Run Backend

```bash
cd Lab_11_MERN_Stack_Node_MongoDB_Lab/ecommerce-app/backend
npm install
npm run seed
npm run dev
```

Backend runs at `http://localhost:5000`.

## Run Frontend

```bash
cd Lab_11_MERN_Stack_Node_MongoDB_Lab/ecommerce-app/frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/:id` | Fetch one product for the details page |
| POST | `/api/products` | Create a new product |

## MongoDB Connection

The backend uses this default local MongoDB URI:

```text
mongodb://127.0.0.1:27017/ecommerce
```

You can override it by copying `backend/.env.example` to `backend/.env`.
