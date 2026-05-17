# Lab 12 - MERN Stack Next.js Dynamic Ecommerce App

Dynamic ecommerce lab submission built with a fresh MongoDB database, a Node/Express API, and a modern Next.js storefront.

## Student

- Name: M Abdullah
- Database: `lab12_dynamic_ecommerce`
- Collection: `products`

## Project Structure

```text
Lab_12_MERN_Stack_Nextjs_Dynamic_App_Lab/
|-- ecommerce-app/
|   |-- backend/
|   `-- frontend/
`-- screenshots/
```

## Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: Next.js App Router, TypeScript, Tailwind CSS, lucide-react
- Database URI: `mongodb://127.0.0.1:27017/lab12_dynamic_ecommerce`

## Run Backend

```bash
cd Lab_12_MERN_Stack_Nextjs_Dynamic_App_Lab/ecommerce-app/backend
npm install
npm run seed
npm run dev
```

Backend runs at `http://localhost:5000`.

## Run Frontend

```bash
cd Lab_12_MERN_Stack_Nextjs_Dynamic_App_Lab/ecommerce-app/frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Pages

- `/` - Home
- `/shop` - Product catalog with search and category filtering
- `/products/[id]` - Product detail with gallery and add-to-cart
- `/cart` - Cart with quantity controls
- `/checkout` - Demo checkout form
- `/about` - Store and stack overview
- `/contact` - Contact form
- `/admin` - Product CRUD dashboard

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Fetch products |
| GET | `/api/products?featured=true` | Fetch featured products |
| GET | `/api/products/:id` | Fetch one product |
| POST | `/api/products` | Create a product |
| PUT/PATCH | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## Screenshots

Screenshots are saved in `screenshots/`:

- `01-home.png`
- `02-shop-catalog.png`
- `03-product-detail.png`
- `04-cart.png`
- `05-checkout.png`
- `06-about.png`
- `07-contact.png`
- `08-admin-crud-database.png`
- `09-api-products-database-proof.png`
- `10-mobile-home.png`

## Validation

```bash
cd ecommerce-app/frontend
npm run lint
npm run build
```

The backend seed script creates the database and collection automatically when MongoDB is running locally.
