export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  badge?: string;
  rating: number;
  reviews: number;
  capacity: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  colors: string[];
};

export const products: Product[] = [
  {
    slug: "serenity-pro-6-person",
    name: "Serenity Pro 6-Person",
    category: "Luxury Collection",
    price: 1050000,
    compareAt: 1200000,
    badge: "New",
    rating: 4.9,
    reviews: 48,
    capacity: "6 people",
    image:
      "https://images.unsplash.com/photo-1733653024328-9d3f37fdfb73?w=900&h=900&fit=crop&auto=format&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1733653024328-9d3f37fdfb73?w=900&h=900&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1767463130670-88af6bb8f080?w=900&h=900&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1736238846734-e087d077e4c5?w=900&h=900&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1769989074037-9873b4c72dcf?w=900&h=900&fit=crop&auto=format&q=85",
    ],
    description:
      "A flagship family spa with therapeutic hydro jets, multi-zone LED mood lighting, and Wi-Fi smart control for premium outdoor living.",
    features: [
      "46 stainless hydrotherapy jets",
      "Smart temperature scheduling",
      "16 color LED mood system",
      "Energy efficient insulated shell",
    ],
    colors: ["Sandstone", "Graphite", "Pearl", "Espresso"],
  },
  {
    slug: "aquabliss-4-person",
    name: "AquaBliss 4-Person",
    category: "Hot Tubs",
    price: 725000,
    compareAt: 905000,
    badge: "-20%",
    rating: 4.8,
    reviews: 67,
    capacity: "4 people",
    image:
      "https://images.unsplash.com/photo-1767463130670-88af6bb8f080?w=900&h=900&fit=crop&auto=format&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1767463130670-88af6bb8f080?w=900&h=900&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1733653024328-9d3f37fdfb73?w=900&h=900&fit=crop&auto=format&q=85",
    ],
    description:
      "Compact luxury with a quiet circulation system, ergonomic seating, and soft-touch digital controls.",
    features: ["28 focused jets", "Low-noise pump", "Ergonomic lounger", "Quick heat recovery"],
    colors: ["Pearl", "Graphite", "Sandstone"],
  },
  {
    slug: "thermowave-8-person",
    name: "ThermoWave 8-Person",
    category: "Luxury Collection",
    price: 1375000,
    compareAt: 1720000,
    rating: 4.7,
    reviews: 21,
    capacity: "8 people",
    image:
      "https://images.unsplash.com/photo-1769989074037-9873b4c72dcf?w=900&h=900&fit=crop&auto=format&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1769989074037-9873b4c72dcf?w=900&h=900&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1733653024328-9d3f37fdfb73?w=900&h=900&fit=crop&auto=format&q=85",
    ],
    description:
      "Large-capacity entertainment spa built for resorts, terraces, and family gatherings.",
    features: ["8-seat layout", "Zoned massage modes", "Weather-ready shell", "Integrated step lighting"],
    colors: ["Graphite", "Espresso", "Pearl"],
  },
  {
    slug: "zenflow-2-person",
    name: "ZenFlow 2-Person",
    category: "Hot Tubs",
    price: 440000,
    badge: "New",
    rating: 4.8,
    reviews: 15,
    capacity: "2 people",
    image:
      "https://images.unsplash.com/photo-1736238846734-e087d077e4c5?w=900&h=900&fit=crop&auto=format&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1736238846734-e087d077e4c5?w=900&h=900&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1767463130670-88af6bb8f080?w=900&h=900&fit=crop&auto=format&q=85",
    ],
    description:
      "A private wellness pod for balconies, compact gardens, and studio spa rooms.",
    features: ["Two deep seats", "Aromatherapy tray", "Plug-and-play setup", "Compact footprint"],
    colors: ["Sandstone", "Pearl"],
  },
  {
    slug: "oceanbreeze-6-person",
    name: "OceanBreeze 6-Person",
    category: "Hot Tubs",
    price: 935000,
    rating: 4.6,
    reviews: 29,
    capacity: "6 people",
    image:
      "https://images.unsplash.com/photo-1733653024328-9d3f37fdfb73?w=900&h=900&fit=crop&auto=format&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1733653024328-9d3f37fdfb73?w=900&h=900&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=900&fit=crop&auto=format&q=85",
    ],
    description:
      "A balanced everyday hot tub with powerful massage, calm styling, and dependable insulation.",
    features: ["Multi-speed jets", "UV sanitation", "Wide step entry", "Family seating"],
    colors: ["Graphite", "Sandstone", "Espresso"],
  },
  {
    slug: "cloudspa-inflatable",
    name: "CloudSpa Inflatable 4-Person",
    category: "Inflatable Spas",
    price: 162000,
    compareAt: 190000,
    rating: 4.5,
    reviews: 34,
    capacity: "4 people",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&h=900&fit=crop&auto=format&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&h=900&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&h=900&fit=crop&auto=format&q=85",
    ],
    description:
      "Portable spa comfort with fast setup, durable lining, and simple digital controls.",
    features: ["Rapid inflation", "120 bubble jets", "Carry bag included", "Easy drain system"],
    colors: ["Charcoal", "Slate"],
  },
];

export const categories = [
  {
    title: "Luxury Collection",
    count: 12,
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&h=620&fit=crop&auto=format&q=85",
  },
  {
    title: "Inflatable Spas",
    count: 8,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&h=620&fit=crop&auto=format&q=85",
  },
  {
    title: "Accessories",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&h=620&fit=crop&auto=format&q=85",
  },
];

export const teamMembers = [
  {
    name: "M Abdullah Fawad",
    role: "Founder & CEO",
    bio: "Leads brand strategy, customer experience, and premium wellness partnerships across Pakistan.",
  },
  {
    name: "Ehtisham Amjad",
    role: "Co-Founder",
    bio: "Owns operations, delivery quality, and showroom experience for residential and commercial clients.",
  },
  {
    name: "Aman Mir",
    role: "Chief Technology Officer",
    bio: "Builds the digital commerce systems, service tools, and smart spa integration roadmap.",
  },
];

type CartSeedItem =
  | { productSlug: string; color: string; quantity: number }
  | { customName: string; color: string; price: number; image: string; quantity: number };

export const cartSeed: CartSeedItem[] = [
  { productSlug: "serenity-pro-6-person", color: "Sandstone", quantity: 1 },
  {
    customName: "Premium Spa Cover - Large",
    color: "Charcoal",
    price: 57000,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&h=600&fit=crop&auto=format&q=85",
    quantity: 1,
  },
  {
    customName: "Deluxe Spa Steps",
    color: "Espresso",
    price: 28500,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=600&fit=crop&auto=format&q=85",
    quantity: 1,
  },
];

export const orderHistory = [
  {
    id: "HS-24091",
    date: "11 May 2026",
    status: "Processing",
    total: 1232000,
    items: ["Serenity Pro 6-Person", "Premium Spa Cover", "Deluxe Spa Steps"],
  },
  {
    id: "HS-23976",
    date: "29 Apr 2026",
    status: "Delivered",
    total: 162000,
    items: ["CloudSpa Inflatable 4-Person"],
  },
  {
    id: "HS-23852",
    date: "18 Apr 2026",
    status: "Delivered",
    total: 440000,
    items: ["ZenFlow 2-Person"],
  },
];

export function formatCurrency(amount: number) {
  return `PKR ${Math.round(amount).toLocaleString("en-PK")}`;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug) ?? products[0];
}
