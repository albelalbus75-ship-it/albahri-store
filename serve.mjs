import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = 'C:/Users/ADMINTECH/Desktop/ERP_Albahri/مبيعاتERB/itemsapp-site/dist';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.csv': 'text/csv; charset=utf-8' };

const srv = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = join(ROOT, p);
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('not found');
  }
});
if (globalThis.__srv8793) globalThis.__srv8793.close();
await new Promise(r => srv.listen(8793, '127.0.0.1', r));
globalThis.__srv8793 = srv;
nodeRepl.write('serving 8793');
