# NetScope

**NetScope** — учебный веб-проект по сетевым технологиям и сетевой безопасности.

Сайт посвящён базовым принципам работы компьютерных сетей, сетевым протоколам и защите данных в интернете. Проект сделан в формате компактного современного веб-сайта с понятной структурой и отдельными тематическими страницами.

## О проекте

NetScope помогает в простой и наглядной форме изучить:

- модель OSI;
- стек TCP/IP;
- протоколы TCP и UDP;
- DNS;
- HTTP и HTTPS;
- основы сетевой безопасности;
- TLS, сертификаты и MITM-атаки.

## Страницы сайта

Сайт состоит из 4 основных страниц:

- **Главная** — обзор проекта и ключевых тем;
- **Теория** — основные понятия и протоколы;
- **Безопасность** — защита трафика и риски в сети;
- **Документация** — описание проекта и его структуры.

## Технологии

| Категория | Используется |
|---------|-------------|
| Frontend | React, Vite |
| Routing | React Router |
| Animations | Framer Motion |
| Styling | CSS |
| Deployment | Docker, Nginx |

## Структура проекта

```bash
netscope/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── TheoryPage.jsx
│   │   ├── SecurityPage.jsx
│   │   └── DocsPage.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
└── README.md
```

## Установка и запуск

### Установка зависимостей

```bash
npm install
```

### Запуск проекта

```bash
npm run dev
```

### Дополнительные пакеты

```bash
npm install react-router-dom framer-motion
```

## Сборка

```bash
npm run build
```

## Docker

```bash
docker compose up --build
```

## Автор проекта

**Турсункулов Хабибулло Дилшодович ВШПИ 2 курс**
