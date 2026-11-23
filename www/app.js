/* Field Scout — obstacle scouting for Pyka mapping (Step 4)
 * Plain JS, no bundler. Works in browser (PWA) and inside Capacitor (iOS/Android).
 */
'use strict';

// ---------------------------------------------------------------- i18n
const I18N = {
  en: {
    pole:'Power pole', tower:'Tower', guy:'Guy anchor', silo:'Silo', building:'Building',
    pivot:'Pivot', tree:'Tree', other:'Other',
    lineKind_power:'Power line', lineKind_guy:'Guy wire',
    finish:'Finish', cancel:'Cancel', save:'Save', menu:'Menu',
    tapHint:'Move the map so the + is on the obstacle, then tap the map.', tapHintDesk:'Click the obstacle on the map. Esc cancels.',
    mGps:'My GPS', mMap:'On map', mBearing:'Bearing + dist',
    startAvg:'Average GPS', stopAvg:'Stop', mapPaneHint:'Use when you can see the obstacle on the satellite image.',
    pickOnMap:'Pick on map', bearingHint:'Stand still, point the phone at the obstacle, read the bearing and enter the distance (rangefinder or estimate).',
    bearingTrue:'Bearing (° true)', distance:'Distance', useCompass:'Read compass',
    height:'Height AGL', width:'Width / diameter', notes:'Notes', addPhoto:'Add photo',
    farmName:'Farm / site name', operator:'Operator', declination:'Magnetic declination (°, west = negative)',
    importKml:'Import farm KML/KMZ (spray areas)', clearFarm:'Remove farm boundaries',
    exportKmz:'Export KMZ (with photos)', exportKml:'Export KML', exportCsv:'Export CSV',
    howTo:'How to use', tourSkip:'Skip', tourBack:'Back', tourNext:'Next', tourDone:'Start', tourVideo:'Watch the video (1 min)',
    tourStepOf:'{i} of {n}', videoNote:'Demo recording: the background is a drawn map and the GPS is simulated.',
    tour1T:'Mark obstacles in the field', tour1:'Field Scout records poles, towers, pivots and buildings with your GPS and exports a KMZ for the mapping team.',
    tour2T:'Tap the type and stand still', tour2:'Pick the type in the bottom bar. Stand next to the obstacle while the app averages the GPS for 10 s, enter the height and tap Save.',
    tour3T:'Far away or seen on the map', tour3:'Use the On map tab to place it on the satellite image, or Bearing + dist with the compass and a rangefinder.',
    tour4T:'Power lines', tour4:'Tap the line button, then save the poles in order. Finish joins them into a power line or guy wire.',
    tour5T:'Import, review and export', tour5:'In the menu: import a KML and review the classification, see everything in 3D, and export the KMZ at the end of the day.',
    tour6T:'No signal in the field?', tour6:'GPS and marking work offline. With Wi-Fi beforehand, browse the farm on the map so the imagery is saved on the device.',
    listFeatures:'Obstacle list', toggleLayer:'Switch map layer', newSession:'New session (erase all)',
    gpsWait:'GPS…', gpsNone:'No GPS', gpsOff:'Off', gpsDeniedTitle:'Location is blocked',
    gpsDeniedIos:'iPhone: Settings → Privacy & Security → Location Services → Safari Websites → While Using the App. Also check aA → Website Settings → Location → Allow.',
    gpsDeniedOther:'Allow location for this site in the browser settings, then tap Try again.', gpsUnavail:'No GPS signal yet. Move to open sky.', retry:'Try again', samples:'samples', spread:'spread',
    saved:'Saved', deleted:'Deleted', undone:'Undone', nothingUndo:'Nothing to undo',
    trackOn:'Track recording ON', trackOff:'Track recording OFF',
    trackOnBg:'Recording: keeps going with the screen off', trackOnWeb:'Recording: the screen stays on (a website cannot use GPS with the screen off)',
    trackPaused:'The screen was off for {m} min and the track was not recorded. For screen-off recording use the Field Scout app (SideStore).',
    followOn:'Following your position. Drag the map to stop.',
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
    accGood:'Good GPS accuracy', accMid:'Fair accuracy — average a bit longer', accPoor:'Poor accuracy — wait, move to open sky or mark on map',
    dupNear:'{type} already marked {d} m away — possible duplicate', fromLast:'from last pole', byType:'By type', lineKm:'Lines', trackKm:'Track',
    secImport:'Import', importObs:'Import obstacles KML/KMZ', reviewImport:'Review imported obstacles', reviewTitle:'Review import',
    reviewSub:'{n} imported · {u} to classify', fTodo:'To classify', fAll:'All imported', bulkLbl:'Set every unclassified obstacle as', done:'Done',
    importDone:'{n} obstacles imported · {u} to classify', importLines:'{l} lines rebuilt', importLine1:'1 line rebuilt', importDup:'{d} already on the map were skipped', importDup1:'1 was already on the map and was skipped',
    importNone:'No points found in this file', importAreasOnly:'This file only has areas. Use Import farm KML/KMZ.', mImport:'Imported',
    reviewEmpty:'Every imported obstacle is classified.', srcLbl:'KML name', toClassify:'To classify', typeLbl:'Type', classified:'Classified',
    hint3d:'Two fingers: drag up/down to tilt, twist to rotate. Tap 2D to go back.', err3d:'3D view is not available on this device', est3d:'estimated height',
    heightShort:'Height', statObs:'Obstacles', statLines:'Lines', statTrack:'Track', secSession:'Session', secExport:'Export', secFarm:'Farm boundaries', secView:'View', secLook:'Appearance', themeAuto:'Automatic', themeLight:'Light', themeDark:'Dark', themeHint:'Automatic follows your device and switches with it.',
    accLbl:'Accuracy', methodLbl:'Method', movedLbl:'moved', listEmpty:'No obstacles yet. Tap a type at the bottom of the map to mark one.',
    coach:'Tap a type to mark an obstacle at your position', lineHint:'Save poles in order', tapTitle:'Pick on map', sheetSub:'New obstacle', sheetSubEdit:'Editing'
  },
  pt: {
    pole:'Poste', tower:'Torre', guy:'Âncora estai', silo:'Silo', building:'Edificação',
    pivot:'Pivô', tree:'Árvore', other:'Outro',
    lineKind_power:'Linha de energia', lineKind_guy:'Cabo de estai',
    finish:'Concluir', cancel:'Cancelar', save:'Salvar', menu:'Menu',
    tapHint:'Mova o mapa até o + ficar sobre o obstáculo e toque no mapa.', tapHintDesk:'Clique no obstáculo no mapa. Esc cancela.',
    mGps:'Meu GPS', mMap:'No mapa', mBearing:'Rumo + dist',
    startAvg:'Média do GPS', stopAvg:'Parar', mapPaneHint:'Use quando o obstáculo aparece na imagem de satélite.',
    pickOnMap:'Marcar no mapa', bearingHint:'Fique parado, aponte o celular para o obstáculo, leia o rumo e informe a distância (trena laser ou estimativa).',
    bearingTrue:'Rumo (° verdadeiro)', distance:'Distância', useCompass:'Ler bússola',
    height:'Altura AGL', width:'Largura / diâmetro', notes:'Observações', addPhoto:'Adicionar foto',
    farmName:'Fazenda / local', operator:'Operador', declination:'Declinação magnética (°, oeste = negativo)',
    importKml:'Importar KML/KMZ da fazenda (áreas)', clearFarm:'Remover limites da fazenda',
    exportKmz:'Exportar KMZ (com fotos)', exportKml:'Exportar KML', exportCsv:'Exportar CSV',
    howTo:'Como usar', tourSkip:'Pular', tourBack:'Voltar', tourNext:'Próximo', tourDone:'Começar', tourVideo:'Ver o vídeo (1 min)',
    tourStepOf:'{i} de {n}', videoNote:'Gravação de demonstração: o fundo é um mapa desenhado e o GPS é simulado.',
    tour1T:'Marque obstáculos no campo', tour1:'O Field Scout registra postes, torres, pivôs e edificações com o seu GPS e exporta um KMZ para a equipe de mapeamento.',
    tour2T:'Toque no tipo e fique parado', tour2:'Escolha o tipo na barra de baixo. Fique ao lado do obstáculo enquanto o app faz a média do GPS por 10 s, informe a altura e toque em Salvar.',
    tour3T:'De longe ou pela imagem', tour3:'Use a aba No mapa para posicionar pela imagem de satélite, ou Rumo + dist com a bússola e uma trena laser.',
    tour4T:'Linhas de energia', tour4:'Toque no botão de linha e salve os postes em ordem. Concluir liga todos numa linha de energia ou cabo de estai.',
    tour5T:'Importar, revisar e exportar', tour5:'No menu: importe um KML e revise a classificação, veja tudo em 3D e exporte o KMZ no fim do dia.',
    tour6T:'Sem sinal no campo?', tour6:'GPS e marcação funcionam offline. Antes, com Wi-Fi, percorra a fazenda no mapa para a imagem ficar salva no aparelho.',
    listFeatures:'Lista de obstáculos', toggleLayer:'Trocar camada do mapa', newSession:'Nova sessão (apaga tudo)',
    gpsWait:'GPS…', gpsNone:'Sem GPS', gpsOff:'Desligado', gpsDeniedTitle:'Localização bloqueada',
    gpsDeniedIos:'iPhone: Ajustes → Privacidade e Segurança → Serviços de Localização → Sites do Safari → Durante o Uso do App. Confira também aA → Ajustes do Site → Localização → Permitir.',
    gpsDeniedOther:'Permita a localização para este site nos ajustes do navegador e toque em Tentar de novo.', gpsUnavail:'Ainda sem sinal de GPS. Vá para céu aberto.', retry:'Tentar de novo', samples:'amostras', spread:'dispersão',
    saved:'Salvo', deleted:'Apagado', undone:'Desfeito', nothingUndo:'Nada para desfazer',
    trackOn:'Gravando trilha', trackOff:'Trilha parada',
    trackOnBg:'Gravando: continua com a tela apagada', trackOnWeb:'Gravando: a tela fica acesa (site não usa o GPS com a tela apagada)',
    trackPaused:'A tela ficou apagada por {m} min e a trilha não foi gravada. Para gravar com a tela apagada use o app Field Scout (SideStore).',
    followOn:'Seguindo sua posição. Arraste o mapa para parar.',
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
    accGood:'Precisão do GPS boa', accMid:'Precisão razoável — faça a média por mais tempo', accPoor:'Precisão ruim — aguarde, vá para céu aberto ou marque no mapa',
    dupNear:'{type} já marcado a {d} m — possível duplicado', fromLast:'do último poste', byType:'Por tipo', lineKm:'Linhas', trackKm:'Trilha',
    secImport:'Importar', importObs:'Importar obstáculos KML/KMZ', reviewImport:'Revisar obstáculos importados', reviewTitle:'Revisar importação',
    reviewSub:'{n} importados · {u} a classificar', fTodo:'A classificar', fAll:'Todos importados', bulkLbl:'Classificar todos os pendentes como', done:'Concluir',
    importDone:'{n} obstáculos importados · {u} a classificar', importLines:'{l} linhas reconstruídas', importLine1:'1 linha reconstruída', importDup:'{d} já estavam no mapa e foram ignorados', importDup1:'1 já estava no mapa e foi ignorado',
    importNone:'Nenhum ponto encontrado neste arquivo', importAreasOnly:'Este arquivo só tem áreas. Use Importar KML/KMZ da fazenda.', mImport:'Importado',
    reviewEmpty:'Todos os obstáculos importados estão classificados.', srcLbl:'Nome no KML', toClassify:'A classificar', typeLbl:'Tipo', classified:'Classificado',
    hint3d:'Dois dedos: arraste para cima/baixo para inclinar, gire para rotacionar. Toque em 2D para voltar.', err3d:'A visão 3D não está disponível neste aparelho', est3d:'altura estimada',
    heightShort:'Altura', statObs:'Obstáculos', statLines:'Linhas', statTrack:'Trilha', secSession:'Sessão', secExport:'Exportar', secFarm:'Limites da fazenda', secView:'Visualizar', secLook:'Aparência', themeAuto:'Automático', themeLight:'Claro', themeDark:'Escuro', themeHint:'Automático acompanha o aparelho e troca junto com ele.',
    accLbl:'Precisão', methodLbl:'Método', movedLbl:'movido', listEmpty:'Nenhum obstáculo ainda. Toque em um tipo na parte de baixo do mapa para marcar.',
    coach:'Toque em um tipo para marcar um obstáculo na sua posição', lineHint:'Salve os postes em ordem', tapTitle:'Marcar no mapa', sheetSub:'Novo obstáculo', sheetSubEdit:'Editando'
  }
};
// Export labels are always English (for the Pyka team)
const EN = I18N.en;

