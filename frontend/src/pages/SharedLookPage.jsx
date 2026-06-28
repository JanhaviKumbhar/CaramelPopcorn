import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Sparkles, ArrowLeft, Bookmark } from 'lucide-react';
import { decodeShare } from '@/utils/share';
import { useStore } from '@/store/useStore';

function readHashData() {
  const hash = window.location.hash || '';
  const m = hash.match(/data=([^&]+)/);
  return m ? decodeShare(decodeURIComponent(m[1])) : null;
}

export default function SharedLookPage() {
  const [look, setLook] = useState(() => readHashData());
  const { addItem } = useStore();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const onHash = () => setLook(readHashData());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const valid = useMemo(() => !!(look && look.title), [look]);

  const saveToMine = () => {
    if (!look) return;
    addItem({
      type: 'look',
      title: look.title,
      image: look.image,
      creator: look.creator || '',
      aesthetic: look.aesthetic, occasion: look.occasion,
      dominantColors: look.dominantColors || [],
      items: look.items || [],
      saveType: 'cant_stop_thinking',
      source: 'shared',
      url: window.location.href,
      notes: look.notes || '',
      status: 'inspiration',
      favorite: false,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  if (!valid) {
    return (
      <div className="min-h-screen grid place-items-center p-6" style={{ background: '#FCFAF8' }} data-testid="shared-look-invalid">
        <div className="cp-card max-w-md text-center p-10">
          <div className="text-5xl mb-3">🍿</div>
          <h1 className="font-heading text-2xl" style={{ color: '#2B1E16' }}>This share link looks empty</h1>
          <p className="text-sm mt-2" style={{ color: '#5C4033' }}>
            The link may have been copied incorrectly. Ask your friend to share it again.
          </p>
          <Link to="/" className="cp-btn-primary inline-flex items-center gap-2 mt-5" data-testid="shared-look-home">
            <ArrowLeft size={14} /> Open Caramel Popcorn
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#FCFAF8' }} data-testid="shared-look-page">
      {/* Header */}
      <header className="cp-glass sticky top-0 z-30 border-b" style={{ borderColor: '#E8DFD8' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl grid place-items-center" style={{ background: '#C47C47' }}>
              <span className="text-lg">🍿</span>
            </div>
            <div className="leading-none">
              <div className="font-heading text-base font-semibold" style={{ color: '#2B1E16' }}>Caramel</div>
              <div className="font-heading text-base italic" style={{ color: '#8C6239' }}>Popcorn</div>
            </div>
          </div>
          <div className="hidden md:block text-xs ml-3" style={{ color: '#99857A' }}>
            Outfit decoded · Read-only share
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a href="/caramel-popcorn-extension.zip" download className="cp-btn-secondary text-sm hidden md:inline-flex items-center gap-1" data-testid="shared-install-btn">
              <Download size={14} /> Get the extension
            </a>
            <Link to="/" className="cp-btn-primary text-sm inline-flex items-center gap-1" data-testid="shared-open-app">
              Open app <Sparkles size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="cp-card overflow-hidden cp-animate-in">
          <div className="grid md:grid-cols-2">
            <div className="aspect-[3/4] md:aspect-auto md:min-h-[560px] overflow-hidden" style={{ background: '#E8DFD8' }}>
              {look.image
                ? <img src={look.image} alt={look.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full grid place-items-center text-6xl">🍿</div>}
            </div>

            <div className="p-8 md:p-10">
              <div className="flex flex-wrap gap-2 mb-3">
                {look.aesthetic && <span className="cp-chip" style={{ background: '#F4E3D7', color: '#5C4033' }} data-testid="shared-aesthetic">{look.aesthetic}</span>}
                {look.occasion  && <span className="cp-chip" style={{ background: '#FCEAEA', color: '#B33F40' }} data-testid="shared-occasion">{look.occasion}</span>}
              </div>

              <h1 className="font-heading text-3xl md:text-4xl leading-tight" style={{ color: '#2B1E16' }} data-testid="shared-title">
                {look.title}
              </h1>
              {look.creator && (
                <p className="text-sm mt-1" style={{ color: '#99857A' }}>via {look.creator}</p>
              )}

              {look.dominantColors?.length > 0 && (
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#99857A' }}>Dominant palette</div>
                  <div className="flex gap-2" data-testid="shared-palette">
                    {look.dominantColors.map((c, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border" style={{ background: c, borderColor: '#E8DFD8' }} title={c} />
                    ))}
                  </div>
                </div>
              )}

              {look.items?.length > 0 && (
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#99857A' }}>Decoded items</div>
                  <ul className="space-y-2.5">
                    {look.items.map((it, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm" data-testid={`shared-item-${i}`}>
                        <span className="w-3.5 h-3.5 rounded-full border flex-shrink-0" style={{ background: it.color, borderColor: '#E8DFD8' }} />
                        <span className="font-medium w-24 flex-shrink-0" style={{ color: '#5C4033' }}>{it.kind}</span>
                        <span style={{ color: '#2B1E16' }}>{it.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {look.notes && (
                <p className="mt-6 text-sm italic" style={{ color: '#5C4033' }} data-testid="shared-notes">“{look.notes}”</p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={saveToMine} className="cp-btn-primary inline-flex items-center gap-2" data-testid="shared-save-btn">
                  <Bookmark size={16} /> {saved ? 'Saved to your looks ✓' : 'Save to my looks'}
                </button>
                <Link to="/looks" className="cp-btn-secondary inline-flex items-center gap-2" data-testid="shared-browse-btn">
                  Browse more looks <Sparkles size={14} />
                </Link>
              </div>

              <p className="text-[11px] mt-6 leading-relaxed" style={{ color: '#99857A' }}>
                This look was shared via a URL-encoded link. Nothing is stored on a server.
              </p>
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <section className="mt-10 cp-card p-8 md:p-10 cp-grain relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#F4E3D7 0%, #FCFAF8 100%)' }} data-testid="shared-cta-strip">
          <div className="relative z-10 max-w-2xl">
            <div className="cp-chip inline-flex mb-3" style={{ background: '#fff', color: '#5C4033' }}>
              <Sparkles size={14} color="#C47C47" /> Built for fashion & beauty obsessives
            </div>
            <h2 className="font-heading text-2xl md:text-4xl" style={{ color: '#2B1E16' }}>
              Save your own finds. Decode them. <em style={{ color: '#8C6239' }}>Share them like this one.</em>
            </h2>
            <p className="text-sm md:text-base mt-3" style={{ color: '#5C4033' }}>
              Caramel Popcorn turns every inspiration you see on Pinterest, Instagram, Nykaa, Myntra and 8+ stores into a cozy, searchable home.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <a href="/caramel-popcorn-extension.zip" download className="cp-btn-primary inline-flex items-center gap-2" data-testid="shared-cta-install">
                <Download size={16} /> Install Chrome Extension
              </a>
              <Link to="/" className="cp-btn-secondary" data-testid="shared-cta-open">Try the dashboard</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
