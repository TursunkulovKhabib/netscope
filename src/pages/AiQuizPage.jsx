import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOPICS = [
    { id: "osi", label: "OSI" },
    { id: "tcpip", label: "TCP/IP" },
    { id: "dns", label: "DNS" },
    { id: "http", label: "HTTP/HTTPS" },
    { id: "ip", label: "IP-адресация" },
    { id: "routing", label: "Маршрутизация" },
    { id: "security", label: "Безопасность" },
    { id: "tls", label: "TLS/MITM" },
];

const DIFFICULTIES = [
    { id: "easy", label: "Лёгкий", color: "#6daa45" },
    { id: "medium", label: "Средний", color: "#e8af34" },
    { id: "hard", label: "Сложный", color: "#dd6974" },
];

const pageReveal = {
    hidden: { opacity: 0, y: 28 },
    show: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
    }),
};

const cardAnim = {
    hidden: { opacity: 0, scale: 0.96, y: 16 },
    show: (i = 0) => ({
        opacity: 1, scale: 1, y: 0,
        transition: { duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
    }),
    exit: { opacity: 0, scale: 0.96, y: -12, transition: { duration: 0.25 } },
};

export default function AiQuizPage() {
    // --- form state ---
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [difficulty, setDifficulty]         = useState("medium");
    const [questionCount, setQuestionCount]   = useState(5);
    const [optionCount, setOptionCount]       = useState(4);
    const [multiAnswer, setMultiAnswer]       = useState(false);
    const [extraPrompt, setExtraPrompt]       = useState("");

    // --- quiz state ---
    const [phase, setPhase]       = useState("form"); // form | loading | quiz | result
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers]     = useState({});
    const [error, setError]         = useState("");

    const toggleTopic = (id) =>
        setSelectedTopics((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );

    // --- generate ---
    const handleGenerate = async () => {
        if (selectedTopics.length === 0) {
            setError("Выбери хотя бы одну тему.");
            return;
        }
        setError("");
        setPhase("loading");

        const topicLabels = TOPICS
            .filter((t) => selectedTopics.includes(t.id))
            .map((t) => t.label)
            .join(", ");

        const diffLabel = DIFFICULTIES.find((d) => d.id === difficulty)?.label ?? difficulty;

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

            const data = await res.json();
            const raw  = data.content ?? "";

            // extract JSON array
            const match = raw.match(/\[\s*\{[\s\S]*\}\s*\]/);
            if (!match) throw new Error("Модель вернула неожиданный формат.");
            const parsed = JSON.parse(match[0]);

            setQuestions(parsed);
            setAnswers({});
            setPhase("quiz");
        } catch (e) {
            setError(e.message || "Ошибка генерации. Проверь API-ключ.");
            setPhase("form");
        }
    };

    // --- answer ---
    const toggleAnswer = (qIdx, oIdx) => {
        setAnswers((prev) => {
            const cur = prev[qIdx] ?? [];
            if (multiAnswer) {
                return {
                    ...prev,
                    [qIdx]: cur.includes(oIdx)
                        ? cur.filter((x) => x !== oIdx)
                        : [...cur, oIdx],
                };
            }
            return { ...prev, [qIdx]: [oIdx] };
        });
    };

    const handleSubmit = () => setPhase("result");

    const handleReset = () => {
        setPhase("form");
        setQuestions([]);
        setAnswers({});
    };

    // --- score ---
    const score = questions.reduce((acc, q, i) => {
        const given   = (answers[i] ?? []).slice().sort().join(",");
        const correct = (q.correct ?? []).slice().sort().join(",");
        return acc + (given === correct ? 1 : 0);
    }, 0);

    const scorePercent = questions.length ? Math.round((score / questions.length) * 100) : 0;

    // =========================================================
    return (
        <section className="theory-page">

            {/* ── HERO ── */}
            <motion.section className="page-hero" initial="hidden" animate="show" variants={pageReveal}>
                <div className="page-hero-grid">
                    <div>
                        <div className="hero-badge">AI · Тестирование</div>
                        <h1>AI Quiz Lab</h1>
                        <p className="page-hero-text">
                            Опиши параметры теста — и ИИ сгенерирует вопросы по материалам сайта.
                            Выбери темы, сложность, количество вопросов и дополнительные пожелания
                            в свободной форме.
                        </p>
                    </div>
                    <div className="info-panel">
                        <div className="info-panel-top">
                            <span className="small-chip">OpenAI</span>
                            <span className="small-chip">GPT-4o</span>
                            <span className="small-chip">Авто</span>
                        </div>
                        <div className="info-panel-body">
                            <div className="info-metric">
                                <span className="info-metric-value">8</span>
                                <span className="info-metric-label">тем на выбор</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">∞</span>
                                <span className="info-metric-label">вариантов теста</span>
                            </div>
                            <div className="info-metric">
                                <span className="info-metric-value">AI</span>
                                <span className="info-metric-label">генерация</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ── FORM ── */}
            <AnimatePresence mode="wait">
                {phase === "form" && (
                    <motion.section
                        key="form"
                        className="content-section"
                        initial="hidden" animate="show" exit="exit"
                        variants={cardAnim}
                    >
                        <div className="quiz-form-grid">

                            {/* Topics */}
                            <motion.div className="quiz-block" variants={pageReveal} custom={0}>
                                <p className="section-kicker">Шаг 1</p>
                                <h2>Выбери темы</h2>
                                <div className="quiz-topics">
                                    {TOPICS.map((t) => (
                                        <button
                                            key={t.id}
                                            className={`quiz-chip ${
                                                selectedTopics.includes(t.id) ? "quiz-chip-active" : ""
                                            }`}
                                            onClick={() => toggleTopic(t.id)}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Difficulty */}
                            <motion.div className="quiz-block" variants={pageReveal} custom={1}>
                                <p className="section-kicker">Шаг 2</p>
                                <h2>Сложность</h2>
                                <div className="quiz-difficulty">
                                    {DIFFICULTIES.map((d) => (
                                        <button
                                            key={d.id}
                                            className={`quiz-diff-btn ${
                                                difficulty === d.id ? "quiz-diff-active" : ""
                                            }`}
                                            style={difficulty === d.id ? { borderColor: d.color, color: d.color } : {}}
                                            onClick={() => setDifficulty(d.id)}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Counts */}
                            <motion.div className="quiz-block" variants={pageReveal} custom={2}>
                                <p className="section-kicker">Шаг 3</p>
                                <h2>Параметры</h2>
                                <div className="quiz-params">
                                    <label className="quiz-param-label">
                                        <span>Вопросов: <strong>{questionCount}</strong></span>
                                        <input
                                            type="range" min={3} max={15} value={questionCount}
                                            onChange={(e) => setQuestionCount(+e.target.value)}
                                            className="quiz-range"
                                        />
                                    </label>
                                    <label className="quiz-param-label">
                                        <span>Вариантов ответа: <strong>{optionCount}</strong></span>
                                        <input
                                            type="range" min={2} max={5} value={optionCount}
                                            onChange={(e) => setOptionCount(+e.target.value)}
                                            className="quiz-range"
                                        />
                                    </label>
                                    <label className="quiz-toggle">
                                        <span>Несколько правильных ответов</span>
                                        <button
                                            className={`toggle-btn ${
                                                multiAnswer ? "toggle-btn-on" : ""
                                            }`}
                                            onClick={() => setMultiAnswer((v) => !v)}
                                            aria-pressed={multiAnswer}
                                        >
                                            <span className="toggle-knob" />
                                        </button>
                                    </label>
                                </div>
                            </motion.div>

                            {/* Extra prompt */}
                            <motion.div className="quiz-block quiz-block-full" variants={pageReveal} custom={3}>
                                <p className="section-kicker">Шаг 4 · необязательно</p>
                                <h2>Свободный промт</h2>
                                <textarea
                                    className="quiz-textarea"
                                    placeholder="Например: сделай вопросы с ловушками, добавь вопрос про порт 443, сосредоточься на безопасности..."
                                    value={extraPrompt}
                                    onChange={(e) => setExtraPrompt(e.target.value)}
                                    rows={3}
                                />
                            </motion.div>

                            {/* Error */}
                            {error && (
                                <motion.p
                                    className="quiz-error"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                >
                                    {error}
                                </motion.p>
                            )}

                            {/* Submit */}
                            <motion.div className="quiz-block-full quiz-submit-row" variants={pageReveal} custom={4}>
                                <button className="button button-primary quiz-generate-btn" onClick={handleGenerate}>
                                    Сгенерировать тест →
                                </button>
                                <p className="quiz-hint">
                                    Генерация занимает 5–15 секунд. Требуется OPENAI_API_KEY на сервере.
                                </p>
                            </motion.div>

                        </div>
                    </motion.section>
                )}

                {/* ── LOADING ── */}
                {phase === "loading" && (
                    <motion.div
                        key="loading"
                        className="quiz-loading"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <div className="quiz-spinner" />
                        <p>ИИ генерирует тест<span className="quiz-dots" /></p>
                        <p className="quiz-hint">Анализирую темы и подбираю вопросы...</p>
                    </motion.div>
                )}

                {/* ── QUIZ ── */}
                {phase === "quiz" && (
                    <motion.section
                        key="quiz"
                        className="content-section"
                        initial="hidden" animate="show" exit="exit"
                        variants={cardAnim}
                    >
                        <div className="section-heading">
                            <p className="section-kicker">Сгенерировано · {questions.length} вопросов</p>
                            <h2>Ответь на вопросы</h2>
                            <p className="section-description">
                                {multiAnswer
                                    ? "Может быть несколько правильных ответов — отметь все."
                                    : "Выбери один правильный ответ на каждый вопрос."}
                            </p>
                        </div>

                        <div className="quiz-questions">
                            {questions.map((q, qi) => (
                                <motion.article
                                    key={qi}
                                    className="quiz-question-card"
                                    variants={cardAnim}
                                    initial="hidden" animate="show"
                                    custom={qi}
                                >
                                    <div className="quiz-q-num">Вопрос {qi + 1}</div>
                                    <p className="quiz-q-text">{q.question}</p>
                                    <div className="quiz-options">
                                        {q.options.map((opt, oi) => {
                                            const selected = (answers[qi] ?? []).includes(oi);
                                            return (
                                                <button
                                                    key={oi}
                                                    className={`quiz-option ${
                                                        selected ? "quiz-option-selected" : ""
                                                    }`}
                                                    onClick={() => toggleAnswer(qi, oi)}
                                                >
                                                    <span className="quiz-option-letter">
                                                        {String.fromCharCode(65 + oi)}
                                                    </span>
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        <div className="quiz-submit-row">
                            <button
                                className="button button-primary"
                                onClick={handleSubmit}
                                disabled={Object.keys(answers).length < questions.length}
                            >
                                Проверить результат →
                            </button>
                            <button className="button button-secondary" onClick={handleReset}>
                                Новый тест
                            </button>
                        </div>
                    </motion.section>
                )}

                {/* ── RESULT ── */}
                {phase === "result" && (
                    <motion.section
                        key="result"
                        className="content-section"
                        initial="hidden" animate="show" exit="exit"
                        variants={cardAnim}
                    >
                        {/* Score card */}
                        <motion.div className="quiz-score-card" variants={pageReveal} custom={0}>
                            <div
                                className="quiz-score-circle"
                                style={{
                                    background: `conic-gradient(
                                        var(--color-primary) ${
                                            scorePercent * 3.6
                                        }deg,
                                        var(--color-surface-offset) 0deg
                                    )`,
                                }}
                            >
                                <span className="quiz-score-num">{scorePercent}%</span>
                            </div>
                            <div>
                                <h2>
                                    {scorePercent >= 80
                                        ? "Отличный результат!"
                                        : scorePercent >= 50
                                        ? "Неплохо, но есть что повторить"
                                        : "Стоит повторить материал"}
                                </h2>
                                <p className="section-description">
                                    Правильных ответов: <strong>{score}</strong> из{" "}
                                    <strong>{questions.length}</strong>
                                </p>
                            </div>
                        </motion.div>

                        {/* Detailed answers */}
                        <div className="quiz-questions">
                            {questions.map((q, qi) => {
                                const given   = (answers[qi] ?? []).slice().sort().join(",");
                                const correct = (q.correct ?? []).slice().sort().join(",");
                                const isRight = given === correct;
                                return (
                                    <motion.article
                                        key={qi}
                                        className={`quiz-question-card ${
                                            isRight ? "quiz-q-correct" : "quiz-q-wrong"
                                        }`}
                                        variants={cardAnim}
                                        initial="hidden" animate="show"
                                        custom={qi}
                                    >
                                        <div className="quiz-q-num">
                                            Вопрос {qi + 1}{" "}
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
                                                        <span className="quiz-option-letter">
                                                            {String.fromCharCode(65 + oi)}
                                                        </span>
                                                        {opt}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {q.explanation && (
                                            <p className="quiz-explanation">
                                                💡 {q.explanation}
                                            </p>
                                        )}
                                    </motion.article>
                                );
                            })}
                        </div>

                        <div className="quiz-submit-row">
                            <button className="button button-primary" onClick={handleReset}>
                                Новый тест
                            </button>
                            <button
                                className="button button-secondary"
                                onClick={() => {
                                    setAnswers({});
                                    setPhase("quiz");
                                }}
                            >
                                Пройти снова
                            </button>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </section>
    );
}
