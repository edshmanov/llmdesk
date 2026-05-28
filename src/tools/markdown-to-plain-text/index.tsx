'use client';

import { useState } from 'react';

function mdToPlain(md: string): string {
  if (!md) return '';
  let s = md;
  s = s.replace(/```[\s\S]*?```/g, (m) => m.replace(/```[a-z]*\n?/gi, '').replace(/```/g, ''));
  s = s.replace(/`([^`]+)`/g, '$1');
  s = s.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  s = s.replace(/^#{1,6}\s+/gm, '');
  s = s.replace(/\*\*\*(.+?)\*\*\*/g, '$1');
  s = s.replace(/\*\*(.+?)\*\*/g, '$1');
  s = s.replace(/\*(.+?)\*/g, '$1');
  s = s.replace(/___(.+?)___/g, '$1');
  s = s.replace(/__(.+?)__/g, '$1');
  s = s.replace(/_(.+?)_/g, '$1');
  s = s.replace(/^>\s+/gm, '');
  s = s.replace(/^[-*_]{3,}\s*$/gm, '');
  s = s.replace(/^[\s]*[-*+]\s+/gm, '');
  s = s.replace(/^[\s]*\d+\.\s+/gm, '');
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s.trim();
}

const EXAMPLE = `# Getting Started with LLMs

Large language models like **GPT-4** and _Claude_ have transformed AI.

## Key concepts

- **Tokens**: The basic unit of text
- **Context window**: Maximum input length

> Note: Always validate model outputs.

Check the [official docs](https://example.com) for more info.

\`\`\`python
import openai
\`\`\``;

export default function MarkdownToPlainText() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const output = mdToPlain(input);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Markdown input</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setInput(EXAMPLE)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>Example</button>
              {input && <button onClick={() => setInput('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your markdown text here..." style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 300, width: '100%', fontFamily: 'ui-monospace, monospace', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: output ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: output ? 600 : 400 }}>{output ? 'Plain text ready' : 'Plain text output'}</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 300, fontSize: 13, lineHeight: 1.6, color: output ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto' }}>
            {output || 'Plain text will appear here...'}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 16px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {['Headings', 'Bold & italic', 'Code blocks', 'Links', 'Lists', 'Blockquotes', 'HTML tags'].map(tag => (
          <span key={tag} style={{ fontSize: 12, color: '#666', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#4ade80' }}>✓</span> {tag}</span>
        ))}
      </div>
    </div>
  );
}
