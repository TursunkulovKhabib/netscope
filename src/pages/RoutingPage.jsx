import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const introBlocks = [
    {
        kicker: "Маршрутизация",
        title: "Как пакет находит путь",
        text:
            "Маршрутизатор смотрит в таблицу маршрутов и выбирает, через какой интерфейс отправить пакет дальше. Этот процесс повторяется на каждом узле, пока пакет не достигнет получателя или не будет отброшен.",
    },
    {
        kicker: "Коммутация",
        title: "Switch vs Router",
        text:
            "Коммутатор работает на канальном уровне OSI и соединяет устройства внутри одной сети по MAC-адресам. Маршрутизатор работает на сетевом уровне и соединяет разные сети по IP-адресам. В современных сетях они часто объединяются в одном устройстве.",
    },
    {
        kicker: "NAT",
        title: "Трансляция адресов",
        text:
            "NAT (Network Address Translation) позволяет всем устройствам домашней сети выходить в интернет через один публичный IP. Роутер подменяет исходный адрес пакета и отслеживает соответствия, чтобы вернуть ответ нужному устройству.",
    },
];

const devices = [
    {
        name: "Маршрутизатор (Router)",
        level: "Сетевой · L3",
        desc: "Соединяет разные сети, выбирает оптимальный путь по IP-адресу. Работает с протоколами маршрутизации: OSPF, BGP, RIP.",
    },
    {
        name: "Коммутатор (Switch)",
        level: "Канальный · L2",
        desc: "Соединяет устройства внутри одной сети по MAC-адресам. Управляемые коммутаторы поддерживают VLAN и QoS.",
    },
    {
        name: "Точка доступа (AP)",
        level: "Физический · L1",
        desc: "Обеспечивает беспроводной доступ к проводной сети. Поддерживает стандарты Wi-Fi: 802.11n, 802.11ac, 802.11ax (Wi‑Fi 6).",
    },
    {
        name: "Межсетевой экран (Firewall)",
        level: "L3 – L7",
        desc: "Фильтрует трафик по правилам: IP, порт, протокол, содержимое пакета. Бывает аппаратным, программным и облачным.",
    },
    {
        name: "Концентратор (Hub)",
        level: "Физический · L1",
        desc: "Устаревшее устройство: передаёт пакет на все порты без разбора. Сейчас заменён коммутаторами почти везде.",
    },
    {
        name: "Шлюз (Gateway)",
        level: "Все уровни",
        desc: "Соединяет сети с разными протоколами или архитектурами. Часто выполняет функции и маршрутизатора, и NAT.",
    },
];

const routingTypes = [
    {
        label: "Статическая",
        proto: "Ручная настройка",
        desc: "Маршруты задаются администратором вручную. Просто, предсказуемо, но не масштабируется.",
    },
    {
        label: "Динамическая",
        proto: "OSPF, BGP, RIP",
        desc: "Маршрутизаторы обмениваются информацией о сети и строят таблицы автоматически. Используется в крупных сетях.",
    },
    {
        label: "По умолчанию",
        proto: "Default route 0.0.0.0/0",
        desc: "Запасной маршрут: если нет подходящего, пакет идёт через шлюз по умолчанию. Обычно — в сторону провайдера.",
    },
];

