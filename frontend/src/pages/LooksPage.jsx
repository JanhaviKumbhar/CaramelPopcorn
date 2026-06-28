import React from 'react';
import { useStore } from '@/store/useStore';

export default function LooksPage() {
  const { items } = useStore();
  const looks = items.filter(i => i.type === 'look');

  return (
    <div className="cp-animate-in" data-testid="looks-page">
      <header className="mb-8">
        <div className="flex items-center gap-2">
          <span className="cp-chip" style={{ background:'#2B1E16', color:'#FCFAF8' }}>✨ Signature</span>
          <span className="text-xs uppercase tracking-wider" style={{ color:'#99857A' }}>Outfit decoded</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl mt-3" style={{ color:'#2B1E16' }}>Looks</h1>
        <p className="text-base mt-2 max-w-xl" style={{ color:'#5C4033' }}>
          When you save a reel or a pin that's a full outfit, Caramel Popcorn breaks it down item by item — top, bottom, footwear, bag, accessory, dominant colors, and the aesthetic it fits.
        </p>
      </header>

      {looks.length === 0 ? (
        <div className="cp-card p-12 text-center"><p>No looks saved yet.</p></div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {looks.map((l) => (
            <article key={l.id} className="cp-card overflow-hidden" data-testid={`look-card-${l.id}`}>
              <div className="grid md:grid-cols-2">
                <div className="aspect-[3/4] md:aspect-auto md:h-full overflow-hidden" style={{ background:'#E8DFD8' }}>
                  <img src={l.image} alt={l.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="cp-chip" style={{ background:'#F4E3D7', color:'#5C4033' }}>{l.aesthetic}</span>
                    <span className="cp-chip" style={{ background:'#FCEAEA', color:'#B33F40' }}>{l.occasion}</span>
                  </div>
                  <h3 className="font-heading text-2xl" style={{ color:'#2B1E16' }}>{l.title}</h3>
                  <p className="text-xs mt-1" style={{ color:'#99857A' }}>via {l.creator || l.source}</p>

                  <div className="mt-4">
                    <div className="text-xs uppercase tracking-wider mb-2" style={{ color:'#99857A' }}>Dominant palette</div>
                    <div className="flex gap-2">
                      {(l.dominantColors||[]).map((c,idx) => (
                        <div key={idx} className="w-7 h-7 rounded-full border" style={{ background:c, borderColor:'#E8DFD8' }} title={c} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs uppercase tracking-wider mb-2" style={{ color:'#99857A' }}>Decoded items</div>
                    <ul className="space-y-2">
                      {(l.items||[]).map((it, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm" data-testid={`look-item-${l.id}-${idx}`}>
                          <span className="w-3 h-3 rounded-full border" style={{ background:it.color, borderColor:'#E8DFD8' }} />
                          <span className="font-medium w-20" style={{ color:'#5C4033' }}>{it.kind}</span>
                          <span style={{ color:'#2B1E16' }}>{it.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {l.notes && <p className="mt-4 text-sm italic" style={{ color:'#5C4033' }}>“{l.notes}”</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
