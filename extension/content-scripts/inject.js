// Caramel Popcorn — Universal content script
// Adds a floating "🍿 Save to Caramel Popcorn" button on supported pages and
// extracts product / pin / reel / video info using site-aware heuristics.

(function () {
  if (window.__caramelPopcornInjected) return;
  window.__caramelPopcornInjected = true;

  const host = location.hostname.replace(/^www\./, '');

  function $(sel, root = document) { return root.querySelector(sel); }
  function text(el) { return (el?.textContent || '').trim(); }
  function meta(name) {
    return document.querySelector(`meta[property="${name}"]`)?.content
        || document.querySelector(`meta[name="${name}"]`)?.content
        || '';
  }

  function parsePriceINR(raw) {
    if (!raw) return null;
    const m = String(raw).replace(/,/g,'').match(/(\d{2,7}(?:\.\d{1,2})?)/);
    return m ? Number(m[1]) : null;
  }

  function extract() {
    const og = {
      title: meta('og:title') || document.title,
      image: meta('og:image'),
      url:   meta('og:url') || location.href,
      site:  meta('og:site_name') || host,
    };

    const base = {
      url: og.url, image: og.image, source: 'shopping',
      website: og.site, currency: 'INR',
      title: og.title, brand: '', price: null,
      type: 'product', saveType: 'cant_stop_thinking',
      category: 'Beauty', subcategory: '',
    };

    if (host.includes('amazon')) {
      base.title  = text($('#productTitle')) || og.title;
      base.brand  = text($('#bylineInfo'))?.replace(/^Visit the\s*/i,'').replace(/\s*Store$/i,'') || '';
      base.price  = parsePriceINR(text($('.a-price .a-offscreen')));
      base.image  = $('#imgTagWrapperId img')?.src || $('#landingImage')?.src || og.image;
      base.website = 'Amazon';
    } else if (host.includes('nykaa')) {
      base.title  = text($('.product-title, h1')) || og.title;
      base.brand  = text($('.product-title__brand-name, .brand-name')) || '';
      base.price  = parsePriceINR(text($('.product-price .css-1jczs19, .product-price, .pdp-price')));
      base.image  = $('.css-1vyou25 img, img.product-img')?.src || og.image;
      base.website = 'Nykaa';
      base.category = /makeup|lip|foundation|blush|mascara/i.test(base.title) ? 'Beauty' : 'Beauty';
    } else if (host.includes('myntra')) {
      base.brand  = text($('.pdp-title')) || '';
      base.title  = text($('.pdp-name')) || og.title;
      base.price  = parsePriceINR(text($('.pdp-price strong')));
      base.image  = $('.image-grid-image')?.style?.backgroundImage?.match(/url\("?(.+?)"?\)/)?.[1] || og.image;
      base.website = 'Myntra';
      base.category = 'Fashion';
    } else if (host.includes('ajio')) {
      base.brand  = text($('.prod-brand')) || '';
      base.title  = text($('.prod-name')) || og.title;
      base.price  = parsePriceINR(text($('.prod-sp')));
      base.image  = $('img.img-resp')?.src || og.image;
      base.website = 'AJIO';
      base.category = 'Fashion';
    } else if (host.includes('zara')) {
      base.title  = text($('h1.product-detail-info__header-name')) || og.title;
      base.price  = parsePriceINR(text($('.money-amount__main')));
      base.image  = $('picture img')?.src || og.image;
      base.brand  = 'Zara'; base.website = 'Zara'; base.category = 'Fashion';
    } else if (host.includes('hm.com') || host.includes('www2.hm.com')) {
      base.title  = text($('h1')) || og.title;
      base.price  = parsePriceINR(text($('span[class*="price"]')));
      base.image  = $('main img')?.src || og.image;
      base.brand  = 'H&M'; base.website = 'H&M'; base.category = 'Fashion';
    } else if (host.includes('sephora')) {
      base.title  = text($('[data-at="product_name"], h1')) || og.title;
      base.brand  = text($('[data-at="brand_name"]')) || '';
      base.price  = parsePriceINR(text($('[data-comp="Price "] b, .css-0 b')));
      base.image  = $('main img')?.src || og.image;
      base.website = 'Sephora'; base.category = 'Beauty';
    } else if (host.includes('tirabeauty')) {
      base.title  = text($('h1, .product-title')) || og.title;
      base.price  = parsePriceINR(text($('.product-price, .price')));
      base.image  = $('main img')?.src || og.image;
      base.website = 'Tira'; base.category = 'Beauty';
    } else if (host.includes('pinterest')) {
      base.title  = text($('h1')) || og.title;
      base.image  = $('img[srcset]')?.src || og.image;
      base.creator= text($('a[href*="/"][data-test-id*="creator"]')) || '';
      base.source = 'pinterest'; base.website = 'Pinterest'; base.type = 'inspiration';
    } else if (host.includes('instagram')) {
      base.title  = og.title || 'Instagram Reel';
      base.image  = og.image;
      base.creator= location.pathname.split('/').filter(Boolean)[0] || '';
      base.caption= meta('og:description');
      base.source = 'instagram'; base.website = 'Instagram'; base.type = 'inspiration';
    } else if (host.includes('youtube')) {
      base.title  = text($('h1.title, h1.ytd-watch-metadata')) || og.title;
      base.creator= text($('#owner #channel-name a, ytd-channel-name a')) || '';
      base.image  = og.image || `https://i.ytimg.com/vi/${new URL(location.href).searchParams.get('v')}/maxresdefault.jpg`;
      base.source = 'youtube'; base.website = 'YouTube'; base.type = 'inspiration';
    }

    return base;
  }

  function mountButton() {
    if (document.getElementById('cp-fab')) return;
    const btn = document.createElement('button');
    btn.id = 'cp-fab';
    btn.setAttribute('aria-label', 'Save to Caramel Popcorn');
    btn.innerHTML = `<span class="cp-emoji">🍿</span><span class="cp-label">Save to Caramel Popcorn</span>`;
    document.body.appendChild(btn);

    btn.addEventListener('click', async () => {
      const payload = extract();
      btn.classList.add('cp-saving');
      try {
        await chrome.runtime.sendMessage({ type: 'CP_SAVE_ITEM', payload });
        flash('Saved 🍿');
      } catch (e) {
        flash('Could not save');
      } finally {
        btn.classList.remove('cp-saving');
      }
    });
  }

  function flash(msg) {
    const t = document.createElement('div');
    t.className = 'cp-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  }

  // SPA navigation re-check for Instagram / Pinterest / YouTube
  let lastUrl = location.href;
  new MutationObserver(() => {
    if (location.href !== lastUrl) { lastUrl = location.href; setTimeout(mountButton, 600); }
  }).observe(document.body, { childList: true, subtree: true });

  mountButton();
})();
