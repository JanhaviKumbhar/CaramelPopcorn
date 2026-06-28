import React from 'react';
import { Search, Plus, Download } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Topbar({ onAdd }) {
  const { filters, setFilter } = useStore();

  return (
    <header className="cp-glass sticky top-0 z-40 -mx-8 px-8 py-4 mb-8 border-b flex items-center gap-4" data-testid="app-topbar">
      <div className="flex-1 flex items-center gap-3 max-w-2xl">
        <div className="flex items-center gap-2 w-full rounded-2xl px-4 py-2.5 border" style={{ borderColor:'#E8DFD8', background:'#fff' }}>
          <Search size={18} color="#99857A" />
          <input
            data-testid="global-search-input"
            value={filters.q}
            onChange={(e) => setFilter('q', e.target.value)}
            placeholder="Search products, brands, looks, creators…"
            className="flex-1 bg-transparent outline-none text-sm font-body"
            style={{ color:'#2B1E16' }}
          />
          <kbd className="text-xs px-1.5 py-0.5 rounded border" style={{ borderColor:'#E8DFD8', color:'#99857A' }}>⌘K</kbd>
        </div>
      </div>
      <a
        href="/caramel-popcorn-extension.zip"
        download
        className="cp-btn-secondary hidden md:inline-flex items-center gap-2 text-sm"
        data-testid="topbar-download-extension-btn"
      >
        <Download size={16} /> Get Extension
      </a>
      <button onClick={onAdd} className="cp-btn-primary flex items-center gap-2 text-sm" data-testid="topbar-add-save-btn">
        <Plus size={16} /> Save something
      </button>
    </header>
  );
}
