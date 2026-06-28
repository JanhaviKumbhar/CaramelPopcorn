import React from 'react';
import { CATEGORY_TREE } from '@/data/sampleData';
import { useStore } from '@/store/useStore';

export default function CategoriesPage() {
  const { items, setFilter } = useStore();
  const count = (cat, sub) => items.filter(i => i.category === cat && (!sub || i.subcategory === sub)).length;

  return (
    <div className="cp-animate-in" data-testid="categories-page">
      <header className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color:'#2B1E16' }}>Categories</h1>
        <p className="text-base mt-2" style={{ color:'#5C4033' }}>Browse by what you save the most.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(CATEGORY_TREE).map(([cat, subs]) => (
          <section key={cat} className="cp-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl" style={{ color:'#2B1E16' }}>{cat}</h2>
              <span className="text-sm" style={{ color:'#99857A' }}>{count(cat)} saves</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(subs).map((sub) => (
                <button key={sub} onClick={() => setFilter('category', cat)} data-testid={`cat-${cat}-${sub}`}
                  className="cp-chip" style={{ background:'#F4E3D7', color:'#5C4033' }}>
                  {sub} <span style={{ opacity:.6 }}>({count(cat, sub)})</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
