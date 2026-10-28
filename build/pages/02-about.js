const skills = [
  ['User Experience', 1], ['User Interface', 1], ['Service design', 0.8], ['Spatial design', 0.7], ['Business', 0.7],
  ['Design Thinking', 1], ['Design Strategy', 0.8], ['CI & Branding', 1], ['Editorial design', 1],
];

const education = [
  ['M.A. Integrated Design', 'Koln International School of Design'],
  ['B.A Architecture and Urbanism', 'University of Sao Paulo'],
  ['Design MBA', 'D.MBA'],
  ['Validating Strategies', 'Koln International School of Design'],
];

const jobs = [
  {
    logo: ['4bb554_7185947dd202458baa87c717b8f98ddd', 'nnamu logo', 204, 59],
    ly: 6, nx: 366, pg: 36,
    co: 'nnamu (2024 - 2024)', role: 'Fullstack Design Director',
    bullets: ['Design direction (UX/UI, Service, Branding, Communications)', 'Team management'],
    text: 'As Design Director at Nnamu, I was responsible for shaping the usability and visual quality of its digital products while fostering a user-centric design culture within the company. The fast-paced startup environment required balancing speed with quality, and despite the collaboration being shorter than initially planned, we made significant strides. Our work led to a new design system and a full revamp of Nnamu’s flagship product, Nnamu Negotiations, delivering major improvements in both experience and functionality.',
  },
  {
    logo: ['4bb554_a5290b03947842ff8dc51fb927e5ffd1', 'Accenture Song logo', 265, 33],
    ly: 28, nx: 402, pg: 36,
    co: 'Accenture Song (2020 - 2024)', role: 'Fullstack Design Lead/Manager',
    bullets: ['Design leadership (UX/UI, Service, Spatial, Business)', 'Team management', 'Stakeholder management'],
    text: 'As a Design Manager at Accenture Song, I worked with stakeholders to shape design strategies and led teams in bringing them to life. From research to execution, I guided the processes—running workshops, mapping user needs, and helping the team craft thoughtful, user-centered solutions.',
  },
  {
    logo: ['4bb554_72d155fc7230471cae0d10d45e5b0da6', 'Fjord logo', 185, 70],
    ly: -2, nx: 394, pg: 24,
    co: 'Fjord (2017 - 2020)', role: 'Fullstack Design Lead/Manager',
    bullets: ['Design leadership (UX/UI, Service, Spatial, Business)', 'Team management', 'Stakeholder management'],
    text: 'As a Design Manager at Fjord, I worked with stakeholders to shape design strategies and led teams in bringing them to life. From research to execution, I guided the processes—running workshops, mapping user needs, and helping the team craft thoughtful, user-centered solutions.',
  },
  {
    logo: ['4bb554_a124a10e613c45c2af695dda9eb11293', 'yellow Design logo', 109, 105],
    ly: -2, nx: 307, pg: 27,
    co: 'yellow Design (2015 - 2016)', role: 'Senior Graphic Designer',
    bullets: ['Design leadership and execution (Branding, Exhibition, UX/UI)'],
    text: 'At Yellow Design, I led UI, Exhibition, and Corporate Identity projects while shaping the studio’s communication execution. Attention to detail and freedom to explore were key, with highlights to Yellow Design’s exhibit at the Design Center in Stuttgart and a new interface system for Bruker Optics.',
  },
  {
    logo: ['4bb554_ade1c1fa6ae54f83aa1daae15025a950', 'Uniplan logo', 143, 143],
    ly: -26, nx: 406, pg: 67,
    co: 'Uniplan (2013 - 2014)', role: 'Graphic Designer',
    bullets: ['Graphic design leadership and execution (Branding, Editorial, Communication, Exhibition)'],
    text: 'At Uniplan, I designed immersive brand experiences for companies like BMW, Fraunhofer Institute, and Schneider Electric. From research to concept development, I crafted exhibits that blended spatial, visual, and sensorial design to fully engage visitors.',
  },
  {
    logo: ['4bb554_a8f4bc7b0d954071bec30ab12ff7c539', 'Estudio Guará logo', 163, 135],
    ly: -2, nx: 410, pg: 29,
    co: 'Estudio Guara (2006 - 2012)', role: 'Partner/Lead Designer',
    bullets: ['Graphic design leadership and execution (Branding, Editorial, Communication, Exhibition)'],
    text: 'I co-founded Estudio Guará, diving into classic graphic design to collaborate with small and big businesses and institutions. There I sharpened my eye for visual quality and strengthened my ability to collaborate with stakeholders.',
  },
];

