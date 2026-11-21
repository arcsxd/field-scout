/* Field Scout — obstacle scouting for Pyka mapping (Step 4)
 * Plain JS, no bundler. Works in browser (PWA) and inside Capacitor (iOS/Android).
 */
'use strict';

// ---------------------------------------------------------------- i18n
const I18N = {
  en: {
    pole:'Power pole', tower:'Tower', guy:'Guy anchor', silo:'Silo', building:'Building',
    pivot:'Irrigation', tree:'Tree', other:'Other',
    lineKind_power:'Power line', lineKind_guy:'Guy wire',
    finish:'Finish', cancel:'Cancel', save:'Save', menu:'Menu',
    tapHint:'Move the map so the + is on the obstacle, then tap the map.',
    mGps:'My GPS', mMap:'On map', mBearing:'Bearing + dist',
    startAvg:'Average GPS', stopAvg:'Stop', mapPaneHint:'Use when you can see the obstacle on the satellite image.',
    pickOnMap:'Pick on map', bearingHint:'Stand still, point the phone at the obstacle, read the bearing and enter the distance (rangefinder or estimate).',
    bearingTrue:'Bearing (° true)', distance:'Distance (m)', useCompass:'Read compass',
    height:'Height AGL (m)', width:'Width / diameter (m)', notes:'Notes', addPhoto:'📷 Photo',
    farmName:'Farm / site name', operator:'Operator', declination:'Magnetic declination (°, west = negative)',
    importKml:'📂 Import farm KML/KMZ (spray areas)', clearFarm:'Remove farm boundaries',
    exportKmz:'⬆ Export KMZ (with photos)', exportKml:'Export KML', exportCsv:'Export CSV',
    listFeatures:'Obstacle list', toggleLayer:'Switch map layer', newSession:'New session (erase all)',
    gpsWait:'GPS…', gpsNone:'No GPS', samples:'samples', spread:'spread',
    saved:'Saved', deleted:'Deleted', undone:'Undone', nothingUndo:'Nothing to undo',
    trackOn:'Track recording ON', trackOff:'Track recording OFF',
    lineStart:'Line mode: every pole you save is added to this line',
    lineChooseKind:'Line type? OK = Power line, Cancel = Guy wire',
    lineSaved:'Line saved', lineNeed2:'A line needs at least 2 points',
    poles:'points', confirmNew:'Erase ALL obstacles, lines and tracks? Export first!',
    confirmDelete:'Delete this obstacle?', edit:'Edit', del:'Delete', move:'Move',
    moved:'Moved', dragHint:'Drag the marker, then tap it again.',
    farmLoaded:'Farm loaded', farmErr:'Could not read this KML', noFarm:'No farm loaded',
    inSpray:'inside spray area', inBuffer:'within 1.5 km', outside:'beyond 1.5 km',
    compassDenied:'Compass not available', exportEmpty:'Nothing to export',
    noFix:'No GPS position yet', accuracy:'acc', stats:'{p} obstacles · {l} lines · {t} track pts',
    sheetTitleLine:'(line)', addToLine:'Added to line', untitled:'Untitled farm',
    accGood:'✓ Good GPS accuracy', accMid:'⚠ Fair accuracy — average a bit longer', accPoor:'✖ Poor accuracy — wait, move to open sky or mark on map',
    dupNear:'⚠ {type} already marked {d} m away — possible duplicate', fromLast:'from last pole', byType:'By type', lineKm:'Lines', trackKm:'Track'
  },
  pt: {
    pole:'Poste', tower:'Torre', guy:'Âncora estai', silo:'Silo', building:'Edificação',
    pivot:'Irrigação', tree:'Árvore', other:'Outro',
    lineKind_power:'Linha de energia', lineKind_guy:'Cabo de estai',
    finish:'Concluir', cancel:'Cancelar', save:'Salvar', menu:'Menu',
    tapHint:'Mova o mapa até o + ficar sobre o obstáculo e toque no mapa.',
    mGps:'Meu GPS', mMap:'No mapa', mBearing:'Rumo + dist',
    startAvg:'Média do GPS', stopAvg:'Parar', mapPaneHint:'Use quando o obstáculo aparece na imagem de satélite.',
    pickOnMap:'Marcar no mapa', bearingHint:'Fique parado, aponte o celular para o obstáculo, leia o rumo e informe a distância (trena laser ou estimativa).',
    bearingTrue:'Rumo (° verdadeiro)', distance:'Distância (m)', useCompass:'Ler bússola',
    height:'Altura AGL (m)', width:'Largura / diâmetro (m)', notes:'Observações', addPhoto:'📷 Foto',
    farmName:'Fazenda / local', operator:'Operador', declination:'Declinação magnética (°, oeste = negativo)',
    importKml:'📂 Importar KML/KMZ da fazenda (áreas)', clearFarm:'Remover limites da fazenda',
    exportKmz:'⬆ Exportar KMZ (com fotos)', exportKml:'Exportar KML', exportCsv:'Exportar CSV',
    listFeatures:'Lista de obstáculos', toggleLayer:'Trocar camada do mapa', newSession:'Nova sessão (apaga tudo)',
    gpsWait:'GPS…', gpsNone:'Sem GPS', samples:'amostras', spread:'dispersão',
    saved:'Salvo', deleted:'Apagado', undone:'Desfeito', nothingUndo:'Nada para desfazer',
    trackOn:'Gravando trilha', trackOff:'Trilha parada',
    lineStart:'Modo linha: cada ponto salvo entra nesta linha',
    lineChooseKind:'Tipo de linha? OK = Linha de energia, Cancelar = Cabo de estai',
    lineSaved:'Linha salva', lineNeed2:'Uma linha precisa de pelo menos 2 pontos',
    poles:'pontos', confirmNew:'Apagar TODOS os obstáculos, linhas e trilhas? Exporte antes!',
    confirmDelete:'Apagar este obstáculo?', edit:'Editar', del:'Apagar', move:'Mover',
    moved:'Movido', dragHint:'Arraste o marcador e toque nele de novo.',
    farmLoaded:'Fazenda carregada', farmErr:'Não foi possível ler este KML', noFarm:'Nenhuma fazenda',
    inSpray:'dentro da área', inBuffer:'até 1,5 km', outside:'além de 1,5 km',
    compassDenied:'Bússola indisponível', exportEmpty:'Nada para exportar',
    noFix:'Ainda sem posição GPS', accuracy:'prec', stats:'{p} obstáculos · {l} linhas · {t} pts de trilha',
    sheetTitleLine:'(linha)', addToLine:'Adicionado à linha', untitled:'Fazenda sem nome',
    accGood:'✓ Precisão do GPS boa', accMid:'⚠ Precisão razoável — faça a média por mais tempo', accPoor:'✖ Precisão ruim — aguarde, vá para céu aberto ou marque no mapa',
    dupNear:'⚠ {type} já marcado a {d} m — possível duplicado', fromLast:'do último poste', byType:'Por tipo', lineKm:'Linhas', trackKm:'Trilha'
  }
};
// Export labels are always English (for the Pyka team)
const EN = I18N.en;

const TYPES = [
  { id:'pole',     color:'#ffd400', ic:'⚡' },
  { id:'tower',    color:'#ff3b30', ic:'🗼', dark:true },
  { id:'guy',      color:'#ff9500', ic:'⚓' },
  { id:'silo',     color:'#bf5af2', ic:'🛢', dark:true },
  { id:'building', color:'#aeb4bc', ic:'🏠' },
  { id:'pivot',    color:'#3ea6ff', ic:'💧' },
  { id:'tree',     color:'#30d158', ic:'🌳' },
  { id:'other',    color:'#ffffff', ic:'⚠' },
];
const TYPE = Object.fromEntries(TYPES.map(t => [t.id, t]));
const LINE_COLORS = { power:'#ffd400', guy:'#ff9500' };
const BUFFER_KM = 1.5;

