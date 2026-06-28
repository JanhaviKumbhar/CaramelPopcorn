import React, { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { useOutletContext, Link } from 'react-router-dom';
import { Heart, TrendingUp, Sparkles, IndianRupee, ChevronRight } from 'lucide-react';
import ItemCard from '@/components/ItemCard';
import { SAVE_TYPES } from '@/data/sampleData';

const fmt = (n) => `₹${Number(n||0).toLocaleString('en-IN')}`;

export default function DashboardPage() {
  const { items, reminders } = useStore();
  const { openAdd } = useOutletContext();

  const stats = useMemo(() => {
    const products = items.filter(i => i.type === 'product');
    const total = products.length;
    const favorites = products.filter(i => i.favorite).length;
    const wishlistValue = products.reduce((s, i) => s + (i.price || 0), 0);
    const byCategory = products.reduce((acc, i) => {
      const k = i.subcategory || i.category || 'Other';
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
    const topCategory = Object.entries(byCategory).sort((a,b) => b[1]-a[1])[0]?.[0] || '—';
    return { total, favorites, wishlistValue, topCategory };
  }, [items]);

  const recent = useMemo(() => [...items].sort((a,b) => new Date(b.dateSaved) - new Date(a.dateSaved)).slice(0, 8), [items]);
  const inspirationRecent = useMemo(() => items.filter(i => i.type !== 'product').slice(0, 4), [items]);
  const looks = useMemo(() => items.filter(i => i.type === 'look').slice(0, 3), [items]);

  return (
    <div className="space-y-12 cp-animate-in" data-testid="dashboard-page">
      {/* Hero */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 cp-card relative overflow-hidden cp-grain" style={{ background:'linear-gradient(135deg,#F4E3D7 0%, #FCFAF8 100%)' }}>
          <div className="p-8 md:p-10 relative z-10">
            <div className="inline-flex items-center gap-2 cp-chip mb-4" style={{ background:'#fff', color:'#5C4033' }}>
              <Sparkles size={14} color="#C47C47" /> Your inspiration hub
            </div>
            <h1 className="font-heading text-3xl md:text-5xl leading-tight" style={{ color:'#2B1E16' }}>
              Hi there. <em className="italic" style={{ color:'#8C6239' }}>Everything you've loved</em>,<br/>
              finally in one cozy place.
            </h1>
            <p className="mt-4 text-base max-w-xl" style={{ color:'#5C4033' }}>
              Save products from Instagram, Pinterest, Nykaa, Myntra and 8+ more stores — Caramel Popcorn
              auto-categorises, detects outfits, and tells you which finds you keep coming back to.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={openAdd} className="cp-btn-primary" data-testid="hero-add-btn">Save your first find</button>
              <a href="/caramel-popcorn-extension.zip" download className="cp-btn-secondary" data-testid="hero-install-btn">Install Chrome Extension</a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Stat icon={Heart}      label="Total saved"    value={stats.total} testid="stat-total"/>
          <Stat icon={Sparkles}   label="Favorites"      value={stats.favorites} testid="stat-favs"/>
          <Stat icon={IndianRupee} label="Wishlist value" value={fmt(stats.wishlistValue)} testid="stat-wishlist-value" big/>
          <Stat icon={TrendingUp} label="Top category"   value={stats.topCategory} testid="stat-top-cat"/>
        </div>
      </section>

      {/* Recently saved */}
      <Section title="Recently saved" link="/wishlist" testid="section-recent">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {recent.map(i => <ItemCard key={i.id} item={i} />)}
        </div>
      </Section>

      {/* Looks teaser */}
      {looks.length > 0 && (
        <Section title="Latest looks" subtitle="Outfit inspiration, decoded" link="/looks" testid="section-looks">
          <div className="grid md:grid-cols-3 gap-6">
            {looks.map((l) => (
              <Link key={l.id} to="/looks" className="cp-card overflow-hidden block" data-testid={`look-teaser-${l.id}`}>
                <div className="aspect-[4/5] overflow-hidden" style={{ background:'#E8DFD8' }}>
                  <img src={l.image} alt={l.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex gap-2 mb-2">
                    <span className="cp-chip" style={{ background:'#F4E3D7', color:'#5C4033' }}>{l.aesthetic}</span>
                    <span className="cp-chip" style={{ background:'#FCEAEA', color:'#B33F40' }}>{l.occasion}</span>
                  </div>
                  <h3 className="font-heading text-lg" style={{ color:'#2B1E16' }}>{l.title}</h3>
                  <p className="text-xs mt-1" style={{ color:'#99857A' }}>{(l.items||[]).length} items decoded</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Save types breakdown + Reminders */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 cp-card p-6" data-testid="savetype-breakdown">
          <h3 className="font-heading text-xl mb-4" style={{ color:'#2B1E16' }}>How you save</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(SAVE_TYPES).map(([key, v]) => {
              const count = items.filter(i => i.saveType === key).length;
              return (
                <div key={key} className={`rounded-2xl p-4 ${v.class}`}>
                  <div className="text-2xl">{v.emoji}</div>
                  <div className="text-xs mt-2 opacity-80">{v.label}</div>
                  <div className="font-heading text-2xl mt-1">{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cp-card p-6" data-testid="reminders-widget">
          <h3 className="font-heading text-xl mb-4" style={{ color:'#2B1E16' }}>Reminders</h3>
          {reminders.length === 0 ? (
            <p className="text-sm" style={{ color:'#99857A' }}>No reminders yet.</p>
          ) : (
            <ul className="space-y-3">
              {reminders.map((r) => {
                const item = items.find(i => i.id === r.itemId);
                return (
                  <li key={r.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl grid place-items-center text-lg" style={{ background:'#F4E3D7' }}>{r.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color:'#2B1E16' }}>{r.label}</div>
                      <div className="text-xs truncate" style={{ color:'#99857A' }}>{item?.title || 'Saved item'}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Recent inspiration */}
      {inspirationRecent.length > 0 && (
        <Section title="Recent inspiration" link="/inspiration" testid="section-inspo">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {inspirationRecent.map(i => <ItemCard key={i.id} item={i} />)}
          </div>
        </Section>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value, testid, big }) {
  return (
    <div className="cp-card p-5" data-testid={testid}>
      <div className="w-9 h-9 rounded-xl grid place-items-center mb-3" style={{ background:'#F4E3D7' }}>
        <Icon size={16} color="#C47C47" />
      </div>
      <div className="text-xs uppercase tracking-wider" style={{ color:'#99857A' }}>{label}</div>
      <div className={`font-heading mt-1 ${big ? 'text-2xl' : 'text-3xl'}`} style={{ color:'#2B1E16' }}>{value}</div>
    </div>
  );
}

function Section({ title, subtitle, link, testid, children }) {
  return (
    <section data-testid={testid}>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-heading text-2xl md:text-3xl" style={{ color:'#2B1E16' }}>{title}</h2>
          {subtitle && <p className="text-sm mt-1" style={{ color:'#99857A' }}>{subtitle}</p>}
        </div>
        {link && (
          <Link to={link} className="text-sm inline-flex items-center gap-1 hover:underline" style={{ color:'#8C6239' }}>
            View all <ChevronRight size={14} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