const packetPath = [
    { step: "1", title: "Клиент",       desc: "Браузер формирует HTTP-запрос. ОС добавляет TCP-заголовок, IP-заголовок и передаёт на сетевой интерфейс." },
    { step: "2", title: "Домашний роутер", desc: "Выполняет NAT: заменяет приватный IP на публичный. Смотрит таблицу маршрутов и отправляет пакет провайдеру." },
    { step: "3", title: "Провайдер (ISP)", desc: "Маршрутизаторы провайдера направляют пакет в сторону сервера, используя протоколы динамической маршрутизации (BGP)." },
    { step: "4", title: "Интернет (backbone)", desc: "Транзитные маршрутизаторы магистральной сети передают пакет через несколько прыжков (hops) к нужному датацентру." },
    { step: "5", title: "Сервер",        desc: "Сервер получает пакет, обрабатывает запрос и отправляет ответ обратным путём через те же узлы." },
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

export default function RoutingPage() {
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
                        <div className="hero-badge">Раздел 3 · Маршрутизация</div>
                        <h1>Маршрутизация и сетевые устройства</h1>
                        <p className="page-hero-text">
                            Роутер, коммутатор, точка доступа и фаервол — каждый играет свою
                            роль в движении пакетов. Здесь объясняется, как они взаимодействуют
                            и как пакет проходит путь от браузера до сервера.
                        </p>
                    </div>

                    <div className="info-panel">
                        <div className="info-panel-top">
                            <span className="small-chip">Router</span>
                            <span className="small-chip">NAT</span>
                            <span className="small-chip">BGP</span>
                        </div>
                        <div className="info-panel-body">
                            <div className="info-metric">
                                <span className="info-metric-value">TTL</span>
                                <span className="info-metric-label">ограничивает прыжки</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">BGP</span>
                                <span className="info-metric-label">протокол интернета</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">NAT</span>
                                <span className="info-metric-label">один IP на всех</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* INTRO */}
            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden" whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Основы</p>
                    <h2>Маршрутизация, коммутация, NAT</h2>
                    <p className="section-description">
                        Прежде чем разбирать устройства, важно понять три базовые идеи,
                        которые лежат в основе любой сети.
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

            {/* DEVICES */}
            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden" whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Устройства</p>
                    <h2>Что стоит между тобой и интернетом</h2>
                    <p className="section-description">
                        Каждое сетевое устройство работает на определённом уровне OSI и решает
                        конкретную задачу. Смешивать их функции — распространённая ошибка.
                    </p>
                </motion.div>

                <div className="protocol-grid">
                    {devices.map((item, index) => (
                        <motion.article
                            key={item.name}
                            className="protocol-card"
                            initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        >
                            <h3>{item.name}</h3>
                            <code style={{ fontSize: "0.75rem", opacity: 0.6, display: "block", marginBottom: "0.5rem" }}>{item.level}</code>
                            <p>{item.desc}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* ROUTING TYPES TABLE */}
            <section className="content-section">
                <div className="compare-layout">
                    <motion.div
                        className="compare-intro"
                        initial="hidden" whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                    >
                        <p className="section-kicker">Протоколы</p>
                        <h2>Типы маршрутизации</h2>
                        <p className="section-description">
                            Маршруты могут задаваться вручную или строиться автоматически.
                            В крупных сетях без динамической маршрутизации не обойтись.
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
                            <div>Тип</div>
                            <div>Протокол</div>
                            <div>Описание</div>
                        </div>
                        {routingTypes.map((row) => (
                            <div className="compare-row" key={row.label}>
                                <div className="compare-title">{row.label}</div>
                                <div><code>{row.proto}</code></div>
                                <div>{row.desc}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* PACKET PATH */}
            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden" whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Путь пакета</p>
                    <h2>От браузера до сервера: пошагово</h2>
                    <p className="section-description">
                        Когда ты открываешь сайт, пакет проходит через несколько узлов.
                        Каждый узел принимает решение: куда передать пакет дальше.
                    </p>
                </motion.div>

                <div className="layers-stack">
                    {packetPath.map((item, index) => (
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
                        <h2>Маршруты проложены — теперь о безопасности</h2>
                        <p className="section-description">
                            Когда понятно, как пакеты путешествуют по сети, самое время
                            разобраться, как злоумышленники пытаются их перехватить — и как от
                            этого защититься.
                        </p>
                    </div>
                    <div className="cta-actions">
                        <Link to="/security" className="button button-primary">Безопасность →</Link>
                        <Link to="/ip" className="button button-secondary">← IP-адресация</Link>
                    </div>
                </div>
            </motion.section>
        </section>
    );
}
