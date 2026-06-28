import React from 'react';
import { useStore } from '@/store/useStore';
import { Download, RotateCcw } from 'lucide-react';

export default function SettingsPage() {
  const { items, resetData } = useStore();

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'caramel-popcorn-export.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cp-animate-in" data-testid="settings-page">
      <header className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color:'#2B1E16' }}>Settings</h1>
        <p className="text-base mt-2" style={{ color:'#5C4033' }}>Manage your data, currency and extension preferences.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="cp-card p-6">
          <h3 className="font-heading text-xl mb-3" style={{ color:'#2B1E16' }}>Your data</h3>
          <p className="text-sm mb-4" style={{ color:'#5C4033' }}>Everything is stored locally on your device via Chrome Storage. Export anytime.</p>
          <div className="flex gap-2">
            <button onClick={exportJson} className="cp-btn-primary inline-flex items-center gap-2" data-testid="export-json-btn">
              <Download size={16}/> Export JSON
            </button>
            <button onClick={resetData} className="cp-btn-secondary inline-flex items-center gap-2" data-testid="reset-data-btn">
              <RotateCcw size={16}/> Reset to sample
            </button>
          </div>
        </div>

        <div className="cp-card p-6">
          <h3 className="font-heading text-xl mb-3" style={{ color:'#2B1E16' }}>Preferences</h3>
          <Row label="Default currency" value="₹ INR"/>
          <Row label="Theme" value="Caramel (warm light)"/>
          <Row label="Floating save button" value="Enabled on supported stores"/>
          <Row label="AI categorization" value="Mock (offline)"/>
        </div>

        <div className="cp-card p-6 md:col-span-2">
          <h3 className="font-heading text-xl mb-3" style={{ color:'#2B1E16' }}>Install Chrome extension</h3>
          <p className="text-sm mb-4" style={{ color:'#5C4033' }}>
            1. Download the zip below and unzip. 2. Open <code>chrome://extensions</code>. 3. Enable Developer mode. 4. Click "Load unpacked" and select the unzipped folder.
          </p>
          <a href="/caramel-popcorn-extension.zip" download className="cp-btn-primary inline-flex items-center gap-2" data-testid="download-extension-btn">
            <Download size={16}/> Download caramel-popcorn-extension.zip
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0" style={{ borderColor:'#E8DFD8' }}>
      <span className="text-sm" style={{ color:'#5C4033' }}>{label}</span>
      <span className="text-sm font-medium" style={{ color:'#2B1E16' }}>{value}</span>
    </div>
  );
}
