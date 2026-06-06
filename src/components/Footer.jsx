import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const footerLinks = [
    { to: "/",        label: "Главная" },
    { to: "/theory",  label: "Теория" },
    { to: "/ip",      label: "IP-адресация" },
    { to: "/routing", label: "Маршрутизация" },
    { to: "/security",label: "Безопасность" },
    { to: "/quiz",    label: "AI Quiz" },
    { to: "/docs",    label: "Документация" },
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                <motion.div
                    className="footer-brand"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="footer-logo">
                        <span className="footer-logo-dot" />
                        <span className="footer-logo-line" />
                    </div>
                    <h3>NetScope</h3>
                    <p>
                        Учебный сайт по сетевым технологиям, протоколам, HTTPS, TLS,
                        сетевой безопасности и AI-тестированию.
                    </p>
                </motion.div>

                <motion.div
                    className="footer-column"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h4>Навигация</h4>
                    <ul className="footer-links">
                        {footerLinks.map((item) => (
                            <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="footer-column"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h4>Проект</h4>
                    <ul className="footer-links">
                        <li>
                            <a href="https://github.com/TursunkulovKhabib/netscope" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </li>
                        <li><Link to="/docs">Описание функционала</Link></li>
                        <li>
                            <span className="footer-text-muted">React + Vite + Motion + Docker</span>
                        </li>
                    </ul>
                </motion.div>
            </div>

            <div className="container footer-bottom">
                <p>© 2026 NetScope. Учебный проект по сетевым технологиям Турсункулова Х. Д.</p>
                <p>Сделано для демонстрации теории, безопасности и документации.</p>
            </div>
        </footer>
    );
}
