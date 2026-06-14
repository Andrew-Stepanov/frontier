import { CanvasImg } from './CanvasImg';
import { MARKET_CANVAS } from './canvasPresets';
import { ScaledCanvas } from './ScaledCanvas';

const ArrowDown = ({ id }: { id: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 168" aria-hidden="true">
    <defs>
      <marker id={id} markerWidth="5" markerHeight="8" viewBox="0 0 5 8" refX="3.2" refY="3.68" orient="auto-start-reverse" fill="#ffffff">
        <path d="M4.03557 4.03553C4.23077 3.84027 4.23077 3.52369 4.03557 3.32843L0.853575 0.146446C0.658275-0.0488154 0.341675-0.0488154 0.146475 0.146446C-0.048825 0.341708 -0.048825 0.658291 0.146475 0.85355L2.97487 3.68198L0.146475 6.51041C-0.048825 6.70567 -0.048825 7.02225 0.146475 7.21751C0.341675 7.41278 0.658275 7.41278 0.853575 7.21751L4.03557 4.03553Z" />
      </marker>
    </defs>
    <line stroke="#ffffff" strokeWidth="4" x1="15" y1="20" x2="14" y2="148" markerEnd={`url(#${id})`} />
  </svg>
);

export function Market() {
  return (
    <section className="market landing__section" id="market">
      <ScaledCanvas
        canvasClassName="market__canvas"
        desktopH={MARKET_CANVAS.desktopH}
        mobileH={MARKET_CANVAS.mobileH}
      >
        <div className="market__shape" aria-hidden="true" />
        <p className="market__text--2">ЛОКАЛЬНЫЙ РЫНОК</p>
        <p className="market__text--9">Игроки знакомы</p>
        <p className="market__text--3">Правила ясны</p>
        <p className="market__text--4">Ошибки терпимы</p>
        <CanvasImg
          className="market__image"
          src="/assets/optim_tildacdn_com/Frame_2087329392.png_6fddde42eadc.webp"
          alt=""
          width={367}
          height={367}
        />
        <div className="market__icon-2"><ArrowDown id="market-arrow-top" /></div>
        <p className="market__text">
          Выход на глобальный рынок это не апгрейд, это{' '}
          <span className="market__accent">турбулентность</span>
        </p>
        <CanvasImg
          className="market__image-2"
          src="/assets/optim_tildacdn_com/image_20240795.png_ec6f6af6c224.webp"
          alt=""
          width={297}
          height={297}
        />
        <p className="market__text--8">Хаос</p>
        <p className="market__text--6">Другие ставки</p>
        <p className="market__text--5">Сильные конкуренты</p>
        <p className="market__text--7">Другие скорости</p>
        <div className="market__icon"><ArrowDown id="market-arrow-bottom" /></div>
        <CanvasImg
          className="market__image-3"
          src="/assets/optim_tildacdn_com/Group_1321316019.png_33a7e564fc64.webp"
          alt=""
          width={512}
          height={512}
        />
        <p className="market__text--12">Выход на глобал — это дорого и одиноко</p>
        <p className="market__text_350-000-1-5">
          Основатель клуба Владимир Корнигор потратил $350&nbsp;000 и 1,5 года на запуск в Латинской Америке, прежде чем понял, что юнит-экономика там не сходится
        </p>
        <p className="market__text--11">
          Каждый фаундер наступает на одни и те же грабли. Теряет деньги на найме не тех людей, совершает юридические ошибки и не учитывают особенности менталитета
        </p>
        <p className="market__text--10">Каждая ошибка стоит денег</p>
      </ScaledCanvas>
    </section>
  );
}
