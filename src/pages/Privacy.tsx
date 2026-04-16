const Privacy = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-gray">
        <a href="/" className="text-blue-500 hover:underline text-sm mb-8 inline-block">← На главную</a>
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">Политика конфиденциальности</h1>

        <p className="text-gray-500 text-sm mb-8">Последнее обновление: январь 2025 года</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3">1. Кто оператор данных</h2>
        <p>ООО «ВРЕМЯ РУЛИТЬ», ИНН 9200026796, ОГРН 1253200001169, адрес: г. Севастополь, ул. Хрусталева, 177А, ТЦ «Одиз».</p>
        <p>Мы несём ответственность за обработку ваших персональных данных, переданных через этот сайт.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3">2. Какие данные мы собираем</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Имя — чтобы обращаться к вам лично</li>
          <li>Номер телефона — чтобы перезвонить и ответить на вопросы</li>
          <li>IP-адрес и данные браузера — автоматически при посещении сайта</li>
          <li>Данные cookie — для аналитики и корректной работы сайта</li>
        </ul>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3">3. Зачем мы собираем эти данные</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Чтобы обработать вашу заявку и перезвонить вам</li>
          <li>Чтобы ответить на ваши вопросы об обучении</li>
          <li>Чтобы улучшать сайт на основе статистики посещений (Яндекс.Метрика)</li>
        </ul>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3">4. Сколько хранятся данные</h2>
        <p>Ваши данные хранятся до тех пор, пока вы не отзовёте своё согласие, но не дольше 5 лет с момента передачи.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3">5. Кому передаются данные</h2>
        <p>Мы не продаём и не передаём ваши данные третьим лицам в коммерческих целях. Данные могут передаваться:</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Хостинг-провайдеру (серверы расположены в России)</li>
          <li>Сервису аналитики Яндекс.Метрика — в обезличенном виде</li>
        </ul>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3">6. Как мы защищаем данные</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Передача данных защищена SSL-сертификатом (HTTPS)</li>
          <li>Доступ к базе данных ограничен для сотрудников</li>
          <li>Данные не хранятся на устройствах третьих лиц</li>
        </ul>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3">7. Ваши права</h2>
        <p>Вы имеете право:</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Узнать, какие данные о вас хранятся</li>
          <li>Потребовать исправить или удалить данные</li>
          <li>Отозвать согласие на обработку в любой момент</li>
        </ul>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3">8. Как отозвать согласие</h2>
        <p>Вы можете в любой момент отозвать своё согласие — просто напишите нам на почту <a href="mailto:timedrive92@gmail.com" className="text-blue-500">timedrive92@gmail.com</a> или пришлите письмо по адресу: г. Севастополь, ул. Хрусталева, 177А, ТЦ «Одиз».</p>
        <p>Мы удалим все ваши данные в течение 10 рабочих дней.</p>

        <div className="mt-12 p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
          По вопросам, связанным с персональными данными: <a href="mailto:timedrive92@gmail.com" className="text-blue-500">timedrive92@gmail.com</a> • <a href="tel:+79785021113" className="text-blue-500">+7 978 502 11 13</a>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
