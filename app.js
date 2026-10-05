'use strict';

/* =========================================================
   Road to Michigan – Englisch für kleine Fahrzeug-Fans
   Alles läuft über Audio (Web Speech API), weil das Kind noch
   nicht liest. Fehler werden nie bestraft: falsche Antworten
   wackeln nur, dann wird die richtige Lösung gezeigt.
   ========================================================= */

const $app = document.getElementById('app');
const $overlay = document.getElementById('overlay');

// ---------- Zustand ----------
const STORE_KEY = 'road-to-michigan-v1';
const DEFAULT_STATE = {
  stars: 0,
  stickers: 0,
  topics: {},   // id -> { look: bool, listen: Anzahl Runden, speak: Anzahl }
  words: {},    // "topic:en" -> { seen, right, miss }
  days: {},     // "YYYY-MM-DD" -> Sterne an diesem Tag
  settings: { name: '', tripDate: '2026-12-20', german: true, rate: 0.8, voice: '' },
};

let state = loadState();

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY));
    if (raw) return { ...DEFAULT_STATE, ...raw, settings: { ...DEFAULT_STATE.settings, ...raw.settings } };
  } catch (e) { /* ignorieren */ }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* privat-modus */ }
}
function topicState(id) {
  return state.topics[id] || (state.topics[id] = { look: false, listen: 0, speak: 0 });
}
function wordStat(topicId, w) {
  const k = topicId + ':' + w.en;
  return state.words[k] || (state.words[k] = { seen: 0, right: 0, miss: 0 });
}
function today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

// ---------- Hilfen ----------
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const childName = () => state.settings.name.trim() || 'Buddy';
const fill = (s) => s.replace(/\{name\}/g, childName());

function h(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content;
}

// ---------- Sprache ----------
const synth = window.speechSynthesis;
let voices = [];
// iOS bringt Spaß-Stimmen mit (Zarvox, Bubbles …) – die wollen wir nie automatisch wählen.
const NOVELTY = /Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Junior|Ralph|Fred|Kathy|Grandma|Grandpa|Rocko|Shelley|Flo|Eddy|Reed|Sandy/i;
function loadVoices() { voices = synth ? synth.getVoices().filter((v) => !NOVELTY.test(v.name)) : []; }
if (synth) {
  loadVoices();
  if (synth.addEventListener) synth.addEventListener('voiceschanged', loadVoices);
  else synth.onvoiceschanged = loadVoices;
}

