// Caramel Popcorn — Extension Dashboard logic (vanilla JS, uses chrome.storage.local)

const SAVE_TYPES = {
  cant_stop_thinking: { l: "Can't Stop Thinking", e: '❤️', bg:'#FCEAEA', c:'#B33F40' },
  fomo:               { l: 'FOMO',                e: '🍿', bg:'#FDF3E1', c:'#B8860B' },
  manifesting:        { l: 'Manifesting',         e: '✨', bg:'#F2EAFD', c:'#6A4C93' },
  just_browsing:      { l: 'Just Browsing',       e: '🤷', bg:'#F0F0F0', c:'#595959' },
};

const fmtINR = (n) => n ? `₹${Number(n).toLocaleString('en-IN')}` : '';
const $ = (s) => document.querySelector(s);

let STATE = { view: 'all', q: '' };

async function loadItems() {
  const { items = [] } = await chrome.storage.local.get('items');
  return items;
}

async function renderStats() {
  const items = await loadItems();
  const products = items.filter(i => i.type === 'product');
  const total = items.length;
  const wishVal = products.reduce((s,p) => s + (Number(p.price)||0), 0);
  const favs = items.filter(i => i.favorite).length;
  const byCat = {};
  products.forEach(p => { const k = p.subcategory || p.category; byCat[k] = (byCat[k]||0)+1; });
  const topCat = Object.entries(byCat).sort((a,b)=>b[1]-a[1])[0]?.[0] || '—';
  $('#stats').innerHTML = `
    <div class="stat"><div class="l">Total saved</div><div class="v">${total}</div></div>
    <div class="stat"><div class="l">Wishlist value</div><div class="v">${fmtINR(wishVal) || '₹0'}</div></div>
    <div class="stat"><div class="l">Favorites</div><div class="v">${favs}</div></div>
    <div class="stat"><div class="l">Top category</div><div class="v">${topCat}</div></div>
  `;
}

function applyView(items) {
  let list = items;
  if (STATE.view === 'wishlist')    list = list.filter(i => i.type === 'product');
  if (STATE.view === 'inspiration') list = list.filter(i => i.type === 'inspiration');
  if (STATE.view === 'looks')       list = list.filter(i => i.type === 'look');
  if (STATE.view === 'favorites')   list = list.filter(i => i.favorite);
  if (STATE.q) {
    const q = STATE.q.toLowerCase();
    list = list.filter(i => [i.title,i.brand,i.notes,i.website,(i.tags||[]).join(' ')].join(' ').toLowerCase().includes(q));
  }
  return list;
}

function viewTitle() {
  return ({ all:'Recently saved', wishlist:'Wishlist', inspiration:'Inspiration', looks:'Looks', favorites:'Favorites', collections:'Collections' })[STATE.view];
}

async function renderGrid() {
  const items = await loadItems();
  const list = applyView(items);
  $('#view-title').textContent = viewTitle();
  const grid = $('#grid');
  const empty = $('#empty');
  if (list.length === 0) { grid.innerHTML = ''; empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  grid.innerHTML = list.map(i => {
    const st = SAVE_TYPES[i.saveType] || SAVE_TYPES.just_browsing;
    return `
      <article class="card" data-id="${i.id}">
        <div class="img">
          ${i.image ? `<img src="${i.image}" alt="" loading="lazy"/>` : ''}
          <span class="chip" style="background:${st.bg};color:${st.c}">${st.e} ${st.l}</span>
        </div>
        <div class="body">
          <div class="site">${(i.brand || i.creator || i.website || '').toString().slice(0,28)}</div>
          <div class="title">${(i.title || 'Untitled').slice(0, 60)}</div>
          ${i.price ? `<div class="price">${fmtINR(i.price)}</div>` : ''}
          ${i.url ? `<a href="${i.url}" target="_blank" rel="noopener">Open ↗</a>` : ''}
        </div>
      </article>
    `;
  }).join('');
}

async function render() {
  await renderStats();
  await renderGrid();
}

document.addEventListener('DOMContentLoaded', () => {
  render();

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.view = btn.dataset.view;
      renderGrid();
    });
  });

  $('#q').addEventListener('input', (e) => { STATE.q = e.target.value; renderGrid(); });
  $('#refresh').addEventListener('click', render);

  // Auto-refresh when storage changes (e.g. user saved from a tab)
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.items) render();
  });
});
