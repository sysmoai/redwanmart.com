const API_BASE = import.meta.env.PUBLIC_API_URL || "/api";

export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category_id: number;
  stock: number;
  created_at: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  parent_id: number | null;
}

export interface CartItem {
  productId: number;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: CartItem[];
  total: number;
}

export async function getProducts(params?: { page?: number; category?: string; search?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.category) searchParams.set("category", params.category);
  if (params?.search) searchParams.set("q", params.search);

  const res = await fetch(`${API_BASE}/products?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<{ products: Product[]; total: number }>;
}

export async function getProduct(slug: string) {
  const res = await fetch(`${API_BASE}/products/${slug}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json() as Promise<Product>;
}

export async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json() as Promise<Category[]>;
}

export async function createOrder(order: Order) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json() as Promise<{ id: number }>;
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("rm-cart") || "[]");
  } catch {
    return [];
  }
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((i) => i.productId === item.productId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem("rm-cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function removeFromCart(productId: number) {
  const cart = getCart().filter((i) => i.productId !== productId);
  localStorage.setItem("rm-cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function clearCart() {
  localStorage.removeItem("rm-cart");
  window.dispatchEvent(new Event("cart-updated"));
}

export function cartTotal(): number {
  return getCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function cartCount(): number {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}
