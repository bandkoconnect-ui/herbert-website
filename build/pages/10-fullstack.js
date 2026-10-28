/* Fullstack Product Design: a heading and a grid of six project cards */
const DESC = "I'm Herbert Heitmann, and this is a good overview of my career in design. From classic Graphic Design to Fullstack Design Leadership, plus a master thesis in Design Theory, it's a lifelong journey.";

// [page slug, image id, title, description, image focal point]
const CARDS = [
  ['ux-nnamu', '4bb554_f48f41e178994876bb3c190a7d14b9f2', 'nnamu Negotiations', 'Procurement negotiation powered by Game Theory and AI', ''],
  ['ux-aot', '4bb554_d4f5497dc2ed48d3945cabb5b372f937', 'Accenture Operations Twin', 'The most advanced digital twin platform to manage entire production facilities', ''],
  ['ux-swup', '4bb554_bf0ed7ab1fba4d2b9011515d9450f3c5', 'SWUP', 'An app to reduce consumerism and promote a healthy financial mindset', 'object-position:48% 47%'],
  ['ux-change-management', '4bb554_3369d1a01c454350aa9cb47fe4072725', 'Accenture Change Management', 'Keeping pace with business through conversational AI assistants', ''],
  ['ux-uniqlo', '4bb554_cb0c13a6cdaf4e45b79d7a6bc3dcbf18', 'Uniqlo Flagship Experience', 'Combining digital + physical designs to drive incredible growth', ''],
  ['ux-db', '4bb554_fe7ae37ddba0440bb8292de5627be14f', 'Deutsche Bank - Online account opening', 'Digitalizing the onboarding experience for massive B2B service', ''],
];

module.exports = {
  slug: 'full-stack-design',
  current: null,
  title: 'Fullstack Design | Herbert Heitmann',
  desc: DESC,
  ogImage: '4bb554_f48f41e178994876bb3c190a7d14b9f2',
  body: ({ img, link, esc }) => {
    const card = ([slug, id, title, desc, pos], i) => {
      const wide = i >= 4; // the last row is a little larger
      return `
      <a class="card${wide ? ' card--wide' : ''}" href="${link(slug)}">
        <div class="card__img">${img(id, '', { w: wide ? 606 : 569, h: wide ? 454 : 426, style: pos })}</div>
        <div class="card__info">
          <h2 class="card__title">${esc(title)}</h2>
          <p class="card__desc">${esc(desc)}</p>
        </div>
      </a>`;
    };
    const rows = [0, 2, 4].map((n) => `
    <div class="fs-row">${CARDS.slice(n, n + 2).map((c, k) => card(c, n + k)).join('')}
    </div>`).join('');
    return `
<section class="fs-head">
  <h1>Fullstack Product Design</h1>
  <p><span>Collection of fullstack design projects, integrating UX/UI, Service and Business design processes and solutions.</span></p>
</section>
<section class="fs-grid" aria-label="Fullstack design projects">${rows}
</section>`;
  },
};
