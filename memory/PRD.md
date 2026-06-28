# Caramel Popcorn — PRD

## Original Problem Statement
Build "Caramel Popcorn" — an AI-powered Chrome Extension (Manifest V3) that becomes the single home for every fashion & beauty inspiration a woman (18–35) saves across Pinterest, Instagram Reels, YouTube, Amazon, Nykaa, Myntra, AJIO, Zara, H&M, Sephora, Tira, screenshots, and manual links. Premium feminine UI with warm cream/beige/caramel palette inspired by Apple, Pinterest, Notion, Glossier, Rhode, Rare Beauty. Categories: Makeup, Skincare, Clothes, Bags, Footwear, Accessories. Signature "Looks" tab decomposes outfit reels/pins into Top/Bottom/Footwear/Bag/Accessories with dominant colors, aesthetic, and occasion.

## User Choices (Confirmed)
- **Scope:** Full MVP — Manifest V3 + popup + dashboard + content scripts + sample data + storage + UI
- **AI:** Mock with realistic rule-based stubs (no LLM cost)
- **Storage:** Chrome Storage only (no backend)
- **Currency:** INR ₹
- **Deliverable:** Browseable dashboard preview URL + downloadable extension zip

## User Personas
- **Aanya, 24, Bengaluru** — Discovers products on Instagram Reels & Pinterest; loses track in saved folders.
- **Ria, 31, Mumbai** — Saves Amazon/Nykaa/Myntra products to "wait for sale"; wants reminders.
- **Mehek, 28, Delhi** — Curates outfit looks (Old Money, Coquette); wants outfit decomposition + collections.

## Architecture
```
/app/frontend/                # React (CRA + craco) web dashboard preview
  src/
    App.js                    # Router (10 routes)
    components/               # Sidebar, Topbar, ItemCard, AddItemModal, AppLayout
    pages/                    # Dashboard, Wishlist, Inspiration, Looks, Categories,
                              #   Collections, Compare, Reminders, Insights, Settings
    store/useStore.js         # React Context + localStorage (mirrors chrome.storage.local)
    data/sampleData.js        # 10 products + 2 inspirations + 3 looks + 8 collections
    services/aiStub.js        # Rule-based brand/category/look detection
  public/caramel-popcorn-extension.zip  # downloadable extension

/app/extension/               # Production Chrome MV3 extension
  manifest.json
  background/service-worker.js   # Save handler, context menu, notifications
  content-scripts/inject.{js,css}# Floating 🍿 button + site-aware extractors
  popup/popup.{html,css,js}      # 380×560 popup: search, recent, quick-save
  dashboard/dashboard.{html,css,js} # In-extension dashboard view
  assets/icon{16,32,48,128}.png
  README.md
```

## Core Requirements (Static)
- **Save Types** with emoji badges (Can't Stop Thinking ❤️, FOMO 🍿, Manifesting ✨, Just Browsing 🤷)
- Auto-categorisation (Beauty/Fashion + subcategories)
- 11 supported sites with site-aware extractors
- Looks (outfit decomposition + aesthetic + occasion)
- Collections, Wishlist, Inspiration moodboard
- Compare, Insights (charts), Reminders, Settings (export JSON)
- INR currency, warm caramel design system (Playfair Display + Manrope)
- 100% data-testid coverage on interactive elements

## What's Been Implemented — 2026-06-28
- Full Chrome MV3 extension package (~20 KB, 20 files) — popup, content scripts, background worker, dashboard, MV3 manifest, custom PNG icons, context-menu save, notifications.
- React web dashboard preview with 10 routes (Dashboard, Wishlist, Inspiration, Looks, Categories, Collections, Compare, Reminders, Insights, Settings).
- Looks signature feature: outfit cards with itemized Top/Bottom/Footwear/Bag/Accessory + dominant color palette + aesthetic/occasion chips.
- Rule-based AI stubs for brand/category/look detection (swappable for Gemini/GPT-5.2 later).
- Insights with Recharts (Top brands bar, Categories pie, Monthly activity bar).
- Add modal with URL/Image/Manual tabs + "Detect" auto-fill.
- Sample data (10 products, 2 inspirations, 3 looks, 8 collections, 3 reminders).
- Downloadable zip wired to `/caramel-popcorn-extension.zip` from Settings + Topbar + Dashboard hero.
- Tested end-to-end by testing agent: **100% pass on all 11 feature flows, 0 console errors**.

## Iteration 2 — 2026-06-28 — "Share this Look" (no backend)
- New `/share/look#data=<base64>` public read-only route that decodes outfit data directly from the URL hash — no server needed, privacy-friendly.
- `ShareLookButton` component renders on every look card with native Web Share API + clipboard fallback + WhatsApp/Twitter/Email quick-share chips.
- `SharedLookPage` renders a beautiful read-only outfit page: image, title, aesthetic + occasion, dominant palette, decoded items, "Save to my looks" CTA, install-extension CTA, invalid-state handling.
- Testing agent iteration 2: **100% pass on all 11 share-flow tests, 0 console errors**.

## Prioritized Backlog
### P0 (none — MVP complete)

### P1 (Next session)
- Real AI: swap `aiStub.js` for Gemini 3 Flash (vision + OCR) for screenshot/multi-product detection
- Drag-and-drop screenshot upload component (UI already designed)
- Reminder notifications via `chrome.alarms` API in service worker
- Wardrobe matching: detect duplicates against existing saves

### P2 (Future)
- Firebase/Supabase sync + auth
- Price tracking & history (background fetcher)
- Outfit recommendations from saved wardrobe
- Cross-site comparison (same product across stores)
- Budget planning + skin tone recommendations
- Push notifications for sale alerts

## Next Action Items
- User loads extension via Chrome → tests floating 🍿 button on Nykaa/Pinterest.
- Decide if/when to upgrade AI stubs to real Gemini 3 Flash (Universal Key supported).
