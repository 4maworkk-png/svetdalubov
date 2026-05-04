/* global React */
const { useState, useEffect, useRef } = React;

/* ============== Иконки ============== */
const Icon = {
  Light: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3v3M5.5 5.5l2 2M3 12h3M5.5 18.5l2-2M12 21v-3M18.5 18.5l-2-2M21 12h-3M18.5 5.5l-2 2"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  Sound: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 10v4h3l5 4V6L6 10H3z"/>
      <path d="M15 8a5 5 0 0 1 0 8M18 5a9 9 0 0 1 0 14"/>
    </svg>
  ),
  Screen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2.5" y="4" width="19" height="13" rx="1.5"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Smoke: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 16c-2 0-3-1.5-3-3s1.2-3 3-3a4 4 0 0 1 7-1.5A3.5 3.5 0 0 1 19 11a3 3 0 0 1 0 6H5z"/>
      <path d="M7 20h10M9 13c.8 0 1.4.6 1.4 1.4"/>
    </svg>
  ),
  Arrow: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="arrow">
      <path d="M3 9h12M10 4l5 5-5 5"/>
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 9.5l3.5 3.5L15 4.5"/>
    </svg>
  ),
  Phone: () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 3.5C3 3 3.5 2.5 4 2.5h2l1.2 3-1.4 1c.6 1.5 1.7 2.6 3.2 3.2l1-1.4 3 1.2v2c0 .5-.5 1-1 1C6.5 13.5 3 10 3 3.5z"/>
    </svg>
  ),
  Tg: () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 7.5l12-4.5-2 11-3.5-3-2 2v-3l6.5-5.5L4 8.5z"/>
    </svg>
  ),
  Wa: () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 2.5a5.5 5.5 0 0 0-4.7 8.4L2.5 14l3.2-.8A5.5 5.5 0 1 0 8 2.5z"/>
      <path d="M6 6.5c0 2 1.5 3.5 3.5 3.5l1-.7-1.2-.8-.7.4a3 3 0 0 1-1.5-1.5l.4-.7-.8-1.2L6 6.5z"/>
    </svg>
  ),
  Diamond: () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M50 10 L80 35 L50 90 L20 35 Z"/>
      <path d="M20 35 L80 35 M35 35 L50 90 M65 35 L50 90 M35 35 L50 10 M65 35 L50 10"/>
    </svg>
  ),
};

