(function () {
  'use strict';

  var completionEl = document.querySelector('.ticker-completion');
  var tickerEl     = document.querySelector('.ticker');
  var heroEl       = document.querySelector('.hero');

  if (!completionEl || !tickerEl || !heroEl) return;

  var frames = [
    ' a technical Google Ads contractor for £3-10M DTC ecommerce brands',
    ' fixing feeds and account structure, not just tweaking bids and budgets',
    ' usually called in when an account has plateaued'
  ];

  // Honour prefers-reduced-motion: frame 0 already in HTML, no animation needed
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Lock the ticker's height to the tallest frame so the page doesn't
  // reflow (jump) as shorter frames cycle in.
  (function lockHeight() {
    var max = 0;
    frames.forEach(function (frame) {
      completionEl.textContent = frame;
      var h = tickerEl.offsetHeight;
      if (h > max) max = h;
    });
    completionEl.textContent = frames[0]; // restore frame 0
    tickerEl.style.minHeight = max + 'px';
  }());

  var current      = 0;
  var transitioning = false;
  var intervalId   = null;

  function advance() {
    if (transitioning) return;
    transitioning = true;

    // Fade out over 300 ms, swap text at the midpoint (150 ms)
    completionEl.classList.add('fading');

    setTimeout(function () {
      current = (current + 1) % frames.length;
      completionEl.textContent = frames[current];
    }, 150);

    setTimeout(function () {
      completionEl.classList.remove('fading');
      transitioning = false;
    }, 300);
  }

  function startCycle() {
    if (intervalId) return;
    intervalId = setInterval(advance, 4500);
  }

  function stopCycle() {
    clearInterval(intervalId);
    intervalId = null;
  }

  startCycle();

  heroEl.addEventListener('mouseenter', stopCycle);
  heroEl.addEventListener('mouseleave', startCycle);

}());
