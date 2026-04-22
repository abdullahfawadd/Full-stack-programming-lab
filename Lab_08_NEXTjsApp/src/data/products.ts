export type Product = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  highlights: string[];
};

export const products: Product[] = [
  {
    slug: "aether-desk-lamp",
    title: "Aether Desk Lamp",
    shortDescription:
      "A sculpted aluminum lamp with adaptive glow profiles for focused and ambient work.",
    description:
      "Aether Desk Lamp balances precision and warmth with a machined aluminum body, edge-lit diffuser, and tactile brightness dial. It is designed for long sessions at your workstation while keeping visual noise minimal.",
    price: 149,
    category: "Workspace",
    highlights: ["360-degree pivot", "USB-C power", "Auto-dim profile"],
  },
  {
    slug: "atlas-weekender-bag",
    title: "Atlas Weekender Bag",
    shortDescription:
      "Structured canvas travel bag with modular compartments and weather-resistant lining.",
    description:
      "Atlas Weekender Bag is built for short trips and daily carry. The compartment system separates essentials from electronics, while reinforced handles and balanced weight distribution keep it comfortable in motion.",
    price: 199,
    category: "Travel",
    highlights: ["Water-resistant shell", "Padded 16-inch sleeve", "Magnetic quick-access pocket"],
  },
  {
    slug: "solstice-wireless-speaker",
    title: "Solstice Wireless Speaker",
    shortDescription:
      "Compact speaker with room-aware tuning and rich stereo depth for modern interiors.",
    description:
      "Solstice Wireless Speaker combines studio-inspired tuning with understated design. Its room-adaptive EQ continuously optimizes sound shape, while multi-device support keeps switching between laptop and phone seamless.",
    price: 239,
    category: "Audio",
    highlights: ["Room-aware EQ", "18-hour battery", "Bluetooth multipoint"],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};
