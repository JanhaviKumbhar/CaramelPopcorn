import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import { StoreProvider } from '@/store/useStore';
import AppLayout from '@/components/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import WishlistPage from '@/pages/WishlistPage';
import InspirationPage from '@/pages/InspirationPage';
import LooksPage from '@/pages/LooksPage';
import CategoriesPage from '@/pages/CategoriesPage';
import CollectionsPage from '@/pages/CollectionsPage';
import ComparePage from '@/pages/ComparePage';
import RemindersPage from '@/pages/RemindersPage';
import InsightsPage from '@/pages/InsightsPage';
import SettingsPage from '@/pages/SettingsPage';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/"            element={<DashboardPage />} />
            <Route path="/wishlist"    element={<WishlistPage />} />
            <Route path="/inspiration" element={<InspirationPage />} />
            <Route path="/looks"       element={<LooksPage />} />
            <Route path="/categories"  element={<CategoriesPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/compare"     element={<ComparePage />} />
            <Route path="/reminders"   element={<RemindersPage />} />
            <Route path="/insights"    element={<InsightsPage />} />
            <Route path="/settings"    element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
