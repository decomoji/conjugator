/**
 * public/ をそのまま配信する開発用サーバー。Node.js の標準モジュールだけで動く。
 *
 * `npm start` で起動し、http://localhost:1234 が開発用の URL になる。
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "../public");
const port = Number(process.env.PORT) || 1234;

/**
 * 拡張子と Content-Type の対応表
 * @type {Record<string, string>}
 */
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

/**
 * リクエストパスを public/ 配下の絶対パスに変換する（public/ の外は null）
 * @param {string} url
 * @returns {string | null}
 */
const resolvePath = (url) => {
  const { pathname } = new URL(url, "http://localhost");
  const decoded = decodeURIComponent(pathname);
  const relative = normalize(decoded.endsWith("/") ? `${decoded}index.html` : decoded);
  const path = join(rootDir, relative);

  return path === rootDir || path.startsWith(`${rootDir}${sep}`) ? path : null;
};

createServer(async (request, response) => {
  const path = resolvePath(request.url ?? "/");

  if (!path) {
    response.writeHead(403).end("403 Forbidden");
    return;
  }

  try {
    const file = await readFile(path);

    response.writeHead(200, {
      "Content-Type": contentTypes[extname(path)] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("404 Not Found");
  }
}).listen(port, () => {
  console.log(`http://localhost:${port}`);
});
