import type { APIRoute } from 'astro';

const sampleProducts = [
  { id: 1, slug: "premium-wireless-earbuds", title: "Premium Wireless Earbuds", price: 2499, description: "High-quality wireless earbuds with noise cancellation and 30-hour battery life.", images: ["https://placehold.co/600x600/EC1713/FFFFFF?text=Earbuds"], category_id: 1, stock: 50 },
  { id: 2, slug: "classic-cotton-tshirt", title: "Classic Cotton T-Shirt", price: 799, description: "100% cotton, comfortable fit for everyday wear.", images: ["https://placehold.co/600x600/FFB805/000000?text=TShirt"], category_id: 2, stock: 100 },
  { id: 3, slug: "smart-led-bulb", title: "Smart LED Bulb", price: 1299, description: "WiFi-enabled smart bulb with app control and 16 million colors.", images: ["https://placehold.co/600x600/16A34A/FFFFFF?text=Bulb"], category_id: 3, stock: 75 },
  { id: 4, slug: "organic-face-cream", title: "Organic Face Cream", price: 549, description: "Natural ingredients for glowing, healthy skin.", images: ["https://placehold.co/600x600/EC1713/FFFFFF?text=Cream"], category_id: 4, stock: 200 },
  { id: 5, slug: "yoga-mat-premium", title: "Premium Yoga Mat", price: 1899, description: "Non-slip, eco-friendly yoga mat with carrying strap.", images: ["https://placehold.co/600x600/FFB805/000000?text=Yoga"], category_id: 5, stock: 30 },
  { id: 6, slug: "bestseller-novel-set", title: "Bestseller Novel Set", price: 699, description: "Collection of top-rated novels — 5 books in one set.", images: ["https://placehold.co/600x600/16A34A/FFFFFF?text=Books"], category_id: 6, stock: 60 },
  { id: 7, slug: "kids-building-blocks", title: "Kids Building Blocks", price: 999, description: "Creative building blocks set for children ages 3+.", images: ["https://placehold.co/600x600/EC1713/FFFFFF?text=Toys"], category_id: 7, stock: 40 },
  { id: 8, slug: "organic-honey-jar", title: "Organic Honey Jar", price: 449, description: "Pure organic honey sourced from local farms.", images: ["https://placehold.co/600x600/FFB805/000000?text=Honey"], category_id: 8, stock: 150 },
];

export const GET: APIRoute = ({ params }) => {
  const product = sampleProducts.find(p => p.slug === params.slug);
  if (!product) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify(product), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
  });
};

export function getStaticPaths() {
  return sampleProducts.map(p => ({ params: { slug: p.slug } }));
}