// ---------------------------------------------------------------- tiny IndexedDB
const DB = (() => {
  let dbp;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open('fieldscout', 1);
      r.onupgradeneeded = () => {
        const d = r.result;
        d.createObjectStore('kv'); d.createObjectStore('photos'); d.createObjectStore('tiles');
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  async function tx(store, mode, fn) {
    const d = await open();
    return new Promise((res, rej) => {
      const t = d.transaction(store, mode); const s = t.objectStore(store);
      const out = fn(s);
      t.oncomplete = () => res(out && out.result !== undefined ? out.result : out);
      t.onerror = () => rej(t.error);
    });
  }
  return {
    get: (store, k) => tx(store, 'readonly', s => s.get(k)),
    put: (store, k, v) => tx(store, 'readwrite', s => s.put(v, k)),
    del: (store, k) => tx(store, 'readwrite', s => s.delete(k)),
    clear: (store) => tx(store, 'readwrite', s => s.clear()),
  };
})();

// ---------------------------------------------------------------- state
const S = {
  lang: 'en',
  farm: '', operator: '', decl: 0,
  features: [],   // {id,type,lat,lon,acc,method,height,width,notes,photos:[ids],lineId,ts,op}
  lines: [],      // {id,kind,pointIds:[],ts,op}
  track: [],      // [[lat,lon,ts,acc]]
  farmGeo: null,  // GeoJSON FeatureCollection of imported farm
  undo: [],       // stack of {op, data}
};
let saveTimer;
function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const { undo, ...rest } = S;
    DB.put('kv', 'state', JSON.parse(JSON.stringify(rest))).catch(console.error);
  }, 250);
}
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const t = k => (I18N[S.lang][k] ?? I18N.en[k] ?? k);
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function toast(msg, ms = 1800) {
  const el = $('#toast'); el.textContent = msg; el.classList.remove('hidden');
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.add('hidden'), ms);
}
const fmt = (n, d = 1) => (n == null || isNaN(n)) ? '—' : Number(n).toFixed(d);

// ---------------------------------------------------------------- map
const map = L.map('map', { zoomControl: false, attributionControl: true, maxZoom: 21 }).setView([-12.15, -45.0], 13);

// Tile layer that caches every tile you view in IndexedDB (for no-signal areas)
const CachedLayer = L.TileLayer.extend({
  createTile(coords, done) {
    const img = document.createElement('img');
    img.alt = ''; img.setAttribute('role', 'presentation');
    const url = this.getTileUrl(coords);
    const key = this.options.cacheKey + '/' + coords.z + '/' + coords.x + '/' + coords.y;
    DB.get('tiles', key).then(blob => {
      if (blob) { img.onload = () => done(null, img); img.onerror = e => done(e, img); img.src = URL.createObjectURL(blob); return; }
      if (!navigator.onLine) { done(new Error('offline'), img); return; }
      fetch(url, { mode: 'cors' }).then(r => { if (!r.ok) throw new Error(r.status); return r.blob(); })
        .then(b => { DB.put('tiles', key, b).catch(() => {}); img.onload = () => done(null, img); img.src = URL.createObjectURL(b); })
        .catch(() => { img.onload = () => done(null, img); img.onerror = e => done(e, img); img.src = url; });
    }).catch(() => { img.onload = () => done(null, img); img.src = url; });
    return img;
  }
});
const layers = [
  new CachedLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxNativeZoom: 18, maxZoom: 21, cacheKey: 'esri', attribution: 'Imagery © Esri, Maxar, Earthstar' }),
  new CachedLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxNativeZoom: 19, maxZoom: 21, cacheKey: 'osm', attribution: '© OpenStreetMap' }),
];
let layerIdx = 0; layers[0].addTo(map);

const gFarm = L.layerGroup().addTo(map);
const gTrack = L.layerGroup().addTo(map);
const gLines = L.layerGroup().addTo(map);
const gObs = L.layerGroup().addTo(map);
const gMe = L.layerGroup().addTo(map);
let trackLine = L.polyline([], { color: '#3ea6ff', weight: 3, opacity: .8, dashArray: '6 6' }).addTo(gTrack);
let activeLineDraft = L.polyline([], { color: '#ffd400', weight: 4, dashArray: '4 6' }).addTo(gLines);

// ---------------------------------------------------------------- GPS
let fix = null;          // latest {lat,lon,acc,ts,heading}
let firstFix = true;
const fixListeners = new Set();
const meMarker = L.marker([0, 0], { icon: L.divIcon({ className: '', html: '<div class="me-marker"></div>', iconSize: [18, 18] }), interactive: false });
const meAcc = L.circle([0, 0], { radius: 1, color: '#3ea6ff', weight: 1, fillOpacity: .12, interactive: false });

function onPos(p) {
  fix = { lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy, ts: p.timestamp || Date.now() };
  meMarker.setLatLng([fix.lat, fix.lon]); meAcc.setLatLng([fix.lat, fix.lon]).setRadius(fix.acc);
  if (!gMe.hasLayer(meMarker)) { gMe.addLayer(meAcc); gMe.addLayer(meMarker); }
  if (firstFix) { firstFix = false; map.setView([fix.lat, fix.lon], 17); }
  const dot = $('#gpsChip .dot');
  dot.className = 'dot ' + (fix.acc <= 5 ? 'good' : fix.acc <= 15 ? 'mid' : 'bad');
  $('#gpsText').textContent = `±${fmt(fix.acc, 0)} m`;
  fixListeners.forEach(f => f(fix));
  updateBand(); updateRec();
  if (tracking && !nativeBg) addTrackPoint(fix);
}
function onPosErr(e) { $('#gpsText').textContent = t('gpsNone'); $('#gpsChip .dot').className = 'dot bad'; console.warn(e); }
function startGps() {
  if (!('geolocation' in navigator)) return onPosErr('no geolocation');
  navigator.geolocation.watchPosition(onPos, onPosErr, { enableHighAccuracy: true, maximumAge: 0, timeout: 30000 });
}

// ---------------------------------------------------------------- track recording (background-capable in native app)
let tracking = false, nativeBg = null, bgWatcherId = null;
const Cap = window.Capacitor;
const isNative = !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform());
function addTrackPoint(f) {
  const last = S.track[S.track.length - 1];
  if (last && (f.ts - last[2] < 2000)) return;
  if (last && turf.distance([last[1], last[0]], [f.lon, f.lat], { units: 'meters' }) < 4) return;
  if (f.acc > 30) return;
  if (last) trackStats.m += turf.distance([last[1], last[0]], [f.lon, f.lat], { units: 'meters' });
  S.track.push([+f.lat.toFixed(7), +f.lon.toFixed(7), f.ts, Math.round(f.acc)]);
  trackLine.addLatLng([f.lat, f.lon]);
  persist();
}
async function setTracking(on) {
  tracking = on;
  $('#btnTrack').classList.toggle('on', on);
  if (on) { S.track.push(null); trackStats.start = Date.now(); } // segment break marker
  $('#recChip').classList.toggle('hidden', !on); updateRec();
  if (isNative && Cap.Plugins && Cap.Plugins.BackgroundGeolocation) {
    nativeBg = Cap.Plugins.BackgroundGeolocation;
    if (on) {
      bgWatcherId = await nativeBg.addWatcher({
        backgroundMessage: 'Recording scout track', backgroundTitle: 'Field Scout',
        requestPermissions: true, stale: false, distanceFilter: 4
      }, (loc, err) => {
        if (err || !loc) return;
        addTrackPoint({ lat: loc.latitude, lon: loc.longitude, acc: loc.accuracy, ts: loc.time || Date.now() });
      });
    } else if (bgWatcherId) { await nativeBg.removeWatcher({ id: bgWatcherId }); bgWatcherId = null; }
  } else nativeBg = null;
  toast(t(on ? 'trackOn' : 'trackOff'));
  persist();
}
function drawTrack() {
  gTrack.clearLayers();
  const segs = []; let cur = [];
  for (const p of S.track) { if (!p) { if (cur.length) segs.push(cur); cur = []; } else cur.push([p[0], p[1]]); }
  segs.forEach(s => L.polyline(s, { color: '#3ea6ff', weight: 3, opacity: .7, dashArray: '6 6' }).addTo(gTrack));
  trackLine = L.polyline(cur, { color: '#3ea6ff', weight: 3, opacity: .8, dashArray: '6 6' }).addTo(gTrack);
}

