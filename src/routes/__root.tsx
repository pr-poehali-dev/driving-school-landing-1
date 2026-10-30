import type {ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import NotFound from "@/pages/NotFound";
import appCss from "@/index.css?url";

const TITLE = "Автошкола Время рулить — обучение вождению в Севастополе, Балаклаве, Инкермане";
const DESCRIPTION =
    "Автошкола «Время рулить» в Севастополе. Цена 64 000 ₽ — всё включено: 58 часов практики, бензин, сдача экзамена в ГИБДД. Инструктор-женщина. Автодром на Стахановцева, 18. Рассрочка без банков.";
const KEYWORDS =
    "автошкола Севастополь, обучение вождению Севастополь, автошкола Балаклава, автошкола Инкерман, инструктор женщина Севастополь, обучение на автомате Севастополь, ГИБДД экзамен Севастополь";
const OG_TITLE = "Автошкола Время рулить — Севастополь";
const OG_DESCRIPTION =
    "Обучение вождению в Севастополе. 64 000 ₽ всё включено. Инструктор-женщина. Автодром. Рассрочка без банков.";
const OG_IMAGE = "https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg";

const LD_SCHOOL = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: "Автошкола «Время рулить»",
    url: "https://timedrivesev.ru",
    telephone: "+7-978-502-11-13",
    priceRange: "64000 RUB",
    description:
        "Автошкола в Севастополе. Обучение вождению на МКПП и АКПП. Инструктор-женщина по запросу. Автодром на Стахановцева, 18.",
    image: OG_IMAGE,
    logo: "https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png",
    address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Хрусталева, 177А, ТЦ «Адиз»",
        addressLocality: "Севастополь",
        addressRegion: "Севастополь",
        addressCountry: "RU",
    },
    geo: {"@type": "GeoCoordinates", latitude: 44.5946, longitude: 33.5225},
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "10:00",
            closes: "18:00",
        },
    ],
    offers: {
        "@type": "Offer",
        name: "Полный курс обучения вождению",
        price: "64000",
        priceCurrency: "RUB",
        description: "Теория + 58 часов практики + бензин + сдача экзамена в ГИБДД. Никаких доплат.",
    },
    aggregateRating: {"@type": "AggregateRating", ratingValue: "5", reviewCount: "3", bestRating: "5"},
    sameAs: ["https://vk.ru/timedrivesev"],
};

const faq = (name: string, text: string) => ({
    "@type": "Question",
    name,
    acceptedAnswer: {"@type": "Answer", text},
});

const LD_FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        faq(
            "Сколько длится обучение в автошколе Время рулить?",
            "Стандартный курс — 2,5 месяца. Это наше главное преимущество. Можно быстрее за счёт интенсивного графика. Мы гибко подстраиваемся: можно учиться 2–3 раза в неделю или интенсивно каждый день.",
        ),
        faq(
            "Нужно ли проходить медкомиссию перед обучением?",
            "Да, медицинская справка нужна до начала обучения. Подскажем, где пройти быстро и без очередей.",
        ),
        faq(
            "Что входит в стоимость 64 000 рублей?",
            "Всё: теория, 58 часов практики с бензином, сдача экзаменов в ГИБДД. Никаких доплат за пересдачи или топливо.",
        ),
        faq(
            "Можно ли учиться на автомате (АКПП) в Севастополе?",
            "Да! Мы работаем с обоими типами КПП — МКПП и АКПП. При записи просто уточните — подберём машину.",
        ),
        faq(
            "Что будет, если не сдам экзамен в ГИБДД с первого раза?",
            "Работаем до результата. Дополнительные занятия проводим бесплатно — у нас нет конвейера.",
        ),
        faq(
            "Есть ли рассрочка на обучение в автошколе?",
            "Да, без банков. Первый взнос — 15 000 ₽. Остаток разбиваем удобным образом.",
        ),
        faq(
            "Можно ли выбрать инструктора-женщину?",
            "Конечно. У нас есть инструктор-женщина для тех, кто стесняется. Просто скажите при записи.",
        ),
        faq(
            "Где находится автодром автошколы?",
            "Автодром — Стахановцева, 18. Инструктор встречает на остановке Хрюкина на Острякова и отвозит на автодром — идти пешком не нужно.",
        ),
    ],
};

const METRIKA = `(function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(101026698, "init", { trustedDomains: ["poehali.dev"], clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true, trackHash: true });`;

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            {title: TITLE},
            {name: "description", content: DESCRIPTION},
            {name: "keywords", content: KEYWORDS},
            {name: "author", content: "poehali.dev"},
            {property: "og:title", content: OG_TITLE},
            {property: "og:description", content: OG_DESCRIPTION},
            {property: "og:type", content: "website"},
            {property: "og:locale", content: "ru_RU"},
            {property: "og:image", content: OG_IMAGE},
            {property: "og:image:alt", content: "Автошкола Время рулить — обучение вождению в Севастополе"},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:image", content: OG_IMAGE},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&family=Golos+Text:wght@400;500;600;700&display=swap",
            },
            {rel: "stylesheet", href: appCss},
            {rel: "icon", type: "image/svg+xml", href: "/favicon.svg"},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {type: "application/ld+json", children: JSON.stringify(LD_SCHOOL)},
            {type: "application/ld+json", children: JSON.stringify(LD_FAQ)},
            {children: METRIKA},
        ],
    }),
    component: RootComponent,
    notFoundComponent: NotFound,
});

function RootComponent() {
    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <Outlet/>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <noscript>
            <div><img src="https://mc.yandex.ru/watch/101026698" style={{position: "absolute", left: "-9999px"}} alt=""/></div>
        </noscript>
        <Scripts/>
        </body>
        </html>
    );
}