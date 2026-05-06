# SEO Checklist — svetdalubov.ru

## Что сделано

- [x] Установлен `react-helmet-async`
- [x] `main.jsx` обёрнут в `<HelmetProvider>`
- [x] Создан компонент `src/SEO.jsx` (title, description, keywords, canonical, OG, Twitter Card, JSON-LD)
- [x] На главной странице добавлены SEO-метаданные и LocalBusiness Schema (JSON-LD)
- [x] Создан `public/robots.txt`
- [x] Создан скрипт `scripts/generate-sitemap.js` → команда `npm run sitemap`
- [x] Sitemap генерируется автоматически перед каждым билдом (`npm run build`)
- [x] `vite.config.js` обновлён: добавлен `base: '/'` и code splitting
- [x] Все `<img>` в галерее имеют `alt` и `loading="lazy"`

## После деплоя проверить

- [ ] https://svetdalubov.ru/robots.txt — должен открываться
- [ ] https://svetdalubov.ru/sitemap.xml — должен открываться
- [ ] https://svetdalubov.ru — тег `<title>` в исходнике страницы

## Google Search Console

1. Зайти на https://search.google.com/search-console
2. Добавить ресурс → выбрать «URL-префикс» → ввести `https://svetdalubov.ru`
3. Подтвердить права — выбрать способ **HTML-файл**:
   - Скачать файл вида `googleXXXXXXXX.html`
   - Положить в папку `public/`
   - Закоммитить и задеплоить
   - Нажать «Подтвердить»
4. После подтверждения: Sitemap → добавить `https://svetdalubov.ru/sitemap.xml`

## Яндекс Вебмастер

1. Зайти на https://webmaster.yandex.ru
2. Добавить сайт `https://svetdalubov.ru`
3. Подтвердить права — способ **HTML-файл** (уже настроен: `public/yandex_e4a4d42742748c98.html`)
4. После подтверждения: Индексирование → Sitemap → добавить `https://svetdalubov.ru/sitemap.xml`