// ---------------------------------------------------------------- farm (spray areas) + 1.5 km buffer
let farmPolys = null, farmBuffer = null;
function drawFarm() {
  gFarm.clearLayers(); farmPolys = null; farmBuffer = null;
  if (!S.farmGeo) return;
  const polys = S.farmGeo.features.filter(f => f.geometry && /Polygon/.test(f.geometry.type));
  L.geoJSON(S.farmGeo, {
    style: { color: '#2fd27a', weight: 2, fillOpacity: .08 },
    pointToLayer: (f, ll) => L.circleMarker(ll, { radius: 4, color: '#2fd27a' })
  }).addTo(gFarm);
  if (polys.length) {
    try {
      farmPolys = turf.featureCollection(polys);
      const buf = turf.buffer(farmPolys, BUFFER_KM, { units: 'kilometers' });
      farmBuffer = buf.features.length > 1 ? buf.features.reduce((a, b) => { try { return turf.union(turf.featureCollection([a, b])) || a; } catch { return a; } }) : buf.features[0];
      L.geoJSON(farmBuffer, { style: { color: '#ffb020', weight: 1.5, dashArray: '8 6', fill: false }, interactive: false }).addTo(gFarm);
    } catch (e) { console.warn('buffer failed', e); }
  }
}
function zoneOf(lat, lon) {
  if (!farmPolys) return '';
  const pt = turf.point([lon, lat]);
  for (const f of farmPolys.features) { try { if (turf.booleanPointInPolygon(pt, f)) return 'spray_area'; } catch {} }
  if (farmBuffer && turf.booleanPointInPolygon(pt, farmBuffer)) return 'within_1_5km';
  return 'beyond_1_5km';
}
const zoneLabel = z => ({ spray_area: t('inSpray'), within_1_5km: t('inBuffer'), beyond_1_5km: t('outside') })[z] || '';

async function importFarm(file) {
  try {
    let text;
    if (/\.kmz$/i.test(file.name) || file.type.includes('kmz')) {
      const zip = await JSZip.loadAsync(file);
      const kmlName = Object.keys(zip.files).find(n => /\.kml$/i.test(n));
      text = await zip.file(kmlName).async('string');
    } else text = await file.text();
    const dom = new DOMParser().parseFromString(text, 'text/xml');
    const gj = toGeoJSON.kml(dom);
    if (!gj.features.length) throw new Error('empty');
    S.farmGeo = gj;
    if (!S.farm) { S.farm = file.name.replace(/\.(kml|kmz)$/i, ''); }
    drawFarm(); refreshAll(); persist();
    map.fitBounds(L.geoJSON(gj).getBounds(), { padding: [30, 30] });
    toast(t('farmLoaded'));
  } catch (e) { console.error(e); toast(t('farmErr')); }
}

// ---------------------------------------------------------------- obstacle markers + lines
function iconFor(f) {
  const ty = TYPE[f.type] || TYPE.other;
  const sz = f.type === 'pole' ? 16 : 22;
  return L.divIcon({ className: '', iconSize: [sz, sz],
    html: `<div class="obs-marker" style="width:${sz}px;height:${sz}px;background:${ty.color}">${f.type === 'pole' ? '' : (f.height ? Math.round(f.height) : '')}</div>` });
}
const markerById = new Map();
function drawFeatures() {
  gObs.clearLayers(); markerById.clear();
  for (const f of S.features) {
    const m = L.marker([f.lat, f.lon], { icon: iconFor(f), draggable: false });
    m.on('click', () => openPopup(f, m));
    m.addTo(gObs); markerById.set(f.id, m);
  }
}
function lineLatLngs(l) {
  return l.pointIds.map(id => S.features.find(f => f.id === id)).filter(Boolean).map(f => [f.lat, f.lon]);
}
function drawLines() {
  gLines.clearLayers();
  for (const l of S.lines) {
    L.polyline(lineLatLngs(l), { color: LINE_COLORS[l.kind] || '#ffd400', weight: 4, opacity: .95 })
      .bindPopup(`<b>${t('lineKind_' + l.kind)}</b><br>${l.pointIds.length} ${t('poles')}`).addTo(gLines);
  }
  activeLineDraft = L.polyline(lineMode ? lineLatLngs(lineMode) : [], { color: LINE_COLORS[lineMode?.kind] || '#ffd400', weight: 4, dashArray: '4 6' }).addTo(gLines);
}
function refreshAll() { drawFeatures(); drawLines(); updateStats(); $('#farmTitle').textContent = S.farm || ''; }

async function openPopup(f, m) {
  let imgs = '';
  for (const pid of (f.photos || []).slice(0, 2)) {
    const b = await DB.get('photos', pid); if (b) imgs += `<img src="${URL.createObjectURL(b)}">`;
  }
  const z = zoneOf(f.lat, f.lon);
  const html = `<b>${t(f.type)}</b>${f.lineId ? ' · ' + t('lineKind_' + (S.lines.find(l => l.id === f.lineId)?.kind || (lineMode?.id === f.lineId ? lineMode.kind : 'power'))) : ''}<br>
    <span class="mono">${f.lat.toFixed(6)}, ${f.lon.toFixed(6)}</span><br>
    ${t('height')}: <b>${fmt(f.height)}</b> · ±${fmt(f.acc, 0)} m · ${f.method}<br>
    ${f.width ? t('width') + ': ' + fmt(f.width) + '<br>' : ''}${f.notes ? '<i>' + escapeHtml(f.notes) + '</i><br>' : ''}
    ${z ? '<small>' + zoneLabel(z) + '</small><br>' : ''}${imgs}
    <div class="pbtns"><button data-a="edit">${t('edit')}</button><button data-a="move">${t('move')}</button><button data-a="del">${t('del')}</button></div>`;
  m.bindPopup(html).openPopup();
  const el = m.getPopup().getElement();
  el.querySelector('[data-a=edit]').onclick = () => { map.closePopup(); openSheet(f.type, f); };
  el.querySelector('[data-a=del]').onclick = () => { map.closePopup(); deleteFeature(f.id); };
  el.querySelector('[data-a=move]').onclick = () => {
    map.closePopup(); m.unbindPopup(); m.dragging.enable(); toast(t('dragHint'), 2500);
    m.off('click'); m.once('click', () => {
      const ll = m.getLatLng(); const old = { lat: f.lat, lon: f.lon };
      f.lat = ll.lat; f.lon = ll.lng; f.method += '+moved';
      S.undo.push({ op: 'move', id: f.id, old }); m.dragging.disable(); persist(); refreshAll(); toast(t('moved'));
    });
  };
}
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function deleteFeature(id) {
  if (!confirm(t('confirmDelete'))) return;
  const i = S.features.findIndex(f => f.id === id); if (i < 0) return;
  const [f] = S.features.splice(i, 1);
  const lineRefs = [];
  for (const l of [...S.lines, ...(lineMode ? [lineMode] : [])]) {
    const k = l.pointIds.indexOf(id); if (k >= 0) { l.pointIds.splice(k, 1); lineRefs.push([l.id, k]); }
  }
  S.undo.push({ op: 'del', f, idx: i, lineRefs });
  persist(); refreshAll(); toast(t('deleted'));
}
function undo() {
  const u = S.undo.pop(); if (!u) return toast(t('nothingUndo'));
  if (u.op === 'add') {
    S.features = S.features.filter(f => f.id !== u.id);
    for (const l of [...S.lines, ...(lineMode ? [lineMode] : [])]) l.pointIds = l.pointIds.filter(x => x !== u.id);
  } else if (u.op === 'del') {
    S.features.splice(u.idx, 0, u.f);
    for (const [lid, k] of u.lineRefs) { const l = S.lines.find(x => x.id === lid) || (lineMode?.id === lid ? lineMode : null); if (l) l.pointIds.splice(k, 0, u.f.id); }
  } else if (u.op === 'move') {
    const f = S.features.find(x => x.id === u.id); if (f) { f.lat = u.old.lat; f.lon = u.old.lon; f.method = f.method.replace(/\+moved$/, ''); }
  } else if (u.op === 'line') {
    S.lines = S.lines.filter(l => l.id !== u.id);
  }
  persist(); refreshAll(); toast(t('undone'));
}

