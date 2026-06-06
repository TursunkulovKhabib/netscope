import { motion } from "framer-motion";

const stackItems = [
    {
        title: "Frontend",
        text: "React, Vite, React Router, Framer Motion.",
    },
    {
        title: "Styling",
        text: "Кастомный CSS с адаптивной сеткой, карточками, glow-эффектами и анимациями.",
    },
    {
        title: "Deployment",
        text: "Docker, Nginx и публичный доступ по HTTPS после деплоя.",
    },
];

const projectFeatures = [
    "Главная страница с обзором темы и анимированными секциями.",
    "Раздел по теории сетей: OSI, TCP/IP, DNS, TCP, UDP, HTTP и HTTPS.",
    "Раздел по безопасности: TLS, сертификаты, MITM и базовые практики защиты.",
    "Отдельная страница документации для демонстрации структуры и запуска проекта.",
];

const projectStructure = [
    "src/App.jsx — общий layout и маршрутизация между страницами.",
    "src/components/Header.jsx — верхняя навигация сайта.",
    "src/components/Footer.jsx — нижний информационный блок.",
    "src/pages/HomePage.jsx — главная страница.",
    "src/pages/TheoryPage.jsx — теоретический раздел.",
    "src/pages/SecurityPage.jsx — раздел по сетевой безопасности.",
    "src/pages/DocsPage.jsx — документация проекта.",
    "src/styles/global.css — общие стили, анимации и адаптивность.",
];

const runSteps = [
    "npm install",
    "npm install react-router-dom framer-motion",
    "npm run dev",
];

const dockerSteps = [
    "docker compose up --build",
    "После сборки сайт будет доступен через контейнер Nginx.",
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

export default function DocsPage() {
    return (
        <section className="docs-page">
            <motion.section
                className="page-hero docs-hero"
                initial="hidden"
                animate="show"
                variants={pageReveal}
            >
                <div className="page-hero-grid">
                    <div>
                        <div className="hero-badge">Раздел 3 · Документация</div>
                        <h1>Документация проекта NetScope</h1>
                        <p className="page-hero-text">
                            Эта страница нужна для описания назначения сайта, его структуры,
                            используемых технологий и способов запуска. Такой формат удобно
                            показывать на защите, потому что здесь в одном месте собрана вся
                            инженерная часть проекта.
                        </p>
                    </div>

                    <div className="info-panel docs-panel">
                        <div className="info-panel-top">
                            <span className="small-chip">Docs</span>
                            <span className="small-chip">Docker</span>
                            <span className="small-chip">GitHub</span>
                        </div>

                        <div className="info-panel-body">
                            <div className="info-metric">
                                <span className="info-metric-value">4</span>
                                <span className="info-metric-label">основные страницы</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">React</span>
                                <span className="info-metric-label">frontend-основа</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">Docker</span>
                                <span className="info-metric-label">контейнеризация проекта</span>
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
                    <p className="section-kicker">Назначение</p>
                    <h2>О чём этот проект</h2>
                    <p className="section-description">
                        NetScope — это учебный веб-проект по сетевым технологиям, в котором
                        теория, безопасность и структура реализации собраны в одном
                        современном интерфейсе.
                    </p>
                </motion.div>

                <motion.article
                    className="feature-card feature-card-large"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <div className="feature-tag">Project Goal</div>
                    <h3>Цель проекта</h3>
                    <p>
                        Основная цель сайта — в понятной визуальной форме объяснить, как
                        работают компьютерные сети, какие протоколы лежат в основе веба и
                        почему защита трафика стала обязательной частью любой публичной
                        системы.
                    </p>
                </motion.article>
            </section>

            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Технологии</p>
                    <h2>Что используется в проекте</h2>
                    <p className="section-description">
                        Ниже перечислен стек, на котором собран сайт и который удобно
                        показать на защите.
                    </p>
                </motion.div>

                <div className="feature-grid">
                    {stackItems.map((item, index) => (
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
                            <div className="feature-tag">Stack</div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
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
                        <p className="section-kicker">Функционал</p>
                        <h2>Что реализовано на сайте</h2>
                        <p className="section-description">
                            Эта часть особенно полезна для защиты проекта, потому что здесь
                            кратко и структурно перечислено всё, что умеет сайт.
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
                            {projectFeatures.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>
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
                        <p className="section-kicker">Структура</p>
                        <h2>Организация файлов проекта</h2>
                        <p className="section-description">
                            Здесь показана упрощённая структура React-проекта, чтобы проверяющему
                            было ясно, где расположены страницы, компоненты и стили.
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
                            <div>Файл</div>
                            <div>Назначение</div>
                            <div>Роль</div>
                        </div>

                        {projectStructure.map((item, index) => {
                            const parts = item.split(" — ");
                            return (
                                <div className="compare-row" key={index}>
                                    <div className="compare-title">{parts[0]}</div>
                                    <div>{parts[1] || "—"}</div>
                                    <div>Структурный элемент проекта</div>
                                </div>
                            );
                        })}
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
                    <p className="section-kicker">Запуск</p>
                    <h2>Как запустить проект</h2>
                    <p className="section-description">
                        Ниже приведены команды для локального запуска и для контейнеризации.
                    </p>
                </motion.div>

                <div className="docs-run-grid">
                    <motion.article
                        className="protocol-card"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                        custom={0}
                    >
                        <h3>Локальный запуск</h3>
                        <div className="code-block">
                            {runSteps.join("\n")}
                        </div>
                    </motion.article>

                    <motion.article
                        className="protocol-card"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                        custom={1}
                    >
                        <h3>Docker</h3>
                        <div className="code-block">
                            {dockerSteps.join("\n")}
                        </div>
                    </motion.article>
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
                        <p className="section-kicker">Ссылки</p>
                        <h2>Полезные ссылки</h2>
                        <p className="section-description">
                            Здесь собраны основные ссылки на исходный код проекта и опубликованную версию сайта.
                        </p>
                    </div>

                    <div className="docs-links">
                        <a
                            href="https://github.com/TursunkulovKhabib/netscope"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button button-primary"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://netscope-inky.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button button-secondary"
                        >
                            Публичный деплой
                        </a>
                    </div>
                </div>
            </motion.section>
        </section>
    );
}