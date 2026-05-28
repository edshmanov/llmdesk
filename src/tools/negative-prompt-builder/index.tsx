'use client';

import { useState } from 'react';

type Model = 'sd' | 'sdxl' | 'flux';

const PRESETS: Record<string, string[]> = {
  'Quality fixes': ['blurry', 'low quality', 'worst quality', 'low resolution', 'jpeg artifacts', 'noise', 'grainy'],
  'Anatomy': ['bad anatomy', 'bad hands', 'missing fingers', 'extra fingers', 'fused fingers', 'mutated hands', 'extra limbs', 'deformed'],
  'Face': ['bad face', 'poorly drawn face', 'ugly', 'disfigured', 'deformed iris', 'cross-eyed', 'asymmetrical eyes'],
  'Style': ['cartoon', 'anime', 'sketch', 'drawing', 'painting', 'illustration', '3d render', 'cgi'],
  'Watermarks': ['watermark', 'text', 'signature', 'logo', 'username', 'copyright'],
  'NSFW': ['nsfw', 'nude', 'explicit', 'adult content'],
};

const MODEL_WEIGHTS: Record<Model, (term: string) => string> = {
  sd: (t) => t,
  sdxl: (t) => `(${t}:1.3)`,
  flux: (t) => t,
};

export default function NegativePromptBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set([
    'blurry', 'low quality', 'worst quality', 'bad anatomy', 'bad hands', 'watermark', 'text',
  ]));
  const [custom, setCustom] = useState('');
  const [model, setModel] = useState<Model>('sd');
  const [copied, setCopied] = useState(false);

  const toggle = (term: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term); else next.add(term);
      return next;
    });
  };

  const customTerms = custom.split(',').map(t => t.trim()).filter(Boolean);
  const allTerms = [...Array.from(selected), ...customTerms];
  const output = allTerms.map(MODEL_WEIGHTS[model]).join(', ');

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#666' }}>Model:</span>
        {(['sd', 'sdxl', 'flux'] as Model[]).map(m => (
          <button key={m} onClick={() => setModel(m)} style={{ background: model === m ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${model === m ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: model === m ? '#60a5fa' : '#888', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: model === m ? 600 : 400, textTransform: 'uppercase' }}>{m}</button>
        ))}
        <span style={{ fontSize: 11, color: '#444', marginLeft: 4 }}>
          {model === 'sdxl' ? 'Adds weighted syntax (term:1.3)' : 'Plain comma-separated terms'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Object.entries(PRESETS).map(([group, terms]) => (
            <div key={group}>
              <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{group}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {terms.map(term => (
                  <button key={term} onClick={() => toggle(term)} style={{ background: selected.has(term) ? 'rgba(239,68,68,0.1)' : '#1a1a1a', border: `1px solid ${selected.has(term) ? 'rgba(239,68,68,0.35)' : '#2a2a2a'}`, color: selected.has(term) ? '#f87171' : '#888', padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: selected.has(term) ? 600 : 400 }}>{term}</button>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Custom terms (comma-separated)</div>
            <textarea value={custom} onChange={e => setCustom(e.target.value)} placeholder="e.g. dark background, low contrast, overexposed..." style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 12, color: '#f0f0f0', fontSize: 13, lineHeight: 1.5, resize: 'vertical', minHeight: 70, width: '100%', fontFamily: 'inherit', outline: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{allTerms.length} terms selected</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setSelected(new Set())} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear all</button>
              {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
            </div>
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 200, fontFamily: 'ui-monospace, monospace', fontSize: 12, lineHeight: 1.7, color: output ? '#f87171' : '#444', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {output || 'Select terms on the left to build your negative prompt...'}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>Selected tags:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {allTerms.map(t => (
                <span key={t} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
