'use client';

import { useState } from 'react';

function analyze(text: string) {
  if (!text.trim()) return null;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const chars = text.length;
  const tokens = text.match(/\p{L}+|\p{N}+|[^\p{L}\p{N}\s]+|\s+/gu) ?? [];
  let tokenCount = 0;
  for (const t of tokens) {
    if (/\p{L}+/u.test(t)) tokenCount += Math.ceil(t.length / 4);
    else if (/\p{N}+/u.test(t)) tokenCount += Math.ceil(t.length / 3);
    else tokenCount += 1;
  }
  const wordCount = words.length;
  const ratio = wordCount > 0 ? tokenCount / wordCount : 0;
  const freq: Record<string, number> = {};
  for (const w of words) {
    const key = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (key.length > 2) freq[key] = (freq[key] ?? 0) + 1;
  }
  const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
  return { tokenCount, wordCount, chars, ratio, sentences: sentences.length, paragraphs: paragraphs.length, topWords };
}

const EXAMPLE = `Large language models process text as tokens rather than words. A token can be a word, part of a word, or punctuation. Understanding tokenization helps you optimize prompts and reduce API costs. English text typically has a 1.2-1.4 token-per-word ratio, while code and special characters tend to tokenize less efficiently.`;

export default function TokenToWordRatioAnalyzer() {
  const [text, setText] = useState('');
  const result = analyze(text);

  const efficiency = result ? (result.ratio < 1.2 ? 'Excellent' : result.ratio < 1.4 ? 'Good' : result.ratio < 1.7 ? 'Average' : 'Poor') : '';
  const effColor = result ? (result.ratio < 1.2 ? '#4ade80' : result.ratio < 1.4 ? '#60a5fa' : result.ratio < 1.7 ? '#f59e0b' : '#f87171') : '#666';

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Input text</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setText(EXAMPLE)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>Example</button>
              {text && <button onClick={() => setText('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste any text to analyze its token-to-word ratio and efficiency..." style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 280, width: '100%', fontFamily: 'inherit', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {result ? (
            <>
              <div style={{ background: '#1a1a1a', border: `1px solid ${effColor}33`, borderRadius: 10, padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: effColor, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Token efficiency — {efficiency}</div>
                <div style={{ fontSize: 40, fontWeight: 700, color: '#f0f0f0', fontFamily: 'ui-monospace, monospace' }}>{result.ratio.toFixed(2)}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>tokens per word</div>
              </div>
              {[
                { label: 'Tokens', value: result.tokenCount.toLocaleString() },
                { label: 'Words', value: result.wordCount.toLocaleString() },
                { label: 'Characters', value: result.chars.toLocaleString() },
                { label: 'Sentences', value: result.sentences },
                { label: 'Paragraphs', value: result.paragraphs },
                { label: 'Chars per token', value: (result.chars / result.tokenCount).toFixed(1) },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#1a1a1a', borderRadius: 6 }}>
                  <span style={{ fontSize: 13, color: '#888' }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa', fontFamily: 'ui-monospace, monospace' }}>{row.value}</span>
                </div>
              ))}
              {result.topWords.length > 0 && (
                <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, color: '#555', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Top words</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {result.topWords.map(([word, count]) => (
                      <span key={word} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>{word} <span style={{ color: '#60a5fa' }}>{count}</span></span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 20, color: '#444', fontSize: 13, textAlign: 'center' }}>
              Paste text on the left to see analysis
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: 12, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 16px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[['< 1.2', 'Excellent', '#4ade80'], ['1.2–1.4', 'Good', '#60a5fa'], ['1.4–1.7', 'Average', '#f59e0b'], ['> 1.7', 'Poor', '#f87171']].map(([range, label, color]) => (
          <span key={range} style={{ fontSize: 12, color: '#555' }}><span style={{ color }}>{label}</span> {range}</span>
        ))}
      </div>
    </div>
  );
}
