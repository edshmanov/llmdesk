'use client';

import { useState } from 'react';

const MODELS = [
  { id: 'gpt-4o', label: 'GPT-4o', input: 2.50, output: 10.00 },
  { id: 'gpt-4o-mini', label: 'GPT-4o mini', input: 0.15, output: 0.60 },
  { id: 'claude-sonnet-4', label: 'Claude Sonnet 4', input: 3.00, output: 15.00 },
  { id: 'claude-haiku-3.5', label: 'Claude Haiku 3.5', input: 0.80, output: 4.00 },
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', input: 1.25, output: 10.00 },
  { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', input: 0.075, output: 0.30 },
  { id: 'llama-3.1-70b', label: 'Llama 3.1 70B', input: 0.59, output: 0.79 },
  { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', input: 0.50, output: 1.50 },
];

function fmt(n: number) {
  if (n === 0) return '$0.00';
  if (n < 1) return `$${n.toFixed(2)}`;
  if (n < 1000) return `$${n.toFixed(2)}`;
  return `$${(n / 1000).toFixed(2)}k`;
}

export default function MonthlyAiBillEstimator() {
  const [model, setModel] = useState('gpt-4o');
  const [dailyRequests, setDailyRequests] = useState('1000');
  const [avgInput, setAvgInput] = useState('500');
  const [avgOutput, setAvgOutput] = useState('200');
  const [days, setDays] = useState('30');
  const [markup, setMarkup] = useState('0');

  const m = MODELS.find(x => x.id === model)!;
  const reqs = Math.max(0, parseFloat(dailyRequests) || 0);
  const inp = Math.max(0, parseFloat(avgInput) || 0);
  const out = Math.max(0, parseFloat(avgOutput) || 0);
  const d = Math.max(1, parseFloat(days) || 30);
  const mk = Math.max(0, parseFloat(markup) || 0);

  const totalRequests = reqs * d;
  const totalInputTokens = totalRequests * inp;
  const totalOutputTokens = totalRequests * out;
  const inputCost = (totalInputTokens / 1_000_000) * m.input;
  const outputCost = (totalOutputTokens / 1_000_000) * m.output;
  const baseCost = inputCost + outputCost;
  const withMarkup = baseCost * (1 + mk / 100);
  const perRequest = totalRequests > 0 ? baseCost / totalRequests : 0;

  const pill = (active: boolean): React.CSSProperties => ({ background: active ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${active ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: active ? '#60a5fa' : '#888', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: active ? 600 : 400 });
  const inp2: React.CSSProperties = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '9px 12px', color: '#f0f0f0', fontSize: 14, width: '100%', fontFamily: 'ui-monospace, monospace', outline: 'none' };
  const lbl: React.CSSProperties = { fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={lbl}>Model</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {MODELS.map(x => <button key={x.id} onClick={() => setModel(x.id)} style={pill(model === x.id)}>{x.label}</button>)}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div><label style={lbl}>Daily requests</label><input type="number" min="0" style={inp2} value={dailyRequests} onChange={e => setDailyRequests(e.target.value)} /></div>
          <div><label style={lbl}>Days per month</label><input type="number" min="1" max="31" style={inp2} value={days} onChange={e => setDays(e.target.value)} /></div>
          <div><label style={lbl}>Avg input tokens</label><input type="number" min="0" style={inp2} value={avgInput} onChange={e => setAvgInput(e.target.value)} /></div>
          <div><label style={lbl}>Avg output tokens</label><input type="number" min="0" style={inp2} value={avgOutput} onChange={e => setAvgOutput(e.target.value)} /></div>
        </div>
        <div><label style={lbl}>Markup % (for resellers)</label><input type="number" min="0" style={inp2} value={markup} onChange={e => setMarkup(e.target.value)} /></div>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px', fontSize: 12, color: '#555' }}>
          Pricing: ${m.input}/1M input · ${m.output}/1M output
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Monthly total</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#f0f0f0', fontFamily: 'ui-monospace, monospace' }}>{fmt(baseCost)}</div>
          {mk > 0 && <div style={{ fontSize: 14, color: '#4ade80', marginTop: 4 }}>With {mk}% markup: {fmt(withMarkup)}</div>}
        </div>
        {[
          { label: 'Total requests', value: totalRequests.toLocaleString() },
          { label: 'Total input tokens', value: (totalInputTokens / 1_000_000).toFixed(2) + 'M' },
          { label: 'Total output tokens', value: (totalOutputTokens / 1_000_000).toFixed(2) + 'M' },
          { label: 'Input cost', value: fmt(inputCost) },
          { label: 'Output cost', value: fmt(outputCost) },
          { label: 'Cost per request', value: `$${perRequest.toFixed(6)}` },
          { label: 'Daily cost', value: fmt(baseCost / d) },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#1a1a1a', borderRadius: 6 }}>
            <span style={{ fontSize: 13, color: '#888' }}>{row.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa', fontFamily: 'ui-monospace, monospace' }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