// Line icons (24×24, stroked with currentColor)
const svg = d => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const ICONS = {
  pole:     svg('<path d="M12 3v18M6 6.5h12M7.5 6.5v2M16.5 6.5v2M9 21h6"/>'),
  tower:    svg('<path d="M8.5 21 12 3l3.5 18M6.5 8h11M10 13.5h4M9.2 17.5l5.6-4M14.8 17.5l-5.6-4"/>'),
  guy:      svg('<path d="M8 3v18M8 4.5l10 14.5M15.5 21h5M5 21h6"/>'),
  pivot:    svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 12l6-6"/><circle cx="12" cy="12" r="1.7" class="fill"/><circle cx="14.2" cy="9.8" r="1" class="fill"/><circle cx="16.2" cy="7.8" r="1" class="fill"/>'),
  building: svg('<path d="M4 21V10l8-6 8 6v11M3 21h18M10 21v-5h4v5"/>'),
  other:    svg('<path d="M12 4 21 20H3z"/><path d="M12 10v4.5M12 17.2v.1"/>'),
  legacy:   svg('<circle cx="12" cy="12" r="6"/>'),
};
// guy / silo / tree are retired from the palette but kept so older sessions still draw and export.
const TYPES = [
  { id:'pole',     color:'#f5c400' },
  { id:'tower',    color:'#f0503c' },
  { id:'pivot',    color:'#4aa3f0' },
  { id:'building', color:'#a9b3bd' },
  { id:'other',    color:'#e8ecef' },
  { id:'guy',      color:'#f08c28', retired:true },
  { id:'silo',     color:'#b07ae8', retired:true },
  { id:'tree',     color:'#3fbf6a', retired:true },
];
TYPES.forEach(ty => ty.svg = ICONS[ty.id] || ICONS.legacy);
const TYPE = Object.fromEntries(TYPES.map(t => [t.id, t]));
const LINE_COLORS = { power:'#f5c400', guy:'#f08c28' };
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
      t.oncomplete = () => res(out instanceof IDBRequest ? out.result : out);
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
  lang: 'en', basemap: 'sat', theme: 'auto',
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

// ---------------------------------------------------------------- desktop
// Wide screen with a mouse: side panel instead of bottom sheets, click-to-place instead of GPS.
const deskMQ = window.matchMedia ? matchMedia('(min-width: 900px) and (pointer: fine)') : { matches: false };
const isDesk = () => deskMQ.matches;

