import React, { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { Heart, ExternalLink } from 'lucide-react';
import { SAVE_TYPES } from '@/data/sampleData';

export default function InspirationPage() {
  const { items, toggleFavorite } = useStore();
  const list = useMemo(() => items.filter(i => i.type === 'inspiration' || i.type === 'look'), [items]);

  return (
    <div className="cp-animate-in" data-testid="inspiration-page">
      <header className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color:'#2B1E16' }}>Inspiration</h1>
        <p className="text-base mt-2" style={{ color:'#5C4033' }}>A moodboard of everything that caught your eye.</p>
      </header>

      <div className="cp-masonry columns-2 md:columns-3 lg:columns-4">
        {list.map((i) => {
          const st = SAVE_TYPES[i.saveType] || SAVE_TYPES.just_browsing;
          return (
            <article key={i.id} className="cp-card overflow-hidden relative inline-block w-full" data-testid={`inspo-${i.id}`}>
              <img src={i.image} alt={i.title} className="w-full object-cover" loading="lazy" />
              <button
                onClick={() => toggleFavorite(i.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center cp-glass"
                data-testid={`inspo-fav-${i.id}`}
              >
                <Heart size={16} fill={i.favorite ? '#B33F40' : 'transparent'} color={i.favorite ? '#B33F40' : '#5C4033'} />
              </button>
              <div className="p-4">
                <span className={`cp-chip ${st.class}`}><span>{st.emoji}</span><span>{st.label}</span></span>
                <h3 className="font-heading text-base mt-3" style={{ color:'#2B1E16' }}>{i.title}</h3>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span style={{ color:'#99857A' }}>{i.creator || i.source}</span>
                  {i.url && (
                    <a href={i.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline" style={{ color:'#8C6239' }}>
                      Open <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
