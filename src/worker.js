// AquaProfit Worker: serves static assets and a persistent, atomic visit counter.
// The display begins at 3,001 on the first counted visit.
export class VisitCounter {
  constructor(state, env) { this.state = state; }
  async fetch(request) {
    const method = request.method;
    const current = Number(await this.state.storage.get('visits') || 0);
    if (method === 'POST') {
      const next = current + 1;
      await this.state.storage.put('visits', next);
      return Response.json({ available: true, visits: next, display: 3000 + next }, { headers: { 'Cache-Control': 'no-store' } });
    }
    if (method === 'GET') {
      return Response.json({ available: true, visits: current, display: 3000 + current }, { headers: { 'Cache-Control': 'no-store' } });
    }
    return new Response('Method not allowed', { status: 405 });
  }
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/visits') {
      const id = env.VISIT_COUNTER.idFromName('aquaprofit-global-v1');
      return env.VISIT_COUNTER.get(id).fetch(request);
    }
    // Social crawlers must receive a public, directly fetchable PNG with the correct MIME type.
    if (url.pathname === '/og-website-brand.png') {
      const asset = await env.ASSETS.fetch(new Request(new URL('/og-website-brand.png', url.origin), request));
      if (!asset.ok) return asset;
      const headers = new Headers(asset.headers);
      headers.set('Content-Type', 'image/png');
      headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      headers.set('X-Content-Type-Options', 'nosniff');
      return new Response(asset.body, {status:asset.status,headers});
    }
    return env.ASSETS.fetch(request);
  }
};
