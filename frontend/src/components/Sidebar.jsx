import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, Heart, Sparkles, Shapes, FolderHeart, BarChart3, Settings, Shirt, GitCompare, Bell,
} from 'lucide-react';

const ITEMS = [
  { to: '/',            label: 'Dashboard',     icon: Home,        testid: 'nav-dashboard' },
  { to: '/wishlist',    label: 'Wishlist',      icon: Heart,       testid: 'nav-wishlist' },
  { to: '/inspiration', label: 'Inspiration',   icon: Sparkles,    testid: 'nav-inspiration' },
  { to: '/looks',       label: 'Looks',         icon: Shirt,       testid: 'nav-looks' },
  { to: '/categories',  label: 'Categories',    icon: Shapes,      testid: 'nav-categories' },
  { to: '/collections', label: 'Collections',   icon: FolderHeart, testid: 'nav-collections' },
  { to: '/compare',     label: 'Compare',       icon: GitCompare,  testid: 'nav-compare' },
  { to: '/reminders',   label: 'Reminders',     icon: Bell,        testid: 'nav-reminders' },
  { to: '/insights',    label: 'Insights',      icon: BarChart3,   testid: 'nav-insights' },
  { to: '/settings',    label: 'Settings',      icon: Settings,    testid: 'nav-settings' },
];

export default function Sidebar() {
  return (
    <aside
      className="w-64 fixed left-0 top-0 h-screen border-r p-6 hidden md:flex flex-col"
      style={{ borderColor: '#E8DFD8', background: '#FCFAF8' }}
      data-testid="app-sidebar"
    >
      <div className="flex items-center gap-2 mb-8" data-testid="brand-logo">
        <div className="w-10 h-10 rounded-2xl grid place-items-center" style={{ background:'#C47C47' }}>
          <span className="text-xl">🍿</span>
        </div>
        <div>
          <div className="font-heading text-xl font-semibold leading-none" style={{ color:'#2B1E16'}}>Caramel</div>
          <div className="font-heading text-xl italic leading-none" style={{ color:'#8C6239'}}>Popcorn</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {ITEMS.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === '/'}
            data-testid={it.testid}
            className={({ isActive }) => `cp-sidebar-item ${isActive ? 'active' : ''}`}
          >
            <it.icon size={18} strokeWidth={1.75} />
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="rounded-2xl p-4 mt-4" style={{ background:'#F4E3D7' }} data-testid="sidebar-upgrade-card">
        <div className="font-heading text-base font-semibold" style={{ color:'#2B1E16' }}>Pro tip</div>
        <p className="text-xs leading-relaxed mt-1" style={{ color:'#5C4033' }}>
          Install the Chrome extension to save from Instagram, Pinterest & 8+ stores in one click.
        </p>
      </div>
    </aside>
  );
}
