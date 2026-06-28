import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { SAVE_TYPES } from '@/data/sampleData';
import { useStore } from '@/store/useStore';

const formatINR = (n) => n ? `₹${Number(n).toLocaleString('en-IN')}` : '';

export default function ItemCard({ item }) {
  const { toggleFavorite } = useStore();
  const st = SAVE_TYPES[item.saveType] || SAVE_TYPES.just_browsing;

  return (
    <article className="cp-card relative" data-testid={`item-card-${item.id}`}>
      <div className="relative aspect-[4/5] overflow-hidden" style={{ background:'#F4E3D7' }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <span className={`cp-chip absolute top-3 left-3 ${st.class}`} data-testid={`item-savetype-${item.id}`}>
          <span>{st.emoji}</span><span>{st.label}</span>
        </span>
        <button
          onClick={() => toggleFavorite(item.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center cp-glass"
          aria-label="Toggle favorite"
          data-testid={`favorite-btn-${item.id}`}
        >
          <Heart size={16} fill={item.favorite ? '#B33F40' : 'transparent'} color={item.favorite ? '#B33F40' : '#5C4033'} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wider" style={{ color:'#99857A' }}>{item.brand || item.creator || item.source}</div>
            <h3 className="font-heading text-base leading-snug truncate" style={{ color:'#2B1E16' }} title={item.title}>
              {item.title}
            </h3>
          </div>
          {item.price ? (
            <div className="font-heading text-base whitespace-nowrap" style={{ color:'#C47C47' }} data-testid={`item-price-${item.id}`}>
              {formatINR(item.price)}
            </div>
          ) : null}
        </div>
        {item.notes ? (
          <p className="text-xs mt-2 italic" style={{ color:'#5C4033' }} data-testid={`item-notes-${item.id}`}>“{item.notes}”</p>
        ) : null}

        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-wrap gap-1">
            {(item.tags || []).slice(0,2).map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:'#F4E3D7', color:'#5C4033' }}>#{t}</span>
            ))}
          </div>
          {item.url ? (
            <a
              href={item.url} target="_blank" rel="noopener noreferrer"
              className="text-xs inline-flex items-center gap-1 hover:underline"
              style={{ color:'#8C6239' }}
              data-testid={`item-open-link-${item.id}`}
            >
              {item.website || 'Open'} <ExternalLink size={12} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
