export async function onRequestGet({ params, env }: any) {
  const { slug } = params;

  try {
    const { results } = await env.DB.prepare(
      "SELECT id, slug, title, price, description, images, category_id, stock, created_at FROM products WHERE slug = ?"
    ).bind(slug).all();

    if (results.length === 0) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const product = results[0];
    product.images = JSON.parse(product.images || "[]");

    return new Response(JSON.stringify(product), {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