function pickVoice(lang) {
  if (!voices.length) loadVoices();
  if (lang === 'en' && state.settings.voice) {
    const v = voices.find((v) => v.name === state.settings.voice);
    if (v) return v;
  }
  const prefix = lang === 'de' ? 'de' : 'en-US';
  const pool = voices.filter((v) => v.lang.replace('_', '-').startsWith(prefix));
  // Hochwertige iOS-Stimmen ("Premium"/"Enhanced") zuerst, dann bekannte gute Stimmen.
  const better = pool.filter((v) => /Premium|Enhanced|Erweitert/i.test(v.name));
  const nice = ['Samantha', 'Ava', 'Allison', 'Susan', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Anna', 'Helena', 'Google Deutsch', 'Microsoft Katja'];
  for (const list of [better, pool]) {
    for (const n of nice) { const v = list.find((v) => v.name.includes(n)); if (v) return v; }
  }
  return better[0] || pool.find((v) => v.localService) || pool[0] ||
    voices.find((v) => v.lang.startsWith(lang)) || null;
}

let speakToken = 0;
let currentUtterance = null; // Referenz halten – Safari verliert sonst onend (Garbage Collection)
function speak(text, { lang = 'en', rate } = {}) {
  return new Promise((resolve) => {
    if (!synth) { resolve(); return; }
    const token = ++speakToken;
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice(lang);
    if (v) u.voice = v;
    u.lang = v ? v.lang : (lang === 'de' ? 'de-DE' : 'en-US');
    u.rate = rate || (lang === 'de' ? 0.95 : state.settings.rate);
    u.pitch = 1.1;
    let done = false;
    const finish = () => { if (!done) { done = true; resolve(token === speakToken); } };
    u.onend = finish;
    u.onerror = finish;
    // Sicherheitsnetz: manche Browser feuern onend nicht zuverlässig
    setTimeout(finish, 1500 + text.length * 120);
    currentUtterance = u;
    // Safari verschluckt eine Äußerung, die direkt nach cancel() startet – kurz warten.
    if (synth.speaking || synth.pending) {
      synth.cancel();
      setTimeout(() => { if (token === speakToken) synth.speak(u); else finish(); }, 80);
    } else {
      synth.speak(u);
    }
  });
}
function stopSpeaking() { speakToken++; if (synth) synth.cancel(); }

// Ein Audio-Element für die eigenen Aufnahmen. iOS erlaubt play() nur, wenn das Element
// einmal in einer Nutzer-Geste gestartet wurde – das passiert beim Start-Knopf.
const playback = new Audio();
playback.setAttribute('playsinline', '');
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
function unlockPlayback() {
  playback.src = SILENT_WAV;
  const p = playback.play();
  if (p && p.catch) p.catch(() => {});
}

// ---------- Soundeffekte (WebAudio, keine Dateien nötig) ----------
let actx = null;
function audio() {
  if (!actx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (C) actx = new C();
  }
  if (actx && actx.state === 'suspended') actx.resume();
  return actx;
}
function tone(freq, start, dur, type = 'sine', vol = 0.18) {
  const a = audio(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0, a.currentTime + start);
  g.gain.linearRampToValueAtTime(vol, a.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + start + dur);
  o.connect(g).connect(a.destination);
  o.start(a.currentTime + start); o.stop(a.currentTime + start + dur + 0.05);
}
const sfx = {
  tap() { tone(660, 0, 0.08, 'triangle', 0.12); },
  right() { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.25, 'triangle')); },
  soft() { tone(330, 0, 0.18, 'sine', 0.12); tone(294, 0.15, 0.22, 'sine', 0.1); },
  vroom() {
    const a = audio(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(70, a.currentTime);
    o.frequency.exponentialRampToValueAtTime(220, a.currentTime + 0.6);
    o.frequency.exponentialRampToValueAtTime(120, a.currentTime + 0.9);
    g.gain.setValueAtTime(0.0001, a.currentTime);
    g.gain.linearRampToValueAtTime(0.07, a.currentTime + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.95);
    o.connect(g).connect(a.destination); o.start(); o.stop(a.currentTime + 1);
  },
  fanfare() { [523, 523, 523, 659, 784, 659, 784].forEach((f, i) => tone(f, i * 0.13, 0.3, 'square', 0.08)); },
};

// ---------- Bilder ----------
function carSVG(color) {
  const stroke = color === '#fafafa' ? '#9aa5b5' : 'rgba(0,0,0,.25)';
  return `<svg class="car-svg" viewBox="0 0 160 100" aria-hidden="true">
    <path d="M18 62 Q20 44 40 42 L52 22 Q56 16 66 16 L104 16 Q114 16 120 24 L134 42 Q150 44 150 60 L150 70 Q150 76 144 76 L22 76 Q16 76 16 70 Z" fill="${color}" stroke="${stroke}" stroke-width="3"/>
    <path d="M60 24 L104 24 Q110 24 114 30 L122 42 L52 42 Z" fill="#cfefff" stroke="${stroke}" stroke-width="2"/>
    <line x1="86" y1="24" x2="86" y2="42" stroke="${stroke}" stroke-width="3"/>
    <circle cx="48" cy="76" r="15" fill="#263238"/><circle cx="48" cy="76" r="6" fill="#cfd8dc"/>
    <circle cx="120" cy="76" r="15" fill="#263238"/><circle cx="120" cy="76" r="6" fill="#cfd8dc"/>
    <circle cx="144" cy="54" r="5" fill="#fff59d"/>
  </svg>`;
}
function picHTML(w) {
  if (w.color) return carSVG(w.color);
  if (w.count) return `<div class="count-cars">${'🚗'.repeat(w.count)}</div>`;
  return esc(w.pic);
}

// ---------- Belohnungen ----------
function addStars(n) {
  state.stars += n;
  state.days[today()] = (state.days[today()] || 0) + n;
  save();
  const el = document.querySelector('.star-count');
  if (el) {
    el.querySelector('.n').textContent = state.stars;
    el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
  }
}
function praisePop(emoji = '⭐') {
  const el = document.createElement('div');
  el.className = 'praise-pop';
  el.textContent = emoji;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}
