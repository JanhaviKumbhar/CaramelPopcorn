// Caramel Popcorn — Background service worker
// Handles context menu, opening dashboard, and routing save events from content scripts.

const DASHBOARD_URL = chrome.runtime.getURL('dashboard/dashboard.html');

chrome.runtime.onInstalled.addListener(async () => {
  // Initialize storage with empty arrays + sample data flag.
  const { items, collections, reminders } = await chrome.storage.local.get(['items','collections','reminders']);
  if (!items) await chrome.storage.local.set({ items: [] });
  if (!collections) await chrome.storage.local.set({ collections: [
    { id:'c1', name:'Vacation',      items:0 },
    { id:'c2', name:'Wedding Guest', items:0 },
    { id:'c3', name:'Office Wear',   items:0 },
    { id:'c4', name:'Old Money',     items:0 },
    { id:'c5', name:'Date Night',    items:0 },
  ]});
  if (!reminders) await chrome.storage.local.set({ reminders: [] });

  // Context menu — right-click any link or image to save
  try {
    chrome.contextMenus.create({
      id: 'cp-save-link', title: '🍿 Save to Caramel Popcorn', contexts: ['link','image','page','selection']
    });
  } catch (_) {}
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'cp-save-link') return;
  const payload = {
    title: info.selectionText || tab?.title || 'Saved from web',
    url: info.linkUrl || info.pageUrl || tab?.url,
    image: info.srcUrl || '',
    website: tab?.url ? new URL(tab.url).hostname.replace(/^www\./,'') : 'Web',
    source: 'context-menu',
    saveType: 'just_browsing',
    category: 'Beauty', subcategory: '', brand: '',
    price: null, currency: 'INR', tags: [], notes: '', favorite: false, status: 'wishlist',
  };
  await saveItem(payload);
  notify('Saved to Caramel Popcorn 🍿', payload.title);
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === 'CP_SAVE_ITEM') {
    saveItem(msg.payload).then((item) => {
      notify('Saved to Caramel Popcorn 🍿', item.title);
      sendResponse({ ok: true, item });
    });
    return true; // async
  }
  if (msg?.type === 'CP_OPEN_DASHBOARD') {
    chrome.tabs.create({ url: DASHBOARD_URL });
    sendResponse({ ok: true });
  }
});

async function saveItem(payload) {
  const item = {
    id: 'x' + Date.now() + Math.random().toString(36).slice(2,6),
    type: payload.type || 'product',
    title: payload.title || 'Untitled save',
    brand: payload.brand || '',
    category: payload.category || 'Beauty',
    subcategory: payload.subcategory || '',
    image: payload.image || '',
    price: payload.price ?? null,
    currency: payload.currency || 'INR',
    website: payload.website || '',
    url: payload.url || '',
    source: payload.source || 'manual',
    creator: payload.creator || '',
    caption: payload.caption || '',
    notes: payload.notes || '',
    priority: payload.priority || 'normal',
    tags: payload.tags || [],
    status: payload.status || 'wishlist',
    saveType: payload.saveType || 'just_browsing',
    favorite: !!payload.favorite,
    dateSaved: new Date().toISOString(),
    lastViewed: null,
    collection: payload.collection || null,
    // Look-specific
    aesthetic: payload.aesthetic || null,
    occasion:  payload.occasion  || null,
    items:     payload.items     || null,
    dominantColors: payload.dominantColors || null,
  };
  const { items = [] } = await chrome.storage.local.get('items');
  items.unshift(item);
  await chrome.storage.local.set({ items });
  return item;
}

function notify(title, message) {
  try {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('assets/icon128.png'),
      title, message, priority: 1,
    });
  } catch(_) {}
}
