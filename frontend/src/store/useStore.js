// Lightweight global store using React Context + localStorage.
// Acts as a stand-in for chrome.storage.local in the web preview.
// Same shape as extension storage so the dashboard logic is portable.

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  SAMPLE_ITEMS, SAMPLE_COLLECTIONS, SAMPLE_REMINDERS,
} from '@/data/sampleData';

const STORAGE_KEY = 'caramel-popcorn-state-v1';
const StoreCtx = createContext(null);

const initial = {
  items: SAMPLE_ITEMS,
  collections: SAMPLE_COLLECTIONS,
  reminders: SAMPLE_REMINDERS,
  filters: { category: 'All', saveType: 'All', collection: 'All', source: 'All', q: '' },
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw);
    return { ...initial, ...parsed };
  } catch { return initial; }
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const addItem = useCallback((item) => {
    setState(s => ({ ...s, items: [{ ...item, id: item.id || `x${Date.now()}`, dateSaved: new Date().toISOString() }, ...s.items] }));
  }, []);

  const updateItem = useCallback((id, patch) => {
    setState(s => ({ ...s, items: s.items.map(i => i.id === id ? { ...i, ...patch } : i) }));
  }, []);

  const removeItem = useCallback((id) => {
    setState(s => ({ ...s, items: s.items.filter(i => i.id !== id) }));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setState(s => ({ ...s, items: s.items.map(i => i.id === id ? { ...i, favorite: !i.favorite } : i) }));
  }, []);

  const addCollection = useCallback((name, cover) => {
    setState(s => ({ ...s, collections: [...s.collections, { id: `c${Date.now()}`, name, cover, items: 0 }] }));
  }, []);

  const setFilter = useCallback((key, val) => {
    setState(s => ({ ...s, filters: { ...s.filters, [key]: val } }));
  }, []);

  const resetData = useCallback(() => {
    setState(initial);
  }, []);

  const value = useMemo(() => ({
    ...state, addItem, updateItem, removeItem, toggleFavorite, addCollection, setFilter, resetData,
  }), [state, addItem, updateItem, removeItem, toggleFavorite, addCollection, setFilter, resetData]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
