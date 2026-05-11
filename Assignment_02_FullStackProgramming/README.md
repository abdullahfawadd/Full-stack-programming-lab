# Assignment 02: Next.js E-Commerce Conversion

This folder contains the Assignment 02 conversion of the Assignment 01 HOTSPRING static website into a modern Next.js application.

## Student / Team

- M Abdullah Fawad
- Ehtisham Amjad
- Aman Mir

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React client components for interactive UI
- lucide-react icons

## Pages

- `/` - Home
- `/about` - About and team
- `/category` - Product category listing with filters
- `/product-detail` - Product detail, gallery, colors, and quantity
- `/contact` - Contact form
- `/login` - Login form
- `/register` - Registration form with password strength
- `/forgot-password` - Password reset form
- `/my-account` - Account dashboard
- `/edit-billing-address` - Billing address editor
- `/edit-shipping-address` - Shipping address editor
- `/profile/edit-account` - Profile and password editor
- `/profile/order-summary` - Order list
- `/profile/order-details` - Order detail view
- `/shopping/cart` - Cart with quantity, remove, coupon, and totals
- `/shopping/payment` - Checkout and payment method switching
- `/shopping/terms` - Terms and conditions

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Notes

- The app is frontend-only and uses local demo data.
- Forms show validation and success states but do not submit to a backend.
- Checkout is a demo flow and does not process real payments.
- Reference JPG/PSD mockups from the local `Final pages` folder are not included in this repository.
