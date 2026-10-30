import Icon from '@/components/ui/icon';
import Reveal from '@/components/motion/Reveal';
import LeadForm from '@/components/lead/LeadForm';

const DOCS = [
  {
    id: 1,
    title: 'Программа подготовки водителей категории «В»',
    preview: '/docs/programma-kategoriya-b.jpg',
    url: '/docs/programma-kategoriya-b.pdf',
  },
  {
    id: 2,
    title: 'Программа повышения квалификации — АКПП',
    preview: '/docs/programma-akpp.jpg',
    url: '/docs/programma-akpp.pdf',
  },
  {
    id: 3,
    title: 'Программа переподготовки с «А» на «В»',
    preview: '/docs/programma-a-na-b.jpg',
    url: '/docs/programma-a-na-b.pdf',
  },
];

const ContactForm = () => {
  return (
    <section
      id="contact-form"
      className="section relative isolate overflow-hidden bg-[linear-gradient(180deg,#F6F5F1_0px,#0A1628_140px)] text-white !pt-48 md:!pt-56"
    >
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow -left-40 top-1/2 -z-10 h-[460px] w-[560px] bg-[#2A7FFF]/20" aria-hidden="true" />

      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <span className="eyebrow text-[#4DA8FF]">Заявка</span>
          <h2 className="h-section mt-5">
            Оставьте телефон — мы перезвоним через 20 минут
          </h2>
          <a
            href="https://vk.ru/timedrivesev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-10 w-full border-white/20 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/10 sm:w-auto"
          >
            <Icon name="MessageCircle" size={20} strokeWidth={1.5} />
            Хочу бесплатное занятие
          </a>
          <p className="mt-3 font-body text-sm text-night-mute">
            Первое занятие по теории — бесплатно
          </p>
        </Reveal>

        <Reveal index={1} className="md:col-span-7 md:pl-6 lg:pl-12">
          <div className="rounded-card border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm sm:p-8 md:p-10">
            <LeadForm idPrefix="cf" source="форма внизу" />
          </div>
        </Reveal>
      </div>

      <div className="wrap mt-24 md:mt-32">
        <Reveal className="flex flex-col gap-2 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading text-[28px] font-semibold tracking-[-0.025em] md:text-[36px]">
            Документы
          </h2>
          <p className="font-body text-sm text-night-mute">Нажмите на документ, чтобы открыть его</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {DOCS.map((doc, i) => (
            <Reveal key={doc.id} index={i}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift group block overflow-hidden rounded-card border border-white/10 bg-white/[0.04]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  <img
                    src={doc.preview}
                    alt={doc.title}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-quint group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-start gap-2.5 p-4">
                  <Icon name="FileText" size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-[#4DA8FF]" />
                  <span className="font-body text-[13px] font-medium leading-snug text-night-text">{doc.title}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
