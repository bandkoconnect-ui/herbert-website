'use strict';
/* Renders a "case study" page from measured data (build/data/<slug>.json).
   Each section is a fixed-height canvas on desktop (items are placed exactly as
   on the original site, measured from the page centre) and a simple vertical
   stack on tablets and phones. */

const CENTER = (W) => W / 2;

function textHtml(b) {
  const [tag, cls, color, content, align] = b;
  const style = [color ? `color:${color}` : '', align ? `text-align:${align}` : ''].filter(Boolean).join(';');
  const st = style ? ` style="${style}"` : '';
  const strip = (s) => s.replace(/<br>\n?/g, '<br> ').replace(/\n/g, '').replace(/&nbsp;/g, '&#160;');
  if (tag === 'ul' || tag === 'ol') {
    return `<${tag} class="${cls}"${st}>${content.map((li) => `<li>${strip(li)}</li>`).join('')}</${tag}>`;
  }
  let t = tag;
  if (tag === 'h1' && cls !== 's40' && cls !== 's40n') t = 'p';
  else if (tag === 'h6') t = cls === 's24' ? 'h3' : 'p';
  else if (tag === 'h4') t = 'p';
  const c = tag === 'h6' && cls === 's14' ? `${cls} lbl` : cls;
  return `<${t} class="${c}"${st}>${strip(content) || '&#160;'}</${t}>`; // empty paragraphs keep their blank line
}

