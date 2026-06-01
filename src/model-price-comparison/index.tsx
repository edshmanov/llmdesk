'use client';

import { useState } from 'react';

const MODELS = [
  { id: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', input: 2.50, output: 10.00, context: 128000, speed: 'Fast' },
  { id: 'gpt-4o-mini', label: 'GPT-4o mini', provider: 'OpenAI', input: 0.15, output: 0.60, context: 128000, speed: 'Very Fast' },
  { id: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'OpenAI', input: 10.00, output: 30.00, context: 128000, speed: 'Fast' },
  { id: 'o1', label: 'o1', provider: 'OpenAI', input: 15.00, output: 60.00, context: 200000, speed: 'Slow' },
  { id: 'o3-mini', label: 'o3-mini', provider: 'OpenAI', input: 1.10, output: 4.40, context: 200000, speed: 'Medium' },
  { id: 'claude-opus-4', label: 'Claude Opus 4', provider: 'Anthropic', input: 15.00, output: 75.00, context: 200000, speed: 'Medium' },
  { id: 'claude-sonnet-4', label: 'Claude Sonnet 4', provider: 'Anthropic', input: 3.00, output: 15.00, context: 200000, speed: 'Fast' },
  { id: 'claude-haiku-3.5', label: 'Claude Haiku 3.5', provider: 'Anthropic', input: 0.80, output: 4.00, context: 200000, speed: 'Very Fast' },
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', provider: 'Google', input: 1.25, output: 10.00, context: 1048576, speed: 'Fast' },
  { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', provider: 'Google', input: 0.075, output: 0.30, context: 1000000, speed: 'Very Fast' },
  { id: 'llama-3.1-405b', label: 'Llama 3.1 405B', provider: 'Meta', input: 3.00, output: 3.00, context: 128000, speed: 'Medium' },
  { id: 'llama-3.1-70b', label: 'Llama 3.1 70B', provider: 'Meta', input: 0.59, output: 0.79, context: 128000, speed: 'Fast' },
  { id: 'mistral-large', label: 'Mistral Large', provider: 'Mistral', input: 3.00, output: 9.00, context: 128000, speed: 'Fast' },
  { id: 'deepseek-v3', label: 'DeepSeek V3', provider: 'DeepSeek', input: 0.27, output: 1.10, context: 64000, speed: 'Fast' },
  { id: 'deepseek-r1', label: 'DeepSeek R1', provider: 'DeepSeek', input: 0.55, output: 2.19, context: 64000, speed: 'Medium' },
];

type SortKey = 'input' | 'output' | 'context' | 'label';

export default function ModelPriceComparison() {
  const [sort, setSort] = useState<SortKey>('input');
  const [provider, setProvider] = useState('All');
  const [highlight, setHighlight] = useState('');

  const providers = ['All', ...Array.from(new Set(MODELS.map(m => m.provider)))];
  const filtered = MODELS
    .filter(m => provider === 'All' || m.provider === provider)
    .sort((a, b) => sort === 'label' ? a.label.localeCompare(b.label) : sort === 'context' ? b.context - a.context : (a[sort] as number) - (b[sort] as number));

  const minInput = Math.min(...filtered.map(m => m.input));
  const minOutput = Math.min(...filtered.map(m => m.output));
  const speedColor = (s: string) => s === 'Very Fast' ? '#4ade80' : s === 'Fast' ? '#60a5fa' : s === 'Medium' ? '#f59e0b' : '#f87171';

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: '#666', alignSelf: 'center' }}>Provider:</span>
          {providers.map(p => (
            <button key={p} onClick={() => setProvider(p)} style={{ background: provider === p ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${provider === p ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: provider === p ? '#60a5fa' : '#888', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: provider === p ? 600 : 400 }}>{p}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: '#666', alignSelf: 'center' }}>Sort:</span>
          {[['input', 'Input price'], ['output', 'Output price'], ['context', 'Context'], ['label', 'Name']].map(([val, label]) => (
            <button key={val} onClick={() => setSort(val as SortKey)} style={{ background: sort === val ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${sort === val ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: sort === val ? '#60a5fa' : '#888', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: sort === val ? 600 : 400 }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 100px 110px 80px', padding: '10px 16px', borderBottom: '1px solid #222', fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <span>Model</span>
          <span style={{ textAlign: 'right' }}>Input/1M</span>
          <span style={{ textAlign: 'right' }}>Output/1M</span>
          <span style={{ textAlign: 'right' }}>Context</span>
          <span style={{ textAlign: 'right' }}>Speed</span>
        </div>
        {filtered.map((m, i) => (
          <div key={m.id} onClick={() => setHighlight(highlight === m.id ? '' : m.id)} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 100px 110px 80px', padding: '11px 16px', borderBottom: i < filtered.length - 1 ? '1px solid #1e1e1e' : 'none', background: highlight === m.id ? 'rgba(59,130,246,0.06)' : 'transparent', cursor: 'pointer', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: '#555' }}>{m.provider}</div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'ui-monospace, monospace', fontSize: 13, fontWeight: m.input === minInput ? 700 : 400, color: m.input === minInput ? '#4ade80' : '#f0f0f0' }}>${m.input}</div>
            <div style={{ textAlign: 'right', fontFamily: 'ui-monospace, monospace', fontSize: 13, fontWeight: m.output === minOutput ? 700 : 400, color: m.output === minOutput ? '#4ade80' : '#f0f0f0' }}>${m.output}</div>
            <div style={{ textAlign: 'right', fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#888' }}>{m.context >= 1000000 ? (m.context / 1000000).toFixed(1) + 'M' : (m.context / 1000) + 'k'}</div>
            <div style={{ textAlign: 'right', fontSize: 11, color: speedColor(m.speed), fontWeight: 600 }}>{m.speed}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#444' }}>Prices in USD per 1M tokens. Updated May 2026. Click a row to highlight.</div>
    </div>
  );
}
