export async function onRequestGet({ env }: any) {
  try {
    const { results } = await env.DB.prepare(
      "SELECT id, slug, name, parent_id FROM categories ORDER BY name"
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
    });
  } catch {
    return new Response(JSON.stringify([
      { id: 1, slug: "electronics", name: "Electronics", parent_id: null },
      { id: 2, slug: "fashion", name: "Fashion", parent_id: null },
      { id: 3, slug: "home-living", name: "Home & Living", parent_id: null },
      { id: 4, slug: "beauty", name: "Beauty", parent_id: null },
      { id: 5, slug: "sports", name: "Sports", parent_id: null },
      { id: 6, slug: "books", name: "Books", parent_id: null },
      { id: 7, slug: "toys", name: "Toys", parent_id: null },
      { id: 8, slug: "food", name: "Food", parent_id: null },
    ]), {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
    });
  }
}
