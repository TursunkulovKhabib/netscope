import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const navItems = [
    { to: "/",          label: "Главная" },
    { to: "/theory",    label: "Теория" },
    { to: "/ip",        label: "IP-адресация" },
    { to: "/routing",   label: "Маршрутизация" },
    { to: "/security",  label: "Безопасность" },
    { to: "/quiz",      label: "AI Quiz" },
    { to: "/glossary",  label: "Глоссарий" },
    { to: "/docs",      label: "Документация" },
];

function SunIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

export default function Header() {
    const { theme, toggle } = useTheme();
    const isDark = theme === "dark";

    return (
        <motion.header
            className="site-header"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container header-inner">
                <NavLink to="/" className="brand" aria-label="Перейти на главную страницу NetScope">
                    <motion.div
                        className="brand-mark"
                        whileHover={{ rotate: -8, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    >
                        <span className="brand-mark-core" />
                        <span className="brand-mark-ring" />
                    </motion.div>
                    <div className="brand-copy">
                        <span className="brand-title">NetScope</span>
                        <span className="brand-subtitle">Сетевые технологии и безопасность</span>
                    </div>
                </NavLink>

                <nav className="nav" aria-label="Основная навигация">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.to}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.07 * index, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                            >
                                {item.label}
                            </NavLink>
                        </motion.div>
                    ))}
                </nav>

                <div className="header-actions">
                    <motion.button
                        className="theme-toggle"
                        onClick={toggle}
                        aria-label={isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                        <span className="theme-toggle-track">
                            <motion.span
                                className="theme-toggle-thumb"
                                animate={{ x: isDark ? 22 : 0 }}
                                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                            />
                        </span>
                        <span className="theme-toggle-icon theme-toggle-icon--sun">
                            <SunIcon />
                        </span>
                        <span className="theme-toggle-icon theme-toggle-icon--moon">
                            <MoonIcon />
                        </span>
                    </motion.button>

                    <motion.a
                        href="https://github.com/TursunkulovKhabib/netscope"
                        target="_blank" rel="noopener noreferrer"
                        className="header-cta"
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                        GitHub
                    </motion.a>
                </div>
            </div>
        </motion.header>
    );
}
