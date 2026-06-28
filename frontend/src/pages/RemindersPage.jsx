import React from 'react';
import { useStore } from '@/store/useStore';

export default function RemindersPage() {
  const { reminders, items } = useStore();
  return (
    <div className="cp-animate-in" data-testid="reminders-page">
      <header className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color:'#2B1E16' }}>Reminders</h1>
        <p className="text-base mt-2" style={{ color:'#5C4033' }}>Patience pays off — we'll nudge you when the time is right.</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.map(r => {
          const item = items.find(i => i.id === r.itemId);
          return (
            <article key={r.id} className="cp-card p-5 flex gap-4" data-testid={`reminder-${r.id}`}>
              <div className="w-14 h-14 rounded-2xl grid place-items-center text-2xl" style={{ background:'#F4E3D7' }}>{r.emoji}</div>
              <div className="min-w-0 flex-1">
                <div className="font-heading text-lg" style={{ color:'#2B1E16' }}>{r.label}</div>
                <div className="text-sm truncate" style={{ color:'#5C4033' }}>{item?.title}</div>
                <div className="text-xs mt-1" style={{ color:'#99857A' }}>Remind on {new Date(r.date).toLocaleDateString('en-IN')}</div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
