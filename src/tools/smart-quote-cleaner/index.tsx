'use client';

import { useState } from 'react';

function cleanQuotes(text: string, mode: string): string {
  if (!text) return '';
  let s = text;
  if (mode === 'straight' || mode === 'all') {
    s = s.replace(/[\u2018\u2019\u201A\u201B]/g, "'");
    s = s.replace(/[\u201C\u201D\u201E\u201F]/g, '"');
    s = s.replace(/\u2026/g, '...');
    s = s.replace(/\u00A0/g, ' ');
  }
  if (mode === 'emdash' || mode === 'all') {
    s = s.replace(/\s*\u2014\s*/g, ' - ');
    s = s.replace(/\s*\u2013\s*/g, ' - ');
  }
  return s;
}

const EXAMPLE = `\u201CHello,\u201D she said, \u201Cit\u2019s a beautiful day\u2014don\u2019t you think?\u201D

He replied: \u201CAbsolutely\u2026 the weather\u2019s perfect.\u201D

The report noted the \u201Cunexpected\u201D results\u2014which were, in fact, quite predictable.`;

export default function SmartQuoteCleaner() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('all');
  const [copied, setCopied] = useState(false);
  const output = cleanQuotes(input, mode);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: '#666', alignSelf: 'center' }}>Mode:</span>
        {[['all', 'Fix all (recommended)'], ['straight', 'Smart \u2192 Straight quotes'], ['emdash', 'Em-dash \u2192 Hyphen']].map(([val, label]) => (
          <button key={val} onClick={() => setMode(val)} style={{ background: mode === val ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${mode === val ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: mode === val ? '#60a5fa' : '#888', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: mode === val ? 600 : 400 }}>{label}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Input text</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setInput(EXAMPLE)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>Example</button>
              {input && <button onClick={() => setInput('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`Paste text with \u201Csmart quotes\u201D, em-dashes\u2014like this\u2014or ellipsis\u2026`} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 260, width: '100%', fontFamily: 'inherit', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: output && output !== input ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{output && output !== input ? 'Fixed' : 'Output'}</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 260, fontSize: 13, lineHeight: 1.6, color: output ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto' }}>
            {output || 'Fixed text will appear here...'}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 16px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {['\u201C\u201D \u2192 "straight"', "\u2018\u2019 \u2192 'straight'", '\u2014 \u2192 -', '\u2013 \u2192 -', '\u2026 \u2192 ...', '\u00A0 \u2192 space'].map(item => (
          <span key={item} style={{ fontSize: 12, color: '#666', fontFamily: 'ui-monospace, monospace' }}>{item}</span>
        ))}
      </div>
    </div>
  );
}
