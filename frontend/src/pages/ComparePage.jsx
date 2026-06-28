import React, { useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';

const fmt = (n) => n ? `₹${Number(n).toLocaleString('en-IN')}` : '—';

export default function ComparePage() {
  const { items } = useStore();
  const products = useMemo(() => items.filter(i => i.type === 'product'), [items]);
  const [selected, setSelected] = useState(products.slice(0, 3).map(p => p.id));

  const rows = products.filter(p => selected.includes(p.id));

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x!==id) : [...s, id]);

  return (
    <div className="cp-animate-in" data-testid="compare-page">
      <header className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color:'#2B1E16' }}>Compare</h1>
        <p className="text-base mt-2" style={{ color:'#5C4033' }}>Side by side decisions made easy.</p>
      </header>

      <div className="cp-card p-4 mb-6">
        <div className="text-xs uppercase tracking-wider mb-3" style={{ color:'#99857A' }}>Pick products to compare</div>
        <div className="flex flex-wrap gap-2">
          {products.map(p => (
            <button key={p.id} onClick={()=>toggle(p.id)} data-testid={`compare-toggle-${p.id}`}
              className="cp-chip" style={ selected.includes(p.id) ? { background:'#2B1E16', color:'#FCFAF8' } : { background:'#F4E3D7', color:'#5C4033' } }>
              {p.title.slice(0,28)}
            </button>
          ))}
        </div>
      </div>

      <div className="cp-card overflow-x-auto">
        <table className="w-full text-sm" data-testid="compare-table">
          <thead style={{ background:'#FCFAF8' }}>
            <tr>
              {['Product','Image','Brand','Price','Category','Website','Save type','Date','Notes'].map(h => (
                <th key={h} className="text-left font-medium px-4 py-3" style={{ color:'#5C4033' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p,idx) => (
              <tr key={p.id} className={idx % 2 ? '' : ''} style={{ borderTop:'1px solid #E8DFD8' }} data-testid={`compare-row-${p.id}`}>
                <td className="px-4 py-3 font-heading" style={{ color:'#2B1E16' }}>{p.title}</td>
                <td className="px-4 py-3"><img src={p.image} alt="" className="w-14 h-14 object-cover rounded-xl"/></td>
                <td className="px-4 py-3">{p.brand}</td>
                <td className="px-4 py-3" style={{ color:'#C47C47' }}>{fmt(p.price)}</td>
                <td className="px-4 py-3">{p.subcategory}</td>
                <td className="px-4 py-3">{p.website}</td>
                <td className="px-4 py-3">{p.saveType?.replace('_',' ')}</td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(p.dateSaved).toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3 italic" style={{ color:'#5C4033' }}>{p.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
