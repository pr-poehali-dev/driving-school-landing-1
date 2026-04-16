const reviews = [
  {
    text: 'Я боялась даже садиться за руль. Инструктор-женщина — это спасение. Никто не кричал, объясняли спокойно. Сдала с первого раза.',
    author: 'Анна',
    age: '34 года',
    emoji: '⭐⭐⭐⭐⭐',
  },
  {
    text: 'До этого учился в «Профессионале» — бросил после третьего занятия. Там конвейер. Здесь инструкторы реально переживают, чтобы ты понял. Огромное спасибо.',
    author: 'Дмитрий',
    age: '22 года',
    emoji: '⭐⭐⭐⭐⭐',
  },
  {
    text: 'Свой автодром — это космос. Не надо ездить на другой конец города. И рассрочка без банков очень помогла — заплатил 15 тысяч и начал учиться.',
    author: 'Екатерина',
    age: '29 лет',
    emoji: '⭐⭐⭐⭐⭐',
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-brand-sky">
      <div className="max-w-5xl mx-auto px-4">
        <div className="animate-on-scroll text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-3">
            Вот что говорят наши ученики
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
            >
              <div className="text-2xl mb-3 text-brand-blue opacity-30 font-serif leading-none">"</div>
              <p className="text-gray-700 leading-relaxed mb-4 italic">«{r.text}»</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-brand-dark">{r.author}</p>
                  <p className="text-gray-500 text-sm">{r.age}</p>
                </div>
                <span className="text-sm">{r.emoji}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
