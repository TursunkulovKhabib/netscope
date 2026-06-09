import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Статичный глоссарий ──────────────────────────────────────────────────────
const TERMS = [
    {
        term: "TCP",
        short: "Transmission Control Protocol",
        definition:
            "Протокол транспортного уровня, обеспечивающий надёжную, упорядоченную и проверенную доставку потока байт между приложениями.",
        tags: ["Транспортный уровень", "OSI L4"],
    },
    {
        term: "UDP",
        short: "User Datagram Protocol",
        definition:
            "Протокол транспортного уровня без установления соединения. Не гарантирует доставку, порядок или целостность — но работает быстро.",
        tags: ["Транспортный уровень", "OSI L4"],
    },
    {
        term: "IP",
        short: "Internet Protocol",
        definition:
            "Протокол сетевого уровня, отвечающий за адресацию и маршрутизацию пакетов между хостами в сети.",
        tags: ["Сетевой уровень", "OSI L3"],
    },
    {
        term: "DNS",
        short: "Domain Name System",
        definition:
            "Иерархическая распределённая система, преобразующая доменные имена (например, google.com) в IP-адреса.",
        tags: ["Прикладной уровень", "OSI L7"],
    },
    {
        term: "HTTP",
        short: "HyperText Transfer Protocol",
        definition:
            "Протокол прикладного уровня для передачи гипертекста. Основа обмена данными в World Wide Web.",
        tags: ["Прикладной уровень", "OSI L7"],
    },
    {
        term: "HTTPS",
        short: "HTTP Secure",
        definition:
            "Расширение HTTP с шифрованием через TLS/SSL. Обеспечивает конфиденциальность, целостность и аутентификацию при передаче данных.",
        tags: ["Прикладной уровень", "Безопасность"],
    },
    {
        term: "TLS",
        short: "Transport Layer Security",
        definition:
            "Криптографический протокол, обеспечивающий безопасную связь поверх транспортного уровня. Пришёл на замену SSL.",
        tags: ["Безопасность", "Шифрование"],
    },
    {
        term: "SSL",
        short: "Secure Sockets Layer",
        definition:
            "Устаревший криптографический протокол (предшественник TLS), обеспечивавший шифрование соединений между клиентом и сервером.",
        tags: ["Безопасность", "Устаревший"],
    },
    {
        term: "OSI",
        short: "Open Systems Interconnection",
        definition:
            "Семиуровневая эталонная модель сетевого взаимодействия: физический, канальный, сетевой, транспортный, сеансовый, представления, прикладной.",
        tags: ["Модели"],
    },
    {
        term: "MAC-адрес",
        short: "Media Access Control Address",
        definition:
            "Уникальный 48-битный идентификатор сетевого интерфейса, назначаемый производителем оборудования. Работает на канальном уровне.",
        tags: ["Канальный уровень", "OSI L2"],
    },
    {
        term: "NAT",
        short: "Network Address Translation",
        definition:
            "Механизм, позволяющий нескольким устройствам в локальной сети выходить в интернет через один публичный IP-адрес.",
        tags: ["Маршрутизация", "Адресация"],
    },
    {
        term: "DHCP",
        short: "Dynamic Host Configuration Protocol",
        definition:
            "Протокол автоматического назначения IP-адресов, маски подсети, шлюза и DNS-серверов устройствам в сети.",
        tags: ["Прикладной уровень", "Адресация"],
    },
    {
        term: "BGP",
        short: "Border Gateway Protocol",
        definition:
            "Протокол динамической маршрутизации между автономными системами. Основа маршрутизации в глобальном интернете.",
        tags: ["Маршрутизация", "OSI L3"],
    },
    {
        term: "OSPF",
        short: "Open Shortest Path First",
        definition:
            "Протокол динамической маршрутизации внутри одной автономной системы. Использует алгоритм Дейкстры для нахождения кратчайшего пути.",
        tags: ["Маршрутизация", "OSI L3"],
    },
    {
        term: "VLAN",
        short: "Virtual Local Area Network",
        definition:
            "Технология логического разделения физической сети на несколько изолированных виртуальных сетей без дополнительного оборудования.",
        tags: ["Канальный уровень", "OSI L2"],
    },
    {
        term: "MTU",
        short: "Maximum Transmission Unit",
        definition:
            "Максимальный размер одного пакета данных, который может быть передан по сетевому интерфейсу без фрагментации. Стандартно — 1500 байт.",
        tags: ["Производительность"],
    },
    {
        term: "TTL",
        short: "Time To Live",
        definition:
            "Счётчик в IP-пакете, уменьшаемый на 1 каждым маршрутизатором. При достижении 0 пакет отбрасывается — это предотвращает бесконечную маршрутизацию.",
        tags: ["Сетевой уровень", "OSI L3"],
    },
    {
        term: "ICMP",
        short: "Internet Control Message Protocol",
        definition:
            "Вспомогательный протокол сетевого уровня для передачи диагностических сообщений и сообщений об ошибках. Используется командой ping.",
        tags: ["Сетевой уровень", "Диагностика"],
    },
    {
        term: "ARP",
        short: "Address Resolution Protocol",
        definition:
            "Протокол, позволяющий определить MAC-адрес устройства по известному IP-адресу в пределах одной локальной сети.",
        tags: ["Канальный уровень", "OSI L2"],
    },
    {
        term: "Firewall",
        short: "Межсетевой экран",
        definition:
            "Система сетевой безопасности, контролирующая входящий и исходящий трафик на основе заданных правил. Первый рубеж защиты сети.",
        tags: ["Безопасность"],
    },
    {
        term: "VPN",
        short: "Virtual Private Network",
        definition:
            "Технология создания зашифрованного туннеля между клиентом и сервером поверх публичной сети, обеспечивающая конфиденциальность трафика.",
        tags: ["Безопасность", "Шифрование"],
    },
    {
        term: "CDN",
        short: "Content Delivery Network",
        definition:
            "Географически распределённая сеть серверов, кэширующих контент ближе к пользователям для уменьшения задержки и нагрузки на источник.",
        tags: ["Инфраструктура", "Производительность"],
    },
    {
        term: "Subnet",
        short: "Подсеть",
        definition:
            "Логически разделённый сегмент IP-сети. Маскирование подсети позволяет разбить адресное пространство на более мелкие управляемые блоки.",
        tags: ["Адресация", "OSI L3"],
    },
    {
        term: "MITM",
        short: "Man-in-the-Middle",
        definition:
            "Атака, при которой злоумышленник перехватывает и при необходимости модифицирует трафик между двумя сторонами без их ведома.",
        tags: ["Безопасность", "Атаки"],
    },
    {
        term: "Latency",
        short: "Задержка",
        definition:
            "Время, необходимое пакету данных для прохождения от источника до получателя. Измеряется в миллисекундах. Ключевая метрика качества сети.",
        tags: ["Производительность"],
    },
    {
        term: "Bandwidth",
        short: "Полоса пропускания",
        definition:
            "Максимальный объём данных, который может быть передан по каналу связи за единицу времени. Измеряется в бит/с (bps).",
        tags: ["Производительность"],
    },
    {
        term: "Port",
        short: "Порт",
        definition:
            "16-битное число (0–65535) в заголовке TCP/UDP, идентифицирующее конкретный процесс или службу на хосте.",
        tags: ["Транспортный уровень", "Адресация"],
    },
    {
        term: "Packet",
        short: "Пакет",
        definition:
            "Единица данных сетевого уровня, содержащая заголовок с адресами источника и назначения, и полезную нагрузку.",
        tags: ["Сетевой уровень", "OSI L3"],
    },
    {
        term: "Router",
        short: "Маршрутизатор",
        definition:
            "Устройство сетевого уровня, передающее пакеты между различными сетями на основании таблицы маршрутизации.",
        tags: ["Оборудование", "Маршрутизация"],
    },
    {
        term: "Switch",
        short: "Коммутатор",
        definition:
            "Устройство канального уровня, коммутирующее фреймы между портами одной локальной сети на основании MAC-адресов.",
        tags: ["Оборудование", "OSI L2"],
    },
];

