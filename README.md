# Forbes × Каминский — «А что для вас роскошь?»

Размер 640×480. Чистые HTML/CSS/JS без зависимостей и внешних запросов: шрифты и картинки лежат в папке.

```
kaminskii-test/
  index.html
  css/style.css
  js/script.js      ← тексты вопросов и результатов, ссылка, настройки
  img/              ← фото из брендбука, логотип, знак
  fonts/            ← Tenor Sans, Manrope (OFL)
```

## Встраивание

Залить папку на хостинг целиком и вставить:

```html
<iframe src="https://ВАШ-ДОМЕН/kaminskii-test/index.html"
        width="640" height="480"
        style="border:0;max-width:100%;"
        title="Тест «Каминский»: что для вас роскошь?"
        loading="lazy"></iframe>
```

Фон прозрачный, карточка со скруглением 10px. На мобильных (уже 640px) тест занимает всю ширину и высоту iframe — задайте iframe высоту ~640px:

```html
<style>@media (max-width:639px){.kaminskii-embed{width:100%!important;height:640px!important}}</style>
```
(и добавьте iframe `class="kaminskii-embed"`).

## Настройки (`js/script.js`, объект `CONFIG`)

- `link` — куда ведет «Узнать больше о проекте» (сейчас kaminskiy.wwgroup.ru с UTM)
- `shuffleOptions` — перемешивать варианты ответа
- `nextDelay` — пауза после выбора ответа

## Подсчет

6 вопросов × 4 варианта, каждый ответ дает балл одному из типов: Внимание, Детали, Приватность, Время. Побеждает тип с наибольшим числом баллов; при равенстве — тот из лидеров, который выбран последним.

## События для аналитики

Тест отправляет родительской странице `postMessage`:
`{ source: 'kaminskii-test', event: 'start' | 'answer' | 'result' | 'final' | 'link' | 'restart', data }`.

```js
window.addEventListener('message', function (e) {
  if (e.data && e.data.source === 'kaminskii-test') console.log(e.data.event, e.data.data);
});
```

## Шрифты

Заголовки — Tenor Sans (как в гайдбуке). Наборный TT Norms Pro лицензионный, сейчас вместо него Manrope. Чтобы включить TT Norms: положить `TTNormsPro-Regular.woff2` в `fonts/` и раскомментировать блок в начале `css/style.css`.
