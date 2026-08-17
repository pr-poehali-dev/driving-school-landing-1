import { useSection } from '@/hooks/useContent';

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

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array(count).fill(0).map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" fill="#2A7FFF" width="14" height="14">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
);

const Reviews = () => {
  const data = useSection('reviews', { items: DEFAULT_REVIEWS });
  const reviews = data.items as ReviewItem[];

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Заголовок */}
        <div className="animate-on-scroll mb-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-500 font-body text-sm uppercase tracking-[0.2em] font-semibold">Отзывы</span>
          </div>
          <h2 className="font-heading font-bold text-[#1A2A3A] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Что говорят<br />
            <span className="text-blue-500">наши ученики</span>
          </h2>
          <img
            src="https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png"
            alt="Время Рулить"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-56 object-contain hidden md:block pointer-events-none"
            style={{ opacity: 0.85 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.id ?? i}
              className={`animate-on-scroll stagger-${i + 1} group relative bg-[#F5F7FA] rounded-2xl p-7
                hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]
                transition-all duration-300 cursor-default overflow-hidden`}
            >
              {/* Кавычка */}
              <div className="font-serif text-7xl leading-none text-blue-100 group-hover:text-blue-200 transition-colors absolute -top-2 left-5 select-none">
                "
              </div>

              <div className="relative pt-6">
                <Stars count={r.rating} />
                <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-6">
                  {r.text}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-500 font-heading font-bold text-sm">
                      {r.author_name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[#1A2A3A] text-sm">{r.author_name}</p>
                    <p className="text-gray-400 text-xs">{formatAge(r.author_age)}</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;