'use client';

import { useState } from 'react';

type Style = 'basic' | 'stepbystep' | 'xml' | 'scratchpad';

const TEMPLATES: Record<Style, (prompt: string) => string> = {
  basic: (p) => `${p}\n\nLet's think through this step by step.`,
  stepbystep: (p) => `${p}\n\nPlease solve this by:\n1. Breaking down the problem\n2. Working through each part carefully\n3. Checking your reasoning\n4. Providing the final answer`,
  xml: (p) => `${p}\n\n<thinking>\nWork through this problem step by step before giving your final answer. Consider multiple angles, check your logic, and correct any mistakes.\n</thinking>\n\n<answer>\n[Your final answer here]\n</answer>`,
  scratchpad: (p) => `${p}\n\nBefore responding, use a scratchpad to think through this privately:\n\n<scratchpad>\n[Think out loud here — explore the problem, consider edge cases, work through the logic]\n</scratchpad>\n\nNow provide your final response based on your thinking above.`,
};

const STYLE_INFO: Record<Style, { label: string; desc: string }> = {
  basic: { label: 'Basic CoT', desc: 'Simple "think step by step" suffix' },
  stepbystep: { label: 'Step-by-Step', desc: 'Structured numbered reasoning' },
  xml: { label: 'XML Tags', desc: 'Claude-style thinking + answer tags' },
  scratchpad: { label: 'Scratchpad', desc: 'Private reasoning before answering' },
};

const EXAMPLES = [
  'If a train travels 120 miles in 2 hours, what is its average speed?',
  'Should I use PostgreSQL or MongoDB for a social media app with 1M users?',
  'What are the pros and cons of microservices vs monolithic architecture?',
];

export default function ChainOfThoughtWrapper() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<Style>('xml');
  const [copied, setCopied] = useState(false);

  const output = prompt.trim() ? TEMPLATES[style](prompt.trim()) : '';

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {(Object.entries(STYLE_INFO) as [Style, typeof STYLE_INFO[Style]][]).map(([val, info]) => (
          <button key={val} onClick={() => setStyle(val)} style={{ background: style === val ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${style === val ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: style === val ? '#60a5fa' : '#888', padding: '6px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: style === val ? 600 : 400, textAlign: 'left' }}>
            <div>{info.label}</div>
            <div style={{ fontSize: 10, color: style === val ? '#60a5fa' : '#555', marginTop: 2 }}>{info.desc}</div>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your prompt</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {EXAMPLES.map((ex, i) => (
                <button key={i} onClick={() => setPrompt(ex)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>Ex {i + 1}</button>
              ))}
              {prompt && <button onClick={() => setPrompt('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Paste your prompt or question here..." style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 200, width: '100%', fontFamily: 'inherit', outline: 'none' }} />
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px', fontSize: 12, color: '#555', lineHeight: 1.6 }}>
            <div style={{ color: '#888', fontWeight: 600, marginBottom: 4 }}>When to use {STYLE_INFO[style].label}:</div>
            {style === 'basic' && 'Best for simple questions where you just want the model to slow down and reason carefully.'}
            {style === 'stepbystep' && 'Good for math, logic puzzles, and problems with clear sequential steps.'}
            {style === 'xml' && "Best for Claude — separates reasoning from the final answer, reducing hallucinations."}
            {style === 'scratchpad' && "Useful when you want private reasoning that doesn't appear in the final response."}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: output ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{output ? 'CoT prompt ready' : 'Output'}</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 300, fontFamily: 'ui-monospace, monospace', fontSize: 13, lineHeight: 1.7, color: output ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto', flex: 1 }}>
            {output || 'Your prompt with CoT scaffolding will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