// ---------------------------------------------------------------- line mode
let lineMode = null; // {id, kind, pointIds}
function startLine() {
  if (lineMode) return finishLine();
  const kind = confirm(t('lineChooseKind')) ? 'power' : 'guy';
  lineMode = { id: uid(), kind, pointIds: [], ts: Date.now(), op: S.operator };
  $('#btnLine').classList.add('on-line');
  $('#lineBanner').classList.remove('hidden');
  updateLineBanner(); toast(t('lineStart'), 2500);
}
function updateLineBanner() {
  if (!lineMode) return;
  $('#lineBannerTitle').textContent = t('lineKind_' + lineMode.kind);
  $('#lineBannerCount').textContent = `· ${lineMode.pointIds.length} ${t('poles')}`;
  drawLines();
}
function finishLine(cancel = false) {
  if (!lineMode) return;
  if (!cancel) {
    if (lineMode.pointIds.length < 2) { toast(t('lineNeed2')); return; }
    S.lines.push(lineMode); S.undo.push({ op: 'line', id: lineMode.id }); toast(t('lineSaved'));
  } else {
    // points stay as standalone obstacles; just unlink them
    S.features.forEach(f => { if (f.lineId === lineMode.id) delete f.lineId; });
  }
  lineMode = null; gBand.clearLayers();
  $('#btnLine').classList.remove('on-line'); $('#lineBanner').classList.add('hidden');
  persist(); refreshAll();
}

// ---------------------------------------------------------------- capture sheet
let cap = null; // {type, editing, method, pos:{lat,lon,acc}, photos:[{id,blob}]}
function openSheet(type, editing = null) {
  closeAllSheets();
  cap = { type, editing, method: 'gps', pos: editing ? { lat: editing.lat, lon: editing.lon, acc: editing.acc } : null,
          photos: [], keepPhotos: editing ? [...(editing.photos || [])] : [] };
  const ty = TYPE[type];
  $('#sheetSwatch').style.background = ty.color;
  $('#sheetTitle').textContent = t(type) + (lineMode && !editing ? ' ' + t('sheetTitleLine') : '');
  $('#inHeight').value = editing?.height ?? (lastHeight[type] ?? '');
  $('#inWidth').value = editing?.width ?? '';
  $('#inNotes').value = editing?.notes ?? '';
  $('#avgStatus').textContent = editing ? `${editing.lat.toFixed(6)}, ${editing.lon.toFixed(6)} ±${fmt(editing.acc, 0)}m` : '—';
  $('#mapPickStatus').textContent = ''; $('#bearingStatus').textContent = '';
  $('#inBearing').value = ''; $('#inDist').value = '';
  resetCaptureVisuals();
  renderThumbs(); setMethod(editing ? (editing.method.split('+')[0] || 'gps') : 'gps');
  $('#sheet').classList.remove('hidden'); $('#lineBanner').classList.add('hidden');
  updateSaveBtn();
  // auto-start averaging for fast pole capture
  if (!editing) startAvg();
}
const lastHeight = {};
function setMethod(m) {
  cap.method = m;
  $$('#methodTabs .tab').forEach(b => b.classList.toggle('active', b.dataset.m === m));
  $$('#sheet .pane').forEach(p => p.classList.toggle('hidden', p.dataset.pane !== m));
  if (m !== 'gps') stopAvg();
  if (m === 'bearing') prepBearing();
}
function updateSaveBtn() { $('#btnSave').disabled = !(cap && cap.pos); }
function closeAllSheets() { ['#sheet', '#menu', '#list'].forEach(s => $(s).classList.add('hidden')); if (lineMode) $('#lineBanner').classList.remove('hidden'); stopAvg(); stopCompass(); cancelTapPick(); clearPreview(); }

// GPS averaging (weighted by 1/acc²)
let avg = null;
function startAvg() {
  if (avg) return stopAvg();
  const secs = +$('#avgSecs').value || 10;
  avg = { samples: [], end: Date.now() + secs * 1000, secs };
  $('#btnAvg').textContent = t('stopAvg');
  if (fix && Date.now() - fix.ts < 3000) avg.samples.push(fix);
  const listener = f => { avg && avg.samples.push(f); renderAvg(); };
  avg.listener = listener; fixListeners.add(listener);
  avg.timer = setInterval(() => { renderAvg(); if (Date.now() >= avg.end) stopAvg(); }, 250);
  renderAvg();
}
function computeAvg(samples) {
  let sw = 0, la = 0, lo = 0;
  for (const s of samples) { const w = 1 / Math.max(s.acc, 1) ** 2; sw += w; la += s.lat * w; lo += s.lon * w; }
  const lat = la / sw, lon = lo / sw;
  const spread = Math.max(...samples.map(s => turf.distance([lon, lat], [s.lon, s.lat], { units: 'meters' })));
  const bestAcc = Math.min(...samples.map(s => s.acc));
  return { lat, lon, acc: Math.max(bestAcc / Math.sqrt(samples.length), Math.min(spread, bestAcc)), spread };
}
function renderAvg() {
  if (!avg) return;
  const left = Math.max(0, (avg.end - Date.now()) / 1000);
  if (!avg.samples.length) { $('#avgStatus').textContent = `${t('noFix')} · ${left.toFixed(0)}s`; drawRing(1 - left / avg.secs, null); return; }
  const r = computeAvg(avg.samples);
  cap.pos = { lat: r.lat, lon: r.lon, acc: r.acc }; cap.method = 'gps';
  $('#avgStatus').textContent = `${r.lat.toFixed(6)}, ${r.lon.toFixed(6)}\n${avg.samples.length} ${t('samples')} · ${t('spread')} ${fmt(r.spread)} m · ${left.toFixed(0)}s`;
  drawRing(1 - left / avg.secs, r.acc); drawScatter(avg.samples, r);
  updateSaveBtn(); showPreview();
}
function stopAvg() {
  if (!avg) return;
  clearInterval(avg.timer); fixListeners.delete(avg.listener); avg = null;
  $('#btnAvg').textContent = t('startAvg');
}

