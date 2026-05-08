import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <section>
            <div className="hero">
                <div className="hero-badge">Учебный проект</div>
                <h1>NetScope — сайт о сетевых технологиях простым языком</h1>
                <p className="hero-text">
                    Здесь собраны основные темы по компьютерным сетям: модели OSI и TCP/IP,
                    протоколы, HTTPS, TLS, сетевые угрозы и базовые инструменты диагностики.
                </p>

                <div className="hero-actions">
                    <Link to="/theory" className="button button-primary">
                        Перейти к теории
                    </Link>
                    <Link to="/docs" className="button button-secondary">
                        Смотреть документацию
                    </Link>
                </div>
            </div>

            <div className="grid grid-3">
                <article className="card">
                    <h2>Теоретическая база</h2>
                    <p>
                        Краткое и понятное объяснение ключевых понятий: IP-адреса, DNS,
                        порты, TCP, UDP, HTTP и HTTPS.
                    </p>
                </article>

                <article className="card">
                    <h2>Безопасность</h2>
                    <p>
                        Отдельный раздел о TLS, сертификатах, MITM-атаках и причинах,
                        почему HTTPS обязателен в современной сети.
                    </p>
                </article>

                <article className="card">
                    <h2>Документация</h2>
                    <p>
                        Структура проекта, стек технологий, инструкции по запуску и место
                        для ссылки на GitHub-репозиторий.
                    </p>
                </article>
            </div>

            <section className="section-block">
                <h2>Как проходит запрос в интернете</h2>
                <div className="timeline">
                    <div className="timeline-item">
                        <span>1</span>
                        <p>Пользователь вводит адрес сайта в браузере.</p>
                    </div>
                    <div className="timeline-item">
                        <span>2</span>
                        <p>DNS находит IP-адрес нужного сервера.</p>
                    </div>
                    <div className="timeline-item">
                        <span>3</span>
                        <p>Браузер устанавливает соединение с сервером.</p>
                    </div>
                    <div className="timeline-item">
                        <span>4</span>
                        <p>По HTTP/HTTPS запрашивается страница и отправляется ответ.</p>
                    </div>
                </div>
            </section>
        </section>
    );
}