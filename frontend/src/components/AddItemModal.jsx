import React, { useState } from 'react';
import { X, Link2, Image as ImageIcon, Type, Sparkles } from 'lucide-react';
import { SAVE_TYPES, CATEGORY_TREE } from '@/data/sampleData';
import { useStore } from '@/store/useStore';
import { detectFromUrl, detectFromText } from '@/services/aiStub';

export default function AddItemModal({ open, onClose }) {
  const { addItem } = useStore();
  const [tab, setTab] = useState('url');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [notes, setNotes] = useState('');
  const [saveType, setSaveType] = useState('cant_stop_thinking');
  const [category, setCategory] = useState('Beauty');
  const [subcategory, setSubcategory] = useState('Lipstick');

  if (!open) return null;

  const tryAutoDetect = () => {
    const detected = detectFromUrl(url) || detectFromText(`${title} ${notes}`);
    if (detected) {
      if (!brand && detected.brand) setBrand(detected.brand);
      if (!category && detected.category) setCategory(detected.category);
      if (detected.subcategory) setSubcategory(detected.subcategory);
      if (!image && detected.image) setImage(detected.image);
    }
  };

  const submit = () => {
    if (!title && !url) return;
    addItem({
      type: 'product',
      title: title || 'Untitled save',
      brand, price: Number(price) || undefined, currency: 'INR',
      image: image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80',
      website: brand || 'Web', url, source: 'manual',
      saveType, category, subcategory,
      tags: [], notes, favorite: false, status: 'wishlist',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm grid place-items-center p-4" data-testid="add-modal">
      <div className="cp-card w-full max-w-lg overflow-hidden cp-pop">
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor:'#E8DFD8' }}>
          <div>
            <div className="font-heading text-xl" style={{ color:'#2B1E16' }}>Save to Caramel Popcorn</div>
            <p className="text-xs" style={{ color:'#99857A' }}>Add a product, link, or screenshot</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full grid place-items-center hover:bg-gray-100" data-testid="add-modal-close">
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2 px-5 pt-4">
          {[
            { id:'url', label:'URL', icon: Link2 },
            { id:'image', label:'Image', icon: ImageIcon },
            { id:'manual', label:'Manual', icon: Type },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              data-testid={`add-tab-${t.id}`}
              className={`cp-chip ${tab===t.id ? '' : ''}`}
              style={tab===t.id ? { background:'#2B1E16', color:'#FCFAF8' } : { background:'#F4E3D7', color:'#5C4033' }}>
              <t.icon size={14}/> {t.label}
            </button>
          ))}
        </div>

        <div className="p-5 space-y-3 max-h-[55vh] overflow-y-auto">
          {tab === 'url' && (
            <>
              <Field label="Product URL">
                <div className="flex gap-2">
                  <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.nykaa.com/…"
                    className="cp-input flex-1" data-testid="add-url-input" />
                  <button onClick={tryAutoDetect} className="cp-btn-secondary text-sm flex items-center gap-1" data-testid="add-detect-btn">
                    <Sparkles size={14}/> Detect
                  </button>
                </div>
              </Field>
            </>
          )}
          {tab === 'image' && (
            <Field label="Image URL"><input value={image} onChange={e=>setImage(e.target.value)} placeholder="https://…/photo.jpg"
              className="cp-input" data-testid="add-image-input" /></Field>
          )}

          <Field label="Title">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Soft Pinch Blush"
              className="cp-input" data-testid="add-title-input" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Brand">
              <input value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Rare Beauty"
                className="cp-input" data-testid="add-brand-input"/>
            </Field>
            <Field label="Price (₹)">
              <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="2400" type="number"
                className="cp-input" data-testid="add-price-input"/>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select value={category} onChange={e=>setCategory(e.target.value)} className="cp-input" data-testid="add-category-select">
                {Object.keys(CATEGORY_TREE).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Subcategory">
              <select value={subcategory} onChange={e=>setSubcategory(e.target.value)} className="cp-input" data-testid="add-subcategory-select">
                {Object.keys(CATEGORY_TREE[category]||{}).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Save type">
            <div className="flex flex-wrap gap-2">
              {Object.entries(SAVE_TYPES).map(([key, v]) => (
                <button key={key} onClick={()=>setSaveType(key)}
                  data-testid={`add-savetype-${key}`}
                  className={`cp-chip ${v.class}`}
                  style={{ outline: saveType===key ? '2px solid #2B1E16' : 'none' }}>
                  <span>{v.emoji}</span><span>{v.label}</span>
                </button>
              ))}
            </div>
          </Field>
          <Field label="Notes">
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Why are you saving this?"
              rows={2} className="cp-input resize-none" data-testid="add-notes-input"/>
          </Field>
        </div>

        <div className="flex items-center justify-end gap-2 p-5 border-t" style={{ borderColor:'#E8DFD8' }}>
          <button onClick={onClose} className="cp-btn-secondary text-sm" data-testid="add-modal-cancel">Cancel</button>
          <button onClick={submit} className="cp-btn-primary text-sm" data-testid="add-modal-submit">Save it</button>
        </div>
      </div>

      <style>{`
        .cp-input {
          width: 100%; border:1px solid #E8DFD8; border-radius: 0.85rem;
          padding: 0.6rem 0.85rem; font-size: 0.875rem; background:#fff;
          color:#2B1E16; outline:none; transition:border-color .2s;
          font-family:'Manrope',sans-serif;
        }
        .cp-input:focus { border-color:#C47C47; box-shadow:0 0 0 3px rgba(196,124,71,0.15); }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium mb-1.5" style={{ color:'#5C4033' }}>{label}</span>
      {children}
    </label>
  );
}