// Pick on map (crosshair + tap)
let tapPicking = false;
function startTapPick() {
  tapPicking = true;
  $('#sheet').classList.add('hidden');
  $('#tapBanner').classList.remove('hidden'); $('#crosshair').classList.remove('hidden');
}
function cancelTapPick(reopen = false) {
  if (!tapPicking) return;
  tapPicking = false;
  $('#tapBanner').classList.add('hidden'); $('#crosshair').classList.add('hidden');
  if (reopen && cap) $('#sheet').classList.remove('hidden');
}
map.on('click', () => {
  if (!tapPicking) return;
  const c = map.getCenter();
  cap.pos = { lat: c.lat, lon: c.lng, acc: null }; cap.method = 'map';
  $('#mapPickStatus').textContent = `${c.lat.toFixed(6)}, ${c.lng.toFixed(6)} (z${map.getZoom()})`;
  cancelTapPick(true); updateSaveBtn(); showPreview(true);
});

// Bearing + distance from current/averaged position
let compassOn = false, compassHeading = null;
function onOrient(e) {
  let h = null;
  if (typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading;           // iOS, magnetic
  else if (e.absolute && typeof e.alpha === 'number') h = (360 - e.alpha) % 360;          // Android absolute
  if (h == null) return;
  compassHeading = (h + (+S.decl || 0) + 360) % 360;
  $('#compassLive').textContent = `${compassHeading.toFixed(0)}°`;
  $('#roseLive').classList.remove('hidden'); setRose('#roseLive', compassHeading);
}
async function startCompass() {
  try {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      const r = await DeviceOrientationEvent.requestPermission(); if (r !== 'granted') throw new Error('denied');
    }
    if (!compassOn) {
      window.addEventListener('deviceorientationabsolute', onOrient, true);
      window.addEventListener('deviceorientation', onOrient, true);
      compassOn = true;
    }
    setTimeout(() => {
      if (compassHeading == null) return toast(t('compassDenied'));
      $('#inBearing').value = compassHeading.toFixed(0); calcBearing();
    }, 700);
  } catch { toast(t('compassDenied')); }
}
function stopCompass() {
  if (!compassOn) return;
  window.removeEventListener('deviceorientationabsolute', onOrient, true);
  window.removeEventListener('deviceorientation', onOrient, true);
  compassOn = false; compassHeading = null; $('#compassLive').textContent = '';
}
let bearingOrigin = null;
function prepBearing() { bearingOrigin = fix ? { ...fix } : null; calcBearing(); }
function calcBearing() {
  if (cap?.method !== 'bearing') return;
  const b = parseFloat($('#inBearing').value), d = parseFloat($('#inDist').value);
  setRose('#roseArrow', isNaN(b) ? 0 : b);
  if (!bearingOrigin && fix) bearingOrigin = { ...fix };
  if (!bearingOrigin) { $('#bearingStatus').textContent = t('noFix'); return; }
  if (isNaN(b) || isNaN(d)) { $('#bearingStatus').textContent = `${t('accuracy')} ±${fmt(bearingOrigin.acc, 0)} m`; cap.pos = null; updateSaveBtn(); return; }
  const p = turf.destination([bearingOrigin.lon, bearingOrigin.lat], d / 1000, b > 180 ? b - 360 : b, { units: 'kilometers' });
  const [lon, lat] = p.geometry.coordinates;
  // error grows with distance (≈5° compass error)
  const acc = bearingOrigin.acc + d * Math.tan(5 * Math.PI / 180);
  cap.pos = { lat, lon, acc, from: [bearingOrigin.lat, bearingOrigin.lon], bearing: b, dist: d };
  $('#bearingStatus').textContent = `${lat.toFixed(6)}, ${lon.toFixed(6)} ±${fmt(acc, 0)} m`;
  updateSaveBtn(); showPreview(true);
}

// Photos (resized to max 1600 px, JPEG)
async function addPhoto(file) {
  const blob = await resizeImage(file, 1600, 0.8);
  const id = uid(); cap.photos.push({ id, blob }); renderThumbs();
}
function resizeImage(file, max, q) {
  return new Promise(res => {
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(b => { URL.revokeObjectURL(url); res(b || file); }, 'image/jpeg', q);
    };
    img.onerror = () => res(file); img.src = url;
  });
}
async function renderThumbs() {
  const el = $('#photoThumbs'); el.innerHTML = '';
  for (const pid of cap.keepPhotos) { const b = await DB.get('photos', pid); if (b) { const i = new Image(); i.src = URL.createObjectURL(b); el.appendChild(i); } }
  for (const p of cap.photos) { const i = new Image(); i.src = URL.createObjectURL(p.blob); el.appendChild(i); }
}

async function saveCapture() {
  if (!cap?.pos) return;
  stopAvg();
  for (const p of cap.photos) await DB.put('photos', p.id, p.blob);
  const h = parseFloat($('#inHeight').value), w = parseFloat($('#inWidth').value);
  const data = {
    type: cap.type, lat: +cap.pos.lat.toFixed(7), lon: +cap.pos.lon.toFixed(7),
    acc: cap.pos.acc == null ? null : +cap.pos.acc.toFixed(1), method: cap.method,
    height: isNaN(h) ? null : h, width: isNaN(w) ? null : w, notes: $('#inNotes').value.trim(),
    photos: [...cap.keepPhotos, ...cap.photos.map(p => p.id)],
  };
  if (cap.method === 'bearing') data.bearing = { from: cap.pos.from, deg: cap.pos.bearing, dist_m: cap.pos.dist };
  if (!isNaN(h)) lastHeight[cap.type] = h;
  if (cap.editing) {
    Object.assign(cap.editing, data);
  } else {
    const f = { id: uid(), ts: Date.now(), op: S.operator, ...data };
    if (lineMode) { f.lineId = lineMode.id; lineMode.pointIds.push(f.id); }
    S.features.push(f); S.undo.push({ op: 'add', id: f.id });
  }
  const savedPos = { lat: data.lat, lon: data.lon }, savedType = cap.type, wasEdit = !!cap.editing, newId = wasEdit ? cap.editing.id : S.features[S.features.length - 1].id;
  persist(); closeAllSheets(); refreshAll(); updateLineBanner();
  celebrate(savedPos, savedType, wasEdit ? null : newId);
  if (lineMode && fix) map.panTo([fix.lat, fix.lon]);
  toast(lineMode && !cap.editing ? `${t('addToLine')} (${lineMode.pointIds.length})` : t('saved'));
  cap = null;
}

