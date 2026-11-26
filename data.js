/* Datos y utilidades compartidas (web + panel). En la demo se guardan solo en este navegador. */
(function () {
  'use strict';
  var KEY = 'barberia-demo-v1';

  function tile(kind) {
    var bg = { a: '#1b2c47', b: '#2a1a1c', c: '#16263a', d: '#23201a', e: '#1a2a2a', f: '#2b2233' }[kind.bg];
    var g = '';
    if (kind.k === 'pole') {
      g = '<g transform="rotate(-18 200 200)"><rect x="170" y="40" width="60" height="320" rx="30" fill="#efe9dc"/>' +
        [0, 1, 2, 3, 4, 5].map(function (i) { return '<path d="M170 ' + (70 + i * 52) + ' l60 -30 v26 l-60 30z" fill="' + (i % 2 ? '#2b4f8c' : '#b8312f') + '"/>'; }).join('') + '</g>';
    } else if (kind.k === 'razor') {
      g = '<g transform="rotate(-30 200 200)"><rect x="70" y="180" width="170" height="40" rx="8" fill="#c8ccd2"/><rect x="230" y="188" width="110" height="24" rx="12" fill="#b8312f"/><circle cx="236" cy="200" r="8" fill="#8a8f98"/></g>';
    } else if (kind.k === 'comb') {
      g = '<rect x="70" y="150" width="260" height="30" rx="8" fill="#d9b66a"/>' +
        Array.from({ length: 16 }, function (_, i) { return '<rect x="' + (78 + i * 15.5) + '" y="180" width="6" height="64" rx="3" fill="#d9b66a"/>'; }).join('');
    } else if (kind.k === 'scissors') {
      g = '<g transform="rotate(-20 200 200)"><path d="M90 130 L320 250" stroke="#c8ccd2" stroke-width="12" stroke-linecap="round"/><path d="M90 270 L320 150" stroke="#e5e8ec" stroke-width="12" stroke-linecap="round"/><circle cx="80" cy="125" r="26" fill="none" stroke="#b8312f" stroke-width="10"/><circle cx="80" cy="275" r="26" fill="none" stroke="#b8312f" stroke-width="10"/></g>';
    } else if (kind.k === 'brush') {
      g = '<rect x="150" y="90" width="100" height="120" rx="40" fill="#e8dcc4"/><rect x="178" y="200" width="44" height="130" rx="22" fill="#6b4a2f"/>';
    } else {
      g = '<g fill="none" stroke="#efe9dc" stroke-width="10" stroke-linecap="round"><path d="M110 260 q90 -170 180 0"/><path d="M140 260 q60 -110 120 0"/></g><circle cx="200" cy="130" r="38" fill="#d9b66a"/>';
    }
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="' + bg + '"/>' +
      '<g opacity=".14" stroke="#fff"><path d="M0 100h400M0 200h400M0 300h400"/></g>' + g + '</svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  var DEFAULTS = {
    name: 'Barbería La Esquina',
    tagline: 'Corte limpio, barba a navaja y cero esperas.',
    currency: '$',
    whatsapp: '15555550123',
    address: 'Calle Mayor 12, local 3',
    city: 'Tu ciudad',
    instagram: 'barberialaesquina',
    hours: [
      { d: 'Lunes', open: '09:00', close: '20:00', closed: false },
      { d: 'Martes', open: '09:00', close: '20:00', closed: false },
      { d: 'Miércoles', open: '09:00', close: '20:00', closed: false },
      { d: 'Jueves', open: '09:00', close: '20:00', closed: false },
      { d: 'Viernes', open: '09:00', close: '21:00', closed: false },
      { d: 'Sábado', open: '09:00', close: '18:00', closed: false },
      { d: 'Domingo', open: '10:00', close: '14:00', closed: true }
    ],
    services: [
      { id: 's1', name: 'Corte clásico', desc: 'Tijera y máquina, lavado y peinado.', price: 12, min: 30, visible: true },
      { id: 's2', name: 'Degradado', desc: 'Fade a medida con acabado de navaja.', price: 15, min: 40, visible: true },
      { id: 's3', name: 'Corte + barba', desc: 'El combo completo, con toalla caliente.', price: 22, min: 60, visible: true },
      { id: 's4', name: 'Arreglo de barba', desc: 'Perfilado, hidratación y aceite.', price: 10, min: 25, visible: true },
      { id: 's5', name: 'Afeitado a navaja', desc: 'Afeitado clásico con toalla caliente.', price: 14, min: 30, visible: true },
      { id: 's6', name: 'Corte niño', desc: 'Hasta 12 años.', price: 9, min: 25, visible: true },
      { id: 's7', name: 'Cejas', desc: 'Perfilado con hilo o navaja.', price: 3, min: 10, visible: true },
      { id: 's8', name: 'Camuflaje de canas', desc: 'Color natural en 15 minutos.', price: 18, min: 45, visible: true }
    ],
    gallery: [
      { src: tile({ k: 'pole', bg: 'a' }), alt: 'Poste de barbero' },
      { src: tile({ k: 'razor', bg: 'b' }), alt: 'Navaja' },
      { src: tile({ k: 'comb', bg: 'c' }), alt: 'Peine' },
      { src: tile({ k: 'scissors', bg: 'd' }), alt: 'Tijeras' },
      { src: tile({ k: 'brush', bg: 'e' }), alt: 'Brocha de afeitar' },
      { src: tile({ k: 'mustache', bg: 'f' }), alt: 'Bigote' }
    ]
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var store = {
    get: function () {
      try { var raw = localStorage.getItem(KEY); if (raw) return Object.assign(clone(DEFAULTS), JSON.parse(raw)); } catch (e) {}
      return clone(DEFAULTS);
    },
    set: function (d) {
      try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; }
    },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(d, n) {
    var v = Number(n); if (isNaN(v)) v = 0;
    var txt = (v % 1 === 0) ? String(v) : v.toFixed(2).replace('.', ',');
    return d.currency + ' ' + txt;
  }

  window.Barber = { store: store, esc: esc, money: money, DEFAULTS: DEFAULTS };
})();
