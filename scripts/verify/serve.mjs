// A static server that reproduces Vercel's `cleanUrls: true` and
// `trailingSlash: false`, which is what site/vercel.json asks for.
//
// This exists rather than `npx http-server` because the thing under test IS
// the routing. A server that resolves `/om-001` differently from production
// would verify a site nobody visits. The two rules are small enough to state:
// an extensionless path gets `.html` appended, and `/` is `index.html`.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.md': 'text/markdown; charset=utf-8',
};

export function serve(root, port) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    let p = decodeURIComponent(url.pathname);
    if (p.endsWith('/')) p = p.slice(0, -1);
    if (p === '') p = '/index';
    if (!extname(p)) p += '.html';
    try {
      const buf = await readFile(join(root, p));
      res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' });
      res.end(buf);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('404');
    }
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}
