import { CanvasImg } from './CanvasImg';
import { FORUM_CANVAS } from './canvasPresets';
import { ScaledCanvas } from './ScaledCanvas';

export function Forum() {
  return (
    <section className="forum landing__section" id="club-forum">
      <ScaledCanvas
        canvasClassName="forum__canvas"
        desktopH={FORUM_CANVAS.desktopH}
        mobileH={FORUM_CANVAS.mobileH}
      >
        <p className="forum__text">
          ФорУМ-группы
          <br />
          <span className="forum__accent">Личный совет директоров</span>
        </p>
        <CanvasImg
          className="forum__image"
          src="/assets/optim_tildacdn_com/Group_1321316021.png_3e7a2fb24780.webp"
          alt="Форум-группа Frontier"
          width={523}
          height={400}
        />
        <p className="forum__plus forum__plus--1">+</p>
        <p className="forum__bullet forum__bullet--1">
          Группа из 6–8 фаундеров схожей стадии и масштаба
        </p>
        <p className="forum__plus forum__plus--2">+</p>
        <p className="forum__bullet forum__bullet--2">
          Встречи раз в месяц с профессиональной модерацией
        </p>
        <p className="forum__plus forum__plus--3">+</p>
        <p className="forum__bullet forum__bullet--3">
          Обсуждаем то, о чем не говорят публично: реальные цифры, кадровые проблемы, потери и личные кризисы
        </p>
      </ScaledCanvas>
    </section>
  );
}
