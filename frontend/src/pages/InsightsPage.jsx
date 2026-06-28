import React, { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const fmt = (n) => `₹${Number(n||0).toLocaleString('en-IN')}`;

const PIE_COLORS = ['#C47C47','#8C6239','#B33F40','#6A4C93','#B8860B','#99857A'];

export default function InsightsPage() {
  const { items } = useStore();

  const stats = useMemo(() => {
    const products = items.filter(i => i.type === 'product');
    const total = products.length;
    const totalValue = products.reduce((s,p)=> s+(p.price||0),0);
    const avg = total ? Math.round(totalValue / total) : 0;

    const byBrand = {};
    const byCat = {};
    const byWebsite = {};
    const byMonth = {};

    products.forEach(p => {
      byBrand[p.brand]   = (byBrand[p.brand]||0) + 1;
      byCat[p.subcategory || p.category] = (byCat[p.subcategory || p.category]||0) + 1;
      byWebsite[p.website] = (byWebsite[p.website]||0) + 1;
      const m = new Date(p.dateSaved).toLocaleString('en-IN', { month:'short' });
      byMonth[m] = (byMonth[m]||0) + 1;
    });

    const topBrands = Object.entries(byBrand).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([name,value])=>({name,value}));
    const topCats   = Object.entries(byCat).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([name,value])=>({name,value}));
    const monthly   = Object.entries(byMonth).map(([name,value])=>({name,value}));
    const favWebsite = Object.entries(byWebsite).sort((a,b)=>b[1]-a[1])[0]?.[0] || '—';

    return { total, totalValue, avg, topBrands, topCats, monthly, favWebsite };
  }, [items]);

  return (
    <div className="cp-animate-in" data-testid="insights-page">
      <header className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color:'#2B1E16' }}>Insights</h1>
        <p className="text-base mt-2" style={{ color:'#5C4033' }}>Patterns in how you save and what you want.</p>
      </header>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatBox label="Total saved"      value={stats.total} testid="ins-total"/>
        <StatBox label="Wishlist value"   value={fmt(stats.totalValue)} testid="ins-value" big/>
        <StatBox label="Average price"    value={fmt(stats.avg)} testid="ins-avg" big/>
        <StatBox label="Favorite website" value={stats.favWebsite} testid="ins-fav-web"/>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="cp-card p-6">
          <h3 className="font-heading text-xl mb-4" style={{ color:'#2B1E16' }}>Top brands</h3>
          <div style={{ width:'100%', height:260 }}>
            <ResponsiveContainer>
              <BarChart data={stats.topBrands}>
                <XAxis dataKey="name" tick={{ fontSize:12, fill:'#5C4033' }} />
                <YAxis tick={{ fontSize:12, fill:'#5C4033' }} />
                <Tooltip cursor={{ fill:'#F4E3D7' }}/>
                <Bar dataKey="value" fill="#C47C47" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="cp-card p-6">
          <h3 className="font-heading text-xl mb-4" style={{ color:'#2B1E16' }}>Most saved categories</h3>
          <div style={{ width:'100%', height:260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={stats.topCats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={{ fontSize:12 }}>
                  {stats.topCats.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize:12 }} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="cp-card p-6 lg:col-span-2">
          <h3 className="font-heading text-xl mb-4" style={{ color:'#2B1E16' }}>Monthly activity</h3>
          <div style={{ width:'100%', height:260 }}>
            <ResponsiveContainer>
              <BarChart data={stats.monthly}>
                <XAxis dataKey="name" tick={{ fontSize:12, fill:'#5C4033' }} />
                <YAxis tick={{ fontSize:12, fill:'#5C4033' }} />
                <Tooltip cursor={{ fill:'#F4E3D7' }}/>
                <Bar dataKey="value" fill="#8C6239" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, testid, big }) {
  return (
    <div className="cp-card p-5" data-testid={testid}>
      <div className="text-xs uppercase tracking-wider" style={{ color:'#99857A' }}>{label}</div>
      <div className={`font-heading mt-2 ${big ? 'text-2xl' : 'text-3xl'}`} style={{ color:'#2B1E16' }}>{value}</div>
    </div>
  );
}
