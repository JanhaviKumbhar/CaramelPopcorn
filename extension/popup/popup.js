// Caramel Popcorn — popup logic

const $ = (s) => document.querySelector(s);

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function getItems() {
  const { items = [] } = await chrome.storage.local.get('items');
  return items;
}

function detectFromUrl(url) {
  if (!url) return { website:'Web' };
  try {
    const host = new URL(url).hostname.replace(/^www\./,'');
    const map = {
      'amazon.in':'Amazon','amazon.com':'Amazon','nykaa.com':'Nykaa','myntra.com':'Myntra','ajio.com':'AJIO',
      'zara.com':'Zara','hm.com':'H&M','sephora.com':'Sephora','tirabeauty.com':'Tira',
      'pinterest.com':'Pinterest','instagram.com':'Instagram','youtube.com':'YouTube',
    };
    for (const [k, v] of Object.entries(map)) if (host.includes(k)) return { website: v, host };
    return { website: host };
  } catch { return { website:'Web' }; }
}

async function renderCurrent() {
  const tab = await getCurrentTab();
  const card = $('#current-card');
  if (!tab) { card.innerHTML = ''; return; }
  const { website } = detectFromUrl(tab.url);
  const fav = `https://www.google.com/s2/favicons?domain=${(tab.url||'').replace(/^https?:\/\//,'').split('/')[0]}&sz=64`;
  card.innerHTML = `
    <div class="cp-current-card" data-testid="popup-current-meta">
      <img src="${fav}" alt="" onerror="this.style.opacity=0.2"/>
      <div class="meta">
        <div class="site">${website}</div>
        <div class="title">${(tab.title || 'Untitled').replace(/[<>]/g,'')}</div>
      </div>
    </div>`;
}

async function renderRecent() {
  const items = (await getItems()).slice(0, 8);
  const wrap = $('#recent');
  if (items.length === 0) { wrap.innerHTML = '<div class="cp-empty">No saves yet. Save your first find →</div>'; return; }
  wrap.innerHTML = items.map(i => `
    <div class="cp-recent-card" data-url="${i.url || ''}" data-testid="popup-recent-${i.id}">
      <img src="${i.image || ''}" alt="" onerror="this.style.background='#F4E3D7'; this.style.opacity=0.5"/>
      <div class="t">${(i.title || '').slice(0, 22)}</div>
    </div>
  `).join('');
  wrap.querySelectorAll('.cp-recent-card').forEach(el => {
    el.addEventListener('click', () => {
      const url = el.getAttribute('data-url');
      if (url) chrome.tabs.create({ url });
    });
  });
}

async function renderCollections() {
  const { collections = [] } = await chrome.storage.local.get('collections');
  const wrap = $('#collections');
  wrap.innerHTML = collections.slice(0,6).map(c => `<div class="cp-coll" data-testid="popup-coll-${c.id}">${c.name}</div>`).join('');
}

async function saveCurrent() {
  const tab = await getCurrentTab();
  if (!tab) return;
  const { website } = detectFromUrl(tab.url);
  const payload = {
    title: tab.title || 'Saved from web',
    url: tab.url,
    image: tab.favIconUrl || '',
    website,
    source: 'popup',
    saveType: 'cant_stop_thinking',
    category: 'Beauty', subcategory: '', brand: '', currency: 'INR',
    tags: [], notes: '', favorite: false, status: 'wishlist',
  };
  await chrome.runtime.sendMessage({ type: 'CP_SAVE_ITEM', payload });
  await renderRecent();
}

async function searchSaves(q) {
  const items = await getItems();
  if (!q) { renderRecent(); return; }
  const ql = q.toLowerCase();
  const filtered = items.filter(i => [i.title,i.brand,i.notes,i.website].join(' ').toLowerCase().includes(ql)).slice(0,8);
  const wrap = $('#recent');
  if (filtered.length === 0) { wrap.innerHTML = '<div class="cp-empty">No matches.</div>'; return; }
  wrap.innerHTML = filtered.map(i => `
    <div class="cp-recent-card" data-url="${i.url || ''}">
      <img src="${i.image || ''}" alt="" />
      <div class="t">${(i.title || '').slice(0, 22)}</div>
    </div>`).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  await renderCurrent();
  await renderRecent();
  await renderCollections();

  $('#save-current').addEventListener('click', saveCurrent);
  $('#open-dashboard').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard/dashboard.html') });
  });
  $('#search').addEventListener('input', (e) => searchSaves(e.target.value));
});
