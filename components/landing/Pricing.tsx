import { CanvasImg } from './CanvasImg';
import { PRICING_CANVAS } from './canvasPresets';
import { ScaledCanvas } from './ScaledCanvas';

const STAR = '/assets/optim_tildacdn_com/Star_2.png_77c65b6e19fd.webp';

export function Pricing() {
  return (
    <section className="pricing landing__section" id="pricing">
      <ScaledCanvas
        canvasClassName="pricing__canvas"
        desktopH={PRICING_CANVAS.desktopH}
        mobileH={PRICING_CANVAS.mobileH}
      >
        <div className="pricing__shape" aria-hidden="true" />
        <p className="pricing__heading">Присоединиться к клубу</p>
        <p className="pricing__intro">
          После оплаты вы попадаете в закрытый телеграм-канал, где мы проводим все активности
        </p>
        <p className="pricing__note">
          Frontier — это не способ заработка для основателей, у нас есть свой бизнес. 100% выручки
          реинвестируется в продукт: на модерацию групп, разработку AI, организацию ивентов.
        </p>
        <p className="pricing__features-text">
          Форум-группа
          <br />
          <br />
          Чат с участниками
          <br />
          <br />
          Групповые встречи с экспертами
          <br />
          <br />
          Доступ к базе знаний и опыту всех участников через AI-Maiia
          <br />
          <br />
          Ai-поиск по базе знаний
          <br />
          <br />
          Совместные выезды (оплачиваются отдельно)
          <br />
          <br />
          Random coffee и онлайн-нетворкинги
        </p>
        <CanvasImg className="pricing__star pricing__star--1" src={STAR} alt="" width={24} height={24} />
        <CanvasImg className="pricing__star pricing__star--2" src={STAR} alt="" width={24} height={24} />
        <CanvasImg className="pricing__star pricing__star--3" src={STAR} alt="" width={24} height={24} />
        <CanvasImg className="pricing__star pricing__star--4" src={STAR} alt="" width={24} height={24} />
        <CanvasImg className="pricing__star pricing__star--5" src={STAR} alt="" width={24} height={24} />
        <CanvasImg className="pricing__star pricing__star--6" src={STAR} alt="" width={24} height={24} />
        <CanvasImg className="pricing__star pricing__star--7" src={STAR} alt="" width={24} height={24} />
        <p className="pricing__price pricing__price--200">$200</p>
        <p className="pricing__price pricing__price--20">$20</p>
        <p className="pricing__period pricing__period--year">в месяц при оплате за год</p>
        <p className="pricing__period pricing__period--basic">
          в месяц, но без форум-групп и AI Maiia
        </p>
        <a
          className="pricing__cta"
          href="https://t.me/vladimir_kornigor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="pricing__cta-icon" aria-hidden="true" />
          <span>Написать в телеграм</span>
        </a>
        <p className="pricing__guarantee">Вернем 100% стоимости, если клуб не подойдет</p>
        <CanvasImg
          className="pricing__founder-photo"
          src="/assets/optim_tildacdn_com/Frame_2087329403.png_4b63b0e23013.webp"
          alt="Владимир Корнигор"
          width={60}
          height={60}
        />
        <p className="pricing__founder-name">Владимира Корнигора</p>
        <p className="pricing__founder-label">Основатель клуба</p>
      </ScaledCanvas>
    </section>
  );
}
