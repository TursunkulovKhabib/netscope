# NetScope

**NetScope** — учебный веб-проект по сетевым технологиям и сетевой безопасности. Сайт объясняет базовые принципы работы компьютерных сетей, знакомит с ключевыми протоколами и даёт интерактивный способ повторения материала через AI-квиз.

## Возможности

- Современный SPA-интерфейс на React и Vite.
- Отдельные разделы по теории сетей, IP-адресации, маршрутизации и безопасности.
- AI Quiz Lab для генерации тестов по выбранным темам и уровню сложности.
- Плавные анимации переходов между страницами с помощью Framer Motion.
- Подготовка к локальному запуску, Docker-сборке и деплою на Vercel.

## Страницы проекта

- **Главная** — обзор проекта и ключевых тем.
- **Теория** — OSI, TCP/IP, DNS, TCP, UDP, HTTP и HTTPS.
- **IP-адресация** — IPv4, маски, подсети и диапазоны адресов.
- **Маршрутизация** — роутеры, коммутаторы, NAT и путь пакета по сети.
- **Безопасность** — TLS, сертификаты, MITM и базовые практики защиты.
- **AI Quiz** — генерация тестов по сетевым технологиям.
- **Документация** — описание структуры проекта, стека и способов запуска.

## Технологии

| Категория | Используется |
|---|---|
| Frontend | React 19, Vite 8 |
| Routing | React Router DOM 7 |
| Animations | Framer Motion 12 |
| Styling | CSS |
| AI API | OpenAI через serverless-функцию `/api/quiz` |
| Deployment | Vercel, Docker, Nginx |
| Linting | ESLint |

## Структура проекта

```
netscope/
├── api/
│   └── quiz.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/
│   │   ├── AiQuizPage.jsx
│   │   ├── DocsPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── IpPage.jsx
│   │   ├── RoutingPage.jsx
│   │   ├── SecurityPage.jsx
│   │   └── TheoryPage.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── quiz.css
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
├── vercel.json
└── README.md
```

## Установка и запуск

### Локально

```
npm install
npm run dev
```

### Сборка production-версии

```
npm run build
```

### Предпросмотр сборки

```
npm run preview
```

## Docker

```
docker compose up --build
```

После сборки приложение будет доступно через Nginx.

## AI Quiz API

Для работы генерации тестов используется serverless-функция `api/quiz.js`, которая принимает параметры теста, отправляет запрос к модели и возвращает JSON с вопросами. Для полноценной работы этой части нужен серверный API-ключ OpenAI в окружении платформы деплоя.

## Автор

**Турсункулов Хабибулло Дилшодович**