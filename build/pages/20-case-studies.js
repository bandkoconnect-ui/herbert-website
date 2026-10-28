const fs = require('fs');
const path = require('path');
const { render } = require('../lib/case');

const DESC = "I'm Herbert Heitmann, and this is a good overview of my career in design. From classic Graphic Design to Fullstack Design Leadership, plus a master thesis in Design Theory, it's a lifelong journey.";
const META = [
  ['ux-nnamu', 'UX-nnamu | Herbert Heitmann'],
  ['ux-aot', 'UX-AOT | Herbert Heitmann'],
  ['ux-swup', 'UX-Swup | Herbert Heitmann'],
  ['ux-change-management', 'UX-Change Management | Herbert Heitmann'],
  ['ux-uniqlo', 'UX-Uniqlo | Herbert Heitmann'],
  ['ux-db', 'UX - DB | Herbert Heitmann'],
  ['academic-work', 'Academic work | Herbert Heitmann', true], // third value: no "Back" link on this page
  ['in-the-spotlight', 'In the spotlight | Herbert Heitmann', true],
];

module.exports = META.filter(([slug]) => fs.existsSync(path.join(__dirname, '../data', slug + '.json'))).map(([slug, title, noBack]) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', slug + '.json'), 'utf8'));
  const cover = data.secs.flatMap((s) => s.items).find((i) => i.k === 'i');
  return {
    slug, title, desc: DESC, current: null, bodyClass: 'is-case',
    ogImage: cover && cover.id,
    body: (ctx) => render(data, { img: ctx.img, esc: ctx.esc, root: ctx.root, orig: ctx.orig, backHref: noBack ? '' : ctx.link('full-stack-design') }),
  };
});
