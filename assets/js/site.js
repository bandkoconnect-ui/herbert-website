/* Herbert Heitmann – small, dependency-free helpers */
(function () {
  'use strict';

  /* Home: slide the intro text in from the right once the page has loaded */
  var intro = document.querySelector('.hero__intro');
  if (intro) {
    var reveal = function () { window.setTimeout(function () { intro.classList.add('is-in'); }, 350); };
    if (document.readyState === 'complete') reveal();
    else window.addEventListener('load', reveal);
  }

  /* "Read more" / "Read less" toggles */
  document.querySelectorAll('.readmore').forEach(function (box) {
    var btn = box.querySelector('.readmore__btn');
    if (!btn) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = box.classList.toggle('is-open');
      btn.textContent = open ? 'Read less' : 'Read more';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* Image sliders (previous / next, swipe and arrow keys).
     - plain sliders show one full-width picture at a time and loop;
     - data-strip="loop": pictures keep their own size, the first sits at the left edge, then the
       active one is centred in the window, endlessly (Snow OS galleries);
     - data-strip="clamp": same idea but it stops at both ends (Graphic Design galleries). */
  document.querySelectorAll('[data-slider]').forEach(function (box) {
    var track = box.querySelector('.slider__track');
    var slides = [].slice.call(track.children);
    var mode = box.getAttribute('data-strip');           // null | 'loop' | 'clamp'
    var prev = box.querySelector('.slider__btn--prev');
    var next = box.querySelector('.slider__btn--next');
    var i = 0, startX = null, started = false;
    if (slides.length < 2) { [].forEach.call(box.querySelectorAll('.slider__btn'), function (b) { b.hidden = true; }); return; }
    function place() {
      if (mode === null) { track.style.transform = 'translateX(' + (-100 * i) + '%)'; return; }
      var s = slides[i];
      var off = started || mode === 'clamp' ? s.offsetLeft - (box.clientWidth - s.offsetWidth) / 2 : 0;
      if (mode === 'clamp') off = Math.max(0, Math.min(off, track.scrollWidth - box.clientWidth));
      track.style.transform = 'translateX(' + (-off) + 'px)';
    }
    function go(n) {
      if (mode === 'clamp') i = Math.max(0, Math.min(n, slides.length - 1));
      else i = (n + slides.length) % slides.length;
      started = true;
      if (mode === 'clamp') { prev.hidden = i === 0; next.hidden = i === slides.length - 1; }
      else if (prev) prev.hidden = false;
      place();
      if (mode !== 'clamp') slides.forEach(function (s, k) { s.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
    }
    box._go = go;
    prev.addEventListener('click', function () { go(i - 1); });
    next.addEventListener('click', function () { go(i + 1); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') go(i - 1); else if (e.key === 'ArrowRight') go(i + 1);
    });
    box.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    box.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX; startX = null;
      if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
    });
    box.addEventListener('pointercancel', function () { startX = null; });
    if (mode !== null) window.addEventListener('resize', place);
  });

  /* Large view for the Graphic Design galleries */
  var lbBoxes = document.querySelectorAll('[data-lightbox]');
  if (lbBoxes.length) {
    var ARROW = '<svg width="15" height="27" viewBox="0 0 15 27" aria-hidden="true"><path fill="currentColor" d="M.198 25.926l1.06 1.06 13.259-13.258L1.258.47.198 1.53l12.197 12.198z"/></svg>';
    var lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Gallery item, detailed view');
    lb.innerHTML =
      '<button class="lb__btn lb__expand" type="button" title="Open in fullscreen" aria-label="Open in fullscreen"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 1h7v7M19 1l-7.5 7.5M8 19H1v-7M1 19l7.5-7.5"/></svg></button>' +
      '<button class="lb__btn lb__close" type="button" aria-label="Close"><svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 2l18 18M20 2L2 20"/></svg></button>' +
      '<div class="lb__stage"><img class="lb__img" alt="">' +
      '<button class="lb__arrow lb__arrow--prev" type="button" aria-label="Previous item">' + ARROW + '</button>' +
      '<button class="lb__arrow lb__arrow--next" type="button" aria-label="Next item">' + ARROW + '</button></div>' +
      '<div class="lb__side"><h2 class="lb__title"></h2><p class="lb__desc"></p></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('.lb__img'), lbTitle = lb.querySelector('.lb__title'), lbDesc = lb.querySelector('.lb__desc');
    var lbPrev = lb.querySelector('.lb__arrow--prev'), lbNext = lb.querySelector('.lb__arrow--next');
    var items = [], cur = 0, opener = null, curBox = null;
    function show(n) {
      cur = Math.max(0, Math.min(n, items.length - 1));
      var f = items[cur];
      lbImg.src = f.getAttribute('data-full');
      lbImg.alt = f.getAttribute('data-title');
      lbTitle.textContent = f.getAttribute('data-title');
      lbDesc.textContent = f.getAttribute('data-desc');
      lbPrev.hidden = cur === 0;
      lbNext.hidden = cur === items.length - 1;
    }
    function open(box, n, from) {
      curBox = box; items = [].slice.call(box.querySelectorAll('.gitem')); opener = from;
      show(n);
      lb.classList.add('is-open'); document.body.classList.add('lb-open');
      lb.querySelector('.lb__close').focus();
    }
    function close() {
      lb.classList.remove('is-open'); document.body.classList.remove('lb-open');
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
      if (curBox && curBox._go) curBox._go(cur);      // the gallery behind follows what was last viewed
      if (opener) opener.focus();
    }
    [].forEach.call(lbBoxes, function (box) {
      [].forEach.call(box.querySelectorAll('.gitem'), function (f, n) {
        f.querySelector('.gitem__img').addEventListener('click', function (e) {
          if (box._moved) { box._moved = false; return; }
          open(box, n, e.currentTarget);
        });
      });
    });
    lb.querySelector('.lb__close').addEventListener('click', close);
    lbPrev.addEventListener('click', function () { show(cur - 1); });
    lbNext.addEventListener('click', function () { show(cur + 1); });
    lb.querySelector('.lb__expand').addEventListener('click', function () {
      try {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
      } catch (err) { /* not available */ }
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(cur + 1);
      else if (e.key === 'ArrowLeft') show(cur - 1);
    });
    var sx = null;
    lb.addEventListener('pointerdown', function (e) { sx = e.clientX; });
    lb.addEventListener('pointerup', function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 60) show(dx < 0 ? cur + 1 : cur - 1);
    });
  }

  /* Contact form.
     To receive messages, create a free form at https://formspree.io (or a similar
     service), then paste its endpoint URL below, e.g.
       var ENDPOINT = 'https://formspree.io/f/abcdwxyz';                         */
  var ENDPOINT = '';

  var form = document.querySelector('.contact-form');
  if (form) {
    var msg = form.querySelector('.contact-form__msg');
    var submit = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.className = 'contact-form__msg';
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!ENDPOINT) {
        msg.className = 'contact-form__msg is-error';
        msg.textContent = 'The contact form is not connected yet.';
        return;
      }
      submit.disabled = true;
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (r) {
        if (!r.ok) throw new Error('bad status');
        form.reset();
        msg.textContent = 'Thanks for submitting!';
      }).catch(function () {
        msg.className = 'contact-form__msg is-error';
        msg.textContent = 'Something went wrong. Please try again.';
      }).then(function () { submit.disabled = false; });
    });
  }
})();
