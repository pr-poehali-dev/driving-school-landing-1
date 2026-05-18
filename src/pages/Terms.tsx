const Terms = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-gray">
        <a href="/" className="text-blue-500 hover:underline text-sm mb-8 inline-block">← На главную</a>
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Пользовательское соглашение</h1>
        <p className="text-gray-500 text-sm mb-8">Сайт: твоё.времярулить.рф</p>

        <p>
          Настоящее Пользовательское соглашение (далее — «Соглашение») является публичной офертой{' '}
          <strong>ООО «ВРЕМЯ РУЛИТЬ»</strong> (ИНН 9200026796, ОГРН 1253200001169), именуемого в дальнейшем
          «Администрация Сайта», и регулирует отношения между Администрацией Сайта и пользователями поддомена
          твоё.времярулить.рф (далее — «Сайт»).
        </p>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">1. Общие положения</h2>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">1.1. Акцепт Соглашения</h3>
        <p>
          Начало использования Сайта любым способом (посещение, заполнение форм, отправка данных) означает полное
          и безоговорочное принятие условий Соглашения (ст. 438 ГК РФ).
        </p>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">1.2. Связанные документы</h3>
        <p>Неотъемлемой частью являются:</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li><a href="/privacy" className="text-blue-500 hover:underline">Политика конфиденциальности</a>;</li>
          <li><a href="/cookies" className="text-blue-500 hover:underline">Политика использования Cookie</a>;</li>
          <li><a href="/agreement" className="text-blue-500 hover:underline">Согласие пользователя на обработку ПДн</a>.</li>
        </ul>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">1.3. Пользователь</h3>
        <p>
          Дееспособное физическое лицо, достигшее 18 лет. Использование Сайта лицами младше 18 лет допускается
          только с согласия законных представителей.
        </p>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">2. Условия использования</h2>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">2.1. Функционал Сайта</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Просмотр информации и материалов;</li>
          <li>Использование форм обратной связи, заказа звонка, подписки;</li>
          <li>Иные функции, явно представленные на Сайте.</li>
        </ul>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">2.2. Запрещается</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Использовать Сайт в мошеннических или незаконных целях;</li>
          <li>Копировать, распространять контент без разрешения;</li>
          <li>Нарушать работу Сайта;</li>
          <li>Распространять спам, оскорбления, нецензурную лексику.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">3. Интеллектуальная собственность</h2>
        <p>
          Весь контент Сайта (тексты, дизайн, графика, логотипы) принадлежит Администрации Сайта или
          правообладателям. Использование без письменного согласия запрещено. Пользователю предоставляется
          лицензия для личного некоммерческого использования.
        </p>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">4. Ответственность</h2>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">4.1. Администрации Сайта</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Сайт предоставляется «как есть».</li>
          <li>
            Администрация не гарантирует бесперебойную работу и не несёт ответственности за убытки,
            связанные с невозможностью использования Сайта.
          </li>
        </ul>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">4.2. Пользователя</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Пользователь отвечает за достоверность предоставленных данных.</li>
          <li>Администрация вправе ограничить доступ при нарушении Соглашения.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">5. Персональные данные</h2>
        <p>
          Обработка ПДн осуществляется в соответствии с{' '}
          <a href="/privacy" className="text-blue-500 hover:underline">Политикой конфиденциальности</a>.
          Используя Сайт, пользователь соглашается с ней.
        </p>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">6. Изменения Соглашения</h2>
        <p>
          Администрация вправе изменять Соглашение. Новая редакция публикуется по адресу{' '}
          <a href="/terms" className="text-blue-500 hover:underline">/terms</a> и вступает в силу с момента публикации.
        </p>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">7. Разрешение споров</h2>
        <p>
          Претензии направляются на email:{' '}
          <a href="mailto:timedrive92@mail.ru" className="text-blue-500 hover:underline">timedrive92@mail.ru</a>.
          Срок рассмотрения — 30 дней. При недостижении согласия — споры решаются по месту нахождения
          Администрации (г. Севастополь) по законам РФ.
        </p>

        <div className="mt-12 p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
          По вопросам соглашения:{' '}
          <a href="mailto:timedrive92@mail.ru" className="text-blue-500">timedrive92@mail.ru</a>{' '}
          •{' '}
          <a href="tel:+79785021113" className="text-blue-500">+7 978 502 11 13</a>
        </div>
      </div>
    </div>
  );
};

export default Terms;
