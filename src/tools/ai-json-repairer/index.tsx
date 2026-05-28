'use client';

import { useState } from 'react';

function repairJson(input: string): { result: string; fixed: boolean; error: string | null } {
  if (!input.trim()) return { result: '', fixed: false, error: null };

  try {
    const parsed = JSON.parse(input);
    return { result: JSON.stringify(parsed, null, 2), fixed: false, error: null };
  } catch {}

  let s = input.trim();
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  s = s.replace(/,(\s*[}\]])/g, '$1');
  s = s.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3');
  s = s.replace(/'([^']*)'(\s*:)/g, '"$1"$2');
  s = s.replace(/:\s*'([^']*)'/g, ': "$1"');

  const opens: string[] = [];
  let inStr = false;
  let escape = false;
  for (const ch of s) {
    if (escape) { escape = false; continue; }
    if (ch === '\\' && inStr) { escape = true; continue; }
    if (ch === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (ch === '{') opens.push('}');
    else if (ch === '[') opens.push(']');
    else if (ch === '}' || ch === ']') opens.pop();
  }
  s = s + opens.reverse().join('');

  try {
    const parsed = JSON.parse(s);
    return { result: JSON.stringify(parsed, null, 2), fixed: true, error: null };
  } catch (e) {
    return { result: s, fixed: false, error: (e as Error).message };
  }
}

const EXAMPLES = [
  { label: 'Trailing commas', text: `{\n  "name": "Alice",\n  "tags": ["ai", "dev",],\n}` },
  { label: 'Unquoted keys', text: `{\n  name: "Bob",\n  role: "engineer"\n}` },
  { label: 'Truncated', text: `[\n  {"id": 1, "title": "First"},\n  {"id": 2, "title": "Second"` },
];

export default function AiJsonRepairer() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const { result, fixed, error } = repairJson(input);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const statusColor = !input.trim() ? '#555' : error ? '#ef4444' : fixed ? '#4ade80' : '#60a5fa';
  const statusText = !input.trim() ? 'Paste JSON above' : error ? 'Could not repair' : fixed ? 'Repaired successfully' : 'Already valid JSON';

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Broken JSON</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {EXAMPLES.map(e => (
                <button key={e.label} onClick={() => setInput(e.text)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>{e.label}</button>
              ))}
              {input && <button onClick={() => setInput('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your broken JSON here..."
            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 300, width: '100%', fontFamily: 'ui-monospace, monospace', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: statusColor, fontWeight: 600 }}>{statusText}</span>
            {result && !error && (
              <button onClick={handleCopy} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <div style={{ background: '#1a1a1a', border: `1px solid ${error ? 'rgba(239,68,68,0.3)' : '#2a2a2a'}`, borderRadius: 8, padding: 14, minHeight: 300, fontFamily: 'ui-monospace, monospace', fontSize: 13, lineHeight: 1.6, color: error ? '#f87171' : '#4ade80', whiteSpace: 'pre-wrap', wordBreak: 'break-all', overflowY: 'auto' }}>
            {result || <span style={{ color: '#444' }}>Repaired JSON will appear here...</span>}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {['Trailing commas', 'Unquoted keys', 'Single quotes', 'Missing brackets', 'Code fences', 'Truncated output'].map(tag => (
          <span key={tag} style={{ fontSize: 12, color: '#666', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#4ade80' }}>✓</span> {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
