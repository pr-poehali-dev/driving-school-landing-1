const Cookies = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-gray">
        <a href="/" className="text-blue-500 hover:underline text-sm mb-8 inline-block">← На главную</a>
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Политика использования файлов Cookie</h1>
        <p className="text-gray-500 text-sm mb-8">Сайт: твоё.времярулить.рф</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3">Что такое Cookie и зачем эта Политика?</h2>
        <p>Cookie (куки) — небольшие текстовые файлы, которые наш сайт сохраняет на вашем устройстве. Они помогают сайту работать лучше. Cookie, которые могут идентифицировать вас, считаются Персональными данными согласно 152-ФЗ.</p>
        <p><strong>Зачем нужны:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Обеспечить работу Сайта;</li>
          <li>Запомнить ваши настройки;</li>
          <li>Понять, как вы используете Сайт (в обезличенном виде).</li>
        </ul>
        <p>
          <strong>Связь с другими документами:</strong> Эта Политика дополняет{' '}
          <a href="/privacy" className="text-blue-500 hover:underline">Политику конфиденциальности</a>.
        </p>

        <h2 className="font-heading text-xl font-bold mt-10 mb-4">Типы Cookie</h2>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">1. Строго необходимые (Technically Necessary)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 bg-gray-50 font-medium w-32">Зачем</td>
                <td className="px-4 py-2">Без них Сайт не работает. Нужны для навигации, безопасности, работы форм.</td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 bg-gray-50 font-medium">Согласие</td>
                <td className="px-4 py-2">Не требуется (но мы информируем).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">2. Аналитические (Analytics / Performance)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 bg-gray-50 font-medium w-32">Зачем</td>
                <td className="px-4 py-2">Помогают понять популярность страниц, ошибки, время на сайте. Нужны для улучшения работы.</td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 bg-gray-50 font-medium">Сервисы</td>
                <td className="px-4 py-2">Яндекс.Метрика, Google Analytics</td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 bg-gray-50 font-medium">Согласие</td>
                <td className="px-4 py-2">Требуется активное согласие через баннер.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">3. Функциональные (Functionality)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 bg-gray-50 font-medium w-32">Зачем</td>
                <td className="px-4 py-2">Запоминают ваш выбор (например, язык или настройки интерфейса).</td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 bg-gray-50 font-medium">Согласие</td>
                <td className="px-4 py-2">Требуется активное согласие через баннер.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-lg font-semibold mt-6 mb-2">4. Рекламные / Таргетинговые</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 bg-gray-50 font-medium w-32">Согласие</td>
                <td className="px-4 py-2">Мы не используем их целенаправленно. При изменении — запросим отдельное согласие.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">Сторонние Cookie</h2>
        <p>Аналитика: Яндекс.Метрика, Google Analytics. Ознакомьтесь с их политиками:</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li><a href="https://yandex.ru/legal/confidential/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Яндекс.Метрика</a></li>
          <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Analytics</a></li>
        </ul>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">Управление согласием</h2>
        <p>Баннер при первом посещении:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border border-gray-200 bg-gray-50">
                <th className="px-4 py-2 text-left font-medium">Кнопка</th>
                <th className="px-4 py-2 text-left font-medium">Действие</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 font-medium">«Принять всё»</td>
                <td className="px-4 py-2">Согласие на все типы</td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 font-medium">«Отклонить необязательные»</td>
                <td className="px-4 py-2">Только строго необходимые</td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 font-medium">«Настроить»</td>
                <td className="px-4 py-2">Выбор категорий (аналитические / функциональные)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">Изменение и отзыв согласия: через ссылку «Настройки Cookie» в подвале (футере) сайта.</p>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">Сроки хранения</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border border-gray-200 bg-gray-50">
                <th className="px-4 py-2 text-left font-medium">Тип Cookie</th>
                <th className="px-4 py-2 text-left font-medium">Срок</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-200">
                <td className="px-4 py-2">Сессионные</td>
                <td className="px-4 py-2">Удаляются при закрытии браузера</td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2">Постоянные</td>
                <td className="px-4 py-2">Не более 12 месяцев с последнего визита</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">Управление через браузер</h2>
        <p>Вы также можете управлять cookie в настройках браузера:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border border-gray-200 bg-gray-50">
                <th className="px-4 py-2 text-left font-medium">Браузер</th>
                <th className="px-4 py-2 text-left font-medium">Ссылка на инструкцию</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Google Chrome', 'https://support.google.com/chrome/answer/95647', 'Поддержка Chrome'],
                ['Mozilla Firefox', 'https://support.mozilla.org/ru/kb/cookies-information-websites-store-on-your-computer', 'Поддержка Firefox'],
                ['Safari (macOS)', 'https://support.apple.com/ru-ru/guide/safari/sfri11471/mac', 'Поддержка Safari'],
                ['Safari (iOS)', 'https://support.apple.com/ru-ru/HT201265', 'Поддержка Safari на iPhone/iPad'],
                ['Microsoft Edge', 'https://support.microsoft.com/ru-ru/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09', 'Поддержка Edge'],
                ['Opera', 'https://help.opera.com/ru/latest/security-and-privacy/', 'Поддержка Opera'],
              ].map(([browser, href, label]) => (
                <tr key={browser} className="border border-gray-200">
                  <td className="px-4 py-2">{browser}</td>
                  <td className="px-4 py-2">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{label}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Отказ от Google Analytics:{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            установите расширение для браузера
          </a>.
        </p>

        <h2 className="font-heading text-xl font-bold mt-10 mb-3">Контакты</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border border-gray-200 bg-gray-50">
                <th className="px-4 py-2 text-left font-medium">Поле</th>
                <th className="px-4 py-2 text-left font-medium">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 font-medium">Оператор</td>
                <td className="px-4 py-2">ООО «ВРЕМЯ РУЛИТЬ»</td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 font-medium">ИНН</td>
                <td className="px-4 py-2">9200026796</td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 font-medium">Телефон</td>
                <td className="px-4 py-2">
                  <a href="tel:+79785021113" className="text-blue-500 hover:underline">+7 978 502 11 13</a>
                </td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 font-medium">Email</td>
                <td className="px-4 py-2">
                  <a href="mailto:timedrive92@mail.ru" className="text-blue-500 hover:underline">timedrive92@mail.ru</a>
                </td>
              </tr>
              <tr className="border border-gray-200">
                <td className="px-4 py-2 font-medium">Сайт</td>
                <td className="px-4 py-2">времярулить.рф</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
          По вопросам, связанным с cookie:{' '}
          <a href="mailto:timedrive92@mail.ru" className="text-blue-500">timedrive92@mail.ru</a>{' '}
          •{' '}
          <a href="tel:+79785021113" className="text-blue-500">+7 978 502 11 13</a>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
