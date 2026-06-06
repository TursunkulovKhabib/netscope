import { motion } from "framer-motion";

const stackItems = [
    {
        title: "Frontend",
        text: "React 19, Vite 6, React Router DOM 7, Framer Motion 12.",
    },
    {
        title: "Styling",
        text: "Кастомный CSS с адаптивной сеткой, карточками, glow-эффектами и анимациями. Две таблицы стилей: global.css и quiz.css.",
    },
    {
        title: "Backend (Serverless)",
        text: "Vercel Edge Functions (Node.js runtime). API-маршрут /api/quiz проксирует запросы к OpenAI.",
    },
    {
        title: "AI",
        text: "OpenAI GPT-4o-mini через REST API. Поддерживается любой OpenAI-совместимый прокси (например, proxyapi.ru для доступа из РФ).",
    },
    {
        title: "Deployment",
        text: "Vercel — основной способ деплоя с поддержкой Edge Functions. Docker + Nginx — альтернатива для статики без AI.",
    },
];

const projectFeatures = [
    "Главная страница с обзором тематики и анимированными секциями.",
    "Раздел теории: модель OSI, TCP/IP, DNS, HTTP/HTTPS с подробным разбором протоколов.",
    "Раздел IP-адресации: IPv4, маски подсетей, CIDR, NAT.",
    "Раздел маршрутизации: статическая и динамическая маршрутизация, протоколы RIP, OSPF, BGP.",
    "Раздел безопасности: TLS, сертификаты X.509, атаки MITM и базовые практики защиты.",
    "AI Quiz Lab — генерация уникальных тестов с помощью GPT-4o-mini по выбранным темам, сложности и параметрам.",
    "Документация проекта с описанием стека, структуры и способов запуска.",
];

const projectStructure = [
    { file: "api/quiz.js", desc: "Vercel Edge Function — прокси к OpenAI API", role: "Backend" },
    { file: "src/App.jsx", desc: "Общий layout, анимации переходов, маршрутизация", role: "Core" },
    { file: "src/main.jsx", desc: "Точка входа, подключение стилей и провайдеров", role: "Core" },
    { file: "src/components/Header.jsx", desc: "Верхняя навигация сайта", role: "Component" },
    { file: "src/components/Footer.jsx", desc: "Нижний информационный блок", role: "Component" },
    { file: "src/components/ScrollToTop.jsx", desc: "Сброс скролла при навигации", role: "Component" },
    { file: "src/pages/HomePage.jsx", desc: "Главная страница", role: "Page" },
    { file: "src/pages/TheoryPage.jsx", desc: "Теория: OSI, TCP/IP, DNS, HTTP/HTTPS", role: "Page" },
    { file: "src/pages/IpPage.jsx", desc: "IP-адресация, маски, CIDR, NAT", role: "Page" },
    { file: "src/pages/RoutingPage.jsx", desc: "Маршрутизация, RIP, OSPF, BGP", role: "Page" },
    { file: "src/pages/SecurityPage.jsx", desc: "Сетевая безопасность, TLS, MITM", role: "Page" },
    { file: "src/pages/AiQuizPage.jsx", desc: "AI Quiz Lab — генерация тестов через GPT", role: "Page" },
    { file: "src/pages/DocsPage.jsx", desc: "Документация проекта", role: "Page" },
    { file: "src/styles/global.css", desc: "Общие стили, токены, адаптивность", role: "Style" },
    { file: "src/styles/quiz.css", desc: "Стили AI Quiz Lab", role: "Style" },
    { file: "vercel.json", desc: "Конфигурация Vercel: маршруты и Edge Functions", role: "Config" },
    { file: "Dockerfile + docker-compose.yml", desc: "Контейнеризация через Docker + Nginx", role: "Config" },
];

const runSteps = [
    "npm install",
    "npm run dev",
];

const dockerSteps = [
    "docker compose up --build",
    "# Сайт доступен на http://localhost (порт 80)",
    "# Примечание: /api/quiz не работает в Docker-режиме —",
    "# Edge Functions требуют Vercel.",
];

const vercelSteps = [
    "# 1. Задай переменную окружения в Vercel:",
    "#    Settings → Environment Variables",
    "#    OPENAI_API_KEY = sk-proj-...",
    "",
    "# 2. Для России используй proxyapi.ru:",
    "#    OPENAI_API_KEY = <ключ от proxyapi.ru>",
    "#    URL в api/quiz.js:",
    "#    https://api.proxyapi.ru/openai/v1/chat/completions",
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
                        <div className="hero-badge">Документация</div>
                        <h1>Документация проекта NetScope</h1>
                        <p className="page-hero-text">
                            Назначение сайта, архитектура, стек технологий, структура файлов
                            и инструкции по запуску. Удобно показывать на защите — здесь
                            собрана вся инженерная часть проекта.
                        </p>
                    </div>

                    <div className="info-panel docs-panel">
                        <div className="info-panel-top">
                            <span className="small-chip">Docs</span>
                            <span className="small-chip">Docker</span>
                            <span className="small-chip">Vercel</span>
                        </div>

                        <div className="info-panel-body">
                            <div className="info-metric">
                                <span className="info-metric-value">7</span>
                                <span className="info-metric-label">страниц</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">GPT</span>
                                <span className="info-metric-label">AI Quiz Lab</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">Edge</span>
                                <span className="info-metric-label">serverless API</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* О проекте */}
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
                        NetScope — учебный веб-проект по компьютерным сетям и сетевой безопасности.
                        Теория, интерактивные разделы и AI-тестирование собраны в одном современном интерфейсе.
                        Разработан в рамках учебного курса ВШПИ, 2 курс.
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
                        В понятной визуальной форме объяснить, как работают компьютерные сети,
                        какие протоколы лежат в основе веба и почему защита трафика стала
                        обязательной частью любой публичной системы. Дополнительно реализован
                        AI Quiz Lab — модуль генерации персонализированных тестов на основе GPT-4o-mini.
                    </p>
                </motion.article>
            </section>

            {/* Что реализовано */}
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
                            Краткий перечень всего, что умеет сайт — удобно для демонстрации
                            на защите проекта.
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

            {/* Стек */}
            <section className="content-section">
                <motion.div
                    className="section-heading"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={pageReveal}
                >
                    <p className="section-kicker">Технологии</p>
                    <h2>Стек проекта</h2>
                    <p className="section-description">
                        Полный набор инструментов, на котором собран NetScope.
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

            {/* Структура файлов */}
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
                            Все ключевые файлы проекта с указанием назначения и роли в архитектуре.
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

                        {projectStructure.map((item, index) => (
                            <div className="compare-row" key={index}>
                                <div className="compare-title">{item.file}</div>
                                <div>{item.desc}</div>
                                <div>{item.role}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Запуск */}
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
                        Три варианта запуска: локально, через Docker и через Vercel с AI.
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

                    <motion.article
                        className="protocol-card"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={pageReveal}
                        custom={2}
                    >
                        <h3>Vercel + AI Quiz</h3>
                        <div className="code-block">
                            {vercelSteps.join("\n")}
                        </div>
                    </motion.article>
                </div>
            </section>

            {/* CTA */}
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
                        <h2>Исходный код и деплой</h2>
                        <p className="section-description">
                            Репозиторий проекта на GitHub и публично доступная версия сайта на Vercel.
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
