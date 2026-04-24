import Icon from '@/components/ui/icon';

const MapSection = () => {
  return (
    <section id="map" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="animate-on-scroll text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-dark mb-3">
            Приезжайте — покажем автодром и познакомим с инструкторами
          </h2>
          <p className="text-gray-500 text-lg">Свой автодром — не нужно никуда ехать. Приезжайте на экскурсию, покажем всё</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="animate-on-scroll bg-brand-sky rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                <Icon name="BookOpen" size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-brand-dark">Теория и офис</h3>
                <p className="text-gray-600">Севастополь, ул. Хрусталева, 177А, ТЦ «Одиз»</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Icon name="Clock" size={14} />
              <span>Пн–Пт: 10:00–18:00 (обед 13–14), Сб–Вс: по записи</span>
            </div>
          </div>

          <div className="animate-on-scroll stagger-2 bg-brand-sky rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Icon name="Car" size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-brand-dark">Автодром (практика)</h3>
                <p className="text-gray-600">Севастополь, ул. Стахановцев, 18</p>
                <p className="text-green-600 text-sm font-medium mt-1">Свой, не арендованный</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Icon name="Phone" size={14} />
              <a href="tel:+79785021113" className="text-brand-blue hover:underline font-semibold">+7 978 502 11 13</a>
            </div>
          </div>
        </div>

        <div className="animate-on-scroll rounded-2xl overflow-hidden shadow-md h-96">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=33.525&z=12&pt=33.5225,44.5946,pmblm~33.4832,44.5468,pmgrm&text=%D0%90%D0%B2%D1%82%D0%BE%D1%88%D0%BA%D0%BE%D0%BB%D0%B0+%D0%92%D1%80%D0%B5%D0%BC%D1%8F+%D1%80%D1%83%D0%BB%D0%B8%D1%82%D1%8C"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Карта автошколы Время рулить"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;