module.exports = {
  slug: '',
  current: '',
  title: 'Herbert Heitmann | Full-stack design director',
  desc: "I'm Herbert Heitmann, and this is a good overview of my career in design. From classic Graphic Design to Fullstack Design Leadership, plus a master thesis in Design Theory, it's a lifelong journey.",
  ogImage: '4bb554_9978c98ebc06444f8a844df88a92d554',
  body: ({ img, link }) => {
    const brands = [
      // [image id, alt, caption, width, height, vertical centre inside the 220px strip, logo x-offset, caption x-offset] (offsets nudge each item off its equal column, as on the original)
      ['4bb554_9bacdf6f29ae4042bd60bb2700ab7346', 'Estudio Guará logo', 'Studio Partner', 138, 122, 101, -5.5, -17.5],
      ['4bb554_372a88147bcb44e08fbbf2bdd1e185e5', 'Fjord logo', 'Lead Designer', 138, 147, 110, -16.5, -16.5],
      ['4bb554_a764441455844c55a1b0435b02a9564c', 'Accenture logo', 'Design Manager', 161, 42, 97, -12.5, -11.5],
      ['4bb554_a40ea522ca694fbfa69a9654c4b02d8d', 'DEPT logo', 'DX Director', 148, 154, 96, -8.5, -8],
      ['4bb554_6e2d24faf0dd4b58acba1f1531df29ac', 'nnamu logo', 'Design Director', 148, 24, 106, -11.5, -13.5],
    ].map(([id, alt, cap, w, h, cy, ix, tx]) => `
      <div class="brand-item" style="--ix:${ix}px;--tx:${tx}px">
        ${img(id, alt, { w, h, style: `width:${w}px;height:${h}px;--cy:${cy}px` })}
        <span>${cap}</span>
      </div>`).join('');

    const cards = [
      ['full-stack-design', '4bb554_2fd20f116815481ea54975ab1a288673', 'Fullstack Product Design', 'UX/UI and Service Design projects<br>(Password-protected)', ''],
      ['graphic-design', '4bb554_9882829aacdb4b6fb6fbf6c9ebc9cafd', 'Graphic Design', 'Branding, Exhibits, and Editorial Design projects', ''],
      ['academic-work', '4bb554_a72243e65dca44c4bc6c73d34a5e6048', 'Academic work', 'Thoughts on design, its processes and meanings', ''],
      ['in-the-spotlight', '4bb554_0aca17be1d5a47baa5d1e7d10c1bbf8b', 'In the spotlight', 'Interview with Infopulse about Service and Business design, and AI', 'object-position:49% 25%'],
    ].map(([slug, id, title, desc, pos]) => `
    <a class="card" href="${link(slug)}">
      <div class="card__img">${img(id, '', { w: 569, h: 426, style: pos })}</div>
      <div class="card__info">
        <h2 class="card__title">${title}</h2>
        <p class="card__desc">${desc}</p>
      </div>
    </a>`).join('');

    return `
<section class="hero">
  <div class="hero__inner">
    ${img('4bb554_9978c98ebc06444f8a844df88a92d554', 'Portrait of Herbert Heitmann', { w: 746, h: 737, eager: true, cls: 'hero__photo' })}
    <h1 class="hero__title">Hi there!</h1>
    <p class="hero__intro"><span>I’m Herbert Heitmann, fullstack design director with a broad range of interests. Curiosity drives me to explore diverse design challenges, where I gather the experience to tackle complex projects and lead across multiple design streams.</span></p>
  </div>
</section>

<section class="brands" aria-label="Where I have worked">
  <div class="brands__inner">${brands}
  </div>
</section>

<section class="work-grid" aria-label="Work">${cards}
</section>`;
  },
};