module.exports = {
  slug: 'about',
  title: 'About | Herbert Heitmann',
  desc: "I'm Herbert Heitmann, and this is a good overview of my career in design. From classic Graphic Design to Fullstack Design Leadership, plus a master thesis in Design Theory, it's a lifelong journey.",
  ogImage: '4bb554_9978c98ebc06444f8a844df88a92d554',
  body: ({ img }) => `
<section class="about-hero">
  <div class="about-hero__photo">
    ${img('4bb554_9978c98ebc06444f8a844df88a92d554', 'Portrait of Herbert Heitmann', { w: 1005, h: 890, eager: true })}
  </div>
  <div class="about-hero__text">
    <h1 class="about-hero__lead"><span>Full-Stack Design Director, studio partner. Based in Berlin, Germany</span></h1>
    <div class="readmore about-hero__body" style="--lines:5">
      <p class="readmore__text">Working in consulting has allowed me to collaborate across industries, navigating different levels and areas of activity. Whether in B2B, B2C, or B2B2C environments, success comes from understanding multiple perspectives at once—ensuring solutions that engage all stakeholders effectively.<br>In recent years, I’ve been increasingly focused on Experience—what shapes it and drives it forward. Every industry has its own unique needs, and there’s no universal design formula that works everywhere. Instead, a strong design philosophy is key—one that gives purpose to methods and tools, guiding products and services through meaningful evolution.<br>Today, I lead design projects worldwide, managing teams of up to 10 designers across different levels and disciplines. Through workshops, user interviews, and Design Thinking activities, I help create new products, refine existing ones, and uncover hidden opportunities to enhance experiences and streamline processes.</p>
      <button class="readmore__btn" type="button">Read more</button>
    </div>
  </div>
</section>

<section class="about-dark">
  <div class="about-dark__grid">
    <div>
      <h2 class="label">Expertise</h2>
      <div class="skills">
${skills.map(([n, l]) => `        <div class="skill"><span class="skill__name">${n}</span><span class="skill__bar" style="--lvl:${l}" aria-hidden="true"></span></div>`).join('\n')}
      </div>
    </div>
    <div>
      <h2 class="label">Education</h2>
      <div class="edu">
${education.map(([d, s]) => `        <div class="edu__item"><p class="edu__degree">${d}</p><p class="edu__school">${s}</p></div>`).join('\n')}
      </div>
    </div>
  </div>
</section>

<section class="exp" aria-label="Relevant experience">
  <h2 class="exp__label">Relevant experience</h2>
${jobs.map((j, i) => `  <div class="exp__logo" style="--ly:${j.ly}px;grid-row:${i + 1}">${img(j.logo[0], j.logo[1], { w: j.logo[2], h: j.logo[3], style: `width:${j.logo[2]}px;height:${j.logo[3]}px` })}</div>
  <div class="exp__text" style="--nx:${j.nx}px;grid-row:${i + 1}">
    <p class="exp__co">${j.co}</p>
    <p class="exp__role">${j.role}</p>
    <ul class="exp__list">${j.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
    <div class="readmore readmore--sm exp__body" style="--lines:2;--pg:${j.pg}px">
      <p class="readmore__text">${j.text}</p>
      <button class="readmore__btn" type="button">Read more</button>
    </div>
  </div>`).join('\n')}
</section>

<section class="stats" aria-label="Career in numbers">
  <p class="label stats__label">Extra bit</p>
  <h2 class="stats__title">Career in numbers</h2>
  <div class="stats__row">
    <div><p class="stat__num">20+</p><p class="stat__txt">Years of experience</p></div>
    <div><p class="stat__num">100+</p><p class="stat__txt">Clients</p></div>
    <div><p class="stat__num">200+</p><p class="stat__txt">projects</p></div>
  </div>
</section>`,
};
