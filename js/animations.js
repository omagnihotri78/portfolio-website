/* Drop-in animations for omagnihotri78.github.io/portfolio-website
   Add before </body> in index.html:  <script src="animations.js" defer></script>
   Your existing HTML and CSS stay untouched. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var css = document.createElement('style');
  css.textContent =
    '.an-hide{opacity:0;transform:translateY(28px)}' +
    '.an-left{transform:translateX(-36px)}.an-right{transform:translateX(36px)}' +
    '.an-in{opacity:1!important;transform:none!important;transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}' +
    '.an-lift{transition:transform .25s ease,box-shadow .25s ease}' +
    '.an-lift:hover{transform:translateY(-8px)!important;box-shadow:0 14px 28px rgba(0,0,0,.25)}' +
    '#an-bar{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,#00c6ff,#7b5cff);z-index:9999}' +
    '.an-caret::after{content:"|";margin-left:2px;animation:an-blink .8s steps(1) infinite}' +
    '@keyframes an-blink{50%{opacity:0}}' +
    '@keyframes an-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}' +
    '.an-float{animation:an-float 4s ease-in-out infinite}';
  document.head.appendChild(css);

  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* Scroll progress bar */
  var bar = document.createElement('div'); bar.id = 'an-bar'; document.body.appendChild(bar);
  addEventListener('scroll', function () {
    var h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });

  /* Hero: typing effect on the title line, staggered entrance for the rest */
  var home = document.querySelector('#home');

if (home) {

    /* Hero: typing + deleting effect */
    var title = document.querySelector('#swap');

    if (title) {

        var words = [
            "Computer Science Engineer",
            "Java Engineer",
            "Data Analyst"
        ];

        var wordIndex = 0;
        var charIndex = 0;
        var deleting = false;

        title.classList.add('an-caret');

        function typeEffect() {

            var currentWord = words[wordIndex];

            if (!deleting) {

                title.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentWord.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }

                setTimeout(typeEffect, 80);

            } else {

                title.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;
                    wordIndex++;

                    if (wordIndex >= words.length) {
                        wordIndex = 0;
                    }

                    setTimeout(typeEffect, 400);
                    return;
                }

                setTimeout(typeEffect, 50);
            }
        }

        typeEffect();
    }


    /* Staggered entrance for the rest */
    $all('h1, p, a, img', home).forEach(function (el, k) {

        el.classList.add('an-hide');

        setTimeout(function () {
            el.classList.add('an-in');
        }, 150 + k * 120);

    });

    var hero = $all('img', home).pop();

    if (hero)
        setTimeout(function () {
            hero.classList.add('an-float');
        }, 1400);
}

  /* Scroll reveal for every other section */
  var targets = [];
  $all('section:not(#home)').forEach(function (sec) {
    $all('h2, h3, p, img, [class*="card"], [class*="project"], [class*="skill"], [class*="cert"], [class*="item"], [class*="box"], li', sec)
      .forEach(function (el, k) {
        if (el.closest('nav')) return;
        el.classList.add('an-hide');
        el.style.transitionDelay = Math.min(k % 6, 5) * 80 + 'ms';
        if (/card|project|skill|cert|box/.test(el.className)) el.classList.add('an-lift');
        targets.push(el);
      });
  });
  var io = 'IntersectionObserver' in window && new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('an-in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  targets.forEach(function (el) { io ? io.observe(el) : el.classList.add('an-in'); });

  /* Count-up for stats like 8+, 5+, 100% */
  $all('h3, h2, span, strong').forEach(function (el) {
    var m = el.children.length === 0 && el.textContent.trim().match(/^(\d+)([+%]?)$/);
    if (!m) return;
    var end = +m[1], suf = m[2], done = false; el.textContent = '0' + suf;
    var so = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting || done) return; done = true;
      var t0 = performance.now();
      (function tick(t) {
        var p = Math.min((t - t0) / 1400, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: 0.6 });
    so.observe(el);
  });
})();