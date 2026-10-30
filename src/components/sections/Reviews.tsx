import { useSection } from '@/hooks/useContent';
import Reveal from '@/components/motion/Reveal';

type ReviewItem = {
  id: number;
  author_name: string;
  author_age: number;
  rating: number;
  text: string;
};

const DEFAULT_REVIEWS: ReviewItem[] = [
  { id: 1, author_name: 'Анна', author_age: 34, rating: 5, text: 'Очень боялась учиться вождению. Выбрала инструктора-женщину — и не пожалела. Ирина объясняла всё спокойно, без спешки. Сдала с первого раза!' },
  { id: 2, author_name: 'Дмитрий', author_age: 22, rating: 5, text: 'Учился в другой школе — бросил. Здесь совсем другой подход: не просто катаешься по маршруту, а реально разбираешь каждую ситуацию. Чувствуется, что инструктору не всё равно.' },
  { id: 3, author_name: 'Екатерина', author_age: 29, rating: 5, text: 'Понравился автодром — не нужно ждать в очереди. Рассрочка без банков очень выручила. Рекомендую всем знакомым.' },
];

const formatAge = (age: number) => {
  const n = age % 100;
  const n1 = age % 10;
  if (n > 10 && n < 20) return `${age} лет`;
  if (n1 === 1) return `${age} год`;
  if (n1 >= 2 && n1 <= 4) return `${age} года`;
  return `${age} лет`;
};

const Reviews = () => {
  const data = useSection('reviews', { items: DEFAULT_REVIEWS });
  const reviews = data.items as ReviewItem[];

  return (
    <section id="reviews" className="section bg-paper">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow text-blue-700">Отзывы</span>
          <div className="mt-5 flex items-end justify-between gap-8">
            <h2 className="h-section text-ink">
              Что говорят<br />
              <span className="text-blue-700">наши ученики</span>
            </h2>
            <img
              src="https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png"
              alt="Время Рулить"
              className="hidden w-48 flex-shrink-0 object-contain md:block lg:w-56"
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.id ?? i} index={i} className="h-full">
              <figure className="card-lift flex h-full flex-col rounded-card border border-paper-line bg-white p-7 md:p-9">
                <span aria-hidden="true" className="num select-none text-[96px] leading-[0.7] text-[#2A7FFF]/20">
                  “
                </span>
                <blockquote className="mt-4 flex-1 font-body text-[17px] leading-[1.65] text-ink">
                  {r.text}
                </blockquote>
                <figcaption className="mt-8 flex items-baseline justify-between border-t border-paper-line pt-5">
                  <span className="font-heading text-base font-semibold text-ink">{r.author_name}</span>
                  <span className="font-body text-sm text-ink-mute">{formatAge(r.author_age)}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
