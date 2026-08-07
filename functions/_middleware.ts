export async function onRequest({ next }: any) {
  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("X-Powered-By", "Redwan Mart Cloudflare Workers");
  return new Response(response.body, { status: response.status, headers });
}