function confetti(n = 24) {
  const bits = ['⭐', '🎉', '✨', '🚗', '✈️', '🎈', '🌟', '🚀'];
  for (let i = 0; i < n; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.textContent = rand(bits);
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = 1.6 + Math.random() * 1.6 + 's';
    el.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// Sticker + großes Lob am Ende jeder Runde.
async function celebrate(then) {
  const sticker = STICKERS[state.stickers % STICKERS.length];
  state.stickers++;
  save();
  const arrived = state.stars >= STARS_TO_MICHIGAN && !state.arrivedShown;
  sfx.fanfare();
  confetti();
  $overlay.innerHTML = '';
  $overlay.appendChild(h(`
    <div class="reward">
      <div class="sticker">${arrived ? '🎄' : sticker}</div>
      <div class="msg">${arrived ? 'Welcome to Michigan!' : 'You did it!'}</div>
      <div class="sub">${arrived ? 'Ihr seid angekommen – Merry Christmas!' : 'Neuer Sticker für deine Garage'}</div>
      <button class="big-btn go" aria-label="Weiter">👉</button>
    </div>`));
  $overlay.hidden = false;
  if (arrived) { state.arrivedShown = true; save(); }
  speak(arrived ? `Welcome to Michigan, ${childName()}! Merry Christmas!` : `${rand(PRAISE)} You got a new sticker!`);
  $overlay.querySelector('.go').onclick = () => {
    sfx.tap(); stopSpeaking();
    $overlay.hidden = true;
    then();
  };
}

// ---------- Navigation ----------
let cleanup = null;
function show(render, ...args) {
  if (cleanup) { cleanup(); cleanup = null; }
  stopSpeaking();
  $app.innerHTML = '';
  window.scrollTo(0, 0);
  render(...args);
}

function topbar({ back, parent = false } = {}) {
  const frag = h(`
    <div class="topbar">
      ${back ? '<button class="icon-btn back" aria-label="Zurück">⬅️</button>' : ''}
      <div class="star-count" aria-label="Sterne"><span class="s">⭐</span><span class="n">${state.stars}</span></div>
      <div class="spacer"></div>
      ${parent ? `<button class="icon-btn garage-btn" aria-label="Garage">🅿️</button>
                  <button class="icon-btn small hold-btn parent-btn" aria-label="Eltern (gedrückt halten)"><span class="fill"></span>⚙️</button>` : ''}
    </div>`);
  if (back) frag.querySelector('.back').onclick = () => { sfx.tap(); back(); };
  if (parent) {
    frag.querySelector('.garage-btn').onclick = () => { sfx.vroom(); show(renderGarage); };
    holdToOpen(frag.querySelector('.parent-btn'), () => show(renderParent));
  }
  return frag;
}

// Eltern-Tor: 1,5 Sekunden gedrückt halten, damit das Kind nicht versehentlich reinkommt.
function holdToOpen(btn, onOpen) {
  let timer = null;
  const start = (e) => { e.preventDefault(); btn.classList.add('holding'); timer = setTimeout(() => { btn.classList.remove('holding'); onOpen(); }, 1500); };
  const end = () => { btn.classList.remove('holding'); clearTimeout(timer); };
  btn.addEventListener('pointerdown', start);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, end));
}

function journeyHTML() {
  const p = Math.min(state.stars / STARS_TO_MICHIGAN, 1);
  const days = daysLeft();
  return `
    <div class="journey" aria-label="Reise nach Michigan">
      <div class="waves"></div>
      <div class="path"></div>
      <div class="home">🏠<span class="flag">🇩🇪</span></div>
      <div class="goal">🎄<span class="flag">🇺🇸</span></div>
      <div class="plane" style="left:${12 + p * 70}%"><span>✈️</span></div>
      ${days !== null && days >= 0 ? `<div class="sleeps">${days} 🌙</div>` : ''}
    </div>`;
}
function daysLeft() {
  if (!state.settings.tripDate) return null;
  const t = new Date(state.settings.tripDate + 'T00:00:00');
  const n = new Date(); n.setHours(0, 0, 0, 0);
  return Math.round((t - n) / 86400000);
}