// ---------------------------------------------------------------- export (always English)
function kmlEsc(s) { return String(s ?? '').replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]); }
function ext(obj) {
  return '<ExtendedData>' + Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `<Data name="${k}"><value>${kmlEsc(v)}</value></Data>`).join('') + '</ExtendedData>';
}
function abgr(hex, a = 'ff') { const h = hex.replace('#', ''); return a + h.slice(4, 6) + h.slice(2, 4) + h.slice(0, 2); }
function buildKml(withPhotos) {
  const farm = S.farm || EN.untitled;
  const date = new Date().toISOString().slice(0, 10);
  const styles = TYPES.map(ty => `<Style id="t_${ty.id}"><IconStyle><color>${abgr(ty.color)}</color><scale>${ty.id === 'pole' ? 0.8 : 1.1}</scale><Icon><href>http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png</href></Icon></IconStyle><LabelStyle><scale>0.7</scale></LabelStyle></Style>`).join('')
    + Object.entries(LINE_COLORS).map(([k, c]) => `<Style id="l_${k}"><LineStyle><color>${abgr(c)}</color><width>4</width></LineStyle></Style>`).join('')
    + `<Style id="track"><LineStyle><color>${abgr('#3ea6ff', 'b0')}</color><width>2</width></LineStyle></Style>`;
  const allLines = [...S.lines, ...(lineMode && lineMode.pointIds.length >= 2 ? [lineMode] : [])];
  const lineKindOf = id => allLines.find(l => l.id === id)?.kind;
  const pm = f => {
    const name = `${EN[f.type]}${f.height ? ' ' + f.height + 'm' : ''}`;
    const z = zoneOf(f.lat, f.lon);
    let desc = `${EN[f.type]}<br/>Height AGL: ${f.height ?? 'n/a'} m<br/>Lat/Lon: ${f.lat.toFixed(7)}, ${f.lon.toFixed(7)}<br/>Accuracy: ${f.acc ?? 'map'} m (${f.method})${f.notes ? '<br/>Notes: ' + kmlEsc(f.notes) : ''}`;
    if (withPhotos) desc += (f.photos || []).map(p => `<br/><img src="files/${p}.jpg" width="400"/>`).join('');
    return `<Placemark><name>${kmlEsc(name)}</name><styleUrl>#t_${f.type}</styleUrl><description><![CDATA[${desc}]]></description>`
      + ext({ type: f.type, type_label: EN[f.type], height_agl_m: f.height, width_m: f.width, accuracy_m: f.acc, method: f.method,
              line_id: f.lineId, line_kind: f.lineId ? lineKindOf(f.lineId) : null, zone: z, notes: f.notes, operator: f.op,
              timestamp: new Date(f.ts).toISOString(), bearing_deg: f.bearing?.deg, distance_m: f.bearing?.dist_m, photos: (f.photos || []).length || null })
      + `<Point><coordinates>${f.lon},${f.lat},0</coordinates></Point></Placemark>`;
  };
  const folder = (name, inner) => inner ? `<Folder><name>${kmlEsc(name)}</name>${inner}</Folder>` : '';
  const powerLines = allLines.filter(l => l.kind === 'power'), guyLines = allLines.filter(l => l.kind === 'guy');
  const lineToPm = (l, i) => {
    const pts = l.pointIds.map(id => S.features.find(f => f.id === id)).filter(Boolean);
    if (pts.length < 2) return '';
    const len = pts.slice(1).reduce((a, p, k) => a + turf.distance([pts[k].lon, pts[k].lat], [p.lon, p.lat], { units: 'meters' }), 0);
    const maxH = Math.max(...pts.map(p => p.height || 0)) || null;
    return `<Placemark><name>${EN['lineKind_' + l.kind]} ${i + 1}</name><styleUrl>#l_${l.kind}</styleUrl>`
      + ext({ kind: l.kind, points: pts.length, length_m: Math.round(len), max_height_agl_m: maxH, operator: l.op, line_id: l.id })
      + `<LineString><tessellate>1</tessellate><coordinates>${pts.map(p => `${p.lon},${p.lat},0`).join(' ')}</coordinates></LineString></Placemark>`;
  };
  const byType = id => S.features.filter(f => f.type === id).map(pm).join('');
  const tall = ['tower', 'silo', 'building', 'pivot', 'tree', 'other'].map(id => folder(EN[id] + 's', byType(id))).join('');
  // track
  const segs = []; let cur = [];
  for (const p of S.track) { if (!p) { if (cur.length > 1) segs.push(cur); cur = []; } else cur.push(p); }
  if (cur.length > 1) segs.push(cur);
  const trackPm = segs.map((s, i) => `<Placemark><name>Scout track ${i + 1}</name><styleUrl>#track</styleUrl><LineString><tessellate>1</tessellate><coordinates>${s.map(p => `${p[1]},${p[0]},0`).join(' ')}</coordinates></LineString></Placemark>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>${kmlEsc(farm)} – obstacle scout ${date}</name>
<description>Field Scout export. Operator: ${kmlEsc(S.operator || 'n/a')}. Obstacles: ${S.features.length}. Lines: ${allLines.length}.</description>
${styles}
${folder('Power Lines', powerLines.map(lineToPm).join(''))}
${folder('Power Poles', byType('pole'))}
${folder('Guy Wires', guyLines.map(lineToPm).join('') + byType('guy'))}
${folder('Tall Features', tall)}
${folder('Scout Track', trackPm)}
</Document></kml>`;
}
function fileBase() { return `${(S.farm || 'farm').replace(/[^\w\-]+/g, '_')}_scout_${new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')}`; }
async function shareBlob(blob, name, mime) {
  // Native app: write to cache and open the share sheet
  if (isNative && Cap.Plugins?.Filesystem && Cap.Plugins?.Share) {
    const b64 = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result.split(',')[1]); fr.readAsDataURL(blob); });
    const w = await Cap.Plugins.Filesystem.writeFile({ path: name, data: b64, directory: 'CACHE' });
    await Cap.Plugins.Share.share({ title: name, files: [w.uri] });
    return;
  }
  const file = new File([blob], name, { type: mime });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: name }); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
async function exportKml() {
  if (!S.features.length && !S.track.length) return toast(t('exportEmpty'));
  await shareBlob(new Blob([buildKml(false)], { type: 'application/vnd.google-earth.kml+xml' }), fileBase() + '.kml', 'application/vnd.google-earth.kml+xml');
}
async function exportKmz() {
  if (!S.features.length && !S.track.length) return toast(t('exportEmpty'));
  const zip = new JSZip(); zip.file('doc.kml', buildKml(true));
  for (const f of S.features) for (const p of (f.photos || [])) { const b = await DB.get('photos', p); if (b) zip.file(`files/${p}.jpg`, b); }
  const blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.google-earth.kmz' });
  await shareBlob(blob, fileBase() + '.kmz', 'application/vnd.google-earth.kmz');
}
async function exportCsv() {
  if (!S.features.length) return toast(t('exportEmpty'));
  const head = ['id', 'type', 'lat', 'lon', 'height_agl_m', 'width_m', 'accuracy_m', 'method', 'line_id', 'zone', 'notes', 'operator', 'timestamp'];
  const rows = S.features.map(f => [f.id, EN[f.type], f.lat, f.lon, f.height ?? '', f.width ?? '', f.acc ?? '', f.method, f.lineId ?? '', zoneOf(f.lat, f.lon), f.notes, f.op, new Date(f.ts).toISOString()]
    .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));
  await shareBlob(new Blob([head.join(',') + '\n' + rows.join('\n')], { type: 'text/csv' }), fileBase() + '.csv', 'text/csv');
}

// ---------------------------------------------------------------- list + stats
function updateStats() {
  drawBars();
  $('#stats').textContent = t('stats').replace('{p}', S.features.length).replace('{l}', S.lines.length).replace('{t}', S.track.filter(Boolean).length);
}
function openList() {
  closeAllSheets();
  const body = $('#listBody'); body.innerHTML = '';
  [...S.features].reverse().forEach(f => {
    const ty = TYPE[f.type];
    const row = document.createElement('div'); row.className = 'li';
    row.innerHTML = `<span class="swatch" style="background:${ty.color}"></span><div class="meta"><b>${t(f.type)}</b> ${f.height ? f.height + ' m' : ''}<br><span class="mono muted">${f.lat.toFixed(5)}, ${f.lon.toFixed(5)} · ±${fmt(f.acc, 0)} m · ${new Date(f.ts).toLocaleTimeString()}</span>${f.notes ? '<br>' + escapeHtml(f.notes) : ''}</div><button class="btn">◎</button>`;
    row.querySelector('button').onclick = () => { closeAllSheets(); map.setView([f.lat, f.lon], 19); setTimeout(() => markerById.get(f.id)?.fire('click'), 300); };
    body.appendChild(row);
  });
  $('#list').classList.remove('hidden');
}


