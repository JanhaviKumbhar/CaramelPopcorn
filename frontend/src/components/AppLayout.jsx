import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import AddItemModal from '@/components/AddItemModal';

export default function AppLayout() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="min-h-screen" style={{ background:'#FCFAF8' }}>
      <Sidebar />
      <main className="md:ml-64 px-6 md:px-8 lg:px-12 pb-16">
        <Topbar onAdd={() => setOpen(true)} />
        <Outlet context={{ openAdd: () => setOpen(true) }} />
      </main>
      <AddItemModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