// ---------- Startbildschirm ----------
// Ein Tipp ist nötig, damit iOS/Android Ton erlauben.
function renderStart() {
  $app.appendChild(h(`
    <div class="start">
      <div class="hero">✈️</div>
      <h1>Road to Michigan</h1>
      <button class="play" aria-label="Los geht's">▶</button>
      <p class="hint">Ton anschalten 🔊 · Am besten auf dem Tablet und gemeinsam spielen.</p>
    </div>`));
  $app.querySelector('.play').onclick = () => {
    audio(); sfx.vroom();
    unlockPlayback();
    loadVoices();
    // iOS: Sprachausgabe muss in einer Nutzer-Geste "aufgeweckt" werden.
    if (synth) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; synth.speak(u); }
    show(renderHome, true);
  };
}

// ---------- Startseite ----------
function suggestedTopic() {
  return TOPICS.find((t) => { const s = topicState(t.id); return !(s.look && s.listen > 0 && s.speak > 0); }) || null;
}

function medals(id) {
  const s = state.topics[id];
  if (!s) return '';
  return (s.look ? '👀' : '') + (s.listen ? '👂' : '') + (s.speak ? '🦜' : '');
}

function renderHome(greet = false) {
  $app.appendChild(topbar({ parent: true }));
  $app.appendChild(h(journeyHTML()));
  const next = suggestedTopic();
  const grid = h(`<div class="grid">
    ${TOPICS.map((t) => `
      <button class="big-btn tile ${next && next.id === t.id ? 'next' : ''}" data-id="${t.id}" aria-label="${esc(t.de)}">
        <span class="medals">${medals(t.id)}</span>
        <span class="pic">${t.icon}</span>
        <span class="label">${esc(t.de)}</span>
      </button>`).join('')}
    <button class="big-btn tile phrases" data-id="__phrases" aria-label="Sätze sprechen">
      <span class="medals">${state.topics.__phrases && state.topics.__phrases.speak ? '🦜' : ''}</span>
      <span class="pic">🦜</span>
      <span class="label">Sätze</span>
    </button>
  </div>`);
  grid.querySelectorAll('.tile').forEach((b) => {
    b.onclick = () => {
      sfx.tap();
      if (b.dataset.id === '__phrases') { show(renderSpeak, null); return; }
      show(renderTopic, TOPICS.find((t) => t.id === b.dataset.id));
    };
  });
  $app.appendChild(grid);
  if (greet) {
    const p = state.stars / STARS_TO_MICHIGAN;
    const line = p >= 1 ? `Hello ${childName()}! We made it to Michigan!` :
      state.stars === 0 ? `Hello ${childName()}! Let's fly to Michigan!` :
        `Hello ${childName()}! Let's fly on to Michigan!`;
    setTimeout(() => speak(line), 300);
  }
}

// ---------- Themen-Seite: drei Spiele ----------
function renderTopic(topic) {
  const s = topicState(topic.id);
  $app.appendChild(topbar({ back: () => show(renderHome) }));
  $app.appendChild(h(`<div class="title-pic">${topic.icon}</div>`));
  $app.appendChild(h(`
    <div class="modes">
      <button class="big-btn mode look" data-m="look" aria-label="Anschauen"><span class="pic">👀</span><span class="label">Anschauen</span><span class="done">${s.look ? '⭐' : ''}</span></button>
      <button class="big-btn mode listen" data-m="listen" aria-label="Zuhören und finden"><span class="pic">👂</span><span class="label">Hören & Finden</span><span class="done">${'⭐'.repeat(Math.min(s.listen, 3))}</span></button>
      <button class="big-btn mode speak" data-m="speak" aria-label="Nachsprechen"><span class="pic">🦜</span><span class="label">Nachsprechen</span><span class="done">${'⭐'.repeat(Math.min(s.speak, 3))}</span></button>
    </div>`));
  $app.querySelectorAll('.mode').forEach((b) => {
    b.onclick = () => {
      sfx.tap();
      const m = b.dataset.m;
      if (m === 'look') show(renderLook, topic);
      if (m === 'listen') show(renderListen, topic);
      if (m === 'speak') show(renderSpeak, topic);
    };
  });
  setTimeout(() => speak(topic.en), 250);
}