// ---------------------------------------------------------------- visual feedback
const trackStats = { m: 0, start: 0 };
const gPreview = L.layerGroup().addTo(map);
const gBand = L.layerGroup().addTo(map);
function haptic(kind = 'MEDIUM') {
  try { if (isNative && Cap.Plugins?.Haptics) return Cap.Plugins.Haptics.impact({ style: kind }); } catch {}
  if (navigator.vibrate) navigator.vibrate(kind === 'HEAVY' ? [30, 40, 30] : 25);
}
const accClass = a => a == null ? '' : a <= 5 ? 'green' : a <= 12 ? 'orange' : 'red';
const accColor = a => ({ green: '#2fd27a', orange: '#ffb020', red: '#ff4d4f' })[accClass(a)] || '#3ea6ff';

function resetCaptureVisuals() {
  drawRing(0, null);
  const c = $('#avgScatter'); c.getContext('2d').clearRect(0, 0, c.width, c.height);
  $('#accWarn').classList.add('hidden'); $('#dupWarn').classList.add('hidden');
  $('#roseLive').classList.add('hidden'); setRose('#roseArrow', 0);
  if (cap) cap.panned = false;
}
function drawRing(frac, acc) {
  const C = 2 * Math.PI * 52, fg = $('#ringFg');
  fg.style.strokeDashoffset = C * (1 - Math.max(0, Math.min(1, frac)));
  fg.style.stroke = accColor(acc);
  $('#ringAcc').textContent = acc == null ? '…' : '±' + (acc < 10 ? acc.toFixed(1) : acc.toFixed(0));
  $('#ringAcc').style.color = accColor(acc);
}
function drawScatter(samples, r) {
  const c = $('#avgScatter'), g = c.getContext('2d'), W = c.width, H = c.height, cx = W / 2, cy = H / 2;
  g.clearRect(0, 0, W, H);
  const mLon = 111320 * Math.cos(r.lat * Math.PI / 180), mLat = 110540;
  const pts = samples.map(p => [(p.lon - r.lon) * mLon, (p.lat - r.lat) * mLat]);
  const R = Math.max(2, r.acc, ...pts.map(([x, y]) => Math.hypot(x, y))) * 1.25;
  const k = (W / 2 - 8) / R;
  // range rings every "nice" step
  const step = R > 20 ? 10 : R > 8 ? 5 : R > 4 ? 2 : 1;
  g.strokeStyle = '#2a3644'; g.lineWidth = 1; g.fillStyle = '#5d6d80'; g.font = '16px sans-serif';
  for (let d = step; d <= R; d += step) { g.beginPath(); g.arc(cx, cy, d * k, 0, 2 * Math.PI); g.stroke(); }
  g.fillText(step + ' m', cx + step * k + 3, cy - 3);
  // accuracy circle
  g.beginPath(); g.arc(cx, cy, r.acc * k, 0, 2 * Math.PI);
  g.fillStyle = accColor(r.acc) + '33'; g.fill(); g.strokeStyle = accColor(r.acc); g.lineWidth = 2; g.stroke();
  // samples (older = fainter)
  pts.forEach(([x, y], i) => {
    g.beginPath(); g.arc(cx + x * k, cy - y * k, 5, 0, 2 * Math.PI);
    g.fillStyle = `rgba(62,166,255,${0.25 + 0.75 * (i + 1) / pts.length})`; g.fill();
  });
  // averaged centre
  g.strokeStyle = '#fff'; g.lineWidth = 3;
  g.beginPath(); g.moveTo(cx - 12, cy); g.lineTo(cx + 12, cy); g.moveTo(cx, cy - 12); g.lineTo(cx, cy + 12); g.stroke();
}
function setRose(sel, deg) { const el = $(sel); if (el) el.style.transform = `rotate(${deg}deg)`; }
(function buildRoseTicks() {
  const g = document.querySelector('.roseTicks'); if (!g) return;
  for (let d = 0; d < 360; d += 30) {
    const a = d * Math.PI / 180, r1 = d % 90 ? 41 : 37, r2 = 46;
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', 50 + r1 * Math.sin(a)); l.setAttribute('y1', 50 - r1 * Math.cos(a));
    l.setAttribute('x2', 50 + r2 * Math.sin(a)); l.setAttribute('y2', 50 - r2 * Math.cos(a));
    g.appendChild(l);
  }
})();

function clearPreview() { gPreview.clearLayers(); }
function showPreview(forcePan = false) {
  clearPreview();
  if (!cap?.pos) return;
  const ty = TYPE[cap.type], ll = [cap.pos.lat, cap.pos.lon];
  if (cap.pos.acc) L.circle(ll, { radius: cap.pos.acc, color: accColor(cap.pos.acc), weight: 2, fillOpacity: .15, interactive: false }).addTo(gPreview);
  if (cap.pos.from) L.polyline([cap.pos.from, ll], { color: '#ffd400', weight: 3, dashArray: '6 6', interactive: false }).addTo(gPreview);
  L.marker(ll, { interactive: false, icon: L.divIcon({ className: '', iconSize: [26, 26], html: `<div class="ghostMk" style="width:26px;height:26px;background:${ty.color}88"></div>` }) }).addTo(gPreview);
  // accuracy banner
  const w = $('#accWarn'), cls = accClass(cap.pos.acc);
  if (!cls || cap.method === 'map') w.classList.add('hidden');
  else { w.className = 'warn ' + cls; w.textContent = t(cls === 'green' ? 'accGood' : cls === 'orange' ? 'accMid' : 'accPoor'); }
  // duplicate check (within 8 m, ignoring the one being edited)
  let near = null, nd = Infinity;
  for (const f of S.features) {
    if (cap.editing && f.id === cap.editing.id) continue;
    const d = turf.distance([f.lon, f.lat], [cap.pos.lon, cap.pos.lat], { units: 'meters' });
    if (d < nd) { nd = d; near = f; }
  }
  const dw = $('#dupWarn');
  if (near && nd < 8) { dw.className = 'warn orange'; dw.textContent = t('dupNear').replace('{type}', t(near.type)).replace('{d}', nd.toFixed(1)); }
  else dw.classList.add('hidden');
  // keep the point visible above the sheet
  if ((forcePan || !cap.panned) && !$('#sheet').classList.contains('hidden')) {
    cap.panned = true;
    if (map.getZoom() < 17) map.setView(ll, 18, { animate: false });
    const pt = map.latLngToContainerPoint(ll), sheetH = $('#sheet').offsetHeight;
    const top = 64, targetY = Math.max(top + 20, (top + window.innerHeight - sheetH) / 2);
    map.panBy([pt.x - window.innerWidth / 2, pt.y - targetY], { animate: true });
  }
}

function celebrate(pos, type, newId) {
  haptic(lineMode ? 'MEDIUM' : 'HEAVY');
  const ty = TYPE[type], fl = $('#flash');
  fl.style.borderColor = ty.color; fl.querySelector('.flashIc').style.color = ty.color;
  $('#flashTxt').textContent = t(type) + (lineMode && newId ? ` · #${lineMode.pointIds.length}` : '');
  fl.classList.remove('hidden'); fl.style.animation = 'none'; void fl.offsetHeight; fl.style.animation = '';
  clearTimeout(fl._t); fl._t = setTimeout(() => fl.classList.add('hidden'), 950);
  const rp = L.marker([pos.lat, pos.lon], { interactive: false, icon: L.divIcon({ className: '', iconSize: [20, 20], html: `<div class="ripple" style="--c:${ty.color}"></div>` }) }).addTo(map);
  setTimeout(() => map.removeLayer(rp), 1500);
  if (newId) { const el = markerById.get(newId)?.getElement()?.querySelector('.obs-marker'); el?.classList.add('pop'); }
  updateBand();
}