/* ============== Reveal hook ============== */
function useReveal(){
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (typeof IntersectionObserver === 'undefined') return;

    // For elements currently below the fold, add the .reveal-anim class so they
    // start hidden and animate in when scrolled to. Above-the-fold elements
    // stay visible. This guarantees we never end up with permanently invisible
    // content if the observer fails.
    const belowFold = (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9;
    const toAnimate = els.filter(belowFold);
    toAnimate.forEach(el => el.classList.add('reveal-anim'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting){
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
    toAnimate.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}

/* ============== Header ============== */
function Header({ onCta }){
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-row">
        <a href="#top" className="logo">
          Свет<span className="amp">Да</span>Любовь
          <small>Санкт-Петербург</small>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Услуги</a></li>
          <li><a href="#advantages">Почему мы</a></li>
          <li><a href="#process">Процесс</a></li>
          <li><a href="#portfolio">Работы</a></li>
          <li><a href="#contact">Контакты</a></li>
        </ul>
        <a href="#contact" className="nav-cta" onClick={onCta}>
          Оставить заявку <Icon.Arrow size={14} />
        </a>
      </div>
    </header>
  );
}

/* ============== Hero variants ============== */
function HeroCinematic(){
  return (
    <section className="hero" id="top">
      <div className="hero__bg" style={{ backgroundImage: 'url(assets/portfolio/p04.jpg)' }} />
      <div className="hero__veil" />
      <div className="hero__grain" />
      <div className="container hero__inner">
        <div className="hero__title-block">
          <span className="eyebrow">Прокат света, звука и экранов</span>
          <h1 className="h-display">
            Свадьбы, <em>которые</em> помнят светом
          </h1>
          <div className="hero__sub">
            <a href="#contact" className="btn">Рассчитать вечер <Icon.Arrow /></a>
            <p className="hero__tagline">
              Техническое обеспечение свадеб в Санкт-Петербурге.<br/>
              От первого танца до последнего фейерверка дыма.
            </p>
          </div>
          <div className="hero__chips">
            <span>Свет</span><span>Звук</span><span>LED-экраны</span><span>Тяжёлый дым</span>
          </div>
        </div>
        <div className="hero__meta">
          <span className="city">Санкт-Петербург</span>
          <span>выезд по Лен. области</span>
          <span>ежедневно 10:00 — 22:00</span>
        </div>
      </div>
      <div className="scroll-cue">
        <span>Листайте</span>
        <span className="line" />
      </div>
    </section>
  );
}

function HeroSplit(){
  return (
    <section className="hero hero--split" id="top">
      <div className="container hero__inner">
        <div className="hero__title-block">
          <span className="eyebrow">Прокат техники для свадеб</span>
          <h1 className="h-display" style={{ marginTop: 28 }}>
            Тёплый свет.<br/><em>Чистый</em> звук.<br/>Главный вечер.
          </h1>
          <p className="lead" style={{ marginTop: 32, maxWidth: '38ch' }}>
            Привозим, ставим, ведём весь вечер. Свет, звук, экраны и тяжёлый дым — на любой площадке Петербурга.
          </p>
          <div className="hero__sub">
            <a href="#contact" className="btn">Оставить заявку <Icon.Arrow /></a>
            <a href="#portfolio" className="btn btn--ghost">Смотреть работы</a>
          </div>
        </div>
        <div className="hero__image" style={{ backgroundImage: 'url(assets/portfolio/p04.jpg)' }} />
      </div>
    </section>
  );
}

function HeroEditorial(){
  return (
    <section className="hero hero--editorial" id="top">
      <div className="container hero__inner">
        <div className="editorial-row">
          <div>
            <span className="eyebrow">Том I — Санкт-Петербург</span>
            <h1 className="h-display" style={{ marginTop: 24 }}>
              <em>Свет</em>, звук<br/>и тонна<br/>тёплого <em>дыма</em>
            </h1>
            <p className="lead" style={{ marginTop: 36 }}>
              Мы — прокатная компания, которая работает только со свадьбами. 
              Знаем, как звучит первый танец и как пахнет дым на финальном поцелуе.
            </p>
            <div className="hero__sub">
              <a href="#contact" className="btn">Обсудить вечер <Icon.Arrow /></a>
              <p className="hero__tagline">7 лет, 400+ свадеб, ноль сорванных вечеров.</p>
            </div>
          </div>
          <div className="editorial-img" style={{ backgroundImage: 'url(assets/portfolio/p01.jpg)' }} />
        </div>
      </div>
    </section>
  );
}

/* ============== Services ============== */
const SERVICES = [
  {
    icon: <Icon.Light />,
    title: 'Свет',
    text: 'Архитектурная подсветка зала, динамические сцены под танцы, световые акценты на церемонии и президиуме.',
    list: ['Pixel Bar', 'Moving head', 'Профильные прожекторы', 'Уличная подсветка', 'Контрольный пульт'],
  },
  {
    icon: <Icon.Sound />,
    title: 'Звук',
    text: 'Ровная озвучка любого зала — от уютной 50-местной веранды до банкета на 300 гостей. Чистая речь и качественные танцы.',
    list: ['Линейные массивы', 'Микрофоны для церемонии', 'Радиосистемы', 'DJ-комплект', 'Звукорежиссёр'],
  },
  {
    icon: <Icon.Screen />,
    title: 'Экраны и проекции',
    text: 'LED-стены и проекционные комплексы для трансляций, заставок, видео-поздравлений и фоновой графики на бэк сцены.',
    list: ['LED-экраны P3.9', 'Лазерные проекторы', 'Бэк сцены', 'Контент-плеер'],
  },
  {
    icon: <Icon.Smoke />,
    title: 'Дым и эффекты',
    text: 'Тяжёлый низкий дым для первого танца, конфетти-выстрелы и холодные фонтаны — без задымления зала и без срабатывания пожарных.',
    list: ['Тяжёлый дым', 'Холодные фонтаны', 'Конфетти-пушки', 'Хейзер'],
  },
];

function Services(){
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-no">01 / Услуги</span>
          <div className="section-head__title">
            <span className="eyebrow">Что мы привозим</span>
            <h2 className="h-section">Полный <em>технический</em> обвес свадьбы</h2>
            <p className="section-head__lead">
              Один договор, одна команда, одна точка ответственности. Подбираем комплект под площадку и сценарий — не продаём лишнего.
            </p>
          </div>
        </div>
        <div className="services reveal">
          {SERVICES.map((s, i) => (
            <div className="service" key={i}>
              <div className="service__icon">{s.icon}</div>
              <div className="service__body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Advantages ============== */
const ADVANTAGES = [
  {
    num: '01',
    title: 'Специализация — свадьбы',
    text: 'Свадьбы — наш основной профиль, мы знаем эту нишу изнутри. При этом охотно беремся и за другие мероприятия, если задача интересная.',
  },
  {
    num: '02',
    title: 'Свой склад в Петербурге',
    text: 'Оборудование своё — не пересдаём с третьих рук. Если что-то выйдет из строя в день свадьбы, привезём подмену в течение часа.',
  },
  {
    num: '03',
    title: 'Тех-режиссёр на площадке',
    text: 'На любую свадьбу выезжает инженер. Не оставляем пульт «на координатора» и не уезжаем сразу после монтажа.',
  },
  {
    num: '04',
    title: 'Дружим с площадками',
    text: 'Знаем электрику и логистику Лофтов, особняков и загородных площадок Петербурга. Согласуем монтаж заранее.',
  },
  {
    num: '05',
    title: 'Тихий монтаж',
    text: 'Приезжаем заранее, монтируем без суеты. К приходу гостей всё уже работает и проверено вживую.',
  },
  {
    num: '06',
    title: 'Один счёт за всё',
    text: 'Свет, звук, экраны и эффекты — в одном договоре и одной смете. Удобно: одна команда отвечает за весь технический блок свадьбы.',
  },
];

function Advantages(){
  return (
    <section className="section" id="advantages">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-no">02 / Почему мы</span>
          <div className="section-head__title">
            <span className="eyebrow">Шесть причин</span>
            <h2 className="h-section">Сильные стороны, <em>которые</em> чувствуются на площадке</h2>
          </div>
        </div>
        <div className="advantages reveal">
          {ADVANTAGES.map((a) => (
            <div className="advantage" key={a.num}>
              <div className="advantage__num">{a.num}</div>
              <h4>{a.title}</h4>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Process ============== */
const STEPS = [
  { no: 'I', title: 'Заявка', text: 'Оставляете дату, площадку и количество гостей. Перезваниваем в тот же день.' },
  { no: 'II', title: 'Смета', text: 'Уточняем сценарий, предлагаем комплект под задачу. Фиксируем цену в смете — без сюрпризов.' },
  { no: 'III', title: 'Выезд на площадку', text: 'Заранее осматриваем зал, согласуем точки монтажа и электрику с администратором.' },
  { no: 'IV', title: 'Свадьба', text: 'Приезжаем за 4–6 часов. Монтаж, саундчек, прогон. Ведём вечер от церемонии до финального танца.' },
];

function Process(){
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-no">03 / Как мы работаем</span>
          <div className="section-head__title">
            <span className="eyebrow">Процесс</span>
            <h2 className="h-section">От первого <em>звонка</em> до последнего аккорда</h2>
          </div>
        </div>
        <div className="process reveal">
          {STEPS.map((s) => (
            <div className="step" key={s.no}>
              <span className="step__no">— {s.no}</span>
              <h5>{s.title}</h5>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Portfolio ============== */
// Layout: 2-col bento — tall left + 2 stacked right; then wide full; then 2 stacked left + tall right
const PORTFOLIO = [
  { src: 'assets/gallery/g03.jpg', size: 'tall-l', place: 'Екатерининский дворец', year: 'Свет' },
  { src: 'assets/gallery/g02.jpg', size: 'stack-r1', place: 'Сценический комплект', year: 'Свет + звук' },
  { src: 'assets/gallery/g05.jpg', size: 'stack-r2', place: 'Колонный зал', year: 'Подсветка колонн' },
  { src: 'assets/gallery/g01.jpg', size: 'wide', place: 'Первый танец', year: 'Свет + эффекты' },
  { src: 'assets/gallery/g04.jpg', size: 'tall-r', place: 'Камерная площадка', year: 'DJ + звук' },
];

function Portfolio(){
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-no">04 / Работы</span>
          <div className="section-head__title">
            <span className="eyebrow">Портфолио</span>
            <h2 className="h-section">Свадьбы, <em>которые</em> мы вели</h2>
            <p className="section-head__lead">
              Кадры с реальных свадеб. Полный фотоотчёт и видео по каждой работе — высылаем по запросу.
            </p>
          </div>
        </div>
        <div className="gallery reveal">
          {PORTFOLIO.map((p, i) => (
            <div className={`gallery__item gallery__item--${p.size}`} key={i}>
              <img src={p.src} alt={p.place} loading="lazy" />
              <div className="gallery__caption">
                <span>{p.place}</span><span>{p.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Pricing teaser ============== */
function Pricing(){
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-no">05 / Цены</span>
          <div className="section-head__title">
            <span className="eyebrow">Без шаблонных пакетов</span>
            <h2 className="h-section">Каждая свадьба — <em>своя</em> смета</h2>
          </div>
        </div>

        <div className="pricing reveal">
          <div>
            <h3>Считаем под <em>вашу</em> площадку и сценарий</h3>
            <p>
              Не делаем «пакеты» на сайте — площадки и сценарии слишком разные, чтобы их усреднять. 
              Цена зависит от размера зала, количества гостей и комплекта оборудования. Расчёт — бесплатно.
            </p>
            <ul>
              <li><Icon.Check /> Смета в течение дня после первого звонка</li>
              <li><Icon.Check /> Возможна предоплата 30%, остаток — после монтажа</li>
              <li><Icon.Check /> Заключаем официальный договор</li>
            </ul>
            <a href="#contact" className="btn">Получить расчёт <Icon.Arrow /></a>
          </div>
          <div className="pricing__visual" aria-hidden="true">
            <Icon.Diamond />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Contact form ============== */
function ContactForm(){
  const [form, setForm] = useState({ name: '', phone: '', guests: '', channel: 'tg', comment: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }));
  };

  const formatPhone = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 11);
    if (!digits) return '';
    let r = '+7 ';
    if (digits.length > 1) r += '(' + digits.slice(1, 4);
    if (digits.length >= 4) r += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) r += '-' + digits.slice(7, 9);
    if (digits.length >= 9) r += '-' + digits.slice(9, 11);
    return r;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Как вас зовут?';
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 11) errs.phone = 'Полный номер с кодом страны';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
  };

  if (sent){
    return (
      <div className="form-card">
        <div className="form-success">
          <div className="form-success__icon"><Icon.Check /></div>
          <h4>Заявка принята</h4>
          <p>Свяжемся с вами в течение часа в рабочее время.<br/>Спасибо, что выбрали нас.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="form-field form-field--full">
          <label className="form-label">Имя</label>
          <input
            className={`form-input ${errors.name ? 'invalid' : ''}`}
            placeholder="Как к вам обращаться"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label className="form-label">Телефон</label>
          <input
            className={`form-input ${errors.phone ? 'invalid' : ''}`}
            placeholder="+7 (___) ___-__-__"
            value={form.phone}
            inputMode="tel"
            onChange={(e) => update('phone', formatPhone(e.target.value))}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>
        <div className="form-field">
          <label className="form-label">Гостей на свадьбе</label>
          <input
            className="form-input"
            placeholder="напр. 80"
            value={form.guests}
            inputMode="numeric"
            onChange={(e) => update('guests', e.target.value.replace(/\D/g, '').slice(0, 4))}
          />
        </div>
        <div className="form-field form-field--full">
          <label className="form-label">Удобный способ связи</label>
          <div className="contact-radio">
            <label>
              <input type="radio" name="ch" checked={form.channel === 'tg'} onChange={() => update('channel', 'tg')} />
              <span className="pill"><Icon.Tg /> Telegram</span>
            </label>
            <label>
              <input type="radio" name="ch" checked={form.channel === 'wa'} onChange={() => update('channel', 'wa')} />
              <span className="pill"><Icon.Wa /> WhatsApp</span>
            </label>
            <label>
              <input type="radio" name="ch" checked={form.channel === 'call'} onChange={() => update('channel', 'call')} />
              <span className="pill"><Icon.Phone /> Звонок</span>
            </label>
          </div>
        </div>
        <div className="form-field form-field--full">
          <label className="form-label">Комментарий или пожелания</label>
          <textarea
            className="form-textarea"
            placeholder="Дата, площадка, что важно — напишите свободно"
            value={form.comment}
            onChange={(e) => update('comment', e.target.value)}
            rows={3}
          />
        </div>
      </div>
      <div className="form-submit">
        <button className="btn" type="submit">Отправить заявку <Icon.Arrow /></button>
        <p className="form-disclaimer">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных в соответствии с политикой компании.
        </p>
      </div>
    </form>
  );
}

function Contact(){
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact reveal">
          <div className="contact__info">
            <span className="eyebrow">06 / Связаться</span>
            <h3>Расскажите о <em>вашей</em> свадьбе</h3>
            <p>
              Достаточно даты, площадки и пары слов о том, что вы хотите. Перезвоним и пришлём смету в день обращения.
            </p>
            <div className="contact__details">
              <div className="contact__row">
                <span className="label">Телефон</span>
                <a href="tel:+78121234567" className="value">+7 (812) 123-45-67</a>
              </div>
              <div className="contact__row">
                <span className="label">Почта</span>
                <a href="mailto:hello@svetdalubov.ru" className="value">hello@svetdalubov.ru</a>
              </div>
              <div className="contact__row">
                <span className="label">Склад и офис</span>
                <span className="value">Санкт-Петербург,<br/>ул. Большая Зеленина, 28</span>
              </div>
              <div className="contact__row">
                <span className="label">Время работы</span>
                <span className="value">Ежедневно с 10:00 до 22:00</span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* ============== Footer ============== */
function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#top" className="logo">
              Свет<span className="amp">Да</span>Любовь
              <small>Санкт-Петербург</small>
            </a>
            <p style={{ marginTop: 24, color: 'var(--text-mute)', fontSize: 14, maxWidth: '40ch' }}>
              Прокатная компания, специализирующаяся только на свадьбах. Свет, звук, экраны и эффекты — под ключ.
            </p>
          </div>
          <div>
            <h6>Навигация</h6>
            <ul>
              <li><a href="#services">Услуги</a></li>
              <li><a href="#advantages">Почему мы</a></li>
              <li><a href="#process">Как работаем</a></li>
              <li><a href="#portfolio">Работы</a></li>
            </ul>
          </div>
          <div>
            <h6>Связь</h6>
            <ul>
              <li><a href="tel:+78121234567">+7 (812) 123-45-67</a></li>
              <li><a href="mailto:hello@svetdalubov.ru">hello@svetdalubov.ru</a></li>
              <li><a href="#" target="_blank">Telegram</a></li>
              <li><a href="#" target="_blank">VK</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 СветДаЛюбовь. Все права защищены.</span>
          <span>Сделано с любовью к свадьбам · Санкт-Петербург</span>
        </div>
      </div>
    </footer>
  );
}

/* ============== Tweaks panel ============== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "type": "didone",
  "hero": "split"
}/*EDITMODE-END*/;

function TweaksUI({ tw, setTweak }){
  // Apply theme + type to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tw.theme);
    document.documentElement.setAttribute('data-type', tw.type);
  }, [tw.theme, tw.type]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Палитра" />
      <TweakRadio
        label="Тема"
        value={tw.theme}
        onChange={(v) => setTweak('theme', v)}
        options={[
          { value: 'dark', label: 'Тёмная' },
          { value: 'light', label: 'Светлая' },
          { value: 'mono', label: 'Контраст' },
        ]}
      />
      <TweakSection label="Типографика" />
      <TweakRadio
        label="Шрифт"
        value={tw.type}
        onChange={(v) => setTweak('type', v)}
        options={[
          { value: 'serif', label: 'Сериф' },
          { value: 'didone', label: 'Дидон' },
          { value: 'sans', label: 'Гротеск' },
        ]}
      />
      <TweakSection label="Hero-секция" />
      <TweakRadio
        label="Вариант"
        value={tw.hero}
        onChange={(v) => setTweak('hero', v)}
        options={[
          { value: 'cinematic', label: 'Кино' },
          { value: 'split', label: 'Сплит' },
          { value: 'editorial', label: 'Журнал' },
        ]}
      />
    </TweaksPanel>
  );
}

/* ============== App ============== */
function App(){
  useReveal();
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

  let HeroEl = HeroCinematic;
  if (tw.hero === 'split') HeroEl = HeroSplit;
  if (tw.hero === 'editorial') HeroEl = HeroEditorial;

  return (
    <>
      <Header />
      <main>
        <HeroEl />
        <Services />
        <Advantages />
        <Process />
        <Portfolio />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <TweaksUI tw={tw} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
