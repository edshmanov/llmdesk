'use client';

import { useState } from 'react';

type DiffPart = { text: string; type: 'same' | 'added' | 'removed' };

function diffWords(a: string, b: string): { left: DiffPart[]; right: DiffPart[] } {
  const wordsA = a.match(/\S+|\s+/g) ?? [];
  const wordsB = b.match(/\S+|\s+/g) ?? [];
  const m = wordsA.length;
  const n = wordsB.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = wordsA[i-1] === wordsB[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);

  const left: DiffPart[] = [];
  const right: DiffPart[] = [];
  let i = m, j = n;
  const ops: ('same'|'del'|'ins')[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && wordsA[i-1] === wordsB[j-1]) { ops.unshift('same'); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { ops.unshift('ins'); j--; }
    else { ops.unshift('del'); i--; }
  }

  let ai = 0, bi = 0;
  for (const op of ops) {
    if (op === 'same') { left.push({ text: wordsA[ai], type: 'same' }); right.push({ text: wordsB[bi], type: 'same' }); ai++; bi++; }
    else if (op === 'del') { left.push({ text: wordsA[ai], type: 'removed' }); ai++; }
    else { right.push({ text: wordsB[bi], type: 'added' }); bi++; }
  }
  return { left, right };
}

function renderDiff(parts: DiffPart[]) {
  return parts.map((p, i) => {
    if (p.type === 'same') return <span key={i}>{p.text}</span>;
    if (p.type === 'added') return <mark key={i} style={{ background: 'rgba(74,222,128,0.2)', color: '#4ade80', borderRadius: 2, padding: '1px 0' }}>{p.text}</mark>;
    return <mark key={i} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', borderRadius: 2, padding: '1px 0', textDecoration: 'line-through' }}>{p.text}</mark>;
  });
}

const EXAMPLE_A = `You are a helpful assistant. Answer questions clearly and concisely. If you don't know something, say so. Be polite and professional.`;
const EXAMPLE_B = `You are an expert assistant specializing in technical topics. Answer questions clearly, concisely, and accurately. If you don't know something, admit it openly. Always be polite, professional, and cite sources when possible.`;

export default function PromptDiffChecker() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');

  const hasContent = left.trim() && right.trim();
  const { left: leftDiff, right: rightDiff } = hasContent ? diffWords(left, right) : { left: [], right: [] };
  const addedCount = rightDiff.filter(p => p.type === 'added').length;
  const removedCount = leftDiff.filter(p => p.type === 'removed').length;

  const ta: React.CSSProperties = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 160, width: '100%', fontFamily: 'inherit', outline: 'none' };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Version A (original)</span>
            <button onClick={() => { setLeft(EXAMPLE_A); setRight(EXAMPLE_B); }} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '2px 8px', borderRadius: 4, cursor: 'pointer' }}>Example</button>
          </div>
          <textarea style={ta} value={left} onChange={e => setLeft(e.target.value)} placeholder="Paste your original prompt here..." />
        </div>
        <div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Version B (updated)</span>
          </div>
          <textarea style={ta} value={right} onChange={e => setRight(e.target.value)} placeholder="Paste your updated prompt here..." />
        </div>
      </div>

      {hasContent ? (
        <>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 16px', marginBottom: 12, display: 'flex', gap: 24 }}>
            <span style={{ fontSize: 12, color: '#4ade80' }}>+{addedCount} words added</span>
            <span style={{ fontSize: 12, color: '#f87171' }}>-{removedCount} words removed</span>
            <span style={{ fontSize: 12, color: '#888' }}>{left.split(/\s+/).filter(Boolean).length} → {right.split(/\s+/).filter(Boolean).length} words</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Version A — what was removed</div>
              <div style={{ background: '#1a1a1a', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: 14, fontSize: 13, lineHeight: 1.7, minHeight: 100 }}>{renderDiff(leftDiff)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Version B — what was added</div>
              <div style={{ background: '#1a1a1a', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 8, padding: 14, fontSize: 13, lineHeight: 1.7, minHeight: 100 }}>{renderDiff(rightDiff)}</div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 20, textAlign: 'center', color: '#444', fontSize: 13 }}>
          Paste two prompt versions above to see word-level differences
        </div>
      )}
    </div>
  );
}