// ---------- Spiel 1: Anschauen (Karten antippen) ----------
function renderLook(topic) {
  const seen = new Set();
  let current = null;
  let finished = false;
  $app.appendChild(topbar({ back: () => show(renderTopic, topic) }));
  $app.appendChild(h(`
    <div class="big-btn focus">
      <div class="pic">👇</div>
      <div class="en">&nbsp;</div>
      <div class="sentence">&nbsp;</div>
      <div class="de"></div>
      <div class="row">
        <button class="icon-btn again" aria-label="Nochmal hören" hidden>🔊</button>
        <button class="icon-btn german" aria-label="Auf Deutsch" hidden>🇩🇪</button>
      </div>
    </div>
    <div class="cards">
      ${topic.words.map((w, i) => `<button class="big-btn card" data-i="${i}" aria-label="${esc(w.en)}">${picHTML(w)}</button>`).join('')}
    </div>`));

  const focus = $app.querySelector('.focus');
  const again = focus.querySelector('.again');
  const german = focus.querySelector('.german');

  async function present(w) {
    focus.querySelector('.pic').innerHTML = picHTML(w);
    focus.querySelector('.en').textContent = w.en;
    focus.querySelector('.sentence').textContent = w.say;
    focus.querySelector('.de').textContent = state.settings.german ? w.de : '';
    again.hidden = false;
    german.hidden = !state.settings.german;
    if (!(await speak(w.en))) return;
    await wait(350);
    await speak(w.say);
  }

  $app.querySelectorAll('.card').forEach((c) => {
    c.onclick = async () => {
      sfx.tap();
      const w = topic.words[+c.dataset.i];
      current = w;
      $app.querySelectorAll('.card.active').forEach((x) => x.classList.remove('active'));
      c.classList.add('active', 'seen');
      seen.add(w.en);
      wordStat(topic.id, w).seen++;
      save();
      await present(w);
      if (!finished && seen.size === topic.words.length) {
        finished = true;
        const s = topicState(topic.id);
        s.look = true;
        addStars(3);
        await wait(500);
        celebrate(() => show(renderTopic, topic));
      }
    };
  });
  again.onclick = () => current && present(current);
  german.onclick = async () => {
    if (!current) return;
    await speak(current.de, { lang: 'de' });
    await wait(200);
    await speak(current.en);
  };
  setTimeout(() => speak('Tap a picture!'), 250);
}

// ---------- Spiel 2: Hören & Finden ----------
const ROUNDS = 6;

// Wörter mit vielen Fehlern / wenig Übung kommen häufiger dran.
function pickTarget(topic, last) {
  const weighted = [];
  topic.words.forEach((w) => {
    if (last && w.en === last.en) return;
    const st = wordStat(topic.id, w);
    const weight = 1 + st.miss * 2 + Math.max(0, 3 - st.right);
    for (let i = 0; i < weight; i++) weighted.push(w);
  });
  return rand(weighted);
}
function questionFor(topic, w) {
  if (topic.id === 'hello' || topic.id === 'actions' || topic.id === 'feelings') return `Find: ${w.en}!`;
  if (topic.id === 'colors') return `Where is the ${w.en} car?`;
  if (topic.id === 'numbers') return `Where are ${w.en} ${w.count === 1 ? 'car' : 'cars'}?`;
  const article = /^[aeiou]/i.test(w.en) ? 'an' : 'a';
  if (topic.id === 'food') return `Can you find ${w.en === 'milk' || w.en === 'water' || w.en === 'ice cream' || w.en === 'pancakes' ? 'the' : article} ${w.en}?`;
  return `Where is the ${w.en}?`;
}

