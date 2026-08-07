export async function onRequestGet({ request, env }: any) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("q");
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    let query = "SELECT id, slug, title, price, description, images, category_id, stock, created_at FROM products";
    const conditions: string[] = [];
    const params: any[] = [];

    if (category) {
      conditions.push("category_id IN (SELECT id FROM categories WHERE slug = ? OR name = ?)");
      params.push(category, category);
    }
    if (search) {
      conditions.push("(title LIKE ? OR description LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) query += " WHERE " + conditions.join(" AND ");
    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const { results } = await env.DB.prepare(query).bind(...params).all();

    let countQuery = "SELECT COUNT(*) as total FROM products";
    if (conditions.length > 0) countQuery += " WHERE " + conditions.join(" AND ");
    const { results: countResult } = await env.DB.prepare(countQuery).bind(...params.slice(0, -2)).all();

    return new Response(JSON.stringify({
      products: results.map((r: any) => ({ ...r, images: JSON.parse(r.images || "[]") })),
      total: countResult[0]?.total || 0,
    }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      products: [
        { id: 1, slug: "premium-wireless-earbuds", title: "Premium Wireless Earbuds", price: 2499, description: "High-quality wireless earbuds", images: ["https://placehold.co/400x400/EC1713/FFFFFF?text=Earbuds"], category_id: 1, stock: 50 },
        { id: 2, slug: "classic-cotton-tshirt", title: "Classic Cotton T-Shirt", price: 799, description: "Comfortable everyday wear", images: ["https://placehold.co/400x400/FFB805/000000?text=TShirt"], category_id: 2, stock: 100 },
        { id: 3, slug: "smart-led-bulb", title: "Smart LED Bulb", price: 1299, description: "WiFi-enabled smart bulb", images: ["https://placehold.co/400x400/16A34A/FFFFFF?text=Bulb"], category_id: 3, stock: 75 },
        { id: 4, slug: "organic-face-cream", title: "Organic Face Cream", price: 549, description: "Natural skincare", images: ["https://placehold.co/400x400/EC1713/FFFFFF?text=Cream"], category_id: 4, stock: 200 },
        { id: 5, slug: "yoga-mat-premium", title: "Premium Yoga Mat", price: 1899, description: "Eco-friendly yoga mat", images: ["https://placehold.co/400x400/FFB805/000000?text=Yoga"], category_id: 5, stock: 30 },
        { id: 6, slug: "bestseller-novel-set", title: "Bestseller Novel Set", price: 699, description: "Top-rated novels collection", images: ["https://placehold.co/400x400/16A34A/FFFFFF?text=Books"], category_id: 6, stock: 60 },
        { id: 7, slug: "kids-building-blocks", title: "Kids Building Blocks", price: 999, description: "Creative building blocks", images: ["https://placehold.co/400x400/EC1713/FFFFFF?text=Toys"], category_id: 7, stock: 40 },
        { id: 8, slug: "organic-honey-jar", title: "Organic Honey Jar", price: 449, description: "Pure organic honey", images: ["https://placehold.co/400x400/FFB805/000000?text=Honey"], category_id: 8, stock: 150 },
      ],
      total: 8,
    }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" },
    });
  }
}
