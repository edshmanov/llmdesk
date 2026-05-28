'use client';

import { useState } from 'react';

function stripEmojis(text: string, mode: string): string {
  if (!text) return '';
  const emojiRegex = /[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27FF}]|[\u{2B00}-\u{2BFF}]|[\u{FE00}-\u{FEFF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA9F}]/gu;
  if (mode === 'all') {
    return text.replace(emojiRegex, '').replace(/\s{2,}/g, ' ').trim();
  }
  if (mode === 'start') {
    return text.replace(/^[\s\u{1F000}-\u{1FFFF}\u{2600}-\u{27FF}]*/gu, '').trim();
  }
  return text.replace(emojiRegex, '').replace(/\s{2,}/g, ' ').trim();
}

const EXAMPLE = `🚀 Exciting news! 🎉 We just launched our new AI product! 🤖

✨ Key features:
- 🔥 Blazing fast performance
- 💪 Powerful integrations
- 🎯 Precision results

👇 Check it out below!
❤️ Don't forget to like and share! 🙏`;

export default function EmojiStripper() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('all');
  const [copied, setCopied] = useState(false);
  const output = stripEmojis(input, mode);
  const emojiCount = (input.match(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27FF}]/gu) ?? []).length;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: '#666', alignSelf: 'center' }}>Mode:</span>
        {[['all', 'Remove all emojis'], ['start', 'Remove leading only']].map(([val, label]) => (
          <button key={val} onClick={() => setMode(val)} style={{ background: mode === val ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${mode === val ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: mode === val ? '#60a5fa' : '#888', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: mode === val ? 600 : 400 }}>{label}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Input {input && emojiCount > 0 && <span style={{ color: '#f59e0b' }}>· {emojiCount} emojis</span>}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setInput(EXAMPLE)} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>Example</button>
              {input && <button onClick={() => setInput('')} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste text with emojis here..." style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 260, width: '100%', fontFamily: 'inherit', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: output && input !== output ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{output && input !== output ? `Removed ${emojiCount} emojis` : 'Output'}</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 260, fontSize: 13, lineHeight: 1.6, color: output ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto' }}>
            {output || 'Clean text will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