function renderListen(topic) {
  const s = topicState(topic.id);
  // Schwierigkeit wächst langsam: erst 2, dann 3, dann 4 Bilder.
  const nOpts = Math.min(topic.words.length, s.listen === 0 ? 2 : s.listen < 3 ? 3 : 4);
  let round = 0;
  let target = null;
  let firstTry = true;
  let locked = false;
  let alive = true;
  cleanup = () => { alive = false; };

  $app.appendChild(topbar({ back: () => show(renderTopic, topic) }));
  $app.appendChild(h(`
    <div class="road"><span class="racer">🏎️</span><span class="finish">🏁</span></div>
    <div class="prompt"><button class="big-btn say-again" aria-label="Nochmal hören">🔊</button></div>
    <div class="options n${nOpts}"></div>`));

  const racer = $app.querySelector('.racer');
  const opts = $app.querySelector('.options');
  const sayBtn = $app.querySelector('.say-again');
  const moveRacer = () => { racer.style.left = `calc(${(round / ROUNDS) * 82}% + 4px)`; };
  moveRacer();

  async function ask() {
    sayBtn.classList.add('talking');
    await speak(questionFor(topic, target));
    sayBtn.classList.remove('talking');
  }
  sayBtn.onclick = () => { sfx.tap(); ask(); };

  function next() {
    if (!alive) return;
    if (round >= ROUNDS) {
      s.listen++;
      save();
      celebrate(() => show(renderTopic, topic));
      return;
    }
    target = pickTarget(topic, target);
    firstTry = true;
    locked = false;
    const others = shuffle(topic.words.filter((w) => w.en !== target.en && picHTML(w) !== picHTML(target))).slice(0, nOpts - 1);
    const choices = shuffle([target, ...others]);
    opts.innerHTML = choices.map((w) => `<button class="big-btn option" data-en="${esc(w.en)}" aria-label="${esc(w.en)}">${picHTML(w)}</button>`).join('');
    opts.querySelectorAll('.option').forEach((b) => { b.onclick = () => choose(b); });
    ask();
  }

  async function choose(btn) {
    if (locked) return;
    const st = wordStat(topic.id, target);
    if (btn.dataset.en === target.en) {
      locked = true;
      btn.classList.add('right');
      opts.querySelectorAll('.option').forEach((b) => (b.disabled = true));
      sfx.right();
      praisePop(firstTry ? '⭐' : '👍');
      if (firstTry) st.right++;
      round++;
      addStars(1);
      moveRacer();
      racer.classList.remove('zoom'); void racer.offsetWidth; racer.classList.add('zoom');
      setTimeout(() => sfx.vroom(), 250);
      await speak(`${rand(PRAISE)} ${target.say}`);
      await wait(400);
      next();
    } else {
      // Falsch: kein Abzug. Kurz wackeln, freundlich ermutigen, beim 2. Fehler Tipp zeigen.
      if (firstTry) { st.miss++; save(); }
      btn.classList.add('wrong');
      btn.disabled = true;
      sfx.soft();
      const wrongW = topic.words.find((w) => w.en === btn.dataset.en);
      const tries = opts.querySelectorAll('.option.wrong').length;
      if (tries >= 1 && !firstTry) {
        opts.querySelector(`[data-en="${CSS.escape(target.en)}"]`).classList.add('hint');
      }
      firstTry = false;
      await speak(`That's the ${wrongW.en}. ${rand(ENCOURAGE)}`);
      if (alive && !locked) await ask();
    }
  }

  setTimeout(next, 300);
}

