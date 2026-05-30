'use client';

import { useState } from 'react';

const MODELS = [
  { id: 'gpt-4o', label: 'GPT-4o', context: 128000 },
  { id: 'gpt-4o-mini', label: 'GPT-4o mini', context: 128000 },
  { id: 'o1', label: 'o1', context: 200000 },
  { id: 'claude-sonnet-4', label: 'Claude Sonnet 4', context: 200000 },
  { id: 'claude-haiku-3.5', label: 'Claude Haiku 3.5', context: 200000 },
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', context: 1048576 },
  { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', context: 1000000 },
  { id: 'llama-3.1-70b', label: 'Llama 3.1 70B', context: 128000 },
];

function estimateTokens(text: string): number {
  if (!text) return 0;
  const tokens = text.match(/\p{L}+|\p{N}+|[^\p{L}\p{N}\s]+|\s+/gu) ?? [];
  let count = 0;
  for (const t of tokens) {
    if (/\p{L}+/u.test(t)) count += Math.ceil(t.length / 4);
    else if (/\p{N}+/u.test(t)) count += Math.ceil(t.length / 3);
    else count += 1;
  }
  return Math.max(0, count);
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
  return n.toString();
}

export default function ContextWindowFiller() {
  const [model, setModel] = useState('gpt-4o');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [reserveOutput, setReserveOutput] = useState('2000');

  const m = MODELS.find(x => x.id === model)!;
  const systemTokens = estimateTokens(systemPrompt);
  const userTokens = estimateTokens(userMessage);
  const reserved = Math.max(0, parseInt(reserveOutput) || 0);
  const usedTokens = systemTokens + userTokens + reserved;
  const remaining = Math.max(0, m.context - usedTokens);
  const pct = Math.min(100, (usedTokens / m.context) * 100);
  const barColor = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#3b82f6';

  const pill = (active: boolean): React.CSSProperties => ({ background: active ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${active ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: active ? '#60a5fa' : '#888', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: active ? 600 : 400 });
  const ta: React.CSSProperties = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 12, color: '#f0f0f0', fontSize: 13, lineHeight: 1.5, resize: 'vertical', width: '100%', fontFamily: 'inherit', outline: 'none' };

  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Model</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {MODELS.map(x => <button key={x.id} onClick={() => setModel(x.id)} style={pill(model === x.id)}>{x.label}</button>)}
        </div>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, padding: '16px', marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: '#888' }}>Context window: <span style={{ color: '#f0f0f0', fontFamily: 'ui-monospace, monospace' }}>{formatNum(m.context)} tokens</span></span>
          <span style={{ fontSize: 13, fontWeight: 700, color: barColor, fontFamily: 'ui-monospace, monospace' }}>{pct.toFixed(1)}% used</span>
        </div>
        <div style={{ background: '#222', borderRadius: 99, height: 12, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, height: '100%', width: `${(systemTokens / m.context) * 100}%`, background: '#3b82f6', transition: 'width .2s' }} />
          <div style={{ position: 'absolute', left: `${(systemTokens / m.context) * 100}%`, height: '100%', width: `${(userTokens / m.context) * 100}%`, background: '#8b5cf6', transition: 'all .2s' }} />
          <div style={{ position: 'absolute', left: `${((systemTokens + userTokens) / m.context) * 100}%`, height: '100%', width: `${(reserved / m.context) * 100}%`, background: '#f59e0b', transition: 'all .2s' }} />
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
          {[['#3b82f6', 'System', systemTokens], ['#8b5cf6', 'User', userTokens], ['#f59e0b', 'Reserved', reserved], ['#444', 'Available', remaining]].map(([color, label, val]) => (
            <span key={label as string} style={{ fontSize: 11, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: color as string, display: 'inline-block' }} />
              {label as string}: <span style={{ color: '#888', fontFamily: 'ui-monospace, monospace' }}>{formatNum(val as number)}</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>System prompt — {systemTokens} tokens</div>
          <textarea style={{ ...ta, minHeight: 120 }} value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)} placeholder="Paste your system prompt..." />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>User message — {userTokens} tokens</div>
          <textarea style={{ ...ta, minHeight: 120 }} value={userMessage} onChange={e => setUserMessage(e.target.value)} placeholder="Paste user message or document..." />
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: '#666' }}>Reserve for output:</span>
        {['500', '1000', '2000', '4000', '8000'].map(v => (
          <button key={v} onClick={() => setReserveOutput(v)} style={{ background: reserveOutput === v ? 'rgba(245,158,11,0.12)' : '#1a1a1a', border: `1px solid ${reserveOutput === v ? 'rgba(245,158,11,0.4)' : '#2a2a2a'}`, color: reserveOutput === v ? '#f59e0b' : '#888', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>{v}</button>
        ))}
        <span style={{ fontSize: 12, color: '#555' }}>tokens</span>
      </div>

      {remaining < 1000 && remaining >= 0 && (
        <div style={{ marginTop: 12, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#f87171' }}>
          ⚠ Only {formatNum(remaining)} tokens remaining — you are close to the context limit!
        </div>
      )}
    </div>
  );
}
