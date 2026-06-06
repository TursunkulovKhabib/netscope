import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const introBlocks = [
    {
        kicker: "Адресация",
        title: "IPv4 и IPv6",
        text:
            "IPv4 — четыре числа от 0 до 255, разделённые точками. Это 4 байта, то есть около 4 миллиардов уникальных адресов. IPv6 использует 128 бит и записывается шестнадцатеричными группами, решая проблему нехватки адресов IPv4.",
    },
    {
        kicker: "Маска подсети",
        title: "Как работает маска",
        text:
            "Маска подсети разделяет IP-адрес на две части: сетевую (общую для всех устройств в подсети) и хостовую (уникальную для каждого устройства). Например, маска /24 означает, что первые 24 бита — адрес сети, а оставшиеся 8 — адрес хоста.",
    },
    {
        kicker: "CIDR",
        title: "Бесклассовая адресация",
        text:
            "CIDR (Classless Inter-Domain Routing) позволяет гибко задавать размер подсети через префикс: 192.168.1.0/24. Число после слэша — количество бит в сетевой части. Это удобнее и экономичнее, чем старые классы A, B, C.",
    },
];

const ipTypes = [
    {
        type: "Частный (Private)",
        ranges: "10.0.0.0/8 · 172.16.0.0/12 · 192.168.0.0/16",
        desc: "Используется внутри локальных сетей. Не маршрутизируется в интернете. Ваш домашний Wi-Fi — именно здесь.",
        accent: "#4f98a3",
    },
    {
        type: "Публичный (Public)",
        ranges: "Всё, что не входит в частные диапазоны",
        desc: "Уникален в глобальном масштабе. Именно по такому адресу сервер доступен из любой точки мира.",
        accent: "#6daa45",
    },
    {
        type: "Loopback",
        ranges: "127.0.0.0/8 (обычно 127.0.0.1)",
        desc: "Адрес самого устройства. Используется для тестирования сетевого стека без отправки трафика в сеть.",
        accent: "#e8af34",
    },
    {
        type: "APIPA / Link-local",
        ranges: "169.254.0.0/16",
        desc: "Назначается автоматически, если DHCP недоступен. Работает только в пределах одного сегмента сети.",
        accent: "#a86fdf",
    },
];

const subnetExamples = [
    { cidr: "/8",  mask: "255.0.0.0",       hosts: "16 777 214" },
    { cidr: "/16", mask: "255.255.0.0",     hosts: "65 534" },
    { cidr: "/24", mask: "255.255.255.0",   hosts: "254" },
    { cidr: "/25", mask: "255.255.255.128", hosts: "126" },
    { cidr: "/28", mask: "255.255.255.240", hosts: "14" },
    { cidr: "/30", mask: "255.255.255.252", hosts: "2" },
];

