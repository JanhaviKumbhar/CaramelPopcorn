# 🍿 Caramel Popcorn — AI Fashion & Beauty Inspiration

A premium Chrome Extension (Manifest V3) that turns every fashion & beauty inspiration you stumble upon — on Pinterest, Instagram, Nykaa, Myntra, AJIO, Amazon, Zara, H&M, Sephora, Tira, YouTube and more — into one cozy, searchable hub.

## ✨ Features

- **Universal Save Button** — A floating 🍿 button appears on supported pages with smart product/pin/reel extraction.
- **Right-click anywhere** — Save any link or image straight from the page context menu.
- **Beautiful Dashboard** — Wishlist, Inspiration moodboard, Looks (outfit breakdown), Collections, Compare, Reminders, Insights.
- **Save Types** with emoji badges: ❤️ Can't Stop Thinking · 🍿 FOMO · ✨ Manifesting · 🤷 Just Browsing.
- **Looks Tab (Signature Feature)** — When you save an outfit reel or pin, Caramel Popcorn decomposes it into Top / Bottom / Footwear / Bag / Accessory with dominant colors, aesthetic (Old Money, Clean Girl, Coquette…) and occasion (Brunch, Date Night, Vacation…).
- **Smart Search & Filters** — Across title, brand, category, website, creator, tags, notes.
- **Chrome Storage** — 100% local. Your data never leaves your device.
- **Sample seed data** — Open the dashboard and instantly see a populated experience.

## 🧱 Architecture

```
caramel-popcorn-extension/
├── manifest.json              # MV3 manifest
├── background/
│   └── service-worker.js      # Save handler, context menu, notifications
├── content-scripts/
│   ├── inject.js              # Floating button + site-aware extractors
│   └── inject.css             # Button + toast styles
├── popup/
│   ├── popup.html             # 380×560 popup
│   ├── popup.css
│   └── popup.js               # Search, recent saves, quick save current page
├── dashboard/
│   ├── dashboard.html         # Full-page dashboard (opens in a new tab)
│   ├── dashboard.css
│   └── dashboard.js
└── assets/                    # Icons (16/32/48/128)
```

## 🛠 Install (Developer Mode)

1. Unzip `caramel-popcorn-extension.zip`.
2. Open `chrome://extensions/` in Chrome (or Edge / Brave / Arc).
3. Toggle **Developer mode** (top right).
4. Click **Load unpacked** and choose the unzipped folder.
5. Pin the extension to your toolbar. Visit Nykaa, Pinterest, or Instagram — you'll see the floating 🍿 button.

## 🧪 Try the experience instantly

Open `dashboard/dashboard.html` after loading — the dashboard reads from `chrome.storage.local`. Save a few items from any supported site and watch them appear in real time.

> The web preview at `https://<your-app>.preview.emergentagent.com` shows the same dashboard powered by `localStorage` and pre-seeded with realistic sample data.

## 🌐 Supported Sites (extraction)

| Site | Extracts |
|------|----------|
| Amazon | Title, brand, price, image |
| Nykaa | Title, brand, price, image |
| Myntra | Brand, title, price, image |
| AJIO | Brand, title, price, image |
| Zara | Title, price, image |
| H&M | Title, price, image |
| Sephora | Title, brand, price, image |
| Tira | Title, price, image |
| Pinterest | Pin image, description, creator |
| Instagram | Reel URL, creator, caption, thumbnail (public posts only) |
| YouTube | Title, creator, thumbnail |

> Privacy note: The extension never scrapes private saved collections. It only reads from the currently open page.

## 🤖 AI Features (current build)

Auto-categorisation, brand detection, look decomposition and aesthetic tagging are powered by a **rule-based stub** (`services/aiStub.js`-equivalent inside the content script). The architecture is built to swap in:

- **Gemini 3 Flash / GPT-5.2** for OCR & vision (screenshots, multi-item detection)
- **Need-vs-Want prediction** based on save behaviour
- **Price tracking / history**
- **Duplicate detection & Wardrobe matching**
- **Outfit recommendations + budget planning**

## 🔭 Future-Ready Hooks

The schema and storage layout are already aligned for Firebase / Supabase sync, push notifications, and authentication. Just drop in your provider.

## 💛 Credits

Built with love for women who keep finding beautiful things on the internet — and want a cozy home for all of them.
