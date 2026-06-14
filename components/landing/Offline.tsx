import { CanvasImg } from './CanvasImg';
import { OFFLINE_CANVAS } from './canvasPresets';
import { ScaledCanvas } from './ScaledCanvas';

export function Offline() {
  return (
    <section className="offline landing__section" id="club-offline">
      <ScaledCanvas
        canvasClassName="offline__canvas"
        desktopH={OFFLINE_CANVAS.desktopH}
        mobileH={OFFLINE_CANVAS.mobileH}
      >
        <p className="offline__text">
          Офлайн
          <br />
          -встречи
          <br />
          <span className="offline__accent">живое общение и крепкие связи</span>
        </p>
        <CanvasImg
          className="offline__image"
          src="/assets/optim_tildacdn_com/image_20240821.png_26bfb7f6e39e.webp"
          alt=""
          width={146}
          height={146}
        />
        <CanvasImg
          className="offline__image-2"
          src="/assets/optim_tildacdn_com/Group_1321316021_1.png_57e7f6a10668.webp"
          alt="Офлайн-встречи клуба Frontier"
          width={713}
          height={400}
        />
        <CanvasImg
          className="offline__icon offline__icon--1"
          src="/assets/optim_tildacdn_com/photo.png_271a7d89d136.webp"
          alt=""
          width={56}
          height={56}
        />
        <p className="offline__caption offline__caption--1">
          Ретриты в горах Гудаури, выезды в Португалию, ужины в мировых столицах
        </p>
        <CanvasImg
          className="offline__icon offline__icon--2"
          src="/assets/optim_tildacdn_com/photo.png_271a7d89d136.webp"
          alt=""
          width={56}
          height={56}
        />
        <p className="offline__caption offline__caption--2">
          Только свои, никакого спама и случайных людей
        </p>
        <CanvasImg
          className="offline__icon offline__icon--3"
          src="/assets/optim_tildacdn_com/photo.png_271a7d89d136.webp"
          alt=""
          width={56}
          height={56}
        />
        <p className="offline__caption offline__caption--3">
          Мы строим доверие через совместные выезды
        </p>
      </ScaledCanvas>
    </section>
  );
}
