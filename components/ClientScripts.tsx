'use client';

import Script from 'next/script';
import { MobileMenuEnhancer } from './MobileMenuEnhancer';

/** Интерактив: canvas-scale, FAQ-аккордеон, мобильное меню (после гидрации) */
export function ClientScripts() {
  return (
    <>
      <Script src="/js/canvas-scale.js" strategy="afterInteractive" />
      <Script src="/js/faq.js" strategy="afterInteractive" />
      <MobileMenuEnhancer />
    </>
  );
}
