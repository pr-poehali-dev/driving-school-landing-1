const Pricing = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="animate-on-scroll text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-3">
            Сколько стоит уверенность за рулём?
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="animate-on-scroll bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 max-w-md w-full text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="font-heading text-6xl font-bold text-brand-dark mb-2">
              64 000 <span className="text-3xl">₽</span>
            </div>
            <p className="text-gray-500 mb-6">полный курс, теория + практика, бензин включён</p>

            <ul className="space-y-3 text-left mb-8">
              <li className="flex items-start gap-2 text-gray-700">
                <span className="text-brand-blue mt-0.5">→</span>
                <span>Рассрочка без банков — первый взнос 15 000 ₽</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <span className="text-brand-blue mt-0.5">→</span>
                <span>Можно докупать часы, если нужно больше практики</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <span className="text-brand-blue mt-0.5">→</span>
                <span>Скидка 5 000 ₽ для участников СВО</span>
              </li>
            </ul>

            <button
              onClick={scrollToForm}
              className="w-full bg-brand-blue text-white py-4 rounded-xl font-heading font-bold text-lg hover:bg-blue-600 hover:scale-[1.02] transition-all duration-200 shadow-md"
            >
              Записаться на консультацию
            </button>
            <p className="mt-3 text-gray-400 text-sm">
              Никаких скрытых платежей. Цена, которую видите — которую платите
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