// ---------------------------------------------------------------- map
// Start view before the first GPS fix (or without GPS): São Paulo.
const map = L.map('map', { zoomControl: false, attributionControl: true, maxZoom: 21 }).setView([-23.5505, -46.6333], 12);

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
const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
const mk = (url, key, attr, o = {}) => new CachedLayer(url, Object.assign({ maxNativeZoom: 18, maxZoom: 21, cacheKey: key, attribution: attr }, o));
const imagery = () => mk(ESRI + 'World_Imagery/MapServer/tile/{z}/{y}/{x}', 'esri', 'Imagery © Esri, Maxar, Earthstar');
const BASEMAPS = [
  { id: 'sat',    name: { en: 'Satellite', pt: 'Satélite' }, make: () => [imagery()] },
  { id: 'hybrid', name: { en: 'Satellite + roads & names', pt: 'Satélite + estradas e nomes' }, make: () => [
      imagery(),
      mk(ESRI + 'Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', 'esri-roads', '', { maxNativeZoom: 19 }),
      mk(ESRI + 'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', 'esri-places', '', { maxNativeZoom: 19 })] },
  { id: 'clarity', name: { en: 'Satellite (Clarity, sharper)', pt: 'Satélite (Clarity, mais nítido)' }, make: () => [
      mk('https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 'esri-clarity', 'Imagery © Esri Clarity', { maxNativeZoom: 19 })] },
  { id: 'osm',    name: { en: 'Street map', pt: 'Mapa de ruas' }, make: () => [mk('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 'osm', '© OpenStreetMap', { maxNativeZoom: 19 })] },
];
let baseLayers = [];
function setBasemap(id, announce) {
  baseLayers.forEach(l => map.removeLayer(l));
  const bm = BASEMAPS.find(b => b.id === id) || BASEMAPS[0];
  baseLayers = bm.make(); baseLayers.forEach((l, i) => { l.addTo(map); if (i === 0) l.bringToBack(); });
  S.basemap = bm.id;
  if (announce) toast(bm.name[S.lang] || bm.name.en);
  imgCap = undefined; setTimeout(updateImageryDepth, 0);   // after start-up: the 3D view's state must exist first
}
function nextBasemap() {
  const i = BASEMAPS.findIndex(b => b.id === S.basemap);
  setBasemap(BASEMAPS[(i + 1) % BASEMAPS.length].id, true); persist();
}
// ---------------------------------------------------------------- imagery depth
// Esri answers "Map data not yet available" for a zoom level it has no imagery for at that place
// (rural Brazil often stops a level or two before cities). Ask its tile map which level really exists
// around the map centre, request tiles only up to there and stop zooming there. Answers are kept per
// ~10 km region (z12 tile). Offline or if the service does not answer, nothing changes.
const IMG_TRY = 19, IMG_FLOOR = 13;
const TILEMAP = {
  sat: ESRI + 'World_Imagery/MapServer/tilemap/',
  hybrid: ESRI + 'World_Imagery/MapServer/tilemap/',
  clarity: 'https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tilemap/',
};
const IMG_KEYS = ['esri', 'esri-clarity'];
let depthCache = {};
try { depthCache = JSON.parse(localStorage.getItem('fs-depth') || '{}'); } catch {}
let imgCap, depthSeq = 0;
function tileXY(lat, lon, z) {
  const n = 2 ** z, r = lat * Math.PI / 180;
  return [Math.floor((lon + 180) / 360 * n), Math.floor((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n)];
}
async function hasImagery(base, z, lat, lon) {
  const [x, y] = tileXY(lat, lon, z);
  const r = await fetch(`${base}${z}/${y}/${x}/1/1?f=json`, { mode: 'cors' });
  if (!r.ok) throw new Error('tilemap ' + r.status);
  const j = await r.json();
  if (!j || !Array.isArray(j.data)) throw new Error('no tilemap data');
  return j.data[0] === 1;
}
async function updateImageryDepth() {
  const id = S.basemap, base = TILEMAP[id];
  if (!base) return setImgCap(null);
  const c = map.getCenter(), [rx, ry] = tileXY(c.lat, c.lng, 12), key = `${id}/${rx}/${ry}`;
  if (depthCache[key] != null) return setImgCap(depthCache[key]);
  const seq = ++depthSeq;
  try {
    let z = IMG_TRY;
    while (z > IMG_FLOOR && !(await hasImagery(base, z, c.lat, c.lng))) z--;
    if (seq !== depthSeq || S.basemap !== id) return;
    depthCache[key] = z;
    try { localStorage.setItem('fs-depth', JSON.stringify(depthCache)); } catch {}
    setImgCap(z);
  } catch (e) { console.warn('imagery depth unknown here', e); }
}
function setImgCap(z) {
  if (z === imgCap) return;
  imgCap = z;
  for (const l of baseLayers) {
    if (!IMG_KEYS.includes(l.options.cacheKey)) continue;
    l.options.maxNativeZoom = z ?? (l.options.cacheKey === 'esri' ? 18 : 19);
    if (l._map) l._resetView();
  }
  map.setMaxZoom(z ?? 21);          // zooms out by itself if the view is deeper than the imagery
  syncSat3d();
}
let depthTimer;
map.on('moveend', () => { clearTimeout(depthTimer); depthTimer = setTimeout(updateImageryDepth, 300); });

setBasemap('sat');

const gFarm = L.layerGroup().addTo(map);
const gTrack = L.layerGroup().addTo(map);
const gLines = L.layerGroup().addTo(map);
const gObs = L.layerGroup().addTo(map);
const gMe = L.layerGroup().addTo(map);
let trackLine = L.polyline([], { color: '#4aa3f0', weight: 3, opacity: .85, dashArray: '6 6' }).addTo(gTrack);
let activeLineDraft = L.polyline([], { color: '#ffd400', weight: 4, dashArray: '4 6' }).addTo(gLines);

// ---------------------------------------------------------------- GPS
let fix = null;          // latest {lat,lon,acc,ts,heading}
let firstFix = true;
const fixListeners = new Set();
const meMarker = L.marker([0, 0], { icon: L.divIcon({ className: '', html: '<div class="me-marker"></div>', iconSize: [18, 18] }), interactive: false });
const meAcc = L.circle([0, 0], { radius: 1, color: '#4aa3f0', weight: 1, opacity: .6, fillOpacity: .1, interactive: false });

let following = false;
function setFollow(on) {
  following = on;
  $('#btnLocate').classList.toggle('on-follow', on);
}
map.on('dragstart', () => setFollow(false));     // only fires for a user drag, not for our own panTo

function onPos(p) {
  fix = { lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy, ts: p.timestamp || Date.now() };
  gpsDenied = false; $('#gpsBanner').classList.add('hidden');
  meMarker.setLatLng([fix.lat, fix.lon]); meAcc.setLatLng([fix.lat, fix.lon]).setRadius(fix.acc);
  if (!gMe.hasLayer(meMarker)) { gMe.addLayer(meAcc); gMe.addLayer(meMarker); }
  if (firstFix) { firstFix = false; map.setView([fix.lat, fix.lon], 17); }
  const dot = $('#gpsChip .dot');
  dot.className = 'dot ' + (fix.acc <= 5 ? 'good' : fix.acc <= 15 ? 'mid' : 'bad');
  $('#gpsText').textContent = `±${fmt(fix.acc, 0)} m`;
  fixListeners.forEach(f => f(fix));
  updateBand(); updateRec(); updateMe3d();
  if (following && !cap && !tapPicking) {
    if (is3d && map3d) map3d.easeTo({ center: [fix.lon, fix.lat], duration: 600 });
    else map.panTo([fix.lat, fix.lon], { animate: true, duration: 0.6, easeLinearity: 0.5 });
  }
  if (tracking && !nativeBg) addTrackPoint(fix);
}
let gpsWatch = null, gpsDenied = false;
function onPosErr(e) {
  console.warn(e);
  $('#gpsChip .dot').className = 'dot bad';
  const denied = gpsDenied = !!(e && e.code === 1);
  $('#gpsText').textContent = denied ? t('gpsOff') : t('gpsNone');
  if (denied && !isDesk()) showGpsHelp();
  else if (!fix) toast(t('gpsUnavail'), 3000);
}
// Location was refused (or never asked because the OS blocks it): explain how to allow it.
function showGpsHelp() {
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  $('#gpsHelpText').textContent = ios ? t('gpsDeniedIos') : t('gpsDeniedOther');
  $('#gpsBanner').classList.remove('hidden');
}
function restartGps() {
  $('#gpsBanner').classList.add('hidden');
  $('#gpsText').textContent = t('gpsWait'); $('#gpsChip .dot').className = 'dot';
  if (gpsWatch != null) navigator.geolocation.clearWatch(gpsWatch);
  // a call made straight from a tap is the most reliable way to make Safari show its prompt
  navigator.geolocation.getCurrentPosition(onPos, onPosErr, { enableHighAccuracy: true, timeout: 30000 });
  gpsWatch = navigator.geolocation.watchPosition(onPos, onPosErr, { enableHighAccuracy: true, maximumAge: 0, timeout: 30000 });
}
function startGps() {
  if (!('geolocation' in navigator)) return onPosErr('no geolocation');
  gpsWatch = navigator.geolocation.watchPosition(onPos, onPosErr, { enableHighAccuracy: true, maximumAge: 0, timeout: 30000 });
}

// ---------------------------------------------------------------- track recording (background-capable in native app)
let tracking = false, nativeBg = null, bgWatcherId = null;
const Cap = window.Capacitor;
const isNative = !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform());
const TRACK_MAX_ACC = 50;          // m; background fixes on the road are often 30–50 m
const GAP_S = 30, GAP_M = 60;      // longer silence + jump = recording was interrupted
function addTrackPoint(f) {
  const last = S.track[S.track.length - 1];
  if (f.acc > TRACK_MAX_ACC) return;
  const d = last ? turf.distance([last[1], last[0]], [f.lon, f.lat], { units: 'meters' }) : 0;
  if (last && (f.ts - last[2] < 2000)) return;
  if (last && d < 4) return;
  // No points for a while and we moved: the recording was interrupted (screen off on the website).
  // Start a new segment instead of drawing a straight line across roads we never recorded.
  if (last && (f.ts - last[2]) / 1000 > GAP_S && d > GAP_M) {
    S.track.push(null);
    trackLine = L.polyline([], { color: '#4aa3f0', weight: 3, opacity: .85, dashArray: '6 6' }).addTo(gTrack);
  } else if (last) trackStats.m += d;
  S.track.push([+f.lat.toFixed(7), +f.lon.toFixed(7), f.ts, Math.round(f.acc)]);
  trackLine.addLatLng([f.lat, f.lon]);
  persist();
}
// Website: the browser stops the page (and GPS) when the screen goes off, so keep it on while recording.
let wakeLock = null, hiddenAt = 0;
async function keepAwake(on) {
  try {
    if (on && 'wakeLock' in navigator && !wakeLock) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    } else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
  } catch (e) { console.warn('wake lock', e); }
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') { hiddenAt = Date.now(); return; }
  if (!tracking || nativeBg) return;
  keepAwake(true);                                    // the lock is dropped whenever the page is hidden
  const mins = (Date.now() - hiddenAt) / 60000;
  if (hiddenAt && mins > 0.3) toast(t('trackPaused').replace('{m}', Math.max(1, Math.round(mins))), 6000);
});
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
  if (!nativeBg) keepAwake(on);
  toast(t(!on ? 'trackOff' : nativeBg ? 'trackOnBg' : 'trackOnWeb'), on ? 4000 : 1800);
  persist();
}
function drawTrack() {
  gTrack.clearLayers();
  const segs = []; let cur = [];
  for (const p of S.track) { if (!p) { if (cur.length) segs.push(cur); cur = []; } else cur.push([p[0], p[1]]); }
  segs.forEach(s => L.polyline(s, { color: '#4aa3f0', weight: 3, opacity: .7, dashArray: '6 6' }).addTo(gTrack));
  trackLine = L.polyline(cur, { color: '#4aa3f0', weight: 3, opacity: .85, dashArray: '6 6' }).addTo(gTrack);
}

// ---------------------------------------------------------------- farm (spray areas) + 1.5 km buffer
let farmPolys = null, farmBuffer = null;
function drawFarm() {
  gFarm.clearLayers(); farmPolys = null; farmBuffer = null;
  if (!S.farmGeo) return update3d();
  const polys = S.farmGeo.features.filter(f => f.geometry && /Polygon/.test(f.geometry.type));
  L.geoJSON(S.farmGeo, {
    style: { color: '#34c77b', weight: 2, opacity: .9, fillColor: '#34c77b', fillOpacity: .07 },
    pointToLayer: (f, ll) => L.circleMarker(ll, { radius: 4, color: '#34c77b', weight: 2, fillOpacity: .6 })
  }).addTo(gFarm);
  if (polys.length) {
    try {
      farmPolys = turf.featureCollection(polys);
      const buf = turf.buffer(farmPolys, BUFFER_KM, { units: 'kilometers' });
      farmBuffer = buf.features.length > 1 ? buf.features.reduce((a, b) => { try { return turf.union(turf.featureCollection([a, b])) || a; } catch { return a; } }) : buf.features[0];
      L.geoJSON(farmBuffer, { style: { color: '#f0a020', weight: 1.5, opacity: .8, dashArray: '2 7', lineCap: 'round', fill: false }, interactive: false }).addTo(gFarm);
    } catch (e) { console.warn('buffer failed', e); }
  }
  update3d();
}
function zoneOf(lat, lon) {
  if (!farmPolys) return '';
  const pt = turf.point([lon, lat]);
  for (const f of farmPolys.features) { try { if (turf.booleanPointInPolygon(pt, f)) return 'spray_area'; } catch {} }
  if (farmBuffer && turf.booleanPointInPolygon(pt, farmBuffer)) return 'within_1_5km';
  return 'beyond_1_5km';
}
const zoneLabel = z => ({ spray_area: t('inSpray'), within_1_5km: t('inBuffer'), beyond_1_5km: t('outside') })[z] || '';

async function readKml(file) {
  let text;
  if (/\.kmz$/i.test(file.name) || file.type.includes('kmz')) {
    const zip = await JSZip.loadAsync(file);
    const kmlName = Object.keys(zip.files).find(n => /\.kml$/i.test(n));
    text = await zip.file(kmlName).async('string');
  } else text = await file.text();
  return toGeoJSON.kml(new DOMParser().parseFromString(text, 'text/xml'));
}
async function importFarm(file) {
  try {
    const gj = await readKml(file);
    if (!gj.features.length) throw new Error('empty');
    S.farmGeo = gj;
    if (!S.farm) { S.farm = file.name.replace(/\.(kml|kmz)$/i, ''); }
    drawFarm(); refreshAll(); persist();
    map.fitBounds(L.geoJSON(gj).getBounds(), { padding: [30, 30] });
    toast(t('farmLoaded'));
  } catch (e) { console.error(e); toast(t('farmErr')); }
}

// ---------------------------------------------------------------- 3D view (MapLibre GL, loaded on first use)
// A read-only companion to the 2D map: satellite draped on terrain, every obstacle extruded to its
// height, wires as thin slabs between pole tops. Editing stays in 2D.
const DEF_H = { pole: 10, tower: 30, pivot: 4, building: 6, other: 5, guy: 3, silo: 15, tree: 8 };   // m, when no height was entered
const FOOT = { pole: 1.2, tower: 3, pivot: 2.5, building: 5, other: 2, guy: 0.8, silo: 4, tree: 3 }; // footprint radius, m
let map3d = null, is3d = false, libP = null;
function loadMapLibre() {
  if (window.maplibregl) return Promise.resolve();
  if (!libP) {
    libP = new Promise((res, rej) => {
      const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'vendor/maplibre-gl.css'; document.head.appendChild(css);
      const s = document.createElement('script'); s.src = 'vendor/maplibre-gl.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
    libP.catch(() => { libP = null; });
  }
  return libP;
}
function sat3dTiles() {
  if (S.basemap === 'clarity') return ['https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'];
  if (S.basemap === 'osm') return ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'];
  return [ESRI + 'World_Imagery/MapServer/tile/{z}/{y}/{x}'];
}
const hOf = f => f.height || DEF_H[f.type] || 5;
// Real footprints (a pole is ~2 m wide) vanish below a pixel when the whole farm is in view, so every
// column is drawn at least MIN_PX pixels wide at the current zoom; zooming in shows true sizes again.
const MIN_PX = 4;
let minR3d = 0;
const minRadiusAt = (lat, zoom) => MIN_PX * 40075016.686 * Math.cos(lat * Math.PI / 180) / (512 * Math.pow(2, zoom));
const minRadius3d = () => map3d ? minRadiusAt(map3d.getCenter().lat, map3d.getZoom()) : minR3d;
function obstacles3d() {
  const feats = [];
  for (const f of S.features) {
    const r = Math.max(f.width ? Math.max(f.width / 2, 0.8) : (FOOT[f.type] || 2), minR3d);
    const c = turf.circle([f.lon, f.lat], r / 1000, { steps: f.type === 'building' ? 4 : 20, units: 'kilometers' });
    c.properties = { id: f.id, type: f.type, h: hOf(f), base: 0, color: (TYPE[f.type] || TYPE.other).color, est: f.height ? 0 : 1 };
    feats.push(c);
  }
  for (const l of [...S.lines, ...(lineMode && lineMode.pointIds.length > 1 ? [lineMode] : [])]) {
    const pts = l.pointIds.map(id => S.features.find(f => f.id === id)).filter(Boolean);
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], top = Math.min(hOf(a), hOf(b));
      const slab = turf.buffer(turf.lineString([[a.lon, a.lat], [b.lon, b.lat]]), Math.max(0.7, minR3d / 3) / 1000, { units: 'kilometers', steps: 2 });
      if (!slab) continue;
      slab.properties = { h: top, base: top - 0.9, color: LINE_COLORS[l.kind] || '#f5c400', wire: 1 };
      feats.push(slab);
    }
  }
  return turf.featureCollection(feats);
}
const meGeo = () => turf.featureCollection(fix ? [turf.point([fix.lon, fix.lat])] : []);
const empty = () => turf.featureCollection([]);
function init3d(c, z) {
  minR3d = minRadiusAt(c.lat, z);
  map3d = new maplibregl.Map({
    container: 'map3d', attributionControl: { compact: true }, maxPitch: 80, center: [c.lng, c.lat], zoom: z,
    style: {
      version: 8,
      sources: {
        sat: { type: 'raster', tiles: sat3dTiles(), tileSize: 256, maxzoom: imgCap ?? 19, attribution: 'Imagery © Esri, Maxar, Earthstar' },
        dem: { type: 'raster-dem', tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'], tileSize: 256, maxzoom: 15, encoding: 'terrarium', attribution: 'Terrain: Mapzen, AWS' },
        obs: { type: 'geojson', data: obstacles3d() },
        farm: { type: 'geojson', data: S.farmGeo || empty() },
        buf: { type: 'geojson', data: farmBuffer || empty() },
        me: { type: 'geojson', data: meGeo() },
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#15191c' } },
        { id: 'sat', type: 'raster', source: 'sat' },
        { id: 'farm-fill', type: 'fill', source: 'farm', filter: ['in', ['geometry-type'], ['literal', ['Polygon', 'MultiPolygon']]], paint: { 'fill-color': '#34c77b', 'fill-opacity': 0.1 } },
        { id: 'farm-line', type: 'line', source: 'farm', paint: { 'line-color': '#34c77b', 'line-width': 2 } },
        { id: 'buf-line', type: 'line', source: 'buf', paint: { 'line-color': '#f0a020', 'line-width': 1.5, 'line-dasharray': [1, 3] } },
        { id: 'farm-pts', type: 'circle', source: 'farm', filter: ['==', ['geometry-type'], 'Point'], paint: { 'circle-radius': 5, 'circle-color': '#34c77b', 'circle-stroke-color': '#0d1013', 'circle-stroke-width': 2, 'circle-pitch-alignment': 'map' } },
        { id: 'obs', type: 'fill-extrusion', source: 'obs', paint: { 'fill-extrusion-color': ['get', 'color'], 'fill-extrusion-height': ['get', 'h'], 'fill-extrusion-base': ['get', 'base'], 'fill-extrusion-opacity': 0.92 } },
        { id: 'me', type: 'circle', source: 'me', paint: { 'circle-radius': 7, 'circle-color': '#4aa3f0', 'circle-stroke-color': '#ffffff', 'circle-stroke-width': 3, 'circle-pitch-alignment': 'map' } },
      ],
      terrain: { source: 'dem', exaggeration: 1 },
    },
  });
  map3d.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
  sat3dKey = sat3dTiles()[0] + '|' + (imgCap ?? 19); map3d.setMaxZoom((imgCap ?? 21) - 1);
  map3d.on('zoomend', () => {   // re-size footprints when the zoom changed enough to matter
    const r = minRadius3d();
    if (Math.abs(r - minR3d) > minR3d * 0.25 || (r < 1) !== (minR3d < 1)) { minR3d = r; map3d.getSource('obs')?.setData(obstacles3d()); }
  });
  map3d.on('click', 'obs', e => {
    const p = e.features[0]?.properties; if (!p || p.wire) return;
    new maplibregl.Popup({ closeButton: false, offset: 8 }).setLngLat(e.lngLat)
      .setHTML(`<b>${t(p.type)}</b><br>${fmt(p.h)} m${p.est ? ' · ' + t('est3d') : ''}`).addTo(map3d);
  });
  map3d.on('dragstart', () => setFollow(false));
  map3d.on('mouseenter', 'obs', () => { map3d.getCanvas().style.cursor = 'pointer'; });
  map3d.on('mouseleave', 'obs', () => { map3d.getCanvas().style.cursor = ''; });
}
// keep the 3D imagery on the same basemap and depth as 2D (MapLibre zoom = Leaflet zoom - 1)
let sat3dKey = '';
function syncSat3d() {
  if (!map3d || !map3d.getLayer('sat')) return;
  const mz = imgCap ?? 19, key = sat3dTiles()[0] + '|' + mz;
  map3d.setMaxZoom((imgCap ?? 21) - 1);
  if (key === sat3dKey) return;
  sat3dKey = key;
  try {
    map3d.removeLayer('sat'); map3d.removeSource('sat');
    map3d.addSource('sat', { type: 'raster', tiles: sat3dTiles(), tileSize: 256, maxzoom: mz, attribution: 'Imagery © Esri, Maxar, Earthstar' });
    map3d.addLayer({ id: 'sat', type: 'raster', source: 'sat' }, 'farm-fill');
  } catch (e) { console.warn('3D imagery refresh failed', e); }
}
function update3d() {
  if (!map3d || !is3d || !map3d.getSource('obs')) return;
  minR3d = minRadius3d();
  map3d.getSource('obs').setData(obstacles3d());
  map3d.getSource('farm').setData(S.farmGeo || empty());
  map3d.getSource('buf').setData(farmBuffer || empty());
}
function updateMe3d() { if (map3d && is3d && map3d.getSource('me')) map3d.getSource('me').setData(meGeo()); }
async function toggle3d() {
  if (is3d) return exit3d();
  try { await loadMapLibre(); } catch { return toast(t('err3d')); }
  const c = map.getCenter(), z = map.getZoom() - 1;   // MapLibre zoom levels are one below Leaflet's for the same scale
  $('#map3d').classList.remove('hidden'); document.body.classList.add('is3d'); is3d = true;
  $('#btn3d').classList.add('on3d'); $('#btn3d').textContent = '2D';
  try {
    if (!map3d) init3d(c, z);
    else { map3d.resize(); map3d.jumpTo({ center: [c.lng, c.lat], zoom: z, pitch: 0, bearing: 0 }); syncSat3d(); update3d(); updateMe3d(); }
  } catch (e) { console.error(e); exit3d(); return toast(t('err3d')); }
  // tilt only once the style is ready: animating the camera over terrain before that froze the render loop
  const tilt = () => map3d.easeTo({ pitch: 62, bearing: -20, duration: 1400 });
  // ('load' waits for every imagery tile, which may never arrive with a weak signal in the field)
  if (map3d.style && map3d.style._loaded) tilt(); else map3d.once('style.load', tilt);
  toast(t('hint3d'), 4000);
}
function exit3d() {
  if (map3d) { const c = map3d.getCenter(); map.setView([c.lat, c.lng], Math.round(map3d.getZoom() + 1), { animate: false }); }
  $('#map3d').classList.add('hidden'); document.body.classList.remove('is3d'); is3d = false;
  $('#btn3d').classList.remove('on3d'); $('#btn3d').textContent = '3D';
}

// ---------------------------------------------------------------- obstacle import (KML/KMZ points)
// Points become obstacles. The type comes from a Field Scout export's own data when present,
// otherwise from keywords in the placemark name (PT/EN). Anything unrecognised is "other" and
// flagged for review.
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const NAME_RULES = [
  ['pivot',    /\b(pivo|pivos|pivot|pivots|center pivot|irrigac\w*|irrigat\w*|aspersor\w*)\b/],
  ['tower',    /\b(torre|torres|tower|towers|antena|antenas|antenna|antennas|mastro|mast|erb|telecom|radio|celular|repetidora)\b/],
  ['building', /\b(casa|casas|galpao|galpoes|barracao|barracoes|armazem|armazens|silo|silos|sede|predio|predios|edifica\w*|constru\w*|igreja|escola|curral|granja|aviario|caixa d.?agua|reservatorio|building|buildings|house|shed|barn|warehouse|tank)\b/],
  ['pole',     /\b(poste|postes|pole|poles|post|posts|pt|estrutura)\b|^p\s*[-_.]?\s*\d+\b/],
];
function classifyPlacemark(props) {
  const own = norm(props.type);
  if (TYPE[own] && !TYPE[own].retired) return { type: own, known: true };
  const n = norm(props.name);
  for (const [type, re] of NAME_RULES) if (re.test(n)) return { type, known: true };
  return { type: 'other', known: false };
}
function heightFrom(props) {
  const h = parseFloat(props.height_agl_m);
  if (!isNaN(h)) return h;
  const m = String(props.name || '').match(/(\d+(?:[.,]\d+)?)\s*m\b/i);
  return m ? parseFloat(m[1].replace(',', '.')) : null;
}
async function importObstacles(file) {
  let gj;
  try { gj = await readKml(file); } catch (e) { console.error(e); return toast(t('farmErr')); }
  const near = (lat, lon, list, m) => list.find(f => turf.distance([f.lon, f.lat], [lon, lat], { units: 'meters' }) <= m);
  const pts = gj.features.filter(f => f.geometry && f.geometry.type === 'Point');
  if (!pts.length) return toast(t(gj.features.some(f => f.geometry && /Polygon/.test(f.geometry.type)) ? 'importAreasOnly' : 'importNone'), 3500);
  const added = []; let dup = 0;
  for (const p of pts) {
    const [lon, lat] = p.geometry.coordinates, props = p.properties || {};
    if (near(lat, lon, S.features, 1) || near(lat, lon, added, 1)) { dup++; continue; }
    const c = classifyPlacemark(props);
    added.push({ id: uid(), ts: Date.now(), op: S.operator, type: c.type, lat: +lat.toFixed(7), lon: +lon.toFixed(7), acc: null, method: 'import',
                 height: heightFrom(props), width: null, notes: '', photos: [], srcName: String(props.name || '').trim(), review: !c.known });
  }
  // rebuild lines whose every vertex lands on an imported or existing obstacle
  const pool = [...S.features, ...added], newLines = [];
  for (const g of gj.features.filter(f => f.geometry && f.geometry.type === 'LineString')) {
    const ids = g.geometry.coordinates.map(([lon, lat]) => near(lat, lon, pool, 2)?.id);
    if (ids.length < 2 || ids.some(x => !x)) continue;
    const kind = /\b(estai|estais|guy|stay)\b/.test(norm(g.properties?.name)) ? 'guy' : 'power';
    const line = { id: uid(), kind, pointIds: ids, ts: Date.now(), op: S.operator };
    ids.forEach(id => { const f = pool.find(x => x.id === id); if (f && !f.lineId) f.lineId = line.id; });
    newLines.push(line);
  }
  S.features.push(...added); S.lines.push(...newLines);
  S.undo.push({ op: 'import', ids: added.map(f => f.id), lineIds: newLines.map(l => l.id) });
  persist(); refreshAll();
  if (added.length) map.fitBounds(L.latLngBounds(added.map(f => [f.lat, f.lon])), { padding: [60, 60], maxZoom: 17 });
  const todo = added.filter(f => f.review).length;
  const extra = [];
  if (newLines.length) extra.push(newLines.length === 1 ? t('importLine1') : t('importLines').replace('{l}', newLines.length));
  if (dup) extra.push(dup === 1 ? t('importDup1') : t('importDup').replace('{d}', dup));
  if (todo) openReview('todo', extra.join(' · '));   // the sheet shows the counts; no toast over it
  else toast([t('importDone').replace('{n}', added.length).replace('{u}', 0), ...extra].join(' · '), 4500);
}

// ---------------------------------------------------------------- review / classify imported obstacles
function typePick(cur, onPick) {
  const el = document.createElement('div'); el.className = 'typePick';
  TYPES.filter(ty => !ty.retired).forEach(ty => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'tp' + (ty.id === cur ? ' on' : '');
    b.style.setProperty('--c', ty.color); b.innerHTML = `${ty.svg}<span>${t(ty.id)}</span>`;
    b.onclick = () => { el.querySelectorAll('.tp').forEach(x => x.classList.toggle('on', x === b)); onPick(ty.id); };
    el.appendChild(b);
  });
  return el;
}
let reviewFilter = 'todo', reviewNote = '';
const imported = () => S.features.filter(f => f.method === 'import' || f.srcName);
function retype(list, type) {
  if (!list.length) return;
  S.undo.push({ op: 'retype', prev: list.map(f => [f.id, f.type, !!f.review]) });
  list.forEach(f => { f.type = type; f.review = false; });
  persist(); refreshAll();
}
function openReview(filter, note = '') {
  closeAllSheets();
  if (filter) reviewFilter = filter;
  reviewNote = note;
  renderReview();
  $('#review').classList.remove('hidden');
}
function renderReview() {
  const all = imported(), todo = all.filter(f => f.review);
  if (reviewFilter === 'todo' && !todo.length && all.length) reviewFilter = 'all';
  $('#reviewSub').textContent = t('reviewSub').replace('{n}', all.length).replace('{u}', todo.length);
  $('#reviewNote').textContent = reviewNote; $('#reviewNote').classList.toggle('hidden', !reviewNote);
  $('#fTodo').textContent = `${t('fTodo')} · ${todo.length}`; $('#fAll').textContent = `${t('fAll')} · ${all.length}`;
  $('#fTodo').classList.toggle('on', reviewFilter === 'todo'); $('#fAll').classList.toggle('on', reviewFilter === 'all');
  const bulk = $('#reviewBulk'); bulk.classList.toggle('hidden', !todo.length);
  const bp = $('#bulkPick'); bp.innerHTML = ''; bp.appendChild(typePick(null, type => { retype(imported().filter(f => f.review), type); toast(t('classified')); renderReview(); }));
  const body = $('#reviewBody'); body.innerHTML = '';
  const rows = (reviewFilter === 'todo' ? todo : [...all].sort((a, b) => (b.review ? 1 : 0) - (a.review ? 1 : 0)));
  if (!rows.length) body.innerHTML = `<div class="empty">${svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>')}<p>${t('reviewEmpty')}</p></div>`;
  rows.forEach((f, i) => {
    const row = document.createElement('div'); row.className = 'rv'; row.style.setProperty('--i', Math.min(i, 12));
    row.innerHTML = `<div class="rvHead"><div class="rvName">${escapeHtml(f.srcName || t(f.type))}<small>${f.lat.toFixed(5)}, ${f.lon.toFixed(5)}${f.height ? ' · ' + fmt(f.height) + ' m' : ''}</small></div>`
      + `<span class="rvState${f.review ? '' : ' ok'}">${f.review ? t('toClassify') : t('classified')}</span>`
      + `<button class="btn icon rvGo" aria-label="Show on map">${svg('<circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>')}</button></div>`;
    row.appendChild(typePick(f.type, type => {
      retype([f], type);
      const st = row.querySelector('.rvState'); st.textContent = t('classified'); st.classList.add('ok');
      $('#reviewSub').textContent = t('reviewSub').replace('{n}', imported().length).replace('{u}', imported().filter(x => x.review).length);
      $('#fTodo').textContent = `${t('fTodo')} · ${imported().filter(x => x.review).length}`;
      $('#reviewBulk').classList.toggle('hidden', !imported().some(x => x.review));
    }));
    row.querySelector('.rvGo').onclick = () => { closeAllSheets(); map.setView([f.lat, f.lon], 19); setTimeout(() => markerById.get(f.id)?.fire('click'), 300); };
    body.appendChild(row);
  });
  updateReviewBadge();
}
function updateReviewBadge() {
  const all = imported(), n = all.filter(f => f.review).length;
  $('#btnReview').classList.toggle('hidden', !all.length);
  $('#reviewBadge').textContent = n; $('#reviewBadge').classList.toggle('hidden', !n);
}

// ---------------------------------------------------------------- obstacle markers + lines
function iconFor(f) {
  const ty = TYPE[f.type] || TYPE.other, pole = f.type === 'pole', sz = pole ? 14 : 26;
  const tag = f.height ? `<span class="hTag">${fmt(f.height, f.height % 1 ? 1 : 0)} m</span>` : '';
  return L.divIcon({ className: 'obs-wrap', iconSize: [sz, sz],
    html: `<div class="obs-marker${pole ? ' pole' : ''}" style="--c:${ty.color}">${pole ? '' : ty.svg}</div>${pole ? '' : tag}` });
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
    L.polyline(lineLatLngs(l), { color: '#0d1013', weight: 8, opacity: .55, interactive: false }).addTo(gLines);
    L.polyline(lineLatLngs(l), { color: LINE_COLORS[l.kind] || '#f5c400', weight: 3.5, opacity: 1 })
      .bindPopup(`<b>${t('lineKind_' + l.kind)}</b><br>${l.pointIds.length} ${t('poles')}`).addTo(gLines);
  }
  activeLineDraft = L.polyline(lineMode ? lineLatLngs(lineMode) : [], { color: LINE_COLORS[lineMode?.kind] || '#f5c400', weight: 3.5, dashArray: '1 8', lineCap: 'round' }).addTo(gLines);
}
function refreshAll() { drawFeatures(); drawLines(); updateStats(); $('#farmTitle').textContent = S.farm || ''; update3d(); }

async function openPopup(f, m) {
  let imgs = '';
  for (const pid of (f.photos || []).slice(0, 2)) {
    const b = await DB.get('photos', pid); if (b) imgs += `<img src="${URL.createObjectURL(b)}">`;
  }
  const z = zoneOf(f.lat, f.lon), ty = TYPE[f.type] || TYPE.other;
  const lineKind = f.lineId ? t('lineKind_' + (S.lines.find(l => l.id === f.lineId)?.kind || (lineMode?.id === f.lineId ? lineMode.kind : 'power'))) : '';
  const kv = (k, v) => `<div><dt>${k}</dt><dd>${v}</dd></div>`;
  const html = `<div class="pop">
    <div class="popHead"><span class="typeIc sm" style="--c:${ty.color}">${ty.svg}</span><div class="popTitle"><b>${t(f.type)}</b>${lineKind ? `<span>${lineKind}</span>` : ''}</div>${z ? `<span class="zone ${z}">${zoneLabel(z)}</span>` : ''}</div>
    <dl class="kv">${kv(t('heightShort'), f.height != null ? fmt(f.height) + ' m' : '—')}${kv(t('accLbl'), f.acc != null ? '±' + fmt(f.acc, 0) + ' m' : '—')}${kv(t('methodLbl'), methodLabel(f.method))}${f.width ? kv(t('width'), fmt(f.width) + ' m') : ''}</dl>
    <div class="mono coords">${f.lat.toFixed(6)}, ${f.lon.toFixed(6)}</div>
    ${f.srcName ? `<div class="src"><span>${t('srcLbl')}</span> ${escapeHtml(f.srcName)}${f.review ? ` <em>${t('toClassify')}</em>` : ''}</div>` : ''}
    ${f.notes ? '<p class="notes">' + escapeHtml(f.notes) + '</p>' : ''}${imgs ? '<div class="popImgs">' + imgs + '</div>' : ''}
    <div class="pbtns"><button data-a="edit">${t('edit')}</button><button data-a="move">${t('move')}</button><button data-a="del" class="danger">${t('del')}</button></div></div>`;
  // A standalone popup: binding one to the marker would add Leaflet's own click toggle, which closed
  // the popup again on every later tap (it opened once, then never again).
  const pop = L.popup({ autoPanPaddingTopLeft: [12, 72], autoPanPaddingBottomRight: [68, 110], maxWidth: 300, offset: [0, f.type === 'pole' ? 0 : -6] })
    .setLatLng(m.getLatLng()).setContent(html).openOn(map);
  const el = pop.getElement();
  el.querySelector('[data-a=edit]').onclick = () => { map.closePopup(); openSheet(f.type, f); };
  el.querySelector('[data-a=del]').onclick = () => { map.closePopup(); deleteFeature(f.id); };
  el.querySelector('[data-a=move]').onclick = () => {
    map.closePopup(); m.dragging.enable(); toast(t('dragHint'), 2500);
    m.off('click'); m.once('click', () => {
      const ll = m.getLatLng(); const old = { lat: f.lat, lon: f.lon };
      f.lat = ll.lat; f.lon = ll.lng; f.method += '+moved';
      S.undo.push({ op: 'move', id: f.id, old }); m.dragging.disable(); persist(); refreshAll(); toast(t('moved'));
    });
  };
}
function methodLabel(m) {
  const [base, moved] = String(m || '').split('+');
  return ({ gps: t('mGps'), map: t('mMap'), bearing: t('mBearing'), import: t('mImport') })[base] + (moved ? ' · ' + t('movedLbl') : '');
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
  } else if (u.op === 'import') {
    S.features = S.features.filter(f => !u.ids.includes(f.id));
    S.lines = S.lines.filter(l => !u.lineIds.includes(l.id));
    S.features.forEach(f => { if (u.lineIds.includes(f.lineId)) delete f.lineId; });
  } else if (u.op === 'retype') {
    for (const [id, type, review] of u.prev) { const f = S.features.find(x => x.id === id); if (f) { f.type = type; f.review = review; } }
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
  $('#lineBannerCount').textContent = lineMode.pointIds.length ? `${lineMode.pointIds.length} ${t('poles')}` : t('lineHint');
  $('#lineBanner').style.setProperty('--c', LINE_COLORS[lineMode.kind]);
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
  const ic = $('#sheetIcon'); ic.innerHTML = ty.svg; ic.style.setProperty('--c', ty.color);
  $('#sheetTitle').textContent = t(type);
  $('#sheetSub').textContent = editing ? t('sheetSubEdit') : (lineMode ? t('lineKind_' + lineMode.kind) + ' · #' + (lineMode.pointIds.length + 1) : t('sheetSub'));
  const tp = $('#sheetTypePick'); tp.innerHTML = ''; tp.classList.toggle('hidden', !editing);
  if (editing) tp.appendChild(typePick(type, id => {
    cap.type = id; const t2 = TYPE[id];
    ic.innerHTML = t2.svg; ic.style.setProperty('--c', t2.color); $('#sheetTitle').textContent = t(id);
  }));
  $('#inHeight').value = editing?.height ?? (lastHeight[type] ?? '');
  $('#inWidth').value = editing?.width ?? '';
  $('#inNotes').value = editing?.notes ?? '';
  $('#avgStatus').textContent = editing ? `${editing.lat.toFixed(6)}, ${editing.lon.toFixed(6)} ±${fmt(editing.acc, 0)}m` : '—';
  $('#mapPickStatus').textContent = ''; $('#bearingStatus').textContent = '';
  $('#inBearing').value = ''; $('#inDist').value = '';
  resetCaptureVisuals();
  renderThumbs(); setMethod(editing ? (editing.method.split('+')[0] || 'gps') : 'gps');
  $('#sheet').classList.remove('hidden'); $('#lineBanner').classList.add('hidden'); moveTabInd();
  updateSaveBtn();
  // auto-start averaging for fast pole capture
  if (!editing) { if (isDesk()) { setMethod('map'); startTapPick(); } else startAvg(); }
}
const lastHeight = {};
function setMethod(m) {
  cap.method = m;
  $$('#methodTabs .tab').forEach(b => b.classList.toggle('active', b.dataset.m === m));
  $$('#sheet .pane').forEach(p => p.classList.toggle('hidden', p.dataset.pane !== m));
  moveTabInd();
  if (m !== 'gps') stopAvg();
  if (m === 'bearing') prepBearing();
}
function moveTabInd() {
  const a = $('#methodTabs .tab.active'), ind = $('#methodTabs .tabInd');
  if (!a || !ind || !a.offsetWidth) return;
  ind.style.width = a.offsetWidth + 'px'; ind.style.transform = 'translateX(' + a.offsetLeft + 'px)';
}
function updateSaveBtn() { $('#btnSave').disabled = !(cap && cap.pos); }
// ---------------------------------------------------------------- how-to tour + demo video
// Six short cards shown on first launch and from Menu > How to use; the video plays in its own overlay.
const TOUR_ICONS = [
  svg('<path d="M12 21s-6.5-6.2-6.5-11A6.5 6.5 0 0 1 18.5 10c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>'),
  svg('<path d="M12 3v18M6 6.5h12M7.5 6.5v2M16.5 6.5v2M9 21h6"/>'),
  svg('<path d="M12 3v5M12 16v5M3 12h5M16 12h5"/><circle cx="12" cy="12" r="1.4" class="fill"/>'),
  svg('<path d="M4 19 10 9l5 6 5-10"/><circle cx="4" cy="19" r="1.6" class="fill"/><circle cx="10" cy="9" r="1.6" class="fill"/><circle cx="15" cy="15" r="1.6" class="fill"/><circle cx="20" cy="5" r="1.6" class="fill"/>'),
  svg('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  svg('<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><path d="M3 3l18 18"/>'),
];
let tourI = 0;
function renderTour() {
  const n = TOUR_ICONS.length, i = tourI;
  $('#tourIc').innerHTML = TOUR_ICONS[i];
  $('#tourStep').textContent = t('tourStepOf').replace('{i}', i + 1).replace('{n}', n);
  $('#tourTitle').textContent = t(`tour${i + 1}T`);
  $('#tourText').textContent = t(`tour${i + 1}`);
  $('#btnTourBack').classList.toggle('invisible', i === 0);
  $('#btnTourNext').textContent = i === n - 1 ? t('tourDone') : t('tourNext');
  $('#btnTourVideo').classList.toggle('hidden', !(i === 0 || i === n - 1));
  $('#btnTourLang').textContent = S.lang === 'en' ? 'PT' : 'EN';
  $('#tourDots').innerHTML = TOUR_ICONS.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('');
  const card = $('#tour .tourBody'); card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
}
function openTour(i = 0) { closeAllSheets(); tourI = i; renderTour(); $('#tour').classList.remove('hidden'); }
function closeTour() {
  $('#tour').classList.add('hidden');
  try { localStorage.setItem('fs-tour', 'done'); } catch {}
}
function openVideo() {
  const v = $('#tourVideo'); $('#videoBox').classList.remove('hidden');
  try { v.currentTime = 0; v.play().catch(() => {}); } catch {}
}
function closeVideo() { const v = $('#tourVideo'); try { v.pause(); } catch {} $('#videoBox').classList.add('hidden'); }

function closeAllSheets() { reviewNote = ''; ['#sheet', '#menu', '#list', '#review'].forEach(s => $(s).classList.add('hidden')); if (lineMode) $('#lineBanner').classList.remove('hidden'); stopAvg(); stopCompass(); cancelTapPick(); clearPreview(); }

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
  const desk = isDesk();
  // phone: hide the sheet and aim with the centre crosshair; desktop: the side panel stays, click the spot
  if (!desk) $('#sheet').classList.add('hidden');
  $('#tapBanner [data-i18n="tapHint"]').textContent = t(desk ? 'tapHintDesk' : 'tapHint');
  $('#tapBanner').classList.remove('hidden'); $('#crosshair').classList.toggle('hidden', desk);
  document.body.classList.add('picking');
}
function cancelTapPick(reopen = false) {
  if (!tapPicking) return;
  tapPicking = false; document.body.classList.remove('picking');
  $('#tapBanner').classList.add('hidden'); $('#crosshair').classList.add('hidden');
  if (reopen && cap) $('#sheet').classList.remove('hidden');
}
map.on('click', e => {
  if (!tapPicking) return;
  const c = isDesk() ? e.latlng : map.getCenter();
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
    Object.assign(cap.editing, data, { review: false });
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
              line_id: f.lineId, line_kind: f.lineId ? lineKindOf(f.lineId) : null, zone: z, notes: f.notes, operator: f.op, source_name: f.srcName,
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
  const head = ['id', 'type', 'lat', 'lon', 'height_agl_m', 'width_m', 'accuracy_m', 'method', 'line_id', 'zone', 'notes', 'operator', 'timestamp', 'source_name'];
  const rows = S.features.map(f => [f.id, EN[f.type], f.lat, f.lon, f.height ?? '', f.width ?? '', f.acc ?? '', f.method, f.lineId ?? '', zoneOf(f.lat, f.lon), f.notes, f.op, new Date(f.ts).toISOString(), f.srcName ?? '']
    .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));
  await shareBlob(new Blob([head.join(',') + '\n' + rows.join('\n')], { type: 'text/csv' }), fileBase() + '.csv', 'text/csv');
}

// ---------------------------------------------------------------- list + stats
function updateStats() {
  drawBars();
  const lineM = S.lines.reduce((a, l) => { const p = lineLatLngs(l); for (let i = 1; i < p.length; i++) a += turf.distance([p[i - 1][1], p[i - 1][0]], [p[i][1], p[i][0]], { units: 'meters' }); return a; }, 0);
  const tile = (n, unit, lbl) => `<div class="stat"><b>${n}<small>${unit}</small></b><span>${lbl}</span></div>`;
  $('#stats').innerHTML = tile(S.features.length, '', t('statObs')) + tile(S.lines.length, ' · ' + (lineM / 1000).toFixed(1) + ' km', t('statLines'))
    + tile((trackStats.m / 1000).toFixed(1), ' km', t('statTrack'));
  $('#coach').classList.toggle('hidden', S.features.length > 0);
  updateReviewBadge();
}
function openList() {
  closeAllSheets();
  const body = $('#listBody'); body.innerHTML = '';
  $('#listCount').textContent = S.features.length || '';
  if (!S.features.length) body.innerHTML = `<div class="empty">${svg('<circle cx="12" cy="12" r="8"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>')}<p>${t('listEmpty')}</p></div>`;
  [...S.features].reverse().forEach((f, i) => {
    const ty = TYPE[f.type] || TYPE.other;
    const row = document.createElement('button'); row.className = 'li'; row.style.setProperty('--i', Math.min(i, 12));
    row.innerHTML = `<span class="typeIc sm" style="--c:${ty.color}">${ty.svg}</span><span class="meta"><b>${t(f.type)}${f.height ? ` <em>${fmt(f.height)} m</em>` : ''}</b><span class="mono muted">${f.lat.toFixed(5)}, ${f.lon.toFixed(5)} · ${f.acc != null ? '±' + fmt(f.acc, 0) + ' m' : methodLabel(f.method)}</span>${f.notes ? `<span class="note">${escapeHtml(f.notes)}</span>` : ''}${f.srcName ? `<span class="note">${t('srcLbl')}: ${escapeHtml(f.srcName)}${f.review ? ` · <b class="todo">${t('toClassify')}</b>` : ''}</span>` : ''}</span><span class="time mono muted">${new Date(f.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>${svg('<path d="m9 6 6 6-6 6"/>')}`;
    row.onclick = () => { closeAllSheets(); map.setView([f.lat, f.lon], 19); setTimeout(() => markerById.get(f.id)?.fire('click'), 300); };
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
const accColor = a => ({ green: '#34c77b', orange: '#f0a020', red: '#f0503c' })[accClass(a)] || '#4aa3f0';

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
  g.strokeStyle = cssVar('--line'); g.lineWidth = 1.5; g.fillStyle = cssVar('--muted'); g.font = '600 17px -apple-system, sans-serif';
  for (let d = step; d <= R; d += step) { g.beginPath(); g.arc(cx, cy, d * k, 0, 2 * Math.PI); g.stroke(); }
  g.fillText(step + ' m', cx + step * k + 3, cy - 3);
  // accuracy circle
  g.beginPath(); g.arc(cx, cy, r.acc * k, 0, 2 * Math.PI);
  g.fillStyle = accColor(r.acc) + '33'; g.fill(); g.strokeStyle = accColor(r.acc); g.lineWidth = 2; g.stroke();
  // samples (older = fainter)
  pts.forEach(([x, y], i) => {
    g.beginPath(); g.arc(cx + x * k, cy - y * k, 5, 0, 2 * Math.PI);
    g.fillStyle = `rgba(74,163,240,${0.25 + 0.75 * (i + 1) / pts.length})`; g.fill();
  });
  // averaged centre
  g.strokeStyle = cssVar('--text'); g.lineWidth = 3; g.lineCap = 'round';
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
  if (cap.pos.from) L.polyline([cap.pos.from, ll], { color: '#f5c400', weight: 2.5, dashArray: '1 7', lineCap: 'round', interactive: false }).addTo(gPreview);
  L.marker(ll, { interactive: false, icon: L.divIcon({ className: '', iconSize: [26, 26], html: `<div class="ghostMk" style="--c:${ty.color}"></div>` }) }).addTo(gPreview);
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
  if (isDesk()) {   // side panel: only pan if the point is hidden under it or off screen
    const pt = map.latLngToContainerPoint(ll), panelR = $('#sheet').getBoundingClientRect().right + 24;
    if (pt.x < panelR || pt.x > window.innerWidth - 70 || pt.y < 70 || pt.y > window.innerHeight - 110)
      map.panBy([pt.x - (panelR + window.innerWidth) / 2, pt.y - window.innerHeight / 2], { animate: true });
  } else if ((forcePan || !cap.panned) && !$('#sheet').classList.contains('hidden')) {
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
  let html = '';
  for (const ty of TYPES) if (!ty.retired || counts[ty.id]) html += `<div class="bar"><span><i class="sw" style="background:${ty.color}"></i>${t(ty.id)}</span><div class="track"><div class="fill" style="width:${counts[ty.id] / max * 100}%;background:${ty.color}"></div></div><span class="n">${counts[ty.id]}</span></div>`;
  $('#statsBars').innerHTML = html;
  $$('[data-cnt]').forEach(el => {
    const n = counts[el.dataset.cnt], changed = el.textContent !== String(n);
    el.textContent = n; el.classList.toggle('hidden', !n);
    if (changed && n) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
  });
}
function recomputeTrackStats() {
  trackStats.m = 0; let prev = null;
  for (const p of S.track) { if (p && prev) trackStats.m += turf.distance([prev[1], prev[0]], [p[1], p[0]], { units: 'meters' }); prev = p; }
}

// ---------------------------------------------------------------- UI wiring
// ---------------------------------------------------------------- appearance (auto / light / dark)
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const lightMQ = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : { matches: false };
function applyTheme(animate) {
  const mode = ['auto', 'light', 'dark'].includes(S.theme) ? S.theme : 'auto';
  const scheme = mode === 'auto' ? (lightMQ.matches ? 'light' : 'dark') : mode;
  const root = document.documentElement;
  if (animate) { root.classList.add('themeSwitch'); clearTimeout(applyTheme.t); applyTheme.t = setTimeout(() => root.classList.remove('themeSwitch'), 450); }
  root.dataset.scheme = scheme;
  try { localStorage.setItem('fs-theme', mode); } catch {}
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', scheme === 'light' ? '#f2f4f6' : '#0d1013');
  $$('#themeSeg button').forEach(b => { const on = b.dataset.theme === mode; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
}
lightMQ.addEventListener?.('change', () => { if ((S.theme || 'auto') === 'auto') applyTheme(true); });

function applyLang() {
  document.documentElement.lang = S.lang;
  $('#btnLang').textContent = S.lang === 'en' ? 'PT' : 'EN';
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  const pal = $('#palette'); pal.innerHTML = '';
  TYPES.filter(ty => !ty.retired).forEach((ty, i) => {
    const b = document.createElement('button'); b.className = 'pbtn'; b.style.setProperty('--c', ty.color); b.style.setProperty('--i', i);
    b.innerHTML = `<span class="ic">${ty.svg}</span><span class="lb">${t(ty.id)}</span><span class="cnt hidden" data-cnt="${ty.id}"></span>`;
    b.onclick = () => openSheet(ty.id);
    pal.appendChild(b);
  });
  updateLineBanner(); updateStats();
  if (!fix) $('#gpsText').textContent = t(gpsDenied ? 'gpsOff' : 'gpsWait');
  if (!$('#tour').classList.contains('hidden')) renderTour();
  if (!$('#gpsBanner').classList.contains('hidden')) showGpsHelp();
}
// Keyboard (desktop): 1-5 pick a type, Esc closes/cancels, Ctrl/Cmd+Z undoes.
document.addEventListener('keydown', e => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
  if (e.key === 'Escape') {
    if (!$('#videoBox').classList.contains('hidden')) { closeVideo(); return; }
    if (!$('#tour').classList.contains('hidden')) { closeTour(); return; }
    if (tapPicking) { cancelTapPick(true); return; }
    if (map._popup && map.hasLayer(map._popup)) { map.closePopup(); return; }
    closeAllSheets(); if (!$('#sheet').classList.contains('hidden')) cap = null; return;
  }
  if (typing || e.altKey) return;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); return; }
  if (e.ctrlKey || e.metaKey) return;
  const n = parseInt(e.key, 10), active = TYPES.filter(ty => !ty.retired);
  if (n >= 1 && n <= active.length && !is3d) { e.preventDefault(); openSheet(active[n - 1].id); }
});
function wire() {
  $('#btnLang').onclick = () => { S.lang = S.lang === 'en' ? 'pt' : 'en'; applyLang(); persist(); };
  $$('#themeSeg button').forEach(b => b.onclick = () => { S.theme = b.dataset.theme; applyTheme(true); persist(); });
  $('#btnMenu').onclick = () => { closeAllSheets(); $('#inFarm').value = S.farm; $('#inOperator').value = S.operator; $('#inDecl').value = S.decl; updateStats(); $('#menu').classList.remove('hidden'); };
  $('#btnMenuClose').onclick = closeAllSheets;
  $('#btnListClose').onclick = closeAllSheets;
  $('#btnSheetClose').onclick = () => { closeAllSheets(); cap = null; };
  $('#inFarm').oninput = e => { S.farm = e.target.value; $('#farmTitle').textContent = S.farm; persist(); };
  $('#inOperator').oninput = e => { S.operator = e.target.value; persist(); };
  $('#inDecl').oninput = e => { S.decl = parseFloat(e.target.value) || 0; persist(); };
  $('#gpsChip').onclick = () => fix ? map.setView([fix.lat, fix.lon], Math.max(map.getZoom(), 17)) : restartGps();
  $('#btnGpsRetry').onclick = restartGps;
  $('#btnGpsClose').onclick = () => $('#gpsBanner').classList.add('hidden');
  $('#btnLocate').onclick = () => {
    if (!fix) return toast(t('noFix'));
    if (!following) toast(t('followOn'), 2500);
    setFollow(true);
    if (is3d) map3d.easeTo({ center: [fix.lon, fix.lat], zoom: Math.max(map3d.getZoom(), 16) });
    else map.setView([fix.lat, fix.lon], Math.max(map.getZoom(), 17));
  };
  $('#btn3d').onclick = toggle3d;
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
  $('#inObsKml').onchange = e => { const f = e.target.files[0]; e.target.value = ''; closeAllSheets(); if (f) importObstacles(f); };
  $('#btnReview').onclick = () => openReview(imported().some(f => f.review) ? 'todo' : 'all');
  $('#btnReviewClose').onclick = closeAllSheets; $('#btnReviewDone').onclick = closeAllSheets;
  $('#fTodo').onclick = () => { reviewFilter = 'todo'; renderReview(); };
  $('#fAll').onclick = () => { reviewFilter = 'all'; renderReview(); };
  $('#btnClearFarm').onclick = () => { S.farmGeo = null; drawFarm(); persist(); toast(t('noFarm')); };
  $('#btnExportKml').onclick = exportKml;
  $('#btnExportKmz').onclick = exportKmz;
  $('#btnExportCsv').onclick = exportCsv;
  $('#btnList').onclick = openList;
  $('#btnHelp').onclick = () => openTour(0);
  $('#btnTourSkip').onclick = closeTour;
  $('#btnTourLang').onclick = () => $('#btnLang').click();
  $('#btnTourNext').onclick = () => { if (tourI < TOUR_ICONS.length - 1) { tourI++; renderTour(); } else closeTour(); };
  $('#btnTourBack').onclick = () => { if (tourI > 0) { tourI--; renderTour(); } };
  $('#btnTourVideo').onclick = openVideo;
  $('#btnVideoClose').onclick = closeVideo;
  $('#videoBox').onclick = e => { if (e.target.id === 'videoBox') closeVideo(); };
  $('#btnLayer').onclick = nextBasemap;
  $('#btnBase').onclick = nextBasemap;
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
  if (S.basemap && S.basemap !== 'sat') setBasemap(S.basemap);
  wire(); applyTheme(false); applyLang(); drawFarm(); drawTrack(); refreshAll();
  if (isDesk()) L.control.zoom({ position: 'bottomright' }).addTo(map);
  if (S.features.length) map.fitBounds(L.featureGroup([...markerById.values()]).getBounds(), { padding: [40, 40], maxZoom: 17 });
  let seenTour = false; try { seenTour = localStorage.getItem('fs-tour') === 'done'; } catch {}
  if (!seenTour && !S.features.length) setTimeout(() => openTour(0), 600);   // first launch only
  else if (farmPolys) map.fitBounds(L.geoJSON(S.farmGeo).getBounds());
  startGps();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();

// expose for tests
window.__scout = { S, buildKml, computeAvg, zoneOf, map, map3d: () => map3d, addTrackPoint, trackStats };
