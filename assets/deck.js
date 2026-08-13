/* ============================================================
   Claude Official Support — deck controller
   ============================================================ */
(function () {
  'use strict';

  var deck    = document.getElementById('deck');
  var slides  = Array.prototype.slice.call(deck.querySelectorAll('.slide'));
  var bar     = document.getElementById('bar');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var menuBtn = document.getElementById('menuBtn');
  var counter = document.getElementById('counter');
  var overlay = document.getElementById('overlay');
  var ovGrid  = document.getElementById('ovGrid');
  var themeBtn= document.getElementById('themeBtn');
  var total   = slides.length;
  var index   = 0;

  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ---------- stagger indices for reveal ---------- */
  slides.forEach(function (s) {
    Array.prototype.slice.call(s.querySelectorAll('.reveal')).forEach(function (el, i) {
      el.style.setProperty('--i', i);
    });
  });

  /* ---------- state ---------- */
  function setIndex(i, push) {
    i = Math.max(0, Math.min(total - 1, i));
    if (i === index && push !== 'force') { paint(); return; }
    index = i;
    paint();
    if (push !== false) {
      var id = slides[index].id;
      if (id && ('#' + id) !== location.hash) history.replaceState(null, '', '#' + id);
    }
  }

  function paint() {
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
    counter.innerHTML = '<span class="cur">' + pad(index + 1) + '</span>' +
                        '<span class="sep">/</span>' + pad(total);
    bar.style.width = (total < 2 ? 100 : (index / (total - 1)) * 100) + '%';
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;
    var items = ovGrid.querySelectorAll('.ov-item');
    for (var k = 0; k < items.length; k++) items[k].classList.toggle('cur', +items[k].dataset.i === index);
  }

  /* Programmatic navigation must not fight scroll snapping. With
     `scroll-snap-stop: always`, the browser halts a programmatic scroll at the
     very next snap point, so a jump of several slides would stop one slide in.
     So: turn snapping off for the duration, scroll, then restore it once the
     scroll has actually settled — and ignore scroll events while it runs, or
     the sync handler would rewrite `index` from a mid-flight position. */
  var navigating = false, navTimer;

  function endNav() {
    clearTimeout(navTimer);
    deck.style.scrollSnapType = '';
    navigating = false;
  }

  function go(i) {
    i = Math.max(0, Math.min(total - 1, i));
    var far = Math.abs(i - index) > 1;
    navigating = true;
    clearTimeout(navTimer);
    deck.style.scrollSnapType = 'none';
    deck.scrollTo({ left: i * deck.clientWidth, behavior: far ? 'auto' : 'smooth' });
    setIndex(i);
    // `scrollend` fires when the animation settles; the timer is the fallback
    // for browsers that don't support it (and for instant jumps that fire none).
    navTimer = setTimeout(endNav, far ? 90 : 600);
  }

  if ('onscrollend' in window) {
    deck.addEventListener('scrollend', function () { if (navigating) endNav(); });
  }

  /* ---------- scroll sync (user-driven scrolling only) ---------- */
  var tick;
  deck.addEventListener('scroll', function () {
    if (navigating) return;
    clearTimeout(tick);
    tick = setTimeout(function () {
      var i = Math.round(deck.scrollLeft / deck.clientWidth);
      if (i !== index) setIndex(i);
    }, 90);
  }, { passive: true });

  window.addEventListener('resize', function () {
    deck.scrollTo({ left: index * deck.clientWidth, behavior: 'auto' });
  });

  /* ---------- controls ---------- */
  prevBtn.addEventListener('click', function () { go(index - 1); });
  nextBtn.addEventListener('click', function () { go(index + 1); });
  menuBtn.addEventListener('click', function () { overlay.classList.toggle('open'); });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.classList.remove('open'); });

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA') return;
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': e.preventDefault(); go(index + 1); break;
      case ' ':          e.preventDefault(); go(index + (e.shiftKey ? -1 : 1)); break;
      case 'ArrowLeft':  case 'PageUp':   e.preventDefault(); go(index - 1); break;
      case 'Home':       e.preventDefault(); go(0); break;
      case 'End':        e.preventDefault(); go(total - 1); break;
      case 'Escape':     overlay.classList.remove('open'); break;
      case 'm': case 'M': overlay.classList.toggle('open'); break;
      case 't': case 'T': toggleTheme(); break;
    }
  });

  /* ---------- theme ---------- */
  function applyTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    try { localStorage.setItem('claude-deck-theme', mode); } catch (err) {}
    themeBtn.setAttribute('aria-label', mode === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด');
  }
  function toggleTheme() {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }
  themeBtn.addEventListener('click', toggleTheme);

  /* ---------- build menu ---------- */
  (function buildMenu() {
    var groups = [], cur = null;
    slides.forEach(function (s, i) {
      var g = s.dataset.group || 'ทั่วไป';
      if (!cur || cur.name !== g) { cur = { name: g, ch: s.dataset.chapter || '0', items: [] }; groups.push(cur); }
      cur.items.push({ i: i, label: s.dataset.nav || ('Slide ' + (i + 1)) });
    });
    var vars = ['--ink3', '--c1', '--c2', '--c3', '--c4', '--c5', '--c6', '--c7'];
    groups.forEach(function (g) {
      var sec = document.createElement('div');
      sec.className = 'ov-sec';
      sec.style.setProperty('--ch', 'var(' + (vars[+g.ch] || '--ink3') + ')');
      var h = document.createElement('h3');
      h.textContent = g.name;
      sec.appendChild(h);
      var list = document.createElement('div');
      list.className = 'ov-list';
      g.items.forEach(function (it) {
        var b = document.createElement('button');
        b.className = 'ov-item';
        b.dataset.i = it.i;
        b.innerHTML = '<i>' + pad(it.i + 1) + '</i><span></span>';
        b.querySelector('span').textContent = it.label;
        b.addEventListener('click', function () { overlay.classList.remove('open'); go(it.i); });
        list.appendChild(b);
      });
      sec.appendChild(list);
      ovGrid.appendChild(sec);
    });
  })();

  /* ---------- table scroll affordance ----------
     Wide tables scroll inside their own wrapper while the deck scrolls
     horizontally too, so the inner scroll needs to announce itself. */
  (function tableHints() {
    var wraps = Array.prototype.slice.call(document.querySelectorAll('.tblwrap'));
    wraps.forEach(function (w) {
      var hint = document.createElement('p');
      hint.className = 'scrollhint';
      hint.textContent = 'เลื่อนตารางในแนวนอนเพื่อดูคอลัมน์ที่เหลือ →';
      w.parentNode.insertBefore(hint, w.nextSibling);
      w.addEventListener('scroll', function () {
        if (w.scrollLeft > 8) hint.classList.add('used');
      }, { passive: true });
      w._hint = hint;
    });
    function sync() {
      wraps.forEach(function (w) {
        w._hint.classList.toggle('show', w.scrollWidth - w.clientWidth > 8);
      });
    }
    sync();
    window.addEventListener('resize', sync);
  })();

  /* ---------- boot ---------- */
  (function boot() {
    var saved;
    try { saved = localStorage.getItem('claude-deck-theme'); } catch (err) {}
    applyTheme(saved || (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

    var start = 0;
    if (location.hash) {
      var el = document.getElementById(location.hash.slice(1));
      if (el) start = slides.indexOf(el);
    }
    if (start < 0) start = 0;
    deck.scrollTo({ left: start * deck.clientWidth, behavior: 'auto' });
    setIndex(start, 'force');
    document.body.classList.add('ready');
  })();
})();
