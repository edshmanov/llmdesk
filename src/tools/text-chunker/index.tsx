'use client';

import { useState, useMemo } from 'react';

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

function chunkText(text: string, chunkSize: number, overlap: number, method: string): string[] {
  if (!text.trim()) return [];
  let pieces: string[];
  if (method === 'sentence') {
    pieces = text.match(/[^.!?]+[.!?]+[\s]*/g) ?? [text];
  } else if (method === 'paragraph') {
    pieces = text.split(/\n\s*\n/).filter(Boolean);
  } else {
    pieces = text.match(/\S+\s*/g) ?? [];
  }
  const chunks: string[] = [];
  let current = '';
  let currentTokens = 0;
  for (const piece of pieces) {
    const pieceTokens = estimateTokens(piece);
    if (currentTokens + pieceTokens > chunkSize && current.trim()) {
      chunks.push(current.trim());
      if (overlap > 0) {
        const words = current.split(/\s+/);
        let kept = '';
        let keptTokens = 0;
        for (let i = words.length - 1; i >= 0; i--) {
          keptTokens += estimateTokens(words[i]);
          if (keptTokens >= overlap) break;
          kept = words[i] + ' ' + kept;
        }
        current = kept + piece;
        currentTokens = estimateTokens(current);
      } else {
        current = piece;
        currentTokens = pieceTokens;
      }
    } else {
      current += piece;
      currentTokens += pieceTokens;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

const EXAMPLE_TEXT = `Large language models have a context window limit, which means they can only process a certain number of tokens at once. When working with long documents, you need to split them into smaller pieces before sending them to the model.

This process is called chunking. Good chunking strategies preserve semantic meaning by keeping related sentences together. The goal is to create chunks that are small enough to fit in the context window, but large enough to contain meaningful information.

There are several chunking strategies: fixed-size chunks split text every N tokens regardless of content; sentence-based chunks respect natural sentence boundaries; paragraph-based chunks keep paragraphs intact. Overlapping chunks help maintain context across chunk boundaries, which improves retrieval quality in RAG pipelines.`;

export default function TextChunker() {
  const [text, setText] = useState('');
  const [chunkSize, setChunkSize] = useState(200);
  const [overlap, setOverlap] = useState(20);
  const [method, setMethod] = useState('sentence');
  const [selectedChunk, setSelectedChunk] = useState<number | null>(null);

  const chunks = useMemo(() => chunkText(text, chunkSize, overlap, method), [text, chunkSize, overlap, method]);
  const totalTokens = estimateTokens(text);

  const colors = ['rgba(59,130,246,0.15)', 'rgba(168,85,247,0.15)', 'rgba(245,158,11,0.15)', 'rgba(74,222,128,0.15)', 'rgba(239,68,68,0.15)'];
  const borderColors = ['rgba(59,130,246,0.4)', 'rgba(168,85,247,0.4)', 'rgba(245,158,11,0.4)', 'rgba(74,222,128,0.4)', 'rgba(239,68,68,0.4)'];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' }}>Chunk size (tokens) <span style={{ color: '#3b82f6' }}>{chunkSize}</span></label>
          <input type="range" min={50} max={1000} step={50} value={chunkSize} onChange={e => setChunkSize(+e.target.value)} style={{ width: '100%', accentColor: '#3b82f6' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#444' }}><span>50</span><span>1000</span></div>
        </div>
        <div>
          <label style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' }}>Overlap (tokens) <span style={{ color: '#3b82f6' }}>{overlap}</span></label>
          <input type="range" min={0} max={100} step={10} value={overlap} onChange={e => setOverlap(+e.target.value)} style={{ width: '100%', accentColor: '#3b82f6' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#444' }}><span>0</span><span>100</span></div>
        </div>
        <div>
          <label style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' }}>Split by</label>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['sentence', 'Sentence'], ['paragraph', 'Paragraph'], ['token', 'Token']].map(([val, label]) => (
              <button key={val} onClick={() => setMethod(val)} style={{ background: method === val ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${method === val ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: method === val ? '#60a5fa' : '#888', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: method === val ? 600 : 400 }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Input text {text && <span style={{ color: '#3b82f6' }}>· {totalTokens} tokens</span>}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setText(EXAMPLE_TEXT)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>Example</button>
              {text && <button onClick={() => setText('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your document or long text to split into chunks for RAG pipelines..." style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 280, width: '100%', fontFamily: 'ui-monospace, monospace', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{chunks.length > 0 ? `${chunks.length} chunks` : 'Chunks'}</span>
            {chunks.length > 0 && <span style={{ fontSize: 11, color: '#555' }}>avg {Math.round(chunks.reduce((s, c) => s + estimateTokens(c), 0) / chunks.length)} tokens/chunk</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 340, overflowY: 'auto' }}>
            {chunks.length === 0 ? (
              <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 20, color: '#444', fontSize: 13, textAlign: 'center' }}>Chunks will appear here...</div>
            ) : chunks.map((chunk, i) => (
              <div key={i} onClick={() => setSelectedChunk(selectedChunk === i ? null : i)} style={{ background: selectedChunk === i ? colors[i % colors.length] : '#1a1a1a', border: `1px solid ${selectedChunk === i ? borderColors[i % borderColors.length] : '#2a2a2a'}`, borderRadius: 8, padding: '10px 14px', cursor: 'pointer', transition: 'all .15s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: '#60a5fa', fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>Chunk {i + 1}</span>
                  <span style={{ fontSize: 11, color: '#555', fontFamily: 'ui-monospace, monospace' }}>{estimateTokens(chunk)} tokens</span>
                </div>
                <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5, maxHeight: selectedChunk === i ? 'none' : 60, overflow: 'hidden', fontFamily: 'ui-monospace, monospace' }}>{chunk}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {chunks.length > 0 && (
        <div style={{ marginTop: 12, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 16px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[{ label: 'Total tokens', value: totalTokens.toLocaleString() }, { label: 'Chunks', value: chunks.length }, { label: 'Chunk size', value: `${chunkSize} tokens` }, { label: 'Overlap', value: `${overlap} tokens` }, { label: 'Method', value: method }].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#60a5fa', fontFamily: 'ui-monospace, monospace' }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
