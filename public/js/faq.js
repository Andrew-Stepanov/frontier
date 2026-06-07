(function () {
  const PAIRS = {
    1: { closed: '[data-faq-id="1"][data-faq-state="closed"]', open: '[data-faq-id="1"][data-faq-state="open"]' },
    2: { closed: '[data-faq-id="2"][data-faq-state="closed"]', open: '[data-faq-id="2"][data-faq-state="open"]' },
  };

  function qs(sel) {
    return document.querySelector(sel);
  }

  function hide(sel) {
    const el = qs(sel);
    if (el) el.hidden = true;
  }

  function show(sel) {
    const el = qs(sel);
    if (el) el.hidden = false;
  }

  function resetAllToClosed() {
    Object.values(PAIRS).forEach((p) => {
      hide(p.open);
      show(p.closed);
    });
  }

  function openAcc(accId) {
    const p = PAIRS[accId];
    if (!p) return;
    resetAllToClosed();
    hide(p.closed);
    show(p.open);
  }

  function closeAcc(accId) {
    const p = PAIRS[accId];
    if (!p) return;
    hide(p.open);
    show(p.closed);
  }

  resetAllToClosed();

  document.addEventListener('click', (e) => {
    const closed = e.target.closest('[data-faq-state="closed"]');
    if (closed?.dataset.faqId) {
      openAcc(closed.dataset.faqId);
      return;
    }
    const open = e.target.closest('[data-faq-state="open"]');
    if (open?.dataset.faqId) {
      closeAcc(open.dataset.faqId);
    }
  });
})();