const dhcpSteps = [
    { step: "1", title: "DISCOVER", desc: "Устройство отправляет широковещательный запрос в поисках DHCP-сервера." },
    { step: "2", title: "OFFER",    desc: "Сервер отвечает предложением: IP-адрес, маска, шлюз, DNS, срок аренды." },
    { step: "3", title: "REQUEST",  desc: "Устройство подтверждает, что принимает предложенный адрес." },
    { step: "4", title: "ACK",      desc: "Сервер подтверждает выдачу и фиксирует аренду адреса за этим устройством." },
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

export default function IpPage() {
    return (
        <section className="theory-page">
            {/* HERO */}
            <motion.section
                className="page-hero"
                initial="hidden"
                animate="show"
                variants={pageReveal}
            >
                <div className="page-hero-grid">
                    <div>
                        <div className="hero-badge">Раздел 2 · IP-адресация</div>
                        <h1>IP-адреса, маски и подсети</h1>
                        <p className="page-hero-text">
                            Каждое устройство в сети получает адрес. Маска делит его на сетевую
                            и хостовую часть. CIDR позволяет точно управлять диапазонами адресов.
                            Без этих понятий невозможно понять, как пакет находит получателя.
                        </p>
                    </div>

                    <div className="info-panel">
                        <div className="info-panel-top">
                            <span className="small-chip">IPv4</span>
                            <span className="small-chip">IPv6</span>
                            <span className="small-chip">CIDR</span>
                        </div>
                        <div className="info-panel-body">
                            <div className="info-metric">
                                <span className="info-metric-value">32</span>
                                <span className="info-metric-label">бита в IPv4</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">128</span>
                                <span className="info-metric-label">бита в IPv6</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">4B+</span>
                                <span className="info-metric-label">адресов IPv4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* INTRO CARDS */}
            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden" whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Базовые понятия</p>
                    <h2>Как адресуются устройства</h2>
                    <p className="section-description">
                        IP-адрес, маска и CIDR — три кита адресации. Вместе они определяют, в
                        какой сети находится устройство и как к нему добраться.
                    </p>
                </motion.div>

                <div className="theory-feature-grid">
                    {introBlocks.map((item, index) => (
                        <motion.article
                            key={item.title}
                            className="feature-card feature-card-large"
                            initial="hidden" whileInView="show"
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

            {/* IP TYPES */}
            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden" whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Типы адресов</p>
                    <h2>Частные, публичные и специальные</h2>
                    <p className="section-description">
                        Не все IP-адреса одинаковы. Одни предназначены для локальных сетей,
                        другие — для глобального интернета, третьи зарезервированы для
                        специальных задач.
                    </p>
                </motion.div>

                <div className="protocol-grid">
                    {ipTypes.map((item, index) => (
                        <motion.article
                            key={item.type}
                            className="protocol-card"
                            style={{ borderTop: `3px solid ${item.accent}` }}
                            initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        >
                            <h3>{item.type}</h3>
                            <code style={{ fontSize: "0.78rem", opacity: 0.7, display: "block", marginBottom: "0.5rem" }}>{item.ranges}</code>
                            <p>{item.desc}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* SUBNET TABLE */}
            <section className="content-section">
                <div className="compare-layout">
                    <motion.div
                        className="compare-intro"
                        initial="hidden" whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                    >
                        <p className="section-kicker">Подсети</p>
                        <h2>CIDR и размер сети</h2>
                        <p className="section-description">
                            Чем больше префикс (число после /), тем меньше хостов помещается в
                            подсеть. /24 — стандарт для домашних и офисных сетей,
                            /30 — минимум для соединения двух маршрутизаторов.
                        </p>
                    </motion.div>

                    <motion.div
                        className="compare-table"
                        initial="hidden" whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                        custom={1}
                    >
                        <div className="compare-row compare-head">
                            <div>Префикс</div>
                            <div>Маска</div>
                            <div>Хостов</div>
                        </div>
                        {subnetExamples.map((row) => (
                            <div className="compare-row" key={row.cidr}>
                                <div className="compare-title">{row.cidr}</div>
                                <div><code>{row.mask}</code></div>
                                <div>{row.hosts}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* DHCP STEPS */}
            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden" whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">DHCP</p>
                    <h2>Как устройство получает адрес автоматически</h2>
                    <p className="section-description">
                        DHCP избавляет от ручной настройки: устройство подключается к сети и
                        за 4 шага получает все необходимые параметры.
                    </p>
                </motion.div>

                <div className="layers-stack">
                    {dhcpSteps.map((item, index) => (
                        <motion.article
                            key={item.step}
                            className="layer-card"
                            initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                        >
                            <div className="layer-level">{item.step}</div>
                            <div className="layer-content">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <motion.section
                className="cta-section"
                initial="hidden" whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={pageReveal}
            >
                <div className="cta-card">
                    <div>
                        <p className="section-kicker">Следующий раздел</p>
                        <h2>Разобрались с адресами — теперь о маршрутизации</h2>
                        <p className="section-description">
                            Следующая страница объясняет, как роутеры и коммутаторы направляют
                            пакеты от источника к получателю через сети разных уровней.
                        </p>
                    </div>
                    <div className="cta-actions">
                        <Link to="/routing" className="button button-primary">Маршрутизация →</Link>
                        <Link to="/theory" className="button button-secondary">← Теория</Link>
                    </div>
                </div>
            </motion.section>
        </section>
    );
}
