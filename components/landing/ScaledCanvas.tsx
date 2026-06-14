'use client';

import { useEffect, useState, type ReactNode } from 'react';

const ARTBOARD_DESKTOP = 1200;
const ARTBOARD_MOBILE = 320;
/** Как Tilda: desktop artboard от 1200px, ниже — mobile artboard 320px */
const MOBILE_LAYOUT_BREAKPOINT = 1200;

interface ScaledCanvasProps {
  children: ReactNode;
  canvasClassName: string;
  viewportClassName?: string;
  desktopW?: number;
  desktopH: number;
  mobileW?: number;
  mobileH: number;
}

function measureLayoutWidth() {
  if (typeof document === 'undefined') return ARTBOARD_DESKTOP;
  const cw = document.documentElement.clientWidth;
  if (cw > 0) return Math.round(cw);
  const vv = window.visualViewport?.width ?? 0;
  if (vv > 0) return Math.round(vv);
  return Math.round(window.innerWidth) || ARTBOARD_DESKTOP;
}

function resolveLayout(
  vw: number,
  desktopW: number,
  desktopH: number,
  mobileW: number,
  mobileH: number,
) {
  const useDesktop = vw >= MOBILE_LAYOUT_BREAKPOINT;
  const designW = useDesktop ? desktopW : mobileW;
  const designH = useDesktop ? desktopH : mobileH;
  const rawScale = vw / designW;
  // Desktop + mobile: заполняем ширину окна (upscale: window, как Tilda)
  const scale = rawScale;
  return {
    scale: Number.isFinite(scale) ? scale : 1,
    designW,
    designH,
    mode: useDesktop ? ('desktop' as const) : ('mobile' as const),
  };
}

/** Масштабируемый absolute-холст 1:1 с эталоном (без Tilda runtime). */
export function ScaledCanvas({
  children,
  canvasClassName,
  viewportClassName = '',
  desktopW = ARTBOARD_DESKTOP,
  desktopH,
  mobileW = ARTBOARD_MOBILE,
  mobileH,
}: ScaledCanvasProps) {
  const [layout, setLayout] = useState(() =>
    resolveLayout(ARTBOARD_DESKTOP, desktopW, desktopH, mobileW, mobileH),
  );

  useEffect(() => {
    const update = () => {
      const vw = measureLayoutWidth();
      setLayout(resolveLayout(vw, desktopW, desktopH, mobileW, mobileH));
    };

    update();
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, [desktopW, desktopH, mobileW, mobileH]);

  const scaledH = Math.max(0, Math.ceil(layout.designH * layout.scale));

  return (
    <div
      className={`zero-canvas__viewport ${viewportClassName}`.trim()}
      style={{ height: scaledH }}
    >
      <div
        className={`zero-canvas__canvas ${canvasClassName}`}
        data-design={layout.mode}
        style={{
          width: layout.designW,
          height: layout.designH,
          zoom: layout.scale,
        }}
      >
        {children}
      </div>
    </div>
  );
}
