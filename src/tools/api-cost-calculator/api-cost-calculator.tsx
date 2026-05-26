'use client';

import { useState } from 'react';

const MODELS = [
  // OpenAI
  { id: 'gpt-4o',           label: 'GPT-4o',              provider: 'OpenAI',    input: 2.50,   output: 10.00,  context: 128000 },
  { id: 'gpt-4o-mini',      label: 'GPT-4o mini',         provider: 'OpenAI',    input: 0.15,   output: 0.60,   context: 128000 },
  { id: 'gpt-4-turbo',      label: 'GPT-4 Turbo',         provider: 'OpenAI',    input: 10.00,  output: 30.00,  context: 128000 },
  { id: 'gpt-3.5-turbo',    label: 'GPT-3.5 Turbo',       provider: 'OpenAI',    input: 0.50,   output: 1.50,   context: 16385  },
  { id: 'o1',               label: 'o1',                   provider: 'OpenAI',    input: 15.00,  output: 60.00,  context: 200000 },
  { id: 'o1-mini',          label: 'o1-mini',              provider: 'OpenAI',    input: 3.00,   output: 12.00,  context: 128000 },
  { id: 'o3-mini',          label: 'o3-mini',              provider: 'OpenAI',    input: 1.10,   output: 4.40,   context: 200000 },
  // Anthropic
  { id: 'claude-opus-4',    label: 'Claude Opus 4',        provider: 'Anthropic', input: 15.00,  output: 75.00,  context: 200000 },
  { id: 'claude-sonnet-4',  label: 'Claude Sonnet 4',      provider: 'Anthropic', input: 3.00,   output: 15.00,  context: 200000 },
  { id: 'claude-haiku-3.5', label: 'Claude Haiku 3.5',     provider: 'Anthropic', input: 0.80,   output: 4.00,   context: 200000 },
  // Google
  { id: 'gemini-2.5-pro',   label: 'Gemini 2.5 Pro',       provider: 'Google',    input: 1.25,   output: 10.00,  context: 1048576 },
  { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash',     provider: 'Google',    input: 0.075,  output: 0.30,   context: 1000000 },
  // Meta
  { id: 'llama-3.1-405b',   label: 'Llama 3.1 405B',       provider: 'Meta',      input: 3.00,   output: 3.00,   context: 128000 },
  { id: 'llama-3.1-70b',    label: 'Llama 3.1 70B',        provider: 'Meta',      input: 0.59,   output: 0.79,   context: 128000 },
  { id: 'llama-3.1-8b',     label: 'Llama 3.1 8B',         provider: 'Meta',      input: 0.10,   output: 0.10,   context: 128000 },
  // Mistral
  { id: 'mistral-large',    label: 'Mistral Large',        provider: 'Mistral',   input: 3.00,   output: 9.00,   context: 128000 },
  { id: 'mistral-small',    label: 'Mistral Small',        provider: 'Mistral',   input: 0.20,   output: 0.60,   context: 128000 },
  // Cohere
  { id: 'command-r-plus',   label: 'Command R+',           provider: 'Cohere',    input: 2.50,   output: 10.00,  context: 128000 },
  { id: 'command-r',        label: 'Command R',            provider: 'Cohere',    input: 0.15,   output: 0.60,   context: 128000 },
  // DeepSeek
  { id: 'deepseek-v3',      label: 'DeepSeek V3',          provider: 'DeepSeek',  input: 0.27,   output: 1.10,   context: 64000  },
  { id: 'deepseek-r1',      label: 'DeepSeek R1',          provider: 'DeepSeek',  input: 0.55,   output: 2.19,   context: 64000  },
];

const PROVIDERS = ['All', ...Array.from(new Set(MODELS.map(m => m.provider)))];

function fmt(n: number): string {
  if (n === 0) return '$0.000000';
  if (n < 0.000001) return '< $0.000001';
  if (n < 0.01) return `$${n.toFixed(6)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
}

function fmtNum(n: number): string {
  return n.toLocaleString('en-US');
}

export default function ApiCostCalculator() {
  const [inputTokens, setInputTokens]   = useState('1000');
  const [outputTokens, setOutputTokens] = useState('500');
  const [requests, setRequests]         = useState('1');
  const [provider, setProvider]         = useState('All');
  const [sortBy, setSortBy]             = useState<'input' | 'total'>('total');

  const inp  = Math.max(0, parseInt(inputTokens  || '0', 10));
  const out  = Math.max(0, parseInt(outputTokens || '0', 10));
  const reqs = Math.max(1, parseInt(requests     || '1', 10));

  const filtered = MODELS.filter(m => provider === 'All' || m.provider === provider);

  const rows = filtered.map(m => {
    const inputCost  = (inp  / 1_000_000) * m.input  * reqs;
    const outputCost = (out  / 1_000_000) * m.output * reqs;
    const total      = inputCost + outputCost;
    return { ...m, inputCost, outputCost, total };
  }).sort((a, b) => sortBy === 'total' ? a.total - b.total : a.inputCost - b.inputCost);

  const cheapest = rows[0];
  const mostExpensive = rows[rows.length - 1];

  const inputStyle = {
    background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8,
    padding: '10px 14px', color: '#f0f0f0', fontSize: 14,
    fontFamily: 'ui-monospace, monospace', outline: 'none', width: '100%',
  };

  return (
    <div style={{ fontFamily: 'inherit' }}>

      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Input tokens',  value: inputTokens,   set: setInputTokens,   hint: 'per request' },
          { label: 'Output tokens', value: outputTokens,  set: setOutputTokens,  hint: 'per request' },
          { label: 'Requests',      value: requests,       set: setRequests,       hint: 'total calls' },
        ].map(f => (
          <div key={f.label}>
            <div style={{ fontSize: 11, color: '#666', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
              {f.label} <span style={{ color: '#444', fontStyle: 'normal' }}>({f.hint})</span>
            </div>
            <input
              type="number"
              min="0"
              value={f.value}
              onChange={e => f.set(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#3b82f6')}
              onBlur={e  => (e.target.style.borderColor = '#2a2a2a')}
            />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#666' }}>Provider:</span>
        {PROVIDERS.map(p => (
          <button key={p} onClick={() => setProvider(p)} style={{
            background: provider === p ? 'rgba(59,130,246,0.12)' : '#1a1a1a',
            border: `1px solid ${provider === p ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`,
            color: provider === p ? '#60a5fa' : '#888',
            padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
          }}>{p}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#666' }}>Sort:</span>
          {(['total', 'input'] as const).map(s => (
            <button key={s} onClick={() => setSortBy(s)} style={{
              background: sortBy === s ? 'rgba(59,130,246,0.12)' : '#1a1a1a',
              border: `1px solid ${sortBy === s ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`,
              color: sortBy === s ? '#60a5fa' : '#888',
              padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', textTransform: 'capitalize',
            }}>{s} cost</button>
          ))}
        </div>
      </div>

      {/* Summary */}
      {cheapest && (
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16,
        }}>
          <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, color: '#4ade80', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Cheapest</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{cheapest.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#4ade80' }}>{fmt(cheapest.total)}</div>
          </div>
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, color: '#f87171', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Most expensive</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{mostExpensive.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#f87171' }}>{fmt(mostExpensive.total)}</div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 110px',
          padding: '10px 16px', borderBottom: '1px solid #222',
          fontSize: 11, color: '#666', letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          <span>Model</span>
          <span style={{ textAlign: 'right' }}>Input/1M</span>
          <span style={{ textAlign: 'right' }}>Output/1M</span>
          <span style={{ textAlign: 'right' }}>Input cost</span>
          <span style={{ textAlign: 'right' }}>Total cost</span>
        </div>

        {rows.map((m, i) => {
          const isCheapest = i === 0;
          return (
            <div key={m.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 110px',
              padding: '11px 16px',
              borderBottom: i < rows.length - 1 ? '1px solid #1e1e1e' : 'none',
              background: isCheapest ? 'rgba(74,222,128,0.03)' : 'transparent',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: '#555' }}>{m.provider} · {fmtNum(m.context)} ctx</div>
                </div>
                {isCheapest && <span style={{ fontSize: 10, background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>best</span>}
              </div>
              <div style={{ textAlign: 'right', fontSize: 12, color: '#888', fontFamily: 'ui-monospace, monospace' }}>${m.input}</div>
              <div style={{ textAlign: 'right', fontSize: 12, color: '#888', fontFamily: 'ui-monospace, monospace' }}>${m.output}</div>
              <div style={{ textAlign: 'right', fontSize: 13, color: '#60a5fa', fontFamily: 'ui-monospace, monospace', fontWeight: 500 }}>{fmt(m.inputCost)}</div>
              <div style={{ textAlign: 'right', fontSize: 14, fontWeight: 700, color: isCheapest ? '#4ade80' : '#f0f0f0', fontFamily: 'ui-monospace, monospace' }}>{fmt(m.total)}</div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 11, color: '#444', marginTop: 10 }}>
        Prices in USD per 1M tokens. Totals = ({fmtNum(inp)} input + {fmtNum(out)} output) × {fmtNum(reqs)} requests. Updated May 2026.
      </div>
    </div>
  );
}
