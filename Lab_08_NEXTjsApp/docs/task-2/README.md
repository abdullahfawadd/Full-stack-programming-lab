# Lab 08 - Task 2: Dynamic Product Component and Routing

## Objective

Build a reusable product listing component and dynamic product detail routes using Next.js App Router.

## Functional Scope

- ProductList component rendering multiple products
- Product detail pages generated dynamically via route parameter (`[slug]`)
- Navigation links between Home, ProductList, and product detail pages
- Shared Footer across all routes

## Relevant Source

- `src/components/ProductList.tsx`
- `src/data/products.ts`
- `src/app/products/page.tsx`
- `src/app/products/[slug]/page.tsx`
- `src/app/task-2/page.tsx`

## Notes

Dynamic product routes are statically generated through `generateStaticParams`, and metadata is resolved per product.
