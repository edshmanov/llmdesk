'use client';

import { useState } from 'react';

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

function slimPrompt(text: string, options: Record<string, boolean>): string {
  if (!text) return '';
  let s = text;
  if (options.removeExtraSpaces) {
    s = s.replace(/[ \t]+/g, ' ');
    s = s.replace(/\n{3,}/g, '\n\n');
  }
  if (options.removePolite) {
    s = s.replace(/\b(please|kindly|could you|would you mind|i would appreciate it if you|if you don't mind)\b\s*/gi, '');
    s = s.replace(/\b(thank you|thanks in advance|i appreciate your help)\b[.,]?\s*/gi, '');
  }
  if (options.removeHedging) {
    s = s.replace(/\b(i think|i believe|in my opinion|it seems like|perhaps|maybe|possibly|might)\b\s*/gi, '');
    s = s.replace(/\b(as you know|as mentioned|as stated above|as discussed)\b[,]?\s*/gi, '');
  }
  if (options.shortenInstructions) {
    s = s.replace(/\bplease make sure to\b/gi, 'ensure');
    s = s.replace(/\bin order to\b/gi, 'to');
    s = s.replace(/\bfor the purpose of\b/gi, 'for');
    s = s.replace(/\bdue to the fact that\b/gi, 'because');
    s = s.replace(/\bat this point in time\b/gi, 'now');
    s = s.replace(/\bin the event that\b/gi, 'if');
    s = s.replace(/\bprior to\b/gi, 'before');
    s = s.replace(/\bsubsequent to\b/gi, 'after');
    s = s.replace(/\ba large number of\b/gi, 'many');
    s = s.replace(/\bthe majority of\b/gi, 'most');
  }
  if (options.removeRedundant) {
    s = s.replace(/\b(very|really|quite|rather|somewhat|fairly|extremely|absolutely|completely|totally|utterly)\b\s*/gi, '');
    s = s.replace(/\b(basically|essentially|fundamentally|generally speaking)\b[,]?\s*/gi, '');
  }
  s = s.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  return s;
}

export default function PromptTokenSlimmer() {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState({
    removeExtraSpaces: true,
    removePolite: true,
    removeHedging: true,
    shortenInstructions: true,
    removeRedundant: true,
  });
  const [copied, setCopied] = useState(false);

  const output = slimPrompt(input, options);
  const inputTokens = estimateTokens(input);
  const outputTokens = estimateTokens(output);
  const saved = inputTokens - outputTokens;
  const savedPct = inputTokens > 0 ? (saved / inputTokens) * 100 : 0;

  const toggle = (k: string) => setOptions(o => ({ ...o, [k]: !o[k as keyof typeof o] }));

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {[
          ['removeExtraSpaces', 'Extra whitespace'],
          ['removePolite', 'Polite filler'],
          ['removeHedging', 'Hedging phrases'],
          ['shortenInstructions', 'Verbose phrases'],
          ['removeRedundant', 'Redundant adverbs'],
        ].map(([key, label]) => (
          <button key={key} onClick={() => toggle(key)} style={{ background: options[key as keyof typeof options] ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${options[key as keyof typeof options] ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: options[key as keyof typeof options] ? '#60a5fa' : '#888', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: options[key as keyof typeof options] ? 600 : 400 }}>{label}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Original {input && <span style={{ color: '#f59e0b' }}>· {inputTokens} tokens</span>}</span>
            {input && <button onClick={() => setInput('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your prompt here to slim it down..." style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 280, width: '100%', fontFamily: 'inherit', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: saved > 0 ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              {saved > 0 ? `Saved ${saved} tokens (${savedPct.toFixed(0)}%)` : `Slimmed · ${outputTokens} tokens`}
            </span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 280, fontSize: 13, lineHeight: 1.6, color: output ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto' }}>
            {output || 'Slimmed prompt will appear here...'}
          </div>
        </div>
      </div>
      {saved > 0 && (
        <div style={{ marginTop: 12, background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 8, padding: '10px 16px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: '#4ade80' }}>Before: {inputTokens} tokens</span>
          <span style={{ fontSize: 12, color: '#4ade80' }}>After: {outputTokens} tokens</span>
          <span style={{ fontSize: 12, color: '#4ade80' }}>Saved: {saved} tokens ({savedPct.toFixed(1)}%)</span>
        </div>
      )}
    </div>
  );
}