const ALL_TAGS = ["Все", ...Array.from(new Set(TERMS.flatMap((t) => t.tags))).sort()];

const pageReveal = {
    hidden: { opacity: 0, y: 28 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
    }),
};

// ── Markdown-рендерер (только нужные теги) ───────────────────────────────────
function renderMarkdown(text) {
    return text
        .split("\n")
        .map((line, i) => {
            if (line.startsWith("## "))
                return <h4 key={i} className="gloss-ai-heading">{line.slice(3)}</h4>;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i} className="gloss-ai-paragraph">{line}</p>;
        });
}

// ── Карточка термина ─────────────────────────────────────────────────────────
function TermCard({ item, index }) {
    const [aiOpen,   setAiOpen]   = useState(false);
    const [aiText,   setAiText]   = useState("");
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState("");
    const panelRef = useRef(null);

    async function handleAiExplain() {
        if (aiOpen) { setAiOpen(false); return; }
        if (aiText)  { setAiOpen(true);  return; }

        setLoading(true);
        setError("");
        setAiOpen(true);

        try {
            const res = await fetch("/api/glossary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ term: item.term }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Ошибка сервера");
            setAiText(data.content);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.article
            className="gloss-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={pageReveal}
            custom={index}
            layout
        >
            <div className="gloss-card-header">
                <div className="gloss-card-title-row">
                    <span className="gloss-term">{item.term}</span>
                    <span className="gloss-short">{item.short}</span>
                </div>
                <div className="gloss-tags">
                    {item.tags.map((tag) => (
                        <span key={tag} className="gloss-tag">{tag}</span>
                    ))}
                </div>
            </div>

            <p className="gloss-definition">{item.definition}</p>

            <button
                className={`gloss-ai-btn${aiOpen ? " gloss-ai-btn-active" : ""}`}
                onClick={handleAiExplain}
                aria-expanded={aiOpen}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
                    <path d="M12 8v4l3 3"/>
                </svg>
                {aiOpen ? "Скрыть" : "Объяснить через ИИ"}
            </button>

            <AnimatePresence>
                {aiOpen && (
                    <motion.div
                        ref={panelRef}
                        className="gloss-ai-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {loading && (
                            <div className="gloss-ai-loading">
                                <span className="gloss-ai-spinner" />
                                ИИ думает...
                            </div>
                        )}
                        {error && <p className="gloss-ai-error">{error}</p>}
                        {!loading && !error && aiText && (
                            <div className="gloss-ai-content">
                                {renderMarkdown(aiText)}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}

// ── Главный компонент ────────────────────────────────────────────────────────
export default function GlossaryPage() {
    const [query,      setQuery]      = useState("");
    const [activeTag,  setActiveTag]  = useState("Все");
    const inputRef = useRef(null);

    const filtered = TERMS.filter((t) => {
        const matchTag = activeTag === "Все" || t.tags.includes(activeTag);
        const q = query.toLowerCase();
        const matchQuery =
            q === "" ||
            t.term.toLowerCase().includes(q) ||
            t.short.toLowerCase().includes(q) ||
            t.definition.toLowerCase().includes(q);
        return matchTag && matchQuery;
    });

    return (
        <section className="glossary-page">
            {/* Hero */}
            <motion.section
                className="page-hero glossary-hero"
                initial="hidden"
                animate="show"
                variants={pageReveal}
            >
                <div className="page-hero-grid">
                    <div>
                        <div className="hero-badge">Глоссарий</div>
                        <h1>Технический глоссарий</h1>
                        <p className="page-hero-text">
                            30 ключевых терминов компьютерных сетей с точными определениями.
                            Нажми «Объяснить через ИИ» — и GPT объяснит термин простыми словами
                            с примерами из жизни.
                        </p>
                    </div>

                    <div className="info-panel glossary-panel">
                        <div className="info-panel-top">
                            <span className="small-chip">30 терминов</span>
                            <span className="small-chip">GPT-4o-mini</span>
                        </div>
                        <div className="info-panel-body">
                            <div className="info-metric">
                                <span className="info-metric-value">{TERMS.length}</span>
                                <span className="info-metric-label">терминов</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">{ALL_TAGS.length - 1}</span>
                                <span className="info-metric-label">категорий</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">AI</span>
                                <span className="info-metric-label">объяснение</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Поиск + фильтры */}
            <section className="content-section">
                <motion.div
                    className="gloss-controls"
                    initial="hidden"
                    animate="show"
                    variants={pageReveal}
                    custom={1}
                >
                    <div className="gloss-search-wrap">
                        <svg className="gloss-search-icon" width="18" height="18"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" aria-hidden="true">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="M21 21l-4.35-4.35"/>
                        </svg>
                        <input
                            ref={inputRef}
                            className="gloss-search"
                            type="text"
                            placeholder="Поиск по термину, расшифровке или определению..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Поиск по глоссарию"
                        />
                        {query && (
                            <button
                                className="gloss-search-clear"
                                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                                aria-label="Очистить поиск"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6 6 18M6 6l12 12"/>
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="gloss-tags-bar" role="group" aria-label="Фильтр по категориям">
                        {ALL_TAGS.map((tag) => (
                            <button
                                key={tag}
                                className={`gloss-filter-btn${activeTag === tag ? " active" : ""}`}
                                onClick={() => setActiveTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Счётчик */}
                <motion.p
                    className="gloss-count"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {filtered.length === TERMS.length
                        ? `${TERMS.length} терминов`
                        : `${filtered.length} из ${TERMS.length} терминов`}
                </motion.p>

                {/* Сетка */}
                <AnimatePresence mode="popLayout">
                    {filtered.length === 0 ? (
                        <motion.div
                            key="empty"
                            className="gloss-empty"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <p>Ничего не найдено по запросу «{query}»</p>
                            <button
                                className="button button-secondary"
                                onClick={() => { setQuery(""); setActiveTag("Все"); }}
                            >
                                Сбросить фильтры
                            </button>
                        </motion.div>
                    ) : (
                        <div className="gloss-grid">
                            {filtered.map((item, index) => (
                                <TermCard key={item.term} item={item} index={index} />
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </section>
        </section>
    );
}
