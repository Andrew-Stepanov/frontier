/**
 * Масштабирование layout-canvas (upscale: window), аналог Tilda Zero Block.
 * Использует CSS zoom (как Tilda). visualViewport — для embedded preview (Cursor).
 */
(function () {
  function measureLayoutWidth() {
    const vv = window.visualViewport?.width ?? 0;
    const cw = document.documentElement.clientWidth;
    const cr = document.documentElement.getBoundingClientRect?.().width ?? 0;
    const candidates = [vv, cw, cr, window.innerWidth].filter((n) => n > 0);
    if (!candidates.length) return cw || 320;

    const min = Math.min(...candidates);
    const max = Math.max(...candidates);
    if (max - min > 80) return Math.round(min);
    return Math.round(vv || cw);
  }

  function activeScreen(screensAttr, viewportWidth) {
    const screens = screensAttr.split(',').map((s) => parseInt(s, 10));
    let active = screens[0];
    for (const s of screens) {
      if (viewportWidth >= s) active = s;
    }
    return active;
  }

  function designHeight(canvas, screen) {
    return (
      canvas.getAttribute(`data-canvas-height-res-${screen}`) ||
      canvas.getAttribute('data-canvas-height') ||
      '0'
    );
  }

  function scaleCanvases() {
    const vw = measureLayoutWidth();

    document.querySelectorAll('[data-canvas-screens]').forEach((canvas) => {
      const screens = canvas.getAttribute('data-canvas-screens');
      if (!screens) return;

      const screen = activeScreen(screens, vw);
      const h = parseInt(designHeight(canvas, screen), 10);
      if (!h) return;

      const factor = parseFloat((vw / screen).toFixed(3));
      const scaledH = Math.floor(h * factor);

      canvas.style.width = '100vw';
      canvas.style.maxWidth = '100%';
      canvas.style.height = `${scaledH}px`;

      const section = canvas.closest('section');
      if (section) section.style.setProperty('--zoom', String(factor));

      canvas.querySelectorAll(':scope > *').forEach((child) => {
        child.style.transform = '';
        child.style.transformOrigin = '';
        child.style.zoom = String(factor);
      });
    });
  }

  function bindResize() {
    scaleCanvases();
    window.addEventListener('resize', scaleCanvases);
    window.visualViewport?.addEventListener('resize', scaleCanvases);
    window.visualViewport?.addEventListener('scroll', scaleCanvases);
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(scaleCanvases).observe(document.documentElement);
    }
  }

  function init() {
    bindResize();
    document.documentElement.classList.add('canvas-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
