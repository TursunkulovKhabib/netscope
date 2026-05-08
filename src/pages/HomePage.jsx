import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const topicCards = [
    {
        title: "Протоколы",
        text: "Разбор TCP, UDP, HTTP, HTTPS, DNS и того, как они взаимодействуют друг с другом в реальной сети.",
        tag: "Core",
    },
    {
        title: "Сетевая модель",
        text: "Понятное объяснение OSI и TCP/IP без перегруза терминами, но с нормальной инженерной логикой.",
        tag: "Architecture",
    },
    {
        title: "Безопасность",
        text: "TLS, сертификаты, MITM, защита трафика и причины, почему HTTPS стал обязательным стандартом.",
        tag: "Security",
    },
];

const requestFlow = [
    {
        step: "01",
        title: "Пользователь вводит адрес",
        text: "Браузер получает URL и начинает подготовку к обращению к удалённому ресурсу.",
    },
    {
        step: "02",
        title: "DNS ищет IP-адрес",
        text: "Доменное имя преобразуется в IP-адрес сервера, чтобы стало понятно, куда отправлять запрос.",
    },
    {
        step: "03",
        title: "Устанавливается соединение",
        text: "Клиент открывает соединение, а при HTTPS ещё и запускает защищённый TLS-обмен.",
    },
    {
        step: "04",
        title: "Сервер возвращает ответ",
        text: "Сервер обрабатывает запрос и отправляет HTML, JSON, файлы или другие данные обратно клиенту.",
    },
];

const highlights = [
    {
        value: "4",
        label: "страницы",
        text: "Компактная структура без лишнего шума: главная, теория, безопасность и документация.",
    },
    {
        value: "10+",
        label: "ключевых тем",
        text: "От моделей сети и адресации до HTTPS, TLS и типовых сетевых атак.",
    },
    {
        value: "100%",
        label: "учебный фокус",
        text: "Сайт сделан так, чтобы его было удобно и показывать, и объяснять на защите.",
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

export default function HomePage() {
    return (
        <section className="home-page">
            <motion.section
                className="hero-section"
                initial="hidden"
                animate="show"
                variants={pageReveal}
            >
                <div className="hero-grid">
                    <div className="hero-copy">
                        <motion.div
                            className="hero-badge"
                            variants={pageReveal}
                            custom={0}
                        >
                            Учебный проект по сетевым технологиям
                        </motion.div>

                        <motion.h1 variants={pageReveal} custom={1}>
                            NetScope — современный сайт о компьютерных сетях, протоколах и
                            безопасности
                        </motion.h1>

                        <motion.p
                            className="hero-description"
                            variants={pageReveal}
                            custom={2}
                        >
                            Проект помогает понять, как данные движутся от клиента к серверу,
                            зачем нужны DNS и порты, в чём разница между TCP и UDP и почему
                            HTTPS критически важен для защищённой передачи информации.
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            variants={pageReveal}
                            custom={3}
                        >
                            <Link to="/theory" className="button button-primary">
                                Изучать теорию
                            </Link>
                            <Link to="/security" className="button button-secondary">
                                Смотреть безопасность
                            </Link>
                        </motion.div>

                        <motion.div
                            className="hero-mini-stats"
                            variants={pageReveal}
                            custom={4}
                        >
                            <div className="hero-stat">
                                <span className="hero-stat-value">OSI</span>
                                <span className="hero-stat-label">модель уровней</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">TLS</span>
                                <span className="hero-stat-label">защита трафика</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">DNS</span>
                                <span className="hero-stat-label">адресация и доступ</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hero-panel"
                        initial={{ opacity: 0, scale: 0.96, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="hero-panel-header">
                            <span className="panel-dot panel-dot-red" />
                            <span className="panel-dot panel-dot-yellow" />
                            <span className="panel-dot panel-dot-green" />
                        </div>

                        <div className="hero-terminal">
                            <p>$ nslookup netscope.dev</p>
                            <p>Server: 8.8.8.8</p>
                            <p>Address: 93.184.216.34</p>
                            <p className="terminal-accent">$ curl https://netscope.dev</p>
                            <p>HTTP/2 200 OK</p>
                            <p>TLS handshake completed</p>
                            <p>Content-Type: text/html</p>
                        </div>

                        <div className="hero-panel-footer">
                            <div className="hero-chip">DNS</div>
                            <div className="hero-chip">HTTPS</div>
                            <div className="hero-chip">TLS</div>
                            <div className="hero-chip">Routing</div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Что есть на сайте</p>
                    <h2>Ключевые темы, собранные в одном месте</h2>
                    <p className="section-description">
                        Главная идея проекта — не просто перечислить термины, а выстроить
                        понятную карту сетевых технологий для обучения и демонстрации.
                    </p>
                </motion.div>

                <div className="feature-grid">
                    {topicCards.map((card, index) => (
                        <motion.article
                            key={card.title}
                            className="feature-card"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        >
                            <div className="feature-tag">{card.tag}</div>
                            <h3>{card.title}</h3>
                            <p>{card.text}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Как это работает</p>
                    <h2>Путь сетевого запроса от браузера к серверу</h2>
                    <p className="section-description">
                        Этот блок можно удобно показывать на защите, потому что он быстро
                        объясняет базовую механику взаимодействия клиента и сервера.
                    </p>
                </motion.div>

                <div className="request-flow">
                    {requestFlow.map((item, index) => (
                        <motion.article
                            key={item.step}
                            className="flow-card"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                        >
                            <div className="flow-step">{item.step}</div>
                            <div className="flow-content">
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <div className="stats-layout">
                    <motion.div
                        className="stats-panel"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                    >
                        <p className="section-kicker">Преимущества проекта</p>
                        <h2>Компактно, наглядно и удобно для демонстрации</h2>
                        <p className="section-description">
                            Формат из четырёх страниц помогает не распыляться и показать
                            проверяющему и содержательную часть, и инженерную упаковку проекта.
                        </p>
                    </motion.div>

                    <div className="stats-cards">
                        {highlights.map((item, index) => (
                            <motion.article
                                key={item.label}
                                className="stat-card"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={pageReveal}
                                custom={index}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            >
                                <div className="stat-value">{item.value}</div>
                                <div className="stat-label">{item.label}</div>
                                <p>{item.text}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <motion.section
                className="cta-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={pageReveal}
            >
                <div className="cta-card">
                    <div>
                        <p className="section-kicker">Следующий шаг</p>
                        <h2>Перейди к теории или сразу посмотри раздел по безопасности</h2>
                        <p className="section-description">
                            Дальше можно углубиться в модели сети, протоколы, DNS, HTTPS, TLS
                            и типовые сценарии защиты данных.
                        </p>
                    </div>

                    <div className="cta-actions">
                        <Link to="/theory" className="button button-primary">
                            Открыть теорию
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