// ---------- Spiel 3: Papagei / Nachsprechen ----------
// Kein automatisches Bewerten (Spracherkennung versteht Kinder schlecht und
// würde frustrieren). Stattdessen: hören → selbst aufnehmen → sich selbst hören → Stern.
function renderSpeak(topic) {
  const isPhrases = !topic;
  const id = isPhrases ? '__phrases' : topic.id;
  const items = isPhrases
    ? shuffle(PHRASES).slice(0, 5).map((p) => ({ en: fill(p.en), de: fill(p.de), pic: p.pic }))
    : shuffle(topic.words).slice(0, 5).map((w) => ({ en: w.say, de: w.de, pic: w.pic, color: w.color, count: w.count }));
  let i = 0;
  let rec = null;
  let alive = true;
  let stream = null;
  cleanup = () => {
    alive = false;
    if (rec && rec.state === 'recording') rec.stop();
    if (stream) stream.getTracks().forEach((t) => t.stop());
    playback.onended = null;
    playback.pause();
  };
  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

  $app.appendChild(topbar({ back: () => (isPhrases ? show(renderHome) : show(renderTopic, topic)) }));
  $app.appendChild(h(`
    <div class="big-btn parrot">
      <div class="dots">${items.map(() => '<span></span>').join('')}</div>
      <div class="bird">🦜</div>
      <div class="pic"></div>
      <div class="phrase"></div>
      <div class="de"></div>
      <div class="row">
        <button class="round-btn listen" aria-label="Anhören">🔊</button>
        ${canRecord ? '<button class="round-btn mic" aria-label="Aufnehmen">🎤</button>' : ''}
        <button class="round-btn ok" aria-label="Geschafft">👍</button>
      </div>
    </div>`));

  const box = $app.querySelector('.parrot');
  const listenBtn = box.querySelector('.listen');
  const micBtn = box.querySelector('.mic');
  const okBtn = box.querySelector('.ok');

  function paint() {
    const it = items[i];
    box.querySelectorAll('.dots span').forEach((d, k) => d.classList.toggle('on', k < i));
    box.querySelector('.pic').innerHTML = picHTML(it);
    box.querySelector('.phrase').textContent = it.en;
    box.querySelector('.de').textContent = state.settings.german ? it.de : '';
  }
  async function model() {
    await speak(items[i].en, { rate: Math.max(0.6, state.settings.rate - 0.1) });
  }
  async function intro() {
    paint();
    await speak('Listen, and say it like me!');
    if (alive) await wait(250);
    if (alive) await model();
  }

  listenBtn.onclick = () => { sfx.tap(); model(); };

  if (micBtn) {
    micBtn.onclick = async () => {
      if (rec && rec.state === 'recording') { rec.stop(); return; }
      stopSpeaking();
      try {
        stream = stream || await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      } catch (e) {
        micBtn.remove(); // kein Mikro erlaubt → nur Daumen-hoch-Weg
        return;
      }
      const chunks = [];
      rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      rec.onstop = async () => {
        micBtn.classList.remove('recording');
        micBtn.textContent = '🎤';
        // Mikro schließen – sonst ist die Wiedergabe auf dem iPad sehr leise.
        if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
        if (!alive || !chunks.length) return;
        const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/mp4' }));
        await wait(150);
        playback.onended = () => { playback.onended = null; URL.revokeObjectURL(url); good(); };
        playback.src = url;
        const p = playback.play();
        if (p && p.catch) p.catch(() => { playback.onended = null; good(); });
      };
      rec.start();
      micBtn.classList.add('recording');
      micBtn.textContent = '⏹️';
      setTimeout(() => { if (rec && rec.state === 'recording') rec.stop(); }, 5000);
    };
  }

  let advancing = false;
  async function good() {
    if (advancing || !alive) return;
    advancing = true;
    sfx.right();
    praisePop(rand(['⭐', '🌟', '🎉', '👏']));
    addStars(1);
    await speak(rand(PRAISE));
    i++;
    advancing = false;
    if (!alive) return;
    if (i >= items.length) {
      box.querySelectorAll('.dots span').forEach((d) => d.classList.add('on'));
      topicState(id).speak++;
      save();
      celebrate(() => (isPhrases ? show(renderHome) : show(renderTopic, topic)));
      return;
    }
    await wait(300);
    paint();
    await model();
  }
  okBtn.onclick = () => good();

  setTimeout(intro, 250);
}

// ---------- Garage (Sticker-Sammlung) ----------
function renderGarage() {
  $app.appendChild(topbar({ back: () => show(renderHome) }));
  const owned = Math.min(state.stickers, STICKERS.length);
  const slots = STICKERS.map((s, i) => i < owned
    ? `<button class="slot" data-i="${i}">${s}</button>`
    : '<div class="slot empty">?</div>').join('');
  $app.appendChild(h(`<div class="title-pic">🅿️</div><div class="garage">${slots}</div>`));
  $app.querySelectorAll('.slot[data-i]').forEach((b) => {
    b.onclick = () => {
      sfx.vroom();
      b.classList.remove('drive'); void b.offsetWidth; b.classList.add('drive');
      speak(rand(['Vroom vroom!', 'Beep beep!', 'Zoom!', 'So cool!']));
    };
  });
  speak(owned ? `You have ${owned} ${owned === 1 ? 'sticker' : 'stickers'}! Vroom!` : "Let's play and win stickers!");
}

