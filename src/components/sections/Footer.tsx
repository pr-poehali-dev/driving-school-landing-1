const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="https://cdn.poehali.dev/files/4af8ab18-4ed7-491a-9440-4303da095ec7.jpg"
              alt="Автошкола Время Рулить"
              className="h-12 w-auto object-contain mb-3"
            />
            <p className="text-gray-400 text-sm">© 2025 ООО «ВРЕМЯ РУЛИТЬ»</p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-3 text-gray-200">Контакты</h4>
            <a href="tel:+79785021113" className="text-brand-blue text-lg font-heading font-bold hover:text-blue-300 transition-colors block mb-2">
              +7 978 502 11 13
            </a>
            <a
              href="https://vk.com/timedrivesev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.05 14.29h-1.48c-.56 0-.73-.46-1.72-1.47-.87-.84-1.25-.95-1.46-.95-.3 0-.38.08-.38.49v1.34c0 .35-.11.56-1.02.56-1.5 0-3.17-.91-4.35-2.6-1.76-2.48-2.25-4.33-2.25-4.71 0-.22.08-.42.49-.42h1.48c.37 0 .51.17.65.57.72 2.07 1.92 3.88 2.41 3.88.18 0 .27-.08.27-.54V9.98c-.06-1-.58-1.08-.58-1.43 0-.17.14-.35.36-.35h2.33c.31 0 .42.17.42.54v2.9c0 .31.14.42.22.42.18 0 .34-.11.68-.45 1.05-1.18 1.8-3 1.8-3 .1-.22.27-.42.65-.42h1.48c.44 0 .54.23.44.54-.18.86-1.96 3.35-1.96 3.35-.15.26-.21.37 0 .65.15.21.65.65.98 1.04.61.7 1.07 1.28 1.19 1.68.12.4-.09.6-.5.6z"/>
              </svg>
              Сообщество ВКонтакте
            </a>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-3 text-gray-200">Документы</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Политика конфиденциальности</a></li>
              <li><a href="/agreement" className="text-gray-400 hover:text-white transition-colors text-sm">Согласие на обработку ПД</a></li>
              <li><a href="/requisites" className="text-gray-400 hover:text-white transition-colors text-sm">Реквизиты</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-gray-500 text-xs leading-relaxed">
            ООО «ВРЕМЯ РУЛИТЬ» • ИНН 9200026796 • ОГРН 1253200001169 •{' '}
            г. Севастополь, ул. Хрусталева, 177А, ТЦ «Одиз»
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;