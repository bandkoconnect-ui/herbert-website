#!/usr/bin/env node
/* Generates the static pages. Run:  node build/build.js            (production links)
                                     node build/build.js --preview  (links end in index.html)
   You never need to run this to host the site: the generated .html files are committed. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PREVIEW = process.argv.includes('--preview');
const OUT = PREVIEW ? '/home/claude/pv/site' : ROOT;
const SITE_URL = 'https://www.herbertheitmann.com';
const NOW = new Date().toISOString().slice(0, 10);

const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
const DIMS = {};
const ORIG = {};
for (const m of manifest) {
  const k = m.id.replace('~mv2', '').replace(/\.(png|jpe?g)$/i, '');
  DIMS[k] = [m.w, m.h];
  ORIG[k] = [m.origW, m.origH];
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Helpers available to every page ---------------------------------------- */
function makeCtx(depth) {
  const root = depth < 0 ? '/' : depth === 0 ? './' : '../'.repeat(depth); // depth -1: root-relative links (used by the 404 page, which can be served from any address)
  const link = (slug) => {
    if (!slug) return PREVIEW ? root + 'index.html' : root;
    return PREVIEW ? `${root}${slug}/index.html` : `${root}${slug}/`;
  };
  const img = (id, alt = '', o = {}) => {
    const key = id.replace('~mv2', '').replace(/\.(png|jpe?g|webp)$/i, '');
    const d = DIMS[key];
    if (!d) throw new Error('Unknown image ' + id);
    const attrs = [`src="${root}img/${key}.webp"`, `alt="${esc(alt)}"`, `width="${o.w || d[0]}"`, `height="${o.h || d[1]}"`];
    if (o.eager) attrs.push('fetchpriority="high"'); else attrs.push('loading="lazy"');
    attrs.push('decoding="async"');
    if (o.cls) attrs.push(`class="${o.cls}"`);
    if (o.style) attrs.push(`style="${o.style}"`);
    return `<img ${attrs.join(' ')}>`;
  };
  const orig = (id) => ORIG[id.replace('~mv2', '').replace(/\.(png|jpe?g|webp)$/i, '')];
  return { root, link, img, esc, orig };
}

function layout({ depth, title, desc, slug, current, body, ogImage, bodyClass = '' }) {
  const { root, link } = makeCtx(depth);
  const nav = [['Work', ''], ['About', 'about'], ['Contact', 'contact']]
    .map(([label, s]) => `<a href="${link(s)}"${current === s ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ');
  const canonical = `${SITE_URL}/${slug ? slug + '/' : ''}`;
  const og = ogImage ? `${SITE_URL}/img/${ogImage}.webp` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${slug === '404' ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta property="og:site_name" content="Herbert Heitmann">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
${og ? `<meta property="og:image" content="${og}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="google-site-verification" content="asG0vf9U3V2-o3phbJrJk96p0Is9hBhPqNwr81gREio">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23000'/%3E%3Ctext x='16' y='23' font-family='Georgia,serif' font-size='21' text-anchor='middle' fill='%23fff'%3EH%3C/text%3E%3C/svg%3E">
<link rel="preload" href="${root}fonts/libre-baskerville-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${root}fonts/figtree-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${root}assets/css/site.css">
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
  <a class="brand" href="${link('')}" aria-label="Herbert Heitmann – home">
    <span class="brand__mark" aria-hidden="true">H</span>
    <span class="brand__name">Herbert Heitmann</span>
  </a>
  <nav class="site-nav" aria-label="Main">
      ${nav}
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <a class="site-footer__link" href="https://www.linkedin.com/in/herbert-heitmann-arraes-0512732/" target="_blank" rel="noopener">Linkedin</a>
  <p class="site-footer__copy">© 2025 by Herbert Heitmann</p>
</footer>
<script src="${root}assets/js/site.js" defer></script>
</body>
</html>
`;
}

function write(rel, html) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log('wrote', path.relative(ROOT, file));
}

/* Pages ------------------------------------------------------------------- */
const pages = fs.readdirSync(path.join(__dirname, 'pages')).filter((f) => f.endsWith('.js')).sort();
const slugs = [];
for (const f of pages) {
  const mod = require(path.join(__dirname, 'pages', f));
  const list = Array.isArray(mod) ? mod : [mod];
  for (const p of list) {
    slugs.push(p.slug || '');
    const depth = p.slug ? p.slug.split('/').length : 0;
    const ctx = makeCtx(depth);
    const body = p.body(ctx);
    write(p.slug ? `${p.slug}/index.html` : 'index.html', layout({
      depth, title: p.title, desc: p.desc, slug: p.slug || '', current: p.current ?? p.slug ?? '',
      body, ogImage: p.ogImage, bodyClass: p.bodyClass || ''
    }));
  }
}

if (!PREVIEW) {
  /* Files GitHub Pages and search engines expect */
  fs.writeFileSync(path.join(ROOT, '.nojekyll'), '');
  fs.writeFileSync(path.join(ROOT, 'CNAME'), 'www.herbertheitmann.com\n');
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${slugs.map((sl) => `  <url><loc>${SITE_URL}/${sl ? sl + '/' : ''}</loc><lastmod>${NOW}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  const nf = makeCtx(-1);
  write('404.html', layout({
    depth: -1, title: 'Page not found | Herbert Heitmann', desc: 'This page does not exist.', slug: '404', current: null, bodyClass: 'is-404',
    body: `<section class="notfound">\n  <h1>Page not found</h1>\n  <p>The page you are looking for does not exist or has moved.</p>\n  <p><a href="${nf.link('')}">Back to the portfolio</a></p>\n</section>`,
  }));
}
