#!/usr/bin/env node
// Build-time audit: fail if forbidden WhatsApp hosts appear in UI source or built output.
// Allowed host: wa.me (deep-link only). Forbidden: web.whatsapp.com, api.whatsapp.com.
import { readFileSync, statSync, readdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const FORBIDDEN = [/web\.whatsapp\.com/gi, /api\.whatsapp\.com/gi];
const SCAN_DIRS = ["src", "index.html", "public", "dist"].filter((p) => existsSync(p));
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".html", ".css", ".json", ".md", ".mjs", ".cjs"]);
const SKIP_DIRS = new Set(["node_modules", ".git", "dist-ssr"]);
const SELF = "scripts/audit-whatsapp.mjs";

const violations = [];

function walk(path) {
  const st = statSync(path);
  if (st.isDirectory()) {
    if (SKIP_DIRS.has(path.split("/").pop())) return;
    for (const entry of readdirSync(path)) walk(join(path, entry));
    return;
  }
  if (path === SELF) return;
  const ext = extname(path);
  if (ext && !EXTS.has(ext)) return;
  const text = readFileSync(path, "utf8");
  for (const rx of FORBIDDEN) {
    rx.lastIndex = 0;
    let m;
    while ((m = rx.exec(text))) {
      const line = text.slice(0, m.index).split("\n").length;
      violations.push(`${path}:${line}  ${m[0]}`);
    }
  }
}

for (const p of SCAN_DIRS) walk(p);

if (violations.length) {
  console.error("\n[audit-whatsapp] Forbidden WhatsApp host(s) detected:\n");
  for (const v of violations) console.error("  " + v);
  console.error(`\n${violations.length} violation(s). Use https://wa.me/<number> only.\n`);
  process.exit(1);
}

console.log("[audit-whatsapp] OK — no forbidden WhatsApp hosts found.");