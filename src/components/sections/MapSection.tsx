import Icon from '@/components/ui/icon';
import { useSection } from '@/hooks/useContent';
import Reveal from '@/components/motion/Reveal';

const MapSection = () => {
  const data = useSection('map', {
    address_office: 'Севастополь, ул. Хрусталева, 177А, ТЦ «Адиз»',
    address_autodrome: 'Севастополь, ул. Стахановцев, 18',
    hours_weekdays: 'Пн–Пт 10:00–18:00 (обед 13:00–14:00)',
    hours_weekend: 'Сб–Вс по записи',
    phone: '+7 978 502 11 13',
  });
  const phone = data.phone as string;
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;

  return (
    <section id="map" className="section bg-paper">
      <div className="wrap">
        <Reveal className="max-w-[880px]">
          <span className="eyebrow text-blue-700">Контакты</span>
          <h2 className="h-section mt-5 text-ink">
            Приезжайте —{' '}
            <span className="text-blue-700">покажем автодром</span>
            <br />
            и познакомим с инструкторами
          </h2>
          <p className="lead mt-6 text-ink-soft">Автодром — приезжайте на экскурсию, покажем всё</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
          <Reveal className="h-full">
            <div className="card-lift flex h-full flex-col rounded-card border border-paper-line bg-white p-7 md:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2A7FFF]/25 text-blue-700">
                <Icon name="BookOpen" size={22} strokeWidth={1.4} />
              </span>
              <h3 className="mt-6 font-heading text-[22px] font-semibold tracking-[-0.015em] text-ink">Теория и офис</h3>
              <p className="mt-2 font-body text-base leading-[1.6] text-ink-soft">{data.address_office as string}</p>
              <div className="mt-6 flex items-start gap-2.5 border-t border-paper-line pt-5 font-body text-sm text-ink-mute">
                <Icon name="Clock" size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <span>{data.hours_weekdays as string}, {data.hours_weekend as string}</span>
              </div>
            </div>
          </Reveal>

          <Reveal index={1} className="h-full">
            <div className="card-lift flex h-full flex-col rounded-card border border-paper-line bg-white p-7 md:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2A7FFF]/25 text-blue-700">
                <Icon name="Car" size={22} strokeWidth={1.4} />
              </span>
              <h3 className="mt-6 font-heading text-[22px] font-semibold tracking-[-0.015em] text-ink">Автодром (практика)</h3>
              <p className="mt-2 font-body text-base leading-[1.6] text-ink-soft">{data.address_autodrome as string}</p>
              <p className="mt-2 font-body text-sm leading-[1.6] text-ink-mute">Инструктор встречает на остановке Хрюкина на Острякова и отвозит на автодром — идти пешком не нужно</p>
              <div className="mt-6 flex items-center gap-2.5 border-t border-paper-line pt-5 font-body text-sm">
                <Icon name="Phone" size={16} strokeWidth={1.5} className="text-ink-mute" />
                <a href={phoneHref} className="link-underline font-heading text-base font-semibold text-blue-700">{phone}</a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-5 md:mt-6">
          <div className="h-[380px] overflow-hidden rounded-card border border-paper-line md:h-[460px]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=33.503,44.571&z=12&pt=33.5225,44.5946,pmblm~33.4832,44.5468,pmgrm&text=%D0%90%D0%B2%D1%82%D0%BE%D1%88%D0%BA%D0%BE%D0%BB%D0%B0+%D0%92%D1%80%D0%B5%D0%BC%D1%8F+%D1%80%D1%83%D0%BB%D0%B8%D1%82%D1%8C"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              title="Карта автошколы Время рулить"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default MapSection;
