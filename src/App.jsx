import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage    from "./pages/HomePage";
import TheoryPage  from "./pages/TheoryPage";
import IpPage      from "./pages/IpPage";
import RoutingPage from "./pages/RoutingPage";
import SecurityPage from "./pages/SecurityPage";
import AiQuizPage  from "./pages/AiQuizPage";
import DocsPage    from "./pages/DocsPage";

const pageVariants = {
    initial: { opacity: 0, y: 16, filter: "blur(8px)" },
    animate: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0, y: -10, filter: "blur(6px)",
        transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
    },
};

function AnimatedPage({ children }) {
    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-motion">
            {children}
        </motion.div>
    );
}

export default function App() {
    const location = useLocation();
    return (
        <div className="app-shell">
            <div className="page-background">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
                <div className="bg-grid" />
            </div>
            <Header />
            <main className="container main-content">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/"         element={<AnimatedPage><HomePage /></AnimatedPage>} />
                        <Route path="/theory"   element={<AnimatedPage><TheoryPage /></AnimatedPage>} />
                        <Route path="/ip"       element={<AnimatedPage><IpPage /></AnimatedPage>} />
                        <Route path="/routing"  element={<AnimatedPage><RoutingPage /></AnimatedPage>} />
                        <Route path="/security" element={<AnimatedPage><SecurityPage /></AnimatedPage>} />
                        <Route path="/quiz"     element={<AnimatedPage><AiQuizPage /></AnimatedPage>} />
                        <Route path="/docs"     element={<AnimatedPage><DocsPage /></AnimatedPage>} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}
