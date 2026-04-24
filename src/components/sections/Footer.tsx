import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-[#0f1e30] text-white pt-14 pb-8">
      <div className="max-w-5xl mx-auto px-5 md:px-8">

        {/* Основная сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Логотип + копирайт */}
          <div className="lg:col-span-1">
            <img
              src="https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png"
              alt="Автошкола Время Рулить"
              className="h-16 w-auto object-contain mb-5 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Автошкола «Время рулить» — школа, которую создали инструкторы, а не маркетологи.
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+79785021113"
                  className="font-heading font-bold text-lg text-white hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <Icon name="Phone" size={16} className="text-blue-400 flex-shrink-0" />
                  +7 978 502 11 13
                </a>
              </li>
              <li className="text-gray-400 text-sm flex items-start gap-2">
                <Icon name="Clock" size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Пн–Пт: 10:00–18:00<br />Сб–Вс: по записи</span>
              </li>
              {/* Соцсети */}
              <li className="pt-2 flex items-center gap-3">
                <a
                  href="https://vk.com/timedrivesev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.05 14.29h-1.48c-.56 0-.73-.46-1.72-1.47-.87-.84-1.25-.95-1.46-.95-.3 0-.38.08-.38.49v1.34c0 .35-.11.56-1.02.56-1.5 0-3.17-.91-4.35-2.6-1.76-2.48-2.25-4.33-2.25-4.71 0-.22.08-.42.49-.42h1.48c.37 0 .51.17.65.57.72 2.07 1.92 3.88 2.41 3.88.18 0 .27-.08.27-.54V9.98c-.06-1-.58-1.08-.58-1.43 0-.17.14-.35.36-.35h2.33c.31 0 .42.17.42.54v2.9c0 .31.14.42.22.42.18 0 .34-.11.68-.45 1.05-1.18 1.8-3 1.8-3 .1-.22.27-.42.65-.42h1.48c.44 0 .54.23.44.54-.18.86-1.96 3.35-1.96 3.35-.15.26-.21.37 0 .65.15.21.65.65.98 1.04.61.7 1.07 1.28 1.19 1.68.12.4-.09.6-.5.6z"/>
                  </svg>
                  ВКонтакте
                </a>
                <a
                  href="https://t.me/timedrivesev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.56-.48.7-.96.44l-2.68-1.98-1.28 1.24c-.14.14-.28.2-.56.2l.2-2.76 4.96-4.48c.22-.2-.04-.3-.32-.1L7.4 14.08 4.76 13.2c-.56-.18-.58-.56.12-.82l8.96-3.46c.46-.18.88.12.8.88z"/>
                  </svg>
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Адреса */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">Адреса</h4>
            <ul className="space-y-4">
              <li className="text-sm">
                <p className="text-blue-400 font-semibold mb-1 flex items-center gap-1.5">
                  <Icon name="BookOpen" size={13} />
                  Теория и офис
                </p>
                <p className="text-gray-300 leading-relaxed">
                  ул. Хрусталева, 177А<br />
                  ТЦ «Одиз», г. Севастополь
                </p>
              </li>
              <li className="text-sm">
                <p className="text-blue-400 font-semibold mb-1 flex items-center gap-1.5">
                  <Icon name="Car" size={13} />
                  Автодром (практика)
                </p>
                <p className="text-gray-300 leading-relaxed">
                  ул. Стахановцев, 18<br />
                  Свой, не арендованный
                </p>
              </li>
            </ul>
          </div>

          {/* Документы */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">Документы</h4>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Icon name="FileText" size={13} className="text-blue-400 flex-shrink-0" />
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="/agreement" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Icon name="FileCheck" size={13} className="text-blue-400 flex-shrink-0" />
                  Согласие на обработку ПД
                </a>
              </li>
              <li>
                <a href="/requisites" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <Icon name="Building2" size={13} className="text-blue-400 flex-shrink-0" />
                  Реквизиты организации
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Гео-строка SEO */}
        <div className="border-t border-white/10 pt-6 mb-4">
          <p className="text-gray-400 text-sm font-medium">
            Автошкола в Севастополе, Балаклаве и Инкермане —{' '}
            <a href="tel:+79785021113" className="text-blue-400 hover:text-blue-300 transition-colors font-bold">+7 978 502 11 13</a>
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Автодром на Стахановцева, 18 — 10 минут от Инкермана и Балаклавы
          </p>
        </div>

        {/* Разделитель */}
        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-gray-500 text-xs leading-relaxed">
            © 2026 ООО «ВРЕМЯ РУЛИТЬ» · ИНН 9200026796 · ОГРН 1253200001169
          </p>
          <p className="text-gray-600 text-xs">
            г. Севастополь, ул. Хрусталева, 177А, ТЦ «Одиз»
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;