function render(data, { img, esc, backHref, root, orig }) {
  const W = data.W;
  const c = CENTER(W);
  const px = (n) => `${+n.toFixed(1)}px`;
  let z = 0;
  const secs = data.secs.filter((s) => s.items.length).map((s) => {
    const items = s.items.map((it, idx) => ({ it, idx }));
    // reading order for small screens: top to bottom, then left to right
    const key = (o) => (o.it.mo !== undefined ? o.it.mo : Math.round(o.it.r[1] / 30) * 10000 + o.it.r[0]); // "mo" in the data overrides the reading order
    const order = [...items].sort((a, b) => key(a) - key(b));
    const rank = new Map(order.map((o, i) => [o.idx, i + 1]));
    const html = items.map(({ it, idx }) => {
      const [x, y, w, h] = it.r;
      const dx = x - c;
      const zBase = { i: 0, v: 0, slider: 0, strip: 0, s: 100, t: 200, a: 300, svg: 300, f: 0 }[it.k] || 0; // text always sits above pictures
      const pos = [`--x:${px(dx)}`, `--y:${px(y)}`, `--w:${px(w)}`, `--h:${px(h)}`, `--z:${zBase + (++z % 100)}`, `--o:${rank.get(idx)}`];
      if (it.k === 't') {
        // sans-serif boxes are widened a little (the stand-in font is slightly wider); centred ones keep their width so they stay centred
        const sans = it.b.some((b) => b[1][0] === 'p' && b[4] !== 'center') ? ' it--sans' : '';
        return `<div class="it it--t${sans}" style="${pos.join(';')}">${it.b.map(textHtml).join('')}</div>`;
      }
      if (it.k === 'i') {
        const alt = it.alt && !/\.(png|jpe?g|webp)$/i.test(it.alt) ? it.alt : '';
        const ar = `--ar:${+(w / h).toFixed(4)}`;
        const o = orig(it.id);
        if (it.c && o) {
          // the original shows only part of the picture: reproduce that crop
          const [cx, cy, cw, ch] = it.c;
          const st = `width:${+(o[0] / cw * 100).toFixed(3)}%;left:${+(-cx / cw * 100).toFixed(3)}%;top:${+(-cy / ch * 100).toFixed(3)}%`;
          return `<div class="it it--i it--crop" style="${pos.join(';')};${ar}">${img(it.id, alt, { w: Math.round(w), h: Math.round(h), style: st })}</div>`;
        }
        const fx = it.fx ? ` it--${it.fx}` : '';
        const badge = it.badge ? `<span class="it__badge" style="left:${+((it.badge.r[0] - x) / w * 100).toFixed(3)}%;top:${+((it.badge.r[1] - y) / h * 100).toFixed(3)}%;width:${+(it.badge.r[2] / w * 100).toFixed(3)}%">${img(it.badge.id, '', { w: 147, h: 147 })}</span>` : '';
        const tag = it.href ? `a class="it it--i${fx}" href="${esc(it.href)}" target="_blank" rel="noopener"` : `div class="it it--i${fx}"`;
        return `<${tag} style="${pos.join(';')};${ar}">${img(it.id, alt, { w: Math.round(w), h: Math.round(h) })}${badge}</${it.href ? 'a' : 'div'}>`;
      }
      if (it.k === 'v') {
        const poster = it.poster ? ` poster="${esc(root + it.poster)}"` : '';
        const flags = [it.auto ? 'autoplay' : '', it.loop ? 'loop' : '', it.muted ? 'muted' : '', 'playsinline', it.auto ? '' : 'controls'].filter(Boolean).join(' ');
        return `<div class="it it--v" style="${pos.join(';')}"><video src="${esc(root + it.src)}"${poster} ${flags} preload="metadata"></video></div>`;
      }
      if (it.k === 'slider') {
        const arrow = (dir) => `<button class="slider__btn slider__btn--${dir}" type="button" aria-label="${dir === 'prev' ? 'Previous image' : 'Next image'}"><svg viewBox="0 0 23 39" width="23" height="39" aria-hidden="true"><path d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"/></svg></button>`;
        const slides = it.slides.map((s, n) => `<figure class="slide"${n ? ' aria-hidden="true"' : ''}>${img(s.id, s.alt || '', { w: s.w, h: s.h, style: `width:${s.w}px` })}</figure>`).join('');
        return `<div class="it it--slider" style="${pos.join(';')}" data-slider role="region" aria-roledescription="carousel" aria-label="Image gallery"><div class="slider__track">${slides}</div>${arrow('prev')}${arrow('next')}</div>`;
      }
      if (it.k === 'strip') {
        // a gallery whose pictures sit side by side at their own size inside a narrower window (loops endlessly)
        const arrow = (dir) => `<button class="slider__btn slider__btn--${dir}" type="button" aria-label="${dir === 'prev' ? 'Previous image' : 'Next image'}"${dir === 'prev' ? ' hidden' : ''}><svg viewBox="0 0 23 39" width="23" height="39" aria-hidden="true"><path d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"/></svg></button>`;
        const slides = it.slides.map((s, n) => `<figure class="slide"${n ? ' aria-hidden="true"' : ''}>${img(s.id, s.alt || '', { w: s.w, h: s.h, style: `width:${s.w}px` })}</figure>`).join('');
        return `<div class="it it--slider it--strip" style="${pos.join(';')}" data-slider data-strip="loop" role="region" aria-roledescription="carousel" aria-label="${esc(it.label || 'Image gallery')}"><div class="slider__track" style="gap:${it.gap}px">${slides}</div>${arrow('prev')}${arrow('next')}</div>`;
      }
      if (it.k === 'svg') {
        // a small vector badge that links somewhere
        return `<a class="it it--svg" href="${esc(it.href)}" target="_blank" rel="noopener" aria-label="${esc(it.label || '')}" style="${pos.join(';')}"><svg viewBox="${it.vb}" preserveAspectRatio="none" fill="${it.fill}" aria-hidden="true" focusable="false"><path d="${it.d}" fill-rule="evenodd"/></svg></a>`;
      }
      if (it.k === 's') {
        // horizontal rule: bleeds off whichever edge it started beyond
        const left = x < 0;
        const right = x + w > W;
        const st = left ? `left:0;width:calc(50% + ${px(x + w - c)})` : right ? `left:calc(50% + ${px(dx)});right:0` : `left:calc(50% + ${px(dx)});width:${px(w)}`;
        return `<span class="it it--hr" style="top:${px(y)};${st};--o:${rank.get(idx)}" aria-hidden="true"></span>`;
      }
      if (it.k === 'a') {
        return `<a class="it it--a" href="${esc(it.href || '#')}" style="${pos.join(';')}">${esc(it.t)}</a>`;
      }
      return '';
    }).join('\n    ');
    const bg = s.bg && s.bg !== 'rgba(0, 0, 0, 0)' ? `background:${s.bg};` : '';
    return `<section class="cs" style="--sh:${s.h}px;${bg}">\n    ${html}\n  </section>`;
  }).join('\n  ');
  const back = backHref ? `<div class="cs-back"><svg class="cs-back__icon" width="16" height="30" viewBox="0 0 16 30" aria-hidden="true"><path d="M15 1 1 15l14 14" fill="none" stroke="#000" stroke-width="1.1"/></svg><a href="${backHref}">Back</a></div>` : '';
  return `
${back}
<div class="cs-wrap">
  ${secs}
</div>`;
}

module.exports = { render };
