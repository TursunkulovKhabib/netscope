export default function DocsPage() {
    return (
        <section>
            <div className="page-header">
                <p className="page-label">Раздел 3</p>
                <h1>Документация проекта</h1>
                <p>
                    Эта страница описывает назначение сайта, используемые технологии и
                    способы запуска проекта.
                </p>
            </div>

            <div className="grid grid-2">
                <article className="card">
                    <h2>Цель проекта</h2>
                    <p>
                        NetScope — учебный веб-проект по сетевым технологиям, который в
                        простой форме объясняет основные понятия компьютерных сетей и
                        сетевой безопасности.
                    </p>
                </article>

                <article className="card">
                    <h2>Технологии</h2>
                    <p>Frontend: React, Vite, React Router.</p>
                    <p>Deployment: Docker, Nginx.</p>
                </article>

                <article className="card">
                    <h2>Функционал</h2>
                    <ul className="simple-list">
                        <li>Главная страница с обзором тем.</li>
                        <li>Страница теории по сетям.</li>
                        <li>Страница по сетевой безопасности.</li>
                        <li>Документация и инструкции по запуску.</li>
                    </ul>
                </article>

                <article className="card">
                    <h2>Ссылка на репозиторий</h2>
                    <p>
                        Вставь сюда свою ссылку на GitHub после создания репозитория:
                    </p>
                    <code className="code-inline">
                        https://github.com/your-username/netscope
                    </code>
                </article>
            </div>

            <section className="section-block">
                <h2>Запуск локально</h2>
                <div className="code-block">
                    {`npm install
npm run dev`}
                </div>
            </section>

            <section className="section-block">
                <h2>Запуск через Docker</h2>
                <div className="code-block">
                    {`docker compose up --build`}
                </div>
            </section>
        </section>
    );
}