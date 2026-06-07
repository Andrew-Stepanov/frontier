'use client';

import { useEffect } from 'react';

/** Мобильное меню: открытие, затемнение фона, блокировка скролла */
export function MobileMenuEnhancer() {
  useEffect(() => {
    const header = document.querySelector('.site-header');
    const burger = document.querySelector('.site-header__burger');
    const mobile = document.querySelector('.site-header__mobile');
    if (!header || !burger || !mobile) return;

    let backdrop = document.querySelector('.site-header__backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'site-header__backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }

    const inner = header.querySelector('.site-header__inner');
    const links = mobile.querySelectorAll('a');

    const syncHeaderHeight = () => {
      const h = inner?.getBoundingClientRect().height;
      if (h && header instanceof HTMLElement) {
        header.style.setProperty('--site-header-height', `${Math.round(h)}px`);
      }
    };

    const close = () => {
      mobile.classList.remove('site-header__mobile_open');
      backdrop!.classList.remove('site-header__backdrop_visible');
      header.classList.remove('site-header--menu-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      document.body.classList.remove('site-header-menu-open');
    };

    const open = () => {
      syncHeaderHeight();
      mobile.classList.add('site-header__mobile_open');
      backdrop!.classList.add('site-header__backdrop_visible');
      header.classList.add('site-header--menu-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Закрыть меню');
      document.body.classList.add('site-header-menu-open');
    };

    const onBurgerClick = () => {
      if (mobile.classList.contains('site-header__mobile_open')) close();
      else open();
    };

    const onBackdropClick = () => close();
    const onLinkClick = () => close();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    const onResize = () => {
      if (mobile.classList.contains('site-header__mobile_open')) syncHeaderHeight();
    };

    burger.addEventListener('click', onBurgerClick);
    backdrop.addEventListener('click', onBackdropClick);
    links.forEach((a) => a.addEventListener('click', onLinkClick));
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    syncHeaderHeight();

    return () => {
      burger.removeEventListener('click', onBurgerClick);
      backdrop!.removeEventListener('click', onBackdropClick);
      links.forEach((a) => a.removeEventListener('click', onLinkClick));
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      close();
    };
  }, []);

  return null;
}