function updateBand() {
  gBand.clearLayers();
  if (!lineMode || !fix || !lineMode.pointIds.length) return;
  const last = S.features.find(f => f.id === lineMode.pointIds[lineMode.pointIds.length - 1]); if (!last) return;
  const d = turf.distance([last.lon, last.lat], [fix.lon, fix.lat], { units: 'meters' });
  L.polyline([[last.lat, last.lon], [fix.lat, fix.lon]], { color: LINE_COLORS[lineMode.kind], weight: 3, dashArray: '2 8', opacity: .9, interactive: false })
    .bindTooltip(`${d.toFixed(0)} m ${t('fromLast')}`, { permanent: true, direction: 'center', className: 'bandTip' }).addTo(gBand);
}

function updateRec() {
  if (!tracking) return;
  const sec = Math.floor((Date.now() - trackStats.start) / 1000);
  $('#recText').textContent = `REC ${(trackStats.m / 1000).toFixed(2)} km · ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}
setInterval(updateRec, 1000);

function drawBars() {
  const counts = Object.fromEntries(TYPES.map(ty => [ty.id, 0]));
  S.features.forEach(f => counts[f.type] = (counts[f.type] || 0) + 1);
  const max = Math.max(1, ...Object.values(counts));
  const lineM = S.lines.reduce((a, l) => { const p = lineLatLngs(l); for (let i = 1; i < p.length; i++) a += turf.distance([p[i - 1][1], p[i - 1][0]], [p[i][1], p[i][0]], { units: 'meters' }); return a; }, 0);
  let html = `<div class="muted small">${t('byType')}</div>`;
  for (const ty of TYPES) html += `<div class="bar"><span>${ty.ic} ${t(ty.id)}</span><div class="track"><div class="fill" style="width:${counts[ty.id] / max * 100}%;background:${ty.color}"></div></div><span class="n">${counts[ty.id]}</span></div>`;
  html += `<div class="bar"><span>⟋ ${t('lineKm')}</span><span class="mono">${S.lines.length} · ${(lineM / 1000).toFixed(2)} km</span><span></span></div>`;
  html += `<div class="bar"><span>⏺ ${t('trackKm')}</span><span class="mono">${(trackStats.m / 1000).toFixed(2)} km</span><span></span></div>`;
  $('#statsBars').innerHTML = html;
  $$('[data-cnt]').forEach(el => { const n = counts[el.dataset.cnt]; el.textContent = n; el.classList.toggle('hidden', !n); });
}
function recomputeTrackStats() {
  trackStats.m = 0; let prev = null;
  for (const p of S.track) { if (p && prev) trackStats.m += turf.distance([prev[1], prev[0]], [p[1], p[0]], { units: 'meters' }); prev = p; }
}

// ---------------------------------------------------------------- UI wiring
function applyLang() {
  document.documentElement.lang = S.lang;
  $('#btnLang').textContent = S.lang === 'en' ? 'PT' : 'EN';
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  const pal = $('#palette'); pal.innerHTML = '';
  TYPES.forEach(ty => {
    const b = document.createElement('button'); b.className = 'pbtn' + (ty.dark ? ' darktext' : ''); b.style.background = ty.color;
    b.innerHTML = `<span class="ic">${ty.ic}</span><span>${t(ty.id)}</span><span class="cnt hidden" data-cnt="${ty.id}"></span>`;
    b.onclick = () => openSheet(ty.id);
    pal.appendChild(b);
  });
  updateLineBanner(); updateStats();
  if (!fix) $('#gpsText').textContent = t('gpsWait');
}
function wire() {
  $('#btnLang').onclick = () => { S.lang = S.lang === 'en' ? 'pt' : 'en'; applyLang(); persist(); };
  $('#btnMenu').onclick = () => { closeAllSheets(); $('#inFarm').value = S.farm; $('#inOperator').value = S.operator; $('#inDecl').value = S.decl; updateStats(); $('#menu').classList.remove('hidden'); };
  $('#btnMenuClose').onclick = closeAllSheets;
  $('#btnListClose').onclick = closeAllSheets;
  $('#btnSheetClose').onclick = () => { closeAllSheets(); cap = null; };
  $('#inFarm').oninput = e => { S.farm = e.target.value; $('#farmTitle').textContent = S.farm; persist(); };
  $('#inOperator').oninput = e => { S.operator = e.target.value; persist(); };
  $('#inDecl').oninput = e => { S.decl = parseFloat(e.target.value) || 0; persist(); };
  $('#btnLocate').onclick = () => fix ? map.setView([fix.lat, fix.lon], Math.max(map.getZoom(), 17)) : toast(t('noFix'));
  $('#btnTrack').onclick = () => setTracking(!tracking);
  $('#btnLine').onclick = startLine;
  $('#btnLineFinish').onclick = () => finishLine(false);
  $('#btnLineCancel').onclick = () => finishLine(true);
  $('#btnUndo').onclick = undo;
  $$('#methodTabs .tab').forEach(b => b.onclick = () => setMethod(b.dataset.m));
  $('#btnAvg').onclick = startAvg;
  $('#btnPickMap').onclick = startTapPick;
  $('#btnTapCancel').onclick = () => cancelTapPick(true);
  $('#btnCompass').onclick = startCompass;
  $('#inBearing').oninput = calcBearing; $('#inDist').oninput = calcBearing;
  $('#inPhoto').onchange = e => { [...e.target.files].forEach(addPhoto); e.target.value = ''; };
  $('#btnSave').onclick = saveCapture;
  $('#inKml').onchange = e => { const f = e.target.files[0]; if (f) importFarm(f); e.target.value = ''; closeAllSheets(); };
  $('#btnClearFarm').onclick = () => { S.farmGeo = null; drawFarm(); persist(); toast(t('noFarm')); };
  $('#btnExportKml').onclick = exportKml;
  $('#btnExportKmz').onclick = exportKmz;
  $('#btnExportCsv').onclick = exportCsv;
  $('#btnList').onclick = openList;
  $('#btnLayer').onclick = () => { map.removeLayer(layers[layerIdx]); layerIdx = (layerIdx + 1) % layers.length; layers[layerIdx].addTo(map).bringToBack(); };
  $('#btnNew').onclick = async () => {
    if (!confirm(t('confirmNew'))) return;
    if (tracking) await setTracking(false);
    Object.assign(S, { features: [], lines: [], track: [], undo: [] }); lineMode = null; trackStats.m = 0; gBand.clearLayers();
    $('#lineBanner').classList.add('hidden'); $('#btnLine').classList.remove('on-line');
    await DB.clear('photos'); persist(); drawTrack(); refreshAll(); closeAllSheets();
  };
}

// ---------------------------------------------------------------- boot
(async function boot() {
  try {
    const saved = await DB.get('kv', 'state');
    if (saved) Object.assign(S, saved, { undo: [] });
    else if (/^pt/i.test(navigator.language)) S.lang = 'en'; // English default by request
  } catch (e) { console.warn(e); }
  recomputeTrackStats();
  wire(); applyLang(); drawFarm(); drawTrack(); refreshAll();
  if (S.features.length) map.fitBounds(L.featureGroup([...markerById.values()]).getBounds(), { padding: [40, 40], maxZoom: 17 });
  else if (farmPolys) map.fitBounds(L.geoJSON(S.farmGeo).getBounds());
  startGps();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();

// expose for tests
window.__scout = { S, buildKml, computeAvg, zoneOf };