// ---------- Eltern-Bereich ----------
function renderParent() {
  $app.appendChild(topbar({ back: () => show(renderHome) }));
  const st = state.settings;
  loadVoices();
  const enVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  const dayKeys = Object.keys(state.days).sort().slice(-14);
  const tricky = Object.entries(state.words)
    .filter(([, v]) => v.miss > 0)
    .sort((a, b) => b[1].miss - a[1].miss)
    .slice(0, 10);
  const learned = Object.values(state.words).filter((v) => v.right >= 2).length;
  const totalWords = TOPICS.reduce((n, t) => n + t.words.length, 0);

  $app.appendChild(h(`
    <div class="parent">
      <h2>Eltern-Bereich</h2>
      <p>⭐ ${state.stars} / ${STARS_TO_MICHIGAN} bis Michigan · ${learned} von ${totalWords} Wörtern mind. 2× sicher erkannt
      ${daysLeft() !== null ? ` · noch ${daysLeft()} Tage bis zur Reise` : ''}</p>

      <label for="name">Name des Kindes (wird im Spiel auf Englisch angesprochen)</label>
      <input id="name" type="text" value="${esc(st.name)}" placeholder="z. B. Max" autocomplete="off">

      <label for="trip">Abflug-Datum</label>
      <input id="trip" type="date" value="${esc(st.tripDate)}">

      <label for="rate">Sprechtempo: <span id="rateV">${st.rate.toFixed(2)}</span></label>
      <input id="rate" type="range" min="0.55" max="1.1" step="0.05" value="${st.rate}">

      <label for="voice">Englische Stimme</label>
      <select id="voice">
        <option value="">Automatisch (US-Englisch bevorzugt)</option>
        ${enVoices.map((v) => `<option value="${esc(v.name)}" ${v.name === st.voice ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}
      </select>
      <button class="btn" id="test">🔊 Stimme testen</button>

      <label class="check"><input id="german" type="checkbox" ${st.german ? 'checked' : ''}> Deutsche Hilfen anzeigen (🇩🇪-Knopf & Übersetzung)</label>

      <h3>Schwierige Wörter</h3>
      ${tricky.length ? `<table><tr><th>Wort</th><th>Daneben</th><th>Richtig</th></tr>
        ${tricky.map(([k, v]) => `<tr><td>${esc(k.split(':')[1])}</td><td>${v.miss}</td><td>${v.right}</td></tr>`).join('')}</table>`
        : '<p>Noch keine – oder alles läuft rund.</p>'}
      <p>Diese Wörter kommen im Hör-Spiel automatisch häufiger dran. Am besten auch im Alltag benutzen („Where is the <b>truck</b>?“).</p>

      <h3>Letzte Tage</h3>
      ${dayKeys.length ? `<table>${dayKeys.map((d) => `<tr><td>${d}</td><td>⭐ ${state.days[d]}</td></tr>`).join('')}</table>` : '<p>Noch nicht gespielt.</p>'}

      <h3>Tipps</h3>
      <ul>
        <li><b>Kurz & täglich</b>: 10 Minuten am Tag bringen mehr als eine Stunde am Wochenende.</li>
        <li><b>Gemeinsam spielen</b> und die Sätze danach im Alltag benutzen – die App ist der Anstoß, nicht der Lehrer.</li>
        <li>Fehler nie korrigieren, sondern das richtige Wort einfach nochmal fröhlich sagen.</li>
        <li>Englische Fahrzeug-Videos/Lieder (z. B. „Wheels on the Bus“) ergänzen das Hören.</li>
      </ul>

      <button class="btn danger" id="reset">Fortschritt zurücksetzen</button>
    </div>`));

  const $ = (sel) => $app.querySelector(sel);
  $('#name').oninput = (e) => { st.name = e.target.value; save(); };
  $('#trip').onchange = (e) => { st.tripDate = e.target.value; save(); };
  $('#rate').oninput = (e) => { st.rate = +e.target.value; $('#rateV').textContent = st.rate.toFixed(2); save(); };
  $('#voice').onchange = (e) => { st.voice = e.target.value; save(); };
  $('#german').onchange = (e) => { st.german = e.target.checked; save(); };
  $('#test').onclick = () => speak(`Hello ${childName()}! The fire truck is red. Vroom vroom!`);
  $('#reset').onclick = () => {
    if (confirm('Wirklich alle Sterne und Sticker löschen?')) {
      const keep = state.settings;
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      state.settings = keep;
      save();
      show(renderHome);
    }
  };
}

// ---------- Offline-Unterstützung (z. B. im Flugzeug) ----------
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

show(renderStart);
