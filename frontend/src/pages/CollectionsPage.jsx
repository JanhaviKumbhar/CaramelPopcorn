import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Plus } from 'lucide-react';

export default function CollectionsPage() {
  const { collections, addCollection } = useStore();
  const [name, setName] = useState('');

  return (
    <div className="cp-animate-in" data-testid="collections-page">
      <header className="mb-8 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-heading text-4xl md:text-5xl" style={{ color:'#2B1E16' }}>Collections</h1>
          <p className="text-base mt-2" style={{ color:'#5C4033' }}>Curate moodboards: Vacation, Old Money, Date Night…</p>
        </div>
        <div className="flex gap-2">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="New collection name"
            className="cp-input" style={{ minWidth:220, border:'1px solid #E8DFD8', padding:'0.55rem 0.85rem', borderRadius:'0.85rem' }}
            data-testid="new-collection-name"/>
          <button onClick={() => { if (name.trim()) { addCollection(name.trim(), 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80'); setName(''); }}}
            className="cp-btn-primary inline-flex items-center gap-1" data-testid="create-collection-btn">
            <Plus size={16}/> New
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collections.map((c) => (
          <article key={c.id} className="cp-card overflow-hidden" data-testid={`collection-${c.id}`}>
            <div className="aspect-[4/5] overflow-hidden" style={{ background:'#E8DFD8' }}>
              <img src={c.cover} alt={c.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-heading text-lg" style={{ color:'#2B1E16' }}>{c.name}</h3>
              <p className="text-xs mt-1" style={{ color:'#99857A' }}>{c.items} items</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
