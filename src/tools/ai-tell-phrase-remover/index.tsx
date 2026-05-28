'use client';

import { useState } from 'react';

const AI_PHRASES = [
  "it's worth noting", "it is worth noting", "notably", "it's important to note",
  "it is important to note", "importantly", "certainly", "absolutely", "of course",
  "definitely", "undoubtedly", "needless to say", "as an ai",
  "as an ai language model", "i'm just an ai", "i am just an ai",
  "as a large language model", "i must emphasize", "it's crucial to",
  "it is crucial to", "it's essential to", "it is essential to",
  "i'd be happy to", "i would be happy to", "i'd be glad to",
  "great question", "excellent question", "that's a great question",
  "in conclusion", "to summarize", "to sum up", "in summary", "in a nutshell",
  "at the end of the day", "the bottom line is", "all in all",
  "delve into", "dive deep", "deep dive", "let's explore", "let us explore",
  "it goes without saying", "as you may know", "as we all know",
  "i hope this helps", "i hope this was helpful", "feel free to ask",
  "please don't hesitate to", "please do not hesitate to",
  "fascinating", "intriguing", "with that said", "having said that",
  "that being said", "furthermore", "moreover", "leverage", "utilize",
];

function removeAiPhrases(text: string): { result: string; removed: string[] } {
  if (!text) return { result: '', removed: [] };
  let result = text;
  const removed: string[] = [];
  for (const phrase of AI_PHRASES) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b[,.]?\\s*`, 'gi');
    if (regex.test(result)) {
      removed.push(phrase);
      result = result.replace(new RegExp(`\\b${escaped}\\b[,.]?\\s*`, 'gi'), ' ');
    }
  }
  result = result.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/gm, '').trim();
  return { result, removed: [...new Set(removed)] };
}

const EXAMPLE = `Great question! As an AI language model, I'd be happy to help you understand machine learning. It's worth noting that this is a fascinating field.

Certainly, deep learning is a subset of machine learning. Furthermore, neural networks leverage complex mathematical operations. It goes without saying that data quality is crucial.

In conclusion, I hope this helps! Feel free to ask if you have more questions.`;

export default function AiTellPhraseRemover() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const { result, removed } = removeAiPhrases(input);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI-generated text</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setInput(EXAMPLE)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>Example</button>
              {input && <button onClick={() => setInput('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste AI-generated text to remove tell-tale phrases..." style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 260, width: '100%', fontFamily: 'inherit', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: removed.length > 0 ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{removed.length > 0 ? `Removed ${removed.length} phrases` : 'Output'}</span>
            {result && <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 260, fontSize: 13, lineHeight: 1.6, color: result ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto' }}>
            {result || 'Cleaned text will appear here...'}
          </div>
        </div>
      </div>
      {removed.length > 0 && (
        <div style={{ marginTop: 12, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 16px' }}>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Removed phrases</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {removed.map(p => (
              <span key={p} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>{p}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
