const ROWS: Array<[string, string]> = [
  ['Юридический адрес', '299040, г. Севастополь, пр-кт Генерала Острякова, зд. 121Г, ком./офис 37'],
  ['ОГРН', '1253200001169'],
  ['ИНН', '9200026796'],
  ['КПП', '920001001'],
  ['Банк', 'Южный филиал ПАО «Банк ПСБ»'],
  ['БИК', '041806715'],
  ['Расчётный счёт', '40702810001000074928'],
  ['Корр. счёт', '30101810100000000715'],
  ['Генеральный директор', 'Лебедев Иван Романович'],
];

const LegalRequisites = () => (
  <div className="mt-12 p-5 bg-gray-50 rounded-xl">
    <p className="font-heading font-bold text-gray-900 mb-4">
      Общество с ограниченной ответственностью «ВРЕМЯ РУЛИТЬ»
    </p>
    <dl className="space-y-2 text-sm">
      {ROWS.map(([label, value]) => (
        <div key={label} className="flex flex-col sm:flex-row sm:gap-3">
          <dt className="text-gray-500 sm:w-48 flex-shrink-0">{label}</dt>
          <dd className="text-gray-900 font-medium break-words">{value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default LegalRequisites;
