/* Graphic Design: three galleries (Identity, Exhibition & fair, Editorial). Click a picture for the large view. */
const DESC = "I'm Herbert Heitmann, and this is a good overview of my career in design. From classic Graphic Design to Fullstack Design Leadership, plus a master thesis in Design Theory, it's a lifelong journey.";
const P = '4bb554_';

// [image id, title, description]
const SECTIONS = [
  { title: 'Identity', top: 37, gap: 52, items: [
    ['ff83000fd1904523ad9309bc1ebaf7b6', 'Esverdejar - Gardening solutions', 'Identity and stationary applications'],
    ['fb5b021b9ca740dcbfd1faedd5fde765', 'Inner - Engeneering', 'Identity and brand applications'],
    ['5601161da0254dc187bc5e0fe7537ff0', 'Ocean Drive - Real State', 'Identity and brand applications'],
    ['efd7c8e9c2d949558bee2cd004374ca1', 'Drop Bikes', 'Identity, store branding and brand applications'],
    ['9882829aacdb4b6fb6fbf6c9ebc9cafd', 'SPA Acqua', 'Identity and brand applications'],
    ['dd37ad6c98e948ed9a0086e8ced518b8', 'Melanchtonhaus', 'Identity study'],
    ['51d0d6aa7b8845d58b590a0013cf99af', 'Diamonds - Personal services', 'Identity and brand applications'],
  ] },
  { title: 'Exhibition & fair', top: 49, gap: 50, items: [
    ['dfbccaa9ccb34ad9aef423b793f48a3d', 'On a Journey - Yellow Design', 'Exhibit design and related communications materials'],
    ['73b99606a4e04ecb8cde7143f702104c', 'On a Journey - Yellow Design', 'Exhibit design and related communications materials'],
    ['6347d1226a6542aa822bb392c770ac14', 'Paralela - Biannual Sao Paulo Art Fair', 'Exhibit design and related communications materials'],
    ['341bfcdb23814f9787e543cc942c14f3', 'Astronomy Institute of Sao Paulo', 'Exhibit design'],
    ['33bf33283cb049bc8a3f1feb0f328c2a', 'Fraunhoffer Institute', 'Fair design'],
    ['bece7042d3174bd6b148cce5d5b246ce', 'Schneider Electric', 'Fair design concept'],
    ['de2050ae8bed427c93866d1f5168e34d', '3A Composits', 'Fair design concept'],
    ['42ae323d873446c1a0c3c42200300205', 'BMW Active Tour', 'Fair design concept'],
  ] },
  { title: 'Editorial', top: 44, gap: 51, items: [
    ['70313c83681e4540bec9d572ef619f4a', 'One of Three - Art exhibition', 'Exhibit book'],
    ['087ba40fc02b474b80888c3bc82055cb', 'My Memories of Africa', 'Book design'],
    ['e4c5a467231e4847b95c1b475fdaa942', 'Competir - Sports Business Magazine', 'Magazine design'],
  ] },
];

const ARROW = (dir) => `<button class="slider__btn slider__btn--${dir}" type="button" aria-label="${dir === 'prev' ? 'Previous item' : 'Next item'}"${dir === 'prev' ? ' hidden' : ''}><svg viewBox="0 0 23 39" width="23" height="39" aria-hidden="true"><path d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"/></svg></button>`;

module.exports = {
  slug: 'graphic-design',
  current: null,
  title: 'Graphic Design | Herbert Heitmann',
  desc: DESC,
  ogImage: P + '9882829aacdb4b6fb6fbf6c9ebc9cafd',
  body: ({ img, esc, root }) => {
    const sections = SECTIONS.map((s) => {
      const slides = s.items.map(([id, title, desc]) => `
        <figure class="slide gitem" data-title="${esc(title)}" data-desc="${esc(desc)}" data-full="${root}img/${P}${id}.webp">
          <button class="gitem__img" type="button" aria-label="Open large view: ${esc(title)}">${img(P + id, title, { w: 743, h: 418 })}</button>
          <figcaption><strong class="gitem__t">${esc(title)}</strong><span class="gitem__d">${esc(desc)}</span></figcaption>
        </figure>`).join('');
      return `
<section class="gd" style="--pt:${s.top}px;--gap:${s.gap}px" aria-labelledby="gd-${s.title.replace(/\W+/g, '').toLowerCase()}">
  <h2 class="gd__title" id="gd-${s.title.replace(/\W+/g, '').toLowerCase()}">${esc(s.title)}</h2>
  <div class="gd-win" data-slider data-strip="clamp" data-lightbox role="region" aria-roledescription="carousel" aria-label="${esc(s.title)}">
    <div class="slider__track" style="gap:36px">${slides}
    </div>
    ${ARROW('prev')}${ARROW('next')}
  </div>
</section>`;
    }).join('');
    return `
<section class="fs-head fs-head--gd">
  <h1>Graphic Design</h1>
  <p class="fs-head__wide"><span>Collection of graphic design work done for Identity, Exhibition, and Editorial projects</span></p>
</section>${sections}`;
  },
};
