import React, { useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';
import ItemCard from '@/components/ItemCard';
import { SAVE_TYPES } from '@/data/sampleData';

export default function WishlistPage() {
  const { items, filters, setFilter } = useStore();
  const [sort, setSort] = useState('recent');

  const products = useMemo(() => items.filter(i => i.type === 'product'), [items]);

  const filtered = useMemo(() => {
    let list = products;
    if (filters.q) {
      const q = filters.q.toLowerCase();
      list = list.filter(i => [i.title,i.brand,i.notes,i.website, ...(i.tags||[])].join(' ').toLowerCase().includes(q));
    }
    if (filters.saveType !== 'All') list = list.filter(i => i.saveType === filters.saveType);
    if (filters.category !== 'All') list = list.filter(i => i.category === filters.category);
    if (sort === 'price-asc')  list = [...list].sort((a,b) => (a.price||0) - (b.price||0));
    if (sort === 'price-desc') list = [...list].sort((a,b) => (b.price||0) - (a.price||0));
    if (sort === 'recent')     list = [...list].sort((a,b) => new Date(b.dateSaved) - new Date(a.dateSaved));
    return list;
  }, [products, filters, sort]);

  return (
    <div className="cp-animate-in" data-testid="wishlist-page">
      <header className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color:'#2B1E16' }}>Wishlist</h1>
        <p className="text-base mt-2 max-w-xl" style={{ color:'#5C4033' }}>
          Every product you've crushed on, sorted to your taste.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <FilterChip active={filters.saveType==='All'} onClick={()=>setFilter('saveType','All')} testid="filter-all">All ({products.length})</FilterChip>
        {Object.entries(SAVE_TYPES).map(([k, v]) => (
          <FilterChip key={k} active={filters.saveType===k} onClick={()=>setFilter('saveType',k)} testid={`filter-savetype-${k}`}>
            <span>{v.emoji}</span> {v.label}
          </FilterChip>
        ))}
        <div className="ml-auto flex gap-2">
          <select value={filters.category} onChange={e=>setFilter('category', e.target.value)} className="cp-chip" style={{ background:'#fff', border:'1px solid #E8DFD8' }} data-testid="filter-category-select">
            <option value="All">All categories</option>
            <option>Beauty</option><option>Fashion</option>
          </select>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="cp-chip" style={{ background:'#fff', border:'1px solid #E8DFD8' }} data-testid="sort-select">
            <option value="recent">Recently saved</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState onAction={()=>setFilter('saveType','All')} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(i => <ItemCard key={i.id} item={i} />)}
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children, testid }) {
  return (
    <button onClick={onClick} data-testid={testid}
      className="cp-chip" style={ active ? { background:'#2B1E16', color:'#FCFAF8' } : { background:'#F4E3D7', color:'#5C4033' } }>
      {children}
    </button>
  );
}

function EmptyState({ onAction }) {
  return (
    <div className="cp-card p-12 text-center" data-testid="wishlist-empty">
      <div className="text-5xl mb-4">🍿</div>
      <h3 className="font-heading text-2xl" style={{ color:'#2B1E16' }}>Your wishlist is waiting for its first crush.</h3>
      <p className="text-sm mt-2" style={{ color:'#5C4033' }}>Save something from Pinterest, Instagram or any of your favorite stores.</p>
      <button onClick={onAction} className="cp-btn-primary mt-5" data-testid="wishlist-empty-cta">Show me all</button>
    </div>
  );
}
