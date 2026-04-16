const Requisites = () => {
  const reqs = [
    { label: 'Полное наименование', value: 'Общество с ограниченной ответственностью «ВРЕМЯ РУЛИТЬ»' },
    { label: 'Краткое наименование', value: 'ООО «ВРЕМЯ РУЛИТЬ»' },
    { label: 'ИНН', value: '9200026796' },
    { label: 'ОГРН', value: '1253200001169' },
    { label: 'Юридический адрес', value: 'г. Севастополь, ул. Хрусталева, 177А, ТЦ «Одиз»' },
    { label: 'Банк', value: 'Южный филиал ПАО «Банк ПСБ»' },
    { label: 'БИК', value: '041806715' },
    { label: 'Расчётный счёт (р/с)', value: '40702810001000074928' },
    { label: 'Корреспондентский счёт (к/с)', value: '30101810100000000715' },
    { label: 'Телефон', value: '+7 978 502 11 13' },
    { label: 'Email', value: 'timedrive92@gmail.com' },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-blue-500 hover:underline text-sm mb-8 inline-block">← На главную</a>
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-3">Реквизиты</h1>
        <p className="text-gray-500 mb-8">Для заполнения договора и оплаты</p>

        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          {reqs.map((r, i) => (
            <div
              key={i}
              className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
            >
              <span className="text-gray-500 text-sm sm:w-56 flex-shrink-0">{r.label}</span>
              <span className="font-medium text-gray-900">{r.value}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-gray-400 text-sm">
          Эти реквизиты используются при заключении договора на обучение и оплате услуг.
          При оплате банковским переводом обязательно укажите ФИО и цель платежа: «Оплата за обучение вождению».
        </p>
      </div>
    </div>
  );
};

export default Requisites;
