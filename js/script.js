(function () {
  'use strict';

  /* ===================== Настройки ===================== */
  var CONFIG = {
    link: 'https://kaminskiy.wwgroup.ru/?utm_source=sale_start&utm_medium=forbes_article',   // ссылки «Узнать о проекте»
    shuffleOptions: true,             // перемешивать варианты ответа
    nextDelay: 550                    // пауза после выбора ответа, мс
  };

  /* attention — Внимание, details — Детали, privacy — Приватность, time — Время */
  var QUESTIONS = [
    {
      text: 'Как начинается ваш идеальный день в офисе?',
      img: 'img/reading.jpg',
      options: [
        { type: 'privacy', text: 'Спокойно прохожу в кабинет, почти никого не встречая' },
        { type: 'time', text: 'Почта разобрана, повседневные вопросы уже решены' },
        { type: 'attention', text: 'Меня узнают и приветствуют по имени' },
        { type: 'details', text: 'Все готово к работе: комфортный свет, температура, исправная техника' }
      ]
    },
    {
      text: 'Вы остановились в хорошем отеле. Что особенно приятно?',
      img: 'img/concierge.jpg',
      options: [
        { type: 'privacy', text: 'Никто не беспокоит без необходимости' },
        { type: 'attention', text: 'Сотрудники помнят мои пожелания' },
        { type: 'time', text: 'Трансфер и багаж организованы без моего участия' },
        { type: 'details', text: 'В номере продумано все, от мебели до освещения' }
      ]
    },
    {
      text: 'У вас освободилось полчаса между встречами. Что выберете?',
      img: 'img/lobby.jpg',
      options: [
        { type: 'time', text: 'Позвоню близким, пока помощник занимается поручениями' },
        { type: 'details', text: 'Отдохну в уютном лобби с удобными креслами' },
        { type: 'privacy', text: 'Закрою дверь и побуду в тишине' },
        { type: 'attention', text: 'Загляну в кафе, где помнят мой обычный заказ' }
      ]
    },
    {
      text: 'Впереди ключевые переговоры. Что особенно важно?',
      img: 'img/meeting.jpg',
      options: [
        { type: 'details', text: 'Переговорная безупречно подготовлена' },
        { type: 'attention', text: 'Моего гостя встретят лично и проводят' },
        { type: 'time', text: 'Мне не придется заниматься организационными вопросами' },
        { type: 'privacy', text: 'Разговор пройдет без посторонних' }
      ]
    },
    {
      text: 'Вы выбираете офис. На что обратите внимание?',
      img: 'img/facade.jpg',
      options: [
        { type: 'details', text: 'У здания выразительная архитектура и качественные интерьеры' },
        { type: 'attention', text: 'К резидентам относятся внимательно и учитывают их привычки' },
        { type: 'time', text: 'Повседневные дела можно поручить сервисной команде' },
        { type: 'privacy', text: 'Есть возможность работать без постоянного потока посторонних' }
      ]
    },
    {
      text: 'Закончите фразу: «Роскошь — это когда…»',
      img: 'img/library.jpg',
      options: [
        { type: 'privacy', text: '…есть пространство, где можно побыть одному' },
        { type: 'details', text: '…все продумано до мелочей' },
        { type: 'attention', text: '…меня знают и помнят мои пожелания' },
        { type: 'time', text: '…мне не приходится тратить время на рутину' }
      ]
    }
  ];

  var RESULTS = {
    attention: {
      kicker: 'Персональное внимание',
      title: 'Ваша роскошь — когда вас знают',
      img: 'img/concierge.jpg',
      text: [
        'Вы цените личное отношение: когда вас узнают, помнят привычки и понимают пожелания без лишних объяснений.',
        'В «Каминском» такой подход предусмотрен в модели пятизвездочного сервиса: ресепшен, консьерж-служба и сопровождение гостей.'
      ],
      quote: 'Роскошь — когда о вас помнят.'
    },
    details: {
      kicker: 'Безупречные детали',
      title: 'Ваша роскошь — когда все уже готово',
      img: 'img/lobby2.jpg',
      text: [
        'Вы замечаете качество материалов, освещение и удобство пространства. Для вас важно, чтобы каждая деталь была на своем месте.',
        'В «Каминском» историческую архитектуру дополнят дизайнерские интерьеры, современные инженерные системы и лобби со стеклянным куполом.'
      ],
      quote: 'Роскошь — когда все продумано заранее.'
    },
    privacy: {
      kicker: 'Приватность',
      title: 'Ваша роскошь — когда есть свое пространство',
      img: 'img/writing.jpg',
      text: [
        'Вы цените тишину и возможность работать или проводить встречи без постороннего внимания.',
        'В «Каминском» предусмотрены камерные бутик-офисы, офисные резиденции и многоуровневый пентхаус с отдельным лифтом.'
      ],
      quote: 'Роскошь — когда можно побыть наедине с собой.'
    },
    time: {
      kicker: 'Время',
      title: 'Ваша роскошь — когда ваше время берегут',
      img: 'img/sitting.jpg',
      text: [
        'Вы предпочитаете делегировать повседневные заботы и посвящать время более важным делам.',
        'В «Каминском» консьерж-служба поможет с доставками, корреспонденцией, заказом такси и другими поручениями.'
      ],
      quote: 'Роскошь — когда ваше время принадлежит вам.'
    }
  };

  /* ===================== Подсчет ===================== */
  // Побеждает тип с наибольшим числом баллов; при равенстве — тот из лидеров, кого выбрали позже
  function resolveResult(answers) {
    var score = {}, last = {};
    answers.forEach(function (type, i) { score[type] = (score[type] || 0) + 1; last[type] = i; });
    var best = null;
    Object.keys(score).forEach(function (t) {
      if (!best || score[t] > score[best] || (score[t] === score[best] && last[t] > last[best])) best = t;
    });
    return best;
  }

  /* ===================== Утилиты ===================== */
  function $(id) { return document.getElementById(id); }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function track(event, data) {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ source: 'kaminskii-test', event: event, data: data || null }, '*');
      }
    } catch (e) { /* noop */ }
  }

  function preload(srcs) {
    srcs.forEach(function (src) { var i = new Image(); i.src = src; });
  }

  // Фирменный паттерн — лучи из точки
  function raysSVG(count) {
    var lines = '';
    for (var i = 0; i < count; i++) {
      var a = (i / count) * Math.PI * 2;
      var r1 = 22 + (i % 2) * 6, r2 = 100;
      lines += '<line x1="' + (100 + Math.cos(a) * r1).toFixed(2) + '" y1="' + (100 + Math.sin(a) * r1).toFixed(2) +
        '" x2="' + (100 + Math.cos(a) * r2).toFixed(2) + '" y2="' + (100 + Math.sin(a) * r2).toFixed(2) + '"/>';
    }
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#FFD6A2" stroke-width=".45">' +
      lines + '<circle cx="100" cy="100" r="10" fill="#FFD6A2" stroke="none"/></svg>';
  }

  /* ===================== Состояние ===================== */
  var state = { index: 0, answers: [], locked: false, result: null };

  var el = {
    screens: {
      start: $('screen-start'),
      quiz: $('screen-quiz'),
      result: $('screen-result'),
      final: $('screen-final')
    },
    pos: $('q-pos'),
    progress: $('progress'),
    label: $('q-label'),
    question: $('q-text'),
    options: $('q-options'),
    inner: $('quiz-inner'),
    photo: $('quiz-photo'),
    rKicker: $('r-kicker'),
    rTitle: $('r-title'),
    rText: $('r-text'),
    rImg: $('r-img'),
    rScroll: $('r-scroll')
  };

  function show(name) {
    Object.keys(el.screens).forEach(function (k) {
      el.screens[k].classList.toggle('is-active', k === name);
    });
  }

  function setPhoto(src) {
    var old = el.photo.querySelector('img:not(.is-leaving)');
    if (old && old.getAttribute('src') === src) return;
    var img = new Image();
    img.alt = '';
    img.className = 'is-entering';
    img.src = src;
    el.photo.appendChild(img);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { img.classList.remove('is-entering'); });
    });
    if (old) {
      old.classList.add('is-leaving');
      setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 700);
    }
  }

  function renderProgress() {
    var html = '';
    for (var i = 0; i < QUESTIONS.length; i++) html += '<i></i>';
    el.progress.innerHTML = html;
  }

  function updateProgress() {
    var items = el.progress.children;
    for (var i = 0; i < items.length; i++) items[i].classList.toggle('is-done', i < state.index);
  }

  function renderQuestion() {
    var q = QUESTIONS[state.index];
    var opts = CONFIG.shuffleOptions ? shuffle(q.options) : q.options;

    el.pos.textContent = state.index + 1;
    el.label.textContent = 'Вопрос ' + (state.index + 1);
    el.question.textContent = q.text;
    el.options.innerHTML = '';
    opts.forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'option';
      b.innerHTML = '<span class="option__dot"></span><span class="option__text"></span>';
      b.querySelector('.option__text').textContent = o.text;
      b.addEventListener('click', function () { choose(o, b); });
      el.options.appendChild(b);
    });
    setPhoto(q.img);
    updateProgress();
    state.locked = false;
  }

  function transitionQuestion() {
    el.inner.classList.add('is-out');
    setTimeout(function () {
      renderQuestion();
      el.inner.classList.remove('is-out');
      el.inner.classList.add('is-in');
      void el.inner.offsetWidth;
      el.inner.classList.remove('is-in');
    }, 300);
  }

  function choose(option, button) {
    if (state.locked) return;
    state.locked = true;
    state.answers.push(option.type);
    button.classList.add('is-selected');
    Array.prototype.forEach.call(el.options.children, function (b) { b.disabled = true; });
    track('answer', { question: state.index + 1, type: option.type });

    state.index++;
    updateProgress();

    setTimeout(function () {
      if (state.index >= QUESTIONS.length) showResult();
      else transitionQuestion();
    }, CONFIG.nextDelay);
  }

  function showResult(forcedKey) {
    var key = forcedKey || resolveResult(state.answers);
    var r = RESULTS[key];
    state.result = key;
    el.rKicker.textContent = r.kicker;
    el.rTitle.textContent = r.title;
    el.rImg.src = r.img;
    el.rImg.alt = r.kicker;
    el.rText.innerHTML = r.text.map(function (p, i) { return '<p' + (i === 0 ? ' class="lead"' : '') + '>' + p + '</p>'; }).join('') +
      '<p class="quote">' + r.quote + '</p>';
    el.rScroll.scrollTop = 0;
    updateScrollMask();
    show('result');
    track('result', { result: key, answers: state.answers.slice() });
  }

  function updateScrollMask() {
    var s = el.rScroll;
    s.classList.toggle('is-end', s.scrollTop + s.clientHeight >= s.scrollHeight - 4);
  }

  function start() {
    state.index = 0;
    state.answers = [];
    state.result = null;
    renderProgress();
    renderQuestion();
    show('quiz');
    track('start');
  }

  /* ===================== Инициализация ===================== */
  Array.prototype.forEach.call(document.querySelectorAll('.rays'), function (r) { r.innerHTML = raysSVG(96); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-link]'), function (a) {
    a.href = CONFIG.link;
    a.addEventListener('click', function () { track('link', { from: a.getAttribute('data-link'), result: state.result }); });
  });

  $('btn-start').addEventListener('click', start);
  $('btn-final').addEventListener('click', function () { show('final'); track('final'); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-restart]'), function (b) {
    b.addEventListener('click', function () { track('restart'); start(); });
  });
  el.rScroll.addEventListener('scroll', updateScrollMask, { passive: true });

  window.addEventListener('load', function () {
    var imgs = QUESTIONS.map(function (q) { return q.img; });
    Object.keys(RESULTS).forEach(function (k) { imgs.push(RESULTS[k].img); });
    preload(imgs);
  });

  // window.KaminskiiTest.showResult('time') — открыть любой результат
  window.KaminskiiTest = { resolve: resolveResult, showResult: showResult, show: show, config: CONFIG };
})();
