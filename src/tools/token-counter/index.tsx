'use client';

import { useState, useCallback } from 'react';

const MODELS = [
  { id: 'gpt-4o',        label: 'GPT-4o',           inputPer1M: 2.50,  context: 128000 },
  { id: 'gpt-4o-mini',   label: 'GPT-4o mini',      inputPer1M: 0.15,  context: 128000 },
  { id: 'gpt-4-turbo',   label: 'GPT-4 Turbo',      inputPer1M: 10.00, context: 128000 },
  { id: 'o1',            label: 'o1',               inputPer1M: 15.00, context: 200000 },
  { id: 'claude-sonnet', label: 'Claude Sonnet 4',  inputPer1M: 3.00,  context: 200000 },
  { id: 'claude-haiku',  label: 'Claude Haiku 3.5', inputPer1M: 0.80,  context: 200000 },
  { id: 'gemini-pro',    label: 'Gemini 2.5 Pro',   inputPer1M: 1.25,  context: 1000000 },
  { id: 'llama-70b',     label: 'Llama 3.1 70B',    inputPer1M: 0.59,  context: 128000 },
] as const;

type ModelId = typeof MODELS[number]['id'];

function countTokens(text: string): number {
  if (!text) return 0;
  const tokens = text.match(/\p{L}+|\p{N}+|[^\p{L}\p{N}\s]+|\s+/gu) ?? [];
  let count = 0;
  for (const t of tokens) {
    if (/\p{L}+/u.test(t)) count += Math.ceil(t.length / 4);
    else if (/\p{N}+/u.test(t)) count += Math.ceil(t.length / 3);
    else count += 1;
  }
  return Math.max(1, count);
}

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function formatCost(usd: number): string {
  if (usd === 0) return '$0.00';
  if (usd < 0.01) return `$${usd.toFixed(6)}`;
  return `$${usd.toFixed(4)}`;
}

const EXAMPLES = [
  { label: 'Short prompt', text: 'Summarize the following article in three bullet points.' },
  { label: 'System prompt', text: 'You are a helpful assistant. Always be polite and professional. If unsure, say so rather than making up information.' },
];

export default function TokenCounter() {
  const [text, setText] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelId>('gpt-4o');

  const model = MODELS.find(m => m.id === selectedModel)!;
  const tokens = text ? countTokens(text) : 0;
  const words = countWords(text);
  const chars = text.length;
  const contextPct = (tokens / model.context) * 100;
  const inputCost = (tokens / 1_000_000) * model.inputPer1M;
  const progressColor = contextPct > 90 ? '#ef4444' : contextPct > 70 ? '#f59e0b' : '#3b82f6';

  const handleClear = useCallback(() => setText(''), []);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {MODELS.map(m => (
          <button key={m.id} onClick={() => setSelectedModel(m.id)} style={{
            background: selectedModel === m.id ? 'rgba(59,130,246,0.12)' : '#1a1a1a',
            border: `1px solid ${selectedModel === m.id ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`,
            color: selectedModel === m.id ? '#60a5fa' : '#888',
            padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
            fontWeight: selectedModel === m.id ? 600 : 400,
          }}>{m.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your text</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {EXAMPLES.map(e => (
                <button key={e.label} onClick={() => setText(e.text)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>{e.label}</button>
              ))}
              {text && <button onClick={handleClear} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste or type your prompt to count tokens..."
            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 14, lineHeight: 1.6, resize: 'vertical', minHeight: 220, width: '100%', fontFamily: 'ui-monospace, monospace', outline: 'none' }}
          />
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Results</div>
          {[
            { label: 'Tokens', value: tokens.toLocaleString(), big: true },
            { label: 'Characters', value: chars.toLocaleString() },
            { label: 'Words', value: words.toLocaleString() },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #222' }}>
              <span style={{ fontSize: 13, color: '#888' }}>{row.label}</span>
              <span style={{ fontSize: row.big ? 18 : 14, fontWeight: row.big ? 700 : 600, color: row.big ? '#f0f0f0' : '#60a5fa', fontFamily: 'ui-monospace, monospace' }}>{row.value}</span>
            </div>
          ))}
          <div style={{ padding: '9px 0', borderBottom: '1px solid #222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: '#888' }}>Context used</span>
              <span style={{ fontSize: 13, color: '#60a5fa', fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>{contextPct < 0.01 ? '0%' : `${contextPct.toFixed(1)}%`}</span>
            </div>
            <div style={{ background: '#222', borderRadius: 99, height: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 99, width: `${Math.min(contextPct, 100)}%`, background: progressColor, transition: 'width .2s' }} />
            </div>
          </div>
          <div style={{ padding: '9px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: '#888' }}>Input cost</span>
              <span style={{ fontSize: 14, color: '#4ade80', fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>{formatCost(inputCost)}</span>
            </div>
            <div style={{ fontSize: 11, color: '#555', marginTop: 3 }}>${model.inputPer1M}/1M tokens</div>
          </div>
        </div>
      </div>
    </div>
  );
}
