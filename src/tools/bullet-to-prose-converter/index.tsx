'use client';

import { useState } from 'react';

function bulletsToProse(text: string, style: string): string {
  if (!text.trim()) return '';
  const lines = text.split('\n');
  const bullets: string[] = [];
  let intro = '';
  let hasIntro = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const bulletMatch = trimmed.match(/^[-*•·▪▸►>+]\s+(.+)/) ?? trimmed.match(/^\d+[.)]\s+(.+)/);
    if (bulletMatch) {
      bullets.push(bulletMatch[1].replace(/[.:]$/, ''));
    } else if (!hasIntro && bullets.length === 0) {
      intro = trimmed;
      hasIntro = true;
    }
  }

  if (bullets.length === 0) return text;

  let prose = '';
  if (style === 'flowing') {
    if (intro) prose = intro + ' ';
    if (bullets.length === 1) {
      prose += bullets[0] + '.';
    } else if (bullets.length === 2) {
      prose += bullets[0] + ' and ' + bullets[1].toLowerCase() + '.';
    } else {
      const last = bullets[bullets.length - 1];
      const rest = bullets.slice(0, -1);
      prose += rest.join(', ') + ', and ' + last.toLowerCase() + '.';
    }
  } else if (style === 'sentences') {
    if (intro) prose = intro + ' ';
    prose += bullets.map(b => {
      const s = b.charAt(0).toUpperCase() + b.slice(1);
      return s.endsWith('.') ? s : s + '.';
    }).join(' ');
  } else {
    if (intro) prose = intro + '\n\n';
    prose += bullets.map(b => {
      const s = b.charAt(0).toUpperCase() + b.slice(1);
      return s.endsWith('.') ? s : s + '.';
    }).join(' ');
  }

  return prose.trim();
}

const EXAMPLE = `Key benefits of using LLMs in production:
- Reduced development time for NLP tasks
- Improved user experience through natural language interfaces
- Lower barrier to entry for complex AI features
- Flexibility to handle varied input formats
- Cost savings compared to custom model training`;

export default function BulletToProseConverter() {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState('sentences');
  const [copied, setCopied] = useState(false);
  const output = bulletsToProse(input, style);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: '#666', alignSelf: 'center' }}>Style:</span>
        {[['sentences', 'Sentences'], ['flowing', 'Flowing list'], ['paragraph', 'Paragraph']].map(([val, label]) => (
          <button key={val} onClick={() => setStyle(val)} style={{ background: style === val ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${style === val ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: style === val ? '#60a5fa' : '#888', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: style === val ? 600 : 400 }}>{label}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bullet points</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setInput(EXAMPLE)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>Example</button>
              {input && <button onClick={() => setInput('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={"- First bullet point\n- Second bullet point\n- Third bullet point"} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 260, width: '100%', fontFamily: 'inherit', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: output ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: output ? 600 : 400 }}>{output ? 'Prose ready' : 'Prose output'}</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 260, fontSize: 13, lineHeight: 1.8, color: output ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto' }}>
            {output || 'Prose will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
