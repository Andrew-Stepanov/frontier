(function () {
  function init() {
    const burger = document.querySelector('.site-header__burger');
    const mobile = document.querySelector('.site-header__mobile');
    if (!burger || !mobile) return;

    burger.addEventListener('click', () => {
      const open = mobile.classList.toggle('site-header__mobile_open');
      burger.setAttribute('aria-expanded', String(open));
    });
    mobile.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        mobile.classList.remove('site-header__mobile_open');
        burger.setAttribute('aria-expanded', 'false');
      }),
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
