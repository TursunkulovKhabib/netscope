import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
    { to: "/",        label: "Главная" },
    { to: "/theory",  label: "Теория" },
    { to: "/ip",      label: "IP-адресация" },
    { to: "/routing", label: "Маршрутизация" },
    { to: "/security",label: "Безопасность" },
    { to: "/quiz",    label: "AI Quiz" },
    { to: "/docs",    label: "Документация" },
];

export default function Header() {
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
        </motion.header>
    );
}
