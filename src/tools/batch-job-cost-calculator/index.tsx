'use client';

import { useState } from 'react';

const MODELS = [
  { id: 'gpt-4o', label: 'GPT-4o', input: 2.50, output: 10.00, batchInput: 1.25, batchOutput: 5.00, hasBatch: true },
  { id: 'gpt-4o-mini', label: 'GPT-4o mini', input: 0.15, output: 0.60, batchInput: 0.075, batchOutput: 0.30, hasBatch: true },
  { id: 'claude-sonnet-4', label: 'Claude Sonnet 4', input: 3.00, output: 15.00, batchInput: 1.50, batchOutput: 7.50, hasBatch: true },
  { id: 'claude-haiku-3.5', label: 'Claude Haiku 3.5', input: 0.80, output: 4.00, batchInput: 0.40, batchOutput: 2.00, hasBatch: true },
  { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', input: 0.075, output: 0.30, batchInput: 0.075, batchOutput: 0.30, hasBatch: false },
  { id: 'llama-3.1-70b', label: 'Llama 3.1 70B', input: 0.59, output: 0.79, batchInput: 0.59, batchOutput: 0.79, hasBatch: false },
];

function fmt(n: number) {
  if (n === 0) return '$0.00';
  if (n < 0.01) return `$${n.toFixed(4)}`;
  if (n < 1000) return `$${n.toFixed(2)}`;
  return `$${(n / 1000).toFixed(1)}k`;
}

export default function BatchJobCostCalculator() {
  const [model, setModel] = useState('gpt-4o');
  const [jobs, setJobs] = useState('10000');
  const [inputTokens, setInputTokens] = useState('1000');
  const [outputTokens, setOutputTokens] = useState('500');
  const [useBatch, setUseBatch] = useState(true);

  const m = MODELS.find(x => x.id === model)!;
  const jobCount = Math.max(0, parseInt(jobs) || 0);
  const inp = Math.max(0, parseInt(inputTokens) || 0);
  const out = Math.max(0, parseInt(outputTokens) || 0);

  const totalIn = jobCount * inp;
  const totalOut = jobCount * out;

  const standardCost = (totalIn / 1_000_000) * m.input + (totalOut / 1_000_000) * m.output;
  const batchCost = (totalIn / 1_000_000) * m.batchInput + (totalOut / 1_000_000) * m.batchOutput;
  const activeCost = useBatch && m.hasBatch ? batchCost : standardCost;
  const savings = standardCost - batchCost;
  const savingsPct = standardCost > 0 ? (savings / standardCost) * 100 : 0;

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
          <div><label style={lbl}>Number of jobs</label><input type="number" min="0" style={inp2} value={jobs} onChange={e => setJobs(e.target.value)} /></div>
          <div></div>
          <div><label style={lbl}>Input tokens / job</label><input type="number" min="0" style={inp2} value={inputTokens} onChange={e => setInputTokens(e.target.value)} /></div>
          <div><label style={lbl}>Output tokens / job</label><input type="number" min="0" style={inp2} value={outputTokens} onChange={e => setOutputTokens(e.target.value)} /></div>
        </div>
        {m.hasBatch ? (
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888', cursor: 'pointer', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 14px' }}>
            <input type="checkbox" checked={useBatch} onChange={e => setUseBatch(e.target.checked)} />
            Use Batch API (50% discount, results within 24h)
          </label>
        ) : (
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#555' }}>
            Batch API not available for this model
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            {useBatch && m.hasBatch ? 'Batch API cost' : 'Standard API cost'}
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#f0f0f0', fontFamily: 'ui-monospace, monospace' }}>{fmt(activeCost)}</div>
        </div>
        {m.hasBatch && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>Standard API</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#f87171', fontFamily: 'ui-monospace, monospace' }}>{fmt(standardCost)}</div>
            </div>
            <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 8, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#4ade80', marginBottom: 4 }}>Batch API saves</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#4ade80', fontFamily: 'ui-monospace, monospace' }}>{fmt(savings)}</div>
              <div style={{ fontSize: 11, color: '#4ade80' }}>{savingsPct.toFixed(0)}% off</div>
            </div>
          </div>
        )}
        {[
          { label: 'Total jobs', value: jobCount.toLocaleString() },
          { label: 'Total input tokens', value: (totalIn / 1_000_000).toFixed(2) + 'M' },
          { label: 'Total output tokens', value: (totalOut / 1_000_000).toFixed(2) + 'M' },
          { label: 'Cost per job', value: `$${jobCount > 0 ? (activeCost / jobCount).toFixed(6) : '0'}` },
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
