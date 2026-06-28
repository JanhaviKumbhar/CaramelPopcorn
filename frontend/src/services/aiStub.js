// Caramel Popcorn — rule-based mock for AI features.
// Mirrored 1:1 inside the Chrome extension as well (services/aiStub.js).
// Easy to swap with a real LLM call later.

const BRANDS = [
  'Rare Beauty','Charlotte Tilbury','Laneige','Rhode','Glossier','Nykaa','Maybelline','MAC','Dior','Chanel',
  'Coach','Polène','Zara','H&M','Mango','AJIO','Adidas','Nike','New Balance','Uniqlo','COS','Massimo Dutti'
];

const KEYWORDS = {
  Beauty: {
    Lipstick: ['lipstick','lip color','matte lip','lip tint'],
    Foundation: ['foundation','complexion'],
    Blush: ['blush','cheek tint','soft pinch'],
    Concealer: ['concealer'],
    Mascara: ['mascara'],
    Cleanser: ['cleanser','face wash'],
    Serum: ['serum','vitamin c','retinol','peptide'],
    Moisturizer: ['moisturizer','cream'],
    Sunscreen: ['sunscreen','spf'],
    'Lip Mask': ['lip mask','lip sleeping mask'],
  },
  Fashion: {
    Dresses: ['dress'],
    Tops: ['top','blouse','tee','t-shirt','tank'],
    Shirts: ['shirt','button-up','linen shirt'],
    Jeans: ['jeans','denim'],
    Pants: ['trouser','pants','chinos'],
    Skirts: ['skirt','mini skirt','midi skirt'],
    Sneakers: ['sneaker','air force','samba','dunk','new balance','nike','adidas'],
    Heels: ['heel','pump','stiletto','slingback'],
    Flats: ['flat','ballet','loafer','mary jane'],
    Tote: ['tote','bag tote'],
    'Shoulder Bag': ['shoulder bag','tabby','baguette'],
    Crossbody: ['crossbody','sling bag'],
    Mini: ['mini bag'],
    Earrings: ['earring','huggie'],
    Necklace: ['necklace','chain'],
    Rings: ['ring','signet'],
    Sunglasses: ['sunglass','shades'],
  },
};

const SITE_BRAND = {
  'nykaa.com':'Nykaa','myntra.com':'Myntra','ajio.com':'AJIO','amazon.in':'Amazon',
  'zara.com':'Zara','hm.com':'H&M','sephora.com':'Sephora','tirabeauty.com':'Tira',
  'rhodeskin.com':'Rhode','rarebeauty.com':'Rare Beauty','coach.com':'Coach','polene-paris.com':'Polène',
  'nike.com':'Nike','adidas.com':'Adidas','cosstores.com':'COS','pinterest.com':'Pinterest',
  'instagram.com':'Instagram','youtube.com':'YouTube'
};

export function detectBrand(text) {
  const t = (text || '').toLowerCase();
  return BRANDS.find(b => t.includes(b.toLowerCase()));
}

export function detectCategory(text) {
  const t = (text || '').toLowerCase();
  for (const [cat, subs] of Object.entries(KEYWORDS)) {
    for (const [sub, kws] of Object.entries(subs)) {
      if (kws.some(k => t.includes(k))) return { category: cat, subcategory: sub };
    }
  }
  return null;
}

export function detectFromUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./,'');
    const brand = SITE_BRAND[host] || null;
    const fromPath = detectCategory(u.pathname.replace(/[-_/]/g,' '));
    return { brand, ...(fromPath || {}) };
  } catch { return null; }
}

export function detectFromText(text) {
  const brand = detectBrand(text);
  const cat = detectCategory(text);
  return { brand, ...(cat || {}) };
}

// Look / outfit detection from caption or tags
const AESTHETIC_KW = {
  'Old Money':   ['old money','quiet luxury','preppy','timeless','heritage'],
  'Clean Girl':  ['clean girl','slicked back','no makeup makeup','minimal'],
  'Coquette':    ['coquette','bow','ribbon','soft girl','pink'],
  'Minimalist':  ['minimal','monochrome','neutral'],
  'Streetwear':  ['streetwear','baggy','cargo','oversized'],
  'Y2K':         ['y2k','low rise','butterfly'],
};
const OCCASION_KW = {
  Office:    ['office','workwear','meeting','business'],
  Brunch:    ['brunch'],
  Vacation:  ['vacation','holiday','beach','goa'],
  Wedding:   ['wedding','reception'],
  Party:     ['party','clubwear','night out'],
  'Date Night':['date','dinner','romantic'],
  'Coffee Run':['coffee','errand','running errands'],
};

export function detectLook(text) {
  const t = (text || '').toLowerCase();
  let aesthetic, occasion;
  for (const [k, kws] of Object.entries(AESTHETIC_KW)) if (kws.some(w => t.includes(w))) { aesthetic = k; break; }
  for (const [k, kws] of Object.entries(OCCASION_KW))  if (kws.some(w => t.includes(w))) { occasion = k; break; }
  // Detect if multi-item outfit
  const isLook = /\b(outfit|ootd|look|fit|styling)\b/.test(t);
  return { isLook, aesthetic, occasion };
}
