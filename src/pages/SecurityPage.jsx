import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const securityCards = [
    {
        title: "TLS",
        text:
            "TLS — это криптографический протокол, который обеспечивает защищённую передачу данных между клиентом и сервером. Он отвечает за шифрование, проверку подлинности и целостность передаваемой информации.",
        tag: "Encryption",
    },
    {
        title: "HTTPS",
        text:
            "HTTPS — это HTTP поверх TLS. Он защищает веб-трафик от прослушивания и подмены, а также подтверждает, что соединение действительно установлено с тем сервером, с которым хочет работать пользователь.",
        tag: "Web Security",
    },
    {
        title: "Сертификаты",
        text:
            "Цифровой сертификат подтверждает подлинность домена и сервера. Браузер проверяет его, чтобы убедиться, что пользователь не подключается к поддельному ресурсу.",
        tag: "Trust",
    },
];

const attackTimeline = [
    {
        title: "Пользователь подключается к сети",
        text:
            "Если соединение не защищено должным образом, злоумышленник может попытаться встроиться в канал передачи данных.",
    },
    {
        title: "Трафик перехватывается",
        text:
            "При MITM-атаке атакующий становится промежуточным узлом между клиентом и сервером и получает возможность наблюдать или менять данные.",
    },
    {
        title: "Данные подменяются или читаются",
        text:
            "Если трафик не зашифрован, можно узнать логины, пароли, содержимое запросов и другую конфиденциальную информацию.",
    },
    {
        title: "TLS снижает риск",
        text:
            "При корректной настройке HTTPS и сертификатов подмена и чтение трафика значительно усложняются или становятся невозможными.",
    },
];

const threatList = [
    "Перехват логинов, паролей и cookie.",
    "Подмена содержимого страниц и ответов сервера.",
    "Фишинг через поддельные домены и ложные сертификаты.",
    "Утечка персональных данных при передаче по HTTP.",
    "Компрометация сессии пользователя в небезопасной сети.",
];

const bestPractices = [
    {
        title: "Использовать HTTPS везде",
        text:
            "Даже если сайт кажется простым, любая передача данных через HTTP создаёт риск утечки и подмены трафика.",
    },
    {
        title: "Следить за сертификатами",
        text:
            "Сертификат должен быть валидным, соответствовать домену и вовремя обновляться, иначе браузеры начнут предупреждать о риске.",
    },
    {
        title: "Не игнорировать предупреждения браузера",
        text:
            "Ошибка сертификата — это не формальность. Она может означать подмену сайта, просроченный сертификат или неверную настройку сервера.",
    },
    {
        title: "Обновлять сервер и зависимости",
        text:
            "Устаревшее ПО может содержать уязвимости, которые делают даже HTTPS-сайт менее защищённым.",
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

export default function SecurityPage() {
    return (
        <section className="security-page">
            <motion.section
                className="page-hero security-hero"
                initial="hidden"
                animate="show"
                variants={pageReveal}
            >
                <div className="page-hero-grid">
                    <div>
                        <div className="hero-badge">Раздел 2 · Безопасность</div>
                        <h1>Почему защита трафика в сети так важна</h1>
                        <p className="page-hero-text">
                            Современные сетевые сервисы должны не только передавать данные, но
                            и защищать их от перехвата, подмены и несанкционированного доступа.
                            Поэтому HTTPS, TLS и корректная работа с сертификатами стали
                            обязательной частью любой публичной веб-системы.
                        </p>
                    </div>

                    <div className="info-panel security-panel">
                        <div className="info-panel-top">
                            <span className="small-chip">HTTPS</span>
                            <span className="small-chip">TLS</span>
                            <span className="small-chip">MITM</span>
                        </div>

                        <div className="info-panel-body">
                            <div className="info-metric">
                                <span className="info-metric-value">443</span>
                                <span className="info-metric-label">порт HTTPS</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">TLS</span>
                                <span className="info-metric-label">шифрование канала</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">MITM</span>
                                <span className="info-metric-label">угроза перехвата</span>
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
                    <p className="section-kicker">Ключевые элементы</p>
                    <h2>Что защищает соединение между клиентом и сервером</h2>
                    <p className="section-description">
                        Безопасность веб-приложения начинается не с красивого интерфейса, а с
                        доверенного и защищённого канала связи.
                    </p>
                </motion.div>

                <div className="feature-grid">
                    {securityCards.map((item, index) => (
                        <motion.article
                            key={item.title}
                            className="feature-card"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        >
                            <div className="feature-tag">{item.tag}</div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
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
                        <p className="section-kicker">Сценарий атаки</p>
                        <h2>Как работает MITM-атака</h2>
                        <p className="section-description">
                            Man-in-the-Middle — это ситуация, при которой злоумышленник
                            оказывается между клиентом и сервером и пытается контролировать
                            передачу данных.
                        </p>
                    </motion.div>

                    <div className="request-flow">
                        {attackTimeline.map((item, index) => (
                            <motion.article
                                key={item.title}
                                className="flow-card"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={pageReveal}
                                custom={index}
                            >
                                <div className="flow-step">{String(index + 1).padStart(2, "0")}</div>
                                <div className="flow-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
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
                        <p className="section-kicker">Чем это опасно</p>
                        <h2>Основные риски небезопасного соединения</h2>
                        <p className="section-description">
                            Если трафик не защищён, атакующий может не только читать данные, но
                            и менять содержимое ответов, подменять страницы и вмешиваться в
                            пользовательскую сессию.
                        </p>
                    </motion.div>

                    <motion.div
                        className="threat-box"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                        custom={1}
                    >
                        <ul className="threat-list">
                            {threatList.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
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
                    <p className="section-kicker">Практика</p>
                    <h2>Базовые правила сетевой защиты</h2>
                    <p className="section-description">
                        Эти рекомендации пригодятся и для реального веб-проекта, и для
                        оформления учебной работы.
                    </p>
                </motion.div>

                <div className="protocol-grid">
                    {bestPractices.map((item, index) => (
                        <motion.article
                            key={item.title}
                            className="protocol-card"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={pageReveal}
                            custom={index}
                            whileHover={{ y: -6 }}
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
                        <p className="section-kicker">Для защиты проекта</p>
                        <h2>Документация должна идти рядом с технической реализацией</h2>
                        <p className="section-description">
                            Для учебной сдачи важно показать не только красивый сайт, но и
                            отдельную документацию: стек, структуру, запуск, Docker и ссылку на GitHub.
                        </p>
                    </div>

                    <div className="cta-actions">
                        <Link to="/docs" className="button button-primary">
                            Открыть документацию
                        </Link>
                        <Link to="/theory" className="button button-secondary">
                            Вернуться к теории
                        </Link>
                    </div>
                </div>
            </motion.section>
        </section>
    );
}