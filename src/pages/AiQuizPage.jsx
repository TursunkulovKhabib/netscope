import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOPICS = [
    { id: "osi",      label: "OSI",           icon: "🔗" },
    { id: "tcpip",   label: "TCP/IP",        icon: "📡" },
    { id: "dns",     label: "DNS",           icon: "🌐" },
    { id: "http",    label: "HTTP/HTTPS",    icon: "🔒" },
    { id: "ip",      label: "IP-адресация",  icon: "🗺️" },
    { id: "routing", label: "Маршрутизация", icon: "↗️" },
    { id: "security",label: "Безопасность",  icon: "🛡️" },
    { id: "tls",     label: "TLS/MITM",      icon: "⚡" },
];

const DIFFICULTIES = [
    { id: "easy",   label: "Лёгкий",  color: "var(--color-success)",      desc: "Базовые понятия" },
    { id: "medium", label: "Средний", color: "var(--color-gold)",          desc: "Для студентов" },
    { id: "hard",   label: "Сложный", color: "var(--color-notification)",  desc: "Углублённый" },
];

const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
    }),
};

const cardAnim = {
    hidden: { opacity: 0, scale: 0.97, y: 16 },
    show: (i = 0) => ({
        opacity: 1, scale: 1, y: 0,
        transition: { duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
    }),
    exit: { opacity: 0, scale: 0.97, y: -10, transition: { duration: 0.22 } },
};

function ProgressBar({ current, total }) {
    const pct = total ? Math.round((current / total) * 100) : 0;
    return (
        <div className="quiz-progress-wrap">
            <div className="quiz-progress-bar">
                <motion.div
                    className="quiz-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
            <span className="quiz-progress-label">{current} / {total}</span>
        </div>
    );
}

function ScoreRing({ percent }) {
    const color =
        percent >= 80 ? "var(--color-success)"
        : percent >= 50 ? "var(--color-gold)"
        : "var(--color-notification)";
    return (
        <div className="quiz-score-ring" style={{ "--ring-color": color, "--ring-pct": `${percent * 3.6}deg` }}>
            <div className="quiz-score-inner">
                <span className="quiz-score-num">{percent}%</span>
            </div>
        </div>
    );
}

export default function AiQuizPage() {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [difficulty,     setDifficulty]     = useState("medium");
    const [questionCount,  setQuestionCount]  = useState(5);
    const [optionCount,    setOptionCount]    = useState(4);
    const [multiAnswer,    setMultiAnswer]    = useState(false);
    const [extraPrompt,    setExtraPrompt]    = useState("");

    const [phase,     setPhase]     = useState("form");
    const [questions, setQuestions] = useState([]);
    const [answers,   setAnswers]   = useState({});
    const [error,     setError]     = useState("");
    const [history,   setHistory]   = useState([]);

    const [elapsed, setElapsed]   = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (phase === "quiz") {
            setElapsed(0);
            timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [phase]);

    const formatTime = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

    const toggleTopic = id =>
        setSelectedTopics(p => p.includes(id) ? p.filter(t => t !== id) : [...p, id]);

    const handleGenerate = async () => {
        if (!selectedTopics.length) { setError("Выбери хотя бы одну тему."); return; }
        setError(""); setPhase("loading");

        const topicLabels = TOPICS.filter(t => selectedTopics.includes(t.id)).map(t => t.label).join(", ");
        const diffLabel   = DIFFICULTIES.find(d => d.id === difficulty)?.label ?? difficulty;

        const systemPrompt = `Ты — генератор тестов по компьютерным сетям для студентов IT.
Строго отвечай ТОЛЬКО валидным JSON-массивом без markdown, без комментариев.
Формат каждого элемента:
{
  "question": "текст вопроса",
  "options": ["A", "B", "C", "D"],
  "correct": [0],
  "explanation": "краткое объяснение правильного ответа"
}
correct — массив индексов правильных ответов (0-based).`;

        const userPrompt = `Создай тест:
- Темы: ${topicLabels}
- Сложность: ${diffLabel}
- Количество вопросов: ${questionCount}
- Вариантов ответа в каждом: ${optionCount}
- Несколько правильных ответов: ${multiAnswer ? "да" : "нет"}
${extraPrompt ? `- Дополнительно: ${extraPrompt}` : ""}
Ответь только JSON-массивом.`;

        try {
            const res = await fetch("/api/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ systemPrompt, userPrompt }),
            });
            if (!res.ok) throw new Error(`Сервер вернул ${res.status}`);
            const data  = await res.json();
            const raw   = data.content ?? "";
            const match = raw.match(/\[\s*\{[\s\S]*\}\s*\]/);
            if (!match) throw new Error("Модель вернула неожиданный формат.");
            const parsed = JSON.parse(match[0]);
            setQuestions(parsed); setAnswers({}); setPhase("quiz");
        } catch (e) {
            setError(e.message || "Ошибка генерации. Проверь API-ключ."); setPhase("form");
        }
    };

    const toggleAnswer = (qIdx, oIdx) => {
        setAnswers(prev => {
            const cur = prev[qIdx] ?? [];
            if (multiAnswer) return { ...prev, [qIdx]: cur.includes(oIdx) ? cur.filter(x => x !== oIdx) : [...cur, oIdx] };
            return { ...prev, [qIdx]: [oIdx] };
        });
    };

    const handleSubmit = () => {
        const s = calcScore();
        setHistory(h => [{ topics: selectedTopics, difficulty, score: s.score, total: s.total, pct: s.pct, time: elapsed, date: new Date().toLocaleString("ru") }, ...h.slice(0, 4)]);
        setPhase("result");
    };

    const handleReset = () => { setPhase("form"); setQuestions([]); setAnswers({}); };

    const calcScore = () => {
        const score = questions.reduce((acc, q, i) => {
            const given   = (answers[i] ?? []).slice().sort().join(",");
            const correct = (q.correct ?? []).slice().sort().join(",");
            return acc + (given === correct ? 1 : 0);
        }, 0);
        return { score, total: questions.length, pct: questions.length ? Math.round((score / questions.length) * 100) : 0 };
    };

    const { score, total, pct: scorePercent } = calcScore();
    const answeredCount = Object.keys(answers).length;

    return (
        <section className="theory-page">

            {/* HERO */}
            <motion.section className="page-hero" initial="hidden" animate="show" variants={reveal}>
                <div className="page-hero-grid">
                    <div>
                        <div className="hero-badge">AI · Тестирование</div>
                        <h1>AI Quiz Lab</h1>
                        <p className="page-hero-text">
                            Настрой параметры — и ИИ мгновенно сгенерирует уникальный тест
                            по выбранным темам сетевых технологий. Никакого повторения.
                        </p>
                    </div>
                    <div className="info-panel">
                        <div className="info-panel-top">
                            <span className="small-chip">OpenAI GPT-4o</span>
                            <span className="small-chip">Авто</span>
                        </div>
                        <div className="info-panel-body">
                            <div className="info-metric">
                                <span className="info-metric-value">8</span>
                                <span className="info-metric-label">тем на выбор</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">∞</span>
                                <span className="info-metric-label">уникальных тестов</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">{history.length}</span>
                                <span className="info-metric-label">в истории</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* HISTORY */}
            {history.length > 0 && phase === "form" && (
                <motion.section className="content-section" initial="hidden" animate="show" variants={reveal} custom={0.5}>
                    <div className="section-heading">
                        <p className="section-kicker">Последние попытки</p>
                        <h2>История сессий</h2>
                    </div>
                    <div className="quiz-history">
                        {history.map((h, i) => (
                            <div key={i} className="quiz-history-card">
                                <div className="quiz-history-score" style={{ color: h.pct >= 80 ? "var(--color-success)" : h.pct >= 50 ? "var(--color-gold)" : "var(--color-notification)" }}>
                                    {h.pct}%
                                </div>
                                <div className="quiz-history-meta">
                                    <span>{h.score}/{h.total} верных</span>
                                    <span>⏱ {formatTime(h.time)}</span>
                                    <span className="quiz-history-date">{h.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            <AnimatePresence mode="wait">

                {/* FORM */}
                {phase === "form" && (
                    <motion.section key="form" className="content-section" initial="hidden" animate="show" exit="exit" variants={cardAnim}>

                        <div className="quiz-form-grid">

                            {/* Topics */}
                            <motion.div className="quiz-block" variants={reveal} custom={0}>
                                <p className="section-kicker">Шаг 1</p>
                                <h2>Выбери темы</h2>
                                <div className="quiz-topics">
                                    {TOPICS.map(t => (
                                        <button
                                            key={t.id}
                                            className={`quiz-chip ${selectedTopics.includes(t.id) ? "quiz-chip-active" : ""}`}
                                            onClick={() => toggleTopic(t.id)}
                                        >
                                            <span className="quiz-chip-icon">{t.icon}</span>
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                                {selectedTopics.length > 0 && (
                                    <p className="quiz-topics-counter">{selectedTopics.length} из {TOPICS.length} тем выбрано</p>
                                )}
                            </motion.div>

                            {/* Difficulty */}
                            <motion.div className="quiz-block" variants={reveal} custom={1}>
                                <p className="section-kicker">Шаг 2</p>
                                <h2>Сложность</h2>
                                <div className="quiz-difficulty">
                                    {DIFFICULTIES.map(d => (
                                        <button
                                            key={d.id}
                                            className={`quiz-diff-btn ${difficulty === d.id ? "quiz-diff-active" : ""}`}
                                            style={difficulty === d.id ? { borderColor: d.color, color: d.color, background: `color-mix(in oklch, ${d.color} 10%, var(--color-surface-offset))` } : {}}
                                            onClick={() => setDifficulty(d.id)}
                                        >
                                            <span className="quiz-diff-label">{d.label}</span>
                                            <span className="quiz-diff-desc">{d.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Params */}
                            <motion.div className="quiz-block" variants={reveal} custom={2}>
                                <p className="section-kicker">Шаг 3</p>
                                <h2>Параметры теста</h2>
                                <div className="quiz-params">
                                    <label className="quiz-param-label">
                                        <div className="quiz-param-row">
                                            <span>Вопросов</span>
                                            <strong className="quiz-param-val">{questionCount}</strong>
                                        </div>
                                        <input type="range" min={3} max={15} value={questionCount} onChange={e => setQuestionCount(+e.target.value)} className="quiz-range" />
                                        <div className="quiz-range-ticks"><span>3</span><span>9</span><span>15</span></div>
                                    </label>
                                    <label className="quiz-param-label">
                                        <div className="quiz-param-row">
                                            <span>Вариантов ответа</span>
                                            <strong className="quiz-param-val">{optionCount}</strong>
                                        </div>
                                        <input type="range" min={2} max={5} value={optionCount} onChange={e => setOptionCount(+e.target.value)} className="quiz-range" />
                                        <div className="quiz-range-ticks"><span>2</span><span>3</span><span>4</span><span>5</span></div>
                                    </label>
                                    <div className="quiz-toggle">
                                        <div>
                                            <span>Несколько правильных</span>
                                            <p className="quiz-toggle-desc">Можно выбрать несколько ответов</p>
                                        </div>
                                        <button
                                            className={`toggle-btn ${multiAnswer ? "toggle-btn-on" : ""}`}
                                            onClick={() => setMultiAnswer(v => !v)}
                                            aria-pressed={multiAnswer}
                                            aria-label="Несколько правильных ответов"
                                        >
                                            <span className="toggle-knob" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Extra prompt */}
                            <motion.div className="quiz-block quiz-block-full" variants={reveal} custom={3}>
                                <p className="section-kicker">Шаг 4 · необязательно</p>
                                <h2>Свободный промт</h2>
                                <p className="section-description" style={{ marginBottom: "var(--space-4)" }}>
                                    Опиши любые дополнительные требования к тесту в свободной форме.
                                </p>
                                <textarea
                                    className="quiz-textarea"
                                    placeholder="Например: сделай ловушки, сосредоточься на портах, добавь вопрос про TLS Handshake..."
                                    value={extraPrompt}
                                    onChange={e => setExtraPrompt(e.target.value)}
                                    rows={3}
                                />
                            </motion.div>

                            {error && (
                                <motion.p className="quiz-error" style={{ gridColumn: "1/-1" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    ⚠️ {error}
                                </motion.p>
                            )}

                            <motion.div className="quiz-block-full quiz-submit-row" variants={reveal} custom={4}>
                                <button
                                    className="button button-primary quiz-generate-btn"
                                    onClick={handleGenerate}
                                    disabled={!selectedTopics.length}
                                >
                                    Сгенерировать тест →
                                </button>
                                <p className="quiz-hint">Генерация занимает 5–15 секунд. Требуется OPENAI_API_KEY на сервере.</p>
                            </motion.div>

                        </div>
                    </motion.section>
                )}

                {/* LOADING */}
                {phase === "loading" && (
                    <motion.div key="loading" className="quiz-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="quiz-spinner" />
                        <p className="quiz-loading-text">ИИ генерирует тест<span className="quiz-dots" /></p>
                        <p className="quiz-hint">Анализирую темы и подбираю вопросы...</p>
                        <div className="quiz-loading-chips">
                            {TOPICS.filter(t => selectedTopics.includes(t.id)).map(t => (
                                <span key={t.id} className="small-chip">{t.icon} {t.label}</span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* QUIZ */}
                {phase === "quiz" && (
                    <motion.section key="quiz" className="content-section" initial="hidden" animate="show" exit="exit" variants={cardAnim}>

                        {/* Sticky header */}
                        <div className="quiz-sticky-header">
                            <div className="quiz-sticky-left">
                                <span className="section-kicker">В процессе · {questions.length} вопросов</span>
                                <ProgressBar current={answeredCount} total={questions.length} />
                            </div>
                            <div className="quiz-sticky-right">
                                <div className="quiz-timer">⏱ {formatTime(elapsed)}</div>
                                <button className="button button-secondary quiz-btn-sm" onClick={handleReset}>Отмена</button>
                                <button
                                    className="button button-primary quiz-btn-sm"
                                    onClick={handleSubmit}
                                    disabled={answeredCount < questions.length}
                                >
                                    Завершить →
                                </button>
                            </div>
                        </div>

                        <div className="quiz-questions">
                            {questions.map((q, qi) => (
                                <motion.article key={qi} className="quiz-question-card" variants={cardAnim} initial="hidden" animate="show" custom={qi}>
                                    <div className="quiz-q-num">
                                        <span className="quiz-q-badge">{qi + 1}</span>
                                        Вопрос {qi + 1} из {questions.length}
                                        {(answers[qi] ?? []).length > 0 && <span className="quiz-badge-ok">✓</span>}
                                    </div>
                                    <p className="quiz-q-text">{q.question}</p>
                                    <div className="quiz-options">
                                        {q.options.map((opt, oi) => {
                                            const selected = (answers[qi] ?? []).includes(oi);
                                            return (
                                                <button key={oi} className={`quiz-option ${selected ? "quiz-option-selected" : ""}`} onClick={() => toggleAnswer(qi, oi)}>
                                                    <span className="quiz-option-letter">{String.fromCharCode(65 + oi)}</span>
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        <div className="quiz-submit-row">
                            <button className="button button-primary" onClick={handleSubmit} disabled={answeredCount < questions.length}>
                                Проверить результат →
                            </button>
                            <button className="button button-secondary" onClick={handleReset}>Новый тест</button>
                            <span className="quiz-hint">{answeredCount} из {questions.length} отвечено</span>
                        </div>

                    </motion.section>
                )}

                {/* RESULT */}
                {phase === "result" && (
                    <motion.section key="result" className="content-section" initial="hidden" animate="show" exit="exit" variants={cardAnim}>

                        <motion.div className="quiz-score-card" variants={reveal} custom={0}>
                            <ScoreRing percent={scorePercent} />
                            <div className="quiz-score-text">
                                <h2>{scorePercent >= 80 ? "Отличный результат! 🎉" : scorePercent >= 50 ? "Неплохо, но есть что повторить" : "Стоит повторить материал 📚"}</h2>
                                <p className="section-description">
                                    Правильных ответов: <strong>{score}</strong> из <strong>{total}</strong> · Время: <strong>{formatTime(elapsed)}</strong>
                                </p>
                                <div className="quiz-result-chips">
                                    {TOPICS.filter(t => selectedTopics.includes(t.id)).map(t => <span key={t.id} className="small-chip">{t.icon} {t.label}</span>)}
                                    <span className="small-chip">{DIFFICULTIES.find(d => d.id === difficulty)?.label}</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="quiz-questions">
                            {questions.map((q, qi) => {
                                const given   = (answers[qi] ?? []).slice().sort().join(",");
                                const correct = (q.correct ?? []).slice().sort().join(",");
                                const isRight = given === correct;
                                return (
                                    <motion.article key={qi} className={`quiz-question-card ${isRight ? "quiz-q-correct" : "quiz-q-wrong"}`} variants={cardAnim} initial="hidden" animate="show" custom={qi}>
                                        <div className="quiz-q-num">
                                            <span className="quiz-q-badge">{qi + 1}</span>
                                            Вопрос {qi + 1}
                                            <span className={isRight ? "quiz-badge-ok" : "quiz-badge-err"}>
                                                {isRight ? "✓ Верно" : "✗ Неверно"}
                                            </span>
                                        </div>
                                        <p className="quiz-q-text">{q.question}</p>
                                        <div className="quiz-options">
                                            {q.options.map((opt, oi) => {
                                                const isCorrectOpt = q.correct.includes(oi);
                                                const wasChosen    = (answers[qi] ?? []).includes(oi);
                                                let cls = "quiz-option";
                                                if (isCorrectOpt) cls += " quiz-option-correct";
                                                else if (wasChosen) cls += " quiz-option-wrong";
                                                return (
                                                    <div key={oi} className={cls}>
                                                        <span className="quiz-option-letter">{String.fromCharCode(65 + oi)}</span>
                                                        {opt}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {q.explanation && <p className="quiz-explanation">💡 {q.explanation}</p>}
                                    </motion.article>
                                );
                            })}
                        </div>

                        <div className="quiz-submit-row">
                            <button className="button button-primary" onClick={handleReset}>Новый тест</button>
                            <button className="button button-secondary" onClick={() => { setAnswers({}); setPhase("quiz"); }}>Пройти снова</button>
                        </div>

                    </motion.section>
                )}

            </AnimatePresence>
        </section>
    );
}
