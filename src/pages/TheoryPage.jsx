import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const theoryBlocks = [
    {
        kicker: "Сетевая модель",
        title: "OSI и TCP/IP",
        text:
            "Модель OSI делит сетевое взаимодействие на уровни, чтобы было проще понимать роль каждого этапа передачи данных. На практике чаще используют стек TCP/IP, но идея уровневой архитектуры остаётся той же: каждый слой решает свою задачу и взаимодействует с соседними.",
    },
    {
        kicker: "Адресация",
        title: "IP-адреса, домены и DNS",
        text:
            "IP-адрес позволяет определить устройство в сети, а доменное имя делает адрес удобным для человека. DNS связывает эти два мира: когда пользователь вводит домен, система ищет соответствующий IP-адрес, чтобы браузер понял, куда отправлять запрос.",
    },
    {
        kicker: "Транспорт",
        title: "TCP и UDP",
        text:
            "TCP нужен там, где важны надёжность, порядок доставки и контроль потерь. UDP легче и быстрее, поэтому часто используется в сценариях, где критична скорость: потоковая передача, голосовая связь, онлайн-игры и телеметрия.",
    },
];

const osiLayers = [
    {
        level: "7",
        name: "Прикладной",
        desc: "Интерфейс взаимодействия приложений с сетью: HTTP, HTTPS, DNS, SMTP.",
    },
    {
        level: "4",
        name: "Транспортный",
        desc: "Доставка данных между узлами с помощью TCP и UDP.",
    },
    {
        level: "3",
        name: "Сетевой",
        desc: "Маршрутизация пакетов и работа с IP-адресами.",
    },
    {
        level: "2",
        name: "Канальный",
        desc: "Передача кадров в пределах локальной сети, работа MAC-адресов.",
    },
    {
        level: "1",
        name: "Физический",
        desc: "Сигналы, кабели, радиоканал и физическая среда передачи.",
    },
];

const compareItems = [
    {
        label: "Надёжность",
        tcp: "Гарантирует доставку и порядок пакетов.",
        udp: "Не гарантирует доставку и порядок.",
    },
    {
        label: "Скорость",
        tcp: "Чуть медленнее из-за контроля соединения.",
        udp: "Быстрее за счёт минимальных накладных расходов.",
    },
    {
        label: "Сценарии",
        tcp: "Веб, почта, загрузка файлов, API.",
        udp: "Стриминг, VoIP, онлайн-игры, телеметрия.",
    },
];

const protocolCards = [
    {
        title: "HTTP",
        text:
            "Протокол передачи гипертекста, через который браузер и сервер обмениваются запросами и ответами.",
    },
    {
        title: "HTTPS",
        text:
            "HTTP поверх TLS. Даёт шифрование, проверку подлинности сервера и защиту от подмены трафика.",
    },
    {
        title: "DNS",
        text:
            "Преобразует доменное имя в IP-адрес и помогает клиенту найти нужный сервер в сети.",
    },
    {
        title: "DHCP",
        text:
            "Автоматически выдаёт устройствам сетевые параметры: IP-адрес, шлюз, DNS и маску.",
    },
];

const pageReveal = {
    hidden: { opacity: 0, y: 28 },
    show: (index = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            delay: index * 0.08,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function TheoryPage() {
    return (
        <section className="theory-page">
            <motion.section
                className="page-hero"
                initial="hidden"
                animate="show"
                variants={pageReveal}
            >
                <div className="page-hero-grid">
                    <div>
                        <div className="hero-badge">Раздел 1 · Теория</div>
                        <h1>Основы сетевых технологий</h1>
                        <p className="page-hero-text">
                            Эта страница объясняет базовые сетевые концепции: уровневую модель,
                            адресацию, транспортные протоколы и принципы работы HTTP, HTTPS и DNS.
                            Материал построен так, чтобы его было удобно использовать и для
                            самостоятельного изучения, и для показа на защите проекта.
                        </p>
                    </div>

                    <div className="info-panel">
                        <div className="info-panel-top">
                            <span className="small-chip">OSI</span>
                            <span className="small-chip">TCP/IP</span>
                            <span className="small-chip">DNS</span>
                        </div>

                        <div className="info-panel-body">
                            <div className="info-metric">
                                <span className="info-metric-value">7</span>
                                <span className="info-metric-label">уровней в OSI</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">443</span>
                                <span className="info-metric-label">стандартный HTTPS-порт</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">53</span>
                                <span className="info-metric-label">типичный порт DNS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Базовые идеи</p>
                    <h2>С чего начинается понимание сети</h2>
                    <p className="section-description">
                        Сетевые технологии проще изучать не как набор случайных терминов, а
                        как связанную систему: уровни, адресация, маршрутизация, доставка и
                        прикладные протоколы.
                    </p>
                </motion.div>

                <div className="theory-feature-grid">
                    {theoryBlocks.map((item, index) => (
                        <motion.article
                            key={item.title}
                            className="feature-card feature-card-large"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        >
                            <div className="feature-tag">{item.kicker}</div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Уровни</p>
                    <h2>Как устроена модель OSI</h2>
                    <p className="section-description">
                        Ниже — упрощённый взгляд на ключевые уровни, которые чаще всего
                        обсуждаются в учебных проектах по сетям.
                    </p>
                </motion.div>

                <div className="layers-stack">
                    {osiLayers.map((layer, index) => (
                        <motion.article
                            key={layer.level}
                            className="layer-card"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                        >
                            <div className="layer-level">{layer.level}</div>
                            <div className="layer-content">
                                <h3>{layer.name}</h3>
                                <p>{layer.desc}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <div className="compare-layout">
                    <motion.div
                        className="compare-intro"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                    >
                        <p className="section-kicker">Сравнение</p>
                        <h2>TCP и UDP</h2>
                        <p className="section-description">
                            Эти два транспортных протокола решают разные задачи, поэтому выбор
                            между ними зависит не от того, какой “лучше”, а от того, что важнее:
                            надёжность или минимальная задержка.
                        </p>
                    </motion.div>

                    <motion.div
                        className="compare-table"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                        custom={1}
                    >
                        <div className="compare-row compare-head">
                            <div>Критерий</div>
                            <div>TCP</div>
                            <div>UDP</div>
                        </div>

                        {compareItems.map((item) => (
                            <div className="compare-row" key={item.label}>
                                <div className="compare-title">{item.label}</div>
                                <div>{item.tcp}</div>
                                <div>{item.udp}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Прикладной уровень</p>
                    <h2>Протоколы, которые видит пользователь</h2>
                    <p className="section-description">
                        Эти протоколы чаще всего встречаются в повседневной работе интернета и
                        напрямую связаны с браузерами, сайтами и сетевой инфраструктурой.
                    </p>
                </motion.div>

                <div className="protocol-grid">
                    {protocolCards.map((item, index) => (
                        <motion.article
                            key={item.title}
                            className="protocol-card"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            <motion.section
                className="cta-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={pageReveal}
            >
                <div className="cta-card">
                    <div>
                        <p className="section-kicker">Дальше по теме</p>
                        <h2>После теории логично перейти к безопасности сети</h2>
                        <p className="section-description">
                            Следующий раздел показывает, как HTTPS, TLS, сертификаты и защита от
                            MITM связаны с теми сетевыми принципами, которые ты только что увидел.
                        </p>
                    </div>

                    <div className="cta-actions">
                        <Link to="/security" className="button button-primary">
                            Открыть безопасность
                        </Link>
                        <Link to="/docs" className="button button-secondary">
                            Открыть документацию
                        </Link>
                    </div>
                </div>
            </motion.section>
        </section>
    );
}