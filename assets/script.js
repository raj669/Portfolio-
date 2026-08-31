// Mobile nav: tapping the ~$ prompt reveals the link list.
(function () {
  var toggle = document.querySelector('.mobile-nav-toggle');
  var nav = document.querySelector('.primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Case Studies dropdown: tap to open/close on touch, in addition to hover/focus on desktop.
  var caseItem = document.querySelector('.case-studies-item');
  if (caseItem) {
    var caseToggle = caseItem.querySelector('.nav-link');
    if (caseToggle) {
      caseToggle.addEventListener('click', function (e) {
        e.preventDefault();
        caseItem.classList.toggle('open');
      });
    }
  }
})();

// Hero terminal typing effect. Runs once on load, respects prefers-reduced-motion.
(function () {
  var el = document.getElementById('hero-output');
  if (!el) return;

  var passText = '109 passed';
  var failText = '4 failed';
  var skipText = '0 skipped';
  var full = passText + ', ' + failText + ', ' + skipText;

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function renderFinal() {
    el.innerHTML =
      '<span class="n-pass">' + passText + '</span>, ' +
      '<span class="n-fail">' + failText + '</span>, ' +
      skipText;
  }

  if (prefersReducedMotion) {
    renderFinal();
    return;
  }

  var i = 0;
  var caret = document.createElement('span');
  caret.className = 'hero-caret blinking';

  function typeNext() {
    if (i > full.length) {
      renderFinal();
      el.appendChild(caret);
      return;
    }

    var slice = full.slice(0, i);
    var passLen = passText.length;
    var passAndFailLen = passLen + 2 + failText.length;

    var html;
    if (slice.length <= passLen) {
      html = '<span class="n-pass">' + slice + '</span>';
    } else if (slice.length <= passAndFailLen) {
      html =
        '<span class="n-pass">' + passText + '</span>' +
        slice.slice(passLen, passAndFailLen).replace(
          failText,
          '<span class="n-fail">' + failText + '</span>'
        );
    } else {
      html =
        '<span class="n-pass">' + passText + '</span>, ' +
        '<span class="n-fail">' + failText + '</span>' +
        slice.slice(passAndFailLen);
    }

    el.innerHTML = html;
    el.appendChild(caret);
    i++;
    setTimeout(typeNext, 28);
  }

  typeNext();
})();
