/* ═══════════════════════════════════════════════════════════════════
   ТИПЫ
═══════════════════════════════════════════════════════════════════ */
export type SignType =
  | 'start'         // 🚩 старт
  | 'hill'          // 🏞️ холм — машинка скрывается
  | 'warning'       // ⚠️ предупреждение — экран трясётся
  | 'traffic-light' // 🚦 светофор
  | 'stop'          // 🛑 стоп
  | 'roadwork'      // 🚧 дорожные работы
  | 'parking'       // 🅿️ парковка
  | 'children'      // 🚸 дети
  | 'trigger'       // 👩/🎖️/🚗 — триггеры
  | 'gas'           // ⛽ заправка
  | 'question'      // ❓ FAQ
  | 'reviews-tl'    // 🚦 перед отзывами
  | 'finish';       // 🏁 финиш

export interface RoadSign {
  pct: number;          // 0..1 — позиция по скроллу
  side: 'left' | 'right';
  type: SignType;
  emoji: string;
  label: string;
  faqIdx?: number;      // для type=question — индекс вопроса FAQ
}

/* ═══════════════════════════════════════════════════════════════════
   ВСЕ ЗНАКИ ПО СХЕМЕ
═══════════════════════════════════════════════════════════════════ */
export const SIGNS: RoadSign[] = [
  // 0 — Старт
  { pct: 0.00, side: 'left',  type: 'start',         emoji: '🚩', label: 'Поехали!' },
  // 0.1 — Холм
  { pct: 0.03, side: 'left',  type: 'hill',           emoji: '🏞️', label: '' },
  // 0.2 — Выезд на главную
  { pct: 0.07, side: 'right', type: 'warning',        emoji: '⚠️', label: 'Выезд на главную' },
  // 1 — 1-й экран: светофор
  { pct: 0.09, side: 'left',  type: 'traffic-light',  emoji: '🚦', label: 'Светофор' },
  { pct: 0.12, side: 'left',  type: 'stop',           emoji: '🛑', label: '' },
  // 1.1 — Скользкая дорога
  { pct: 0.16, side: 'right', type: 'warning',        emoji: '⚠️', label: 'Скользкая дорога' },
  // 2 — Блок проблем: светофор + стоп
  { pct: 0.20, side: 'left',  type: 'traffic-light',  emoji: '🚦', label: 'Уступи дорогу' },
  { pct: 0.26, side: 'left',  type: 'stop',           emoji: '🛑', label: '' },
  // 2.1 — Дорожные работы
  { pct: 0.33, side: 'right', type: 'roadwork',       emoji: '🚧', label: 'Дорожные работы' },
  // 3 — Инструкторы: 5 парковочных мест
  { pct: 0.36, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 1' },
  { pct: 0.39, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 2' },
  { pct: 0.42, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 3' },
  { pct: 0.45, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 4' },
  { pct: 0.48, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Инструктор 5' },
  // 3.1 — Дети
  { pct: 0.40, side: 'left',  type: 'children',       emoji: '🚸', label: 'Новый инструктор!' },
  // 3.2 — Холм внутри инструкторов
  { pct: 0.45, side: 'left',  type: 'hill',           emoji: '🏞️', label: '' },
  // 4 — Триггеры: 3 знака
  { pct: 0.51, side: 'left',  type: 'trigger',        emoji: '👩', label: 'Инструктор-женщина' },
  { pct: 0.54, side: 'left',  type: 'trigger',        emoji: '🎖️', label: 'Скидка для СВО' },
  { pct: 0.57, side: 'left',  type: 'trigger',        emoji: '🚗', label: 'Свой автодром' },
  // 4.1 — Вопрос со скидкой
  { pct: 0.59, side: 'left',  type: 'question',       emoji: '❓', label: 'Скидка 5000 ₽', faqIdx: 5 },
  // 5 — Цена: заправка
  { pct: 0.64, side: 'right', type: 'gas',            emoji: '⛽', label: 'Заправка' },
  // 5.1 — Крутой спуск
  { pct: 0.70, side: 'left',  type: 'warning',        emoji: '⚠️', label: 'Крутой спуск' },
  // 6 — FAQ: 8 знаков
  { pct: 0.73, side: 'left',  type: 'question',       emoji: '❓', label: 'Вопрос 1', faqIdx: 0 },
  { pct: 0.74, side: 'right', type: 'question',       emoji: '❓', label: 'Вопрос 2', faqIdx: 1 },
  { pct: 0.75, side: 'left',  type: 'question',       emoji: '❓', label: 'Вопрос 3', faqIdx: 2 },
  { pct: 0.76, side: 'right', type: 'question',       emoji: '❓', label: 'Вопрос 4', faqIdx: 3 },
  // 6.1 — Холм
  { pct: 0.76, side: 'left',  type: 'hill',           emoji: '🏞️', label: '' },
  { pct: 0.77, side: 'left',  type: 'question',       emoji: '❓', label: 'Вопрос 5', faqIdx: 4 },
  { pct: 0.78, side: 'right', type: 'question',       emoji: '❓', label: 'Вопрос 6', faqIdx: 5 },
  // 6.2 — Дорожные работы
  { pct: 0.79, side: 'right', type: 'roadwork',       emoji: '🚧', label: 'Сложный вопрос!' },
  { pct: 0.80, side: 'left',  type: 'question',       emoji: '❓', label: 'Вопрос 7', faqIdx: 6 },
  { pct: 0.81, side: 'right', type: 'question',       emoji: '❓', label: 'Вопрос 8', faqIdx: 7 },
  // 7 — Отзывы
  { pct: 0.84, side: 'left',  type: 'reviews-tl',     emoji: '🚦', label: 'Отзывы впереди' },
  // 8 — Карта
  { pct: 0.90, side: 'right', type: 'parking',        emoji: '🅿️', label: 'Мы здесь!' },
  // 9 — Форма
  { pct: 0.93, side: 'right', type: 'finish',         emoji: '🏁', label: 'Финиш!' },
  { pct: 0.94, side: 'left',  type: 'stop',           emoji: '🛑', label: '' },
  { pct: 0.96, side: 'left',  type: 'warning',        emoji: '⚠️', label: 'Проверь телефон' },
  // 10 — Подвал
  { pct: 0.99, side: 'left',  type: 'finish',         emoji: '🏁', label: 'Вы доехали!' },
];

/* ═══════════════════════════════════════════════════════════════════
   ИЗГИБ ДОРОГИ ПО % СКРОЛЛА
═══════════════════════════════════════════════════════════════════ */
export const ROAD_CURVE: { pct: number; x: number }[] = [
  { pct: 0.00, x: 28 },
  { pct: 0.07, x: 38 }, // выезд → правее
  { pct: 0.12, x: 18 }, // 1й экран → левее
  { pct: 0.20, x: 12 }, // боли → влево
  { pct: 0.33, x: 32 }, // дорожные работы
  { pct: 0.38, x: 40 }, // парковки → правее
  { pct: 0.51, x: 16 }, // триггеры → влево
  { pct: 0.60, x: 28 }, // прямо
  { pct: 0.64, x: 36 }, // заправка → правее
  { pct: 0.70, x: 22 }, // спуск → влево
  { pct: 0.73, x: 28 }, // FAQ
  { pct: 0.84, x: 36 }, // отзывы → правее
  { pct: 0.90, x: 40 }, // парковка
  { pct: 0.93, x: 28 }, // финиш
  { pct: 1.00, x: 28 },
];

export function curveX(pct: number): number {
  for (let i = 0; i < ROAD_CURVE.length - 1; i++) {
    const a = ROAD_CURVE[i], b = ROAD_CURVE[i + 1];
    if (pct >= a.pct && pct <= b.pct) {
      const t = (pct - a.pct) / (b.pct - a.pct);
      const et = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      return a.x + (b.x - a.x) * et;
    }
  }
  return 28;
}

export function carRotFromCurve(pct: number): number {
  const d = 0.015;
  const dx = curveX(Math.min(1, pct + d)) - curveX(Math.max(0, pct - d));
  return Math.max(-30, Math.min(30, dx * 3.5));
}

/* ═══════════════════════════════════════════════════════════════════
   КОНФЕТТИ
═══════════════════════════════════════════════════════════════════ */
const CONFETTI_COLORS = ['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899'];

export function launchConfetti() {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(container);
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    const size = 6 + Math.random() * 8;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;
      top:-${size}px;
      background:${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation:confetti-fall ${1.2 + Math.random() * 1.5}s ${Math.random() * 0.8}s ease-in forwards;
    `;
    container.appendChild(p);
  }
  setTimeout(() => container.remove(), 4000);
}

/* ═══════════════════════════════════════════════════════════════════
   ТРЯСКА ЭКРАНА
═══════════════════════════════════════════════════════════════════ */
export function shakeScreen(intensity = 6, ms = 350) {
  if (window.innerWidth < 1024) return;
  const el = document.documentElement;
  const kf = `@keyframes screen-shake {
    0%,100%{transform:translate(0,0)}
    20%{transform:translate(-${intensity}px,${intensity/2}px)}
    40%{transform:translate(${intensity}px,-${intensity/2}px)}
    60%{transform:translate(-${intensity/2}px,${intensity}px)}
    80%{transform:translate(${intensity/2}px,-${intensity}px)}
  }`;
  const style = document.createElement('style');
  style.textContent = kf;
  document.head.appendChild(style);
  el.style.animation = `screen-shake ${ms}ms ease-in-out`;
  setTimeout(() => { el.style.animation = ''; style.remove(); }, ms + 50);
}