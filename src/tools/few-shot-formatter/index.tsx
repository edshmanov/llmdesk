'use client';

import { useState } from 'react';

type Example = { input: string; output: string };
type Format = 'chat' | 'xml' | 'markdown' | 'plain';

function formatExamples(examples: Example[], format: Format, userMessage: string): string {
  const filled = examples.filter(e => e.input.trim() || e.output.trim());
  if (filled.length === 0) return '';

  if (format === 'chat') {
    const lines: string[] = [];
    for (const ex of filled) {
      if (ex.input.trim()) lines.push(`{"role": "user", "content": "${ex.input.replace(/"/g, '\\"')}"}`);
      if (ex.output.trim()) lines.push(`{"role": "assistant", "content": "${ex.output.replace(/"/g, '\\"')}"}`);
    }
    if (userMessage.trim()) lines.push(`{"role": "user", "content": "${userMessage.replace(/"/g, '\\"')}"}`);
    return '[\n  ' + lines.join(',\n  ') + '\n]';
  }

  if (format === 'xml') {
    const lines: string[] = ['<examples>'];
    for (let i = 0; i < filled.length; i++) {
      lines.push(`  <example id="${i + 1}">`);
      if (filled[i].input.trim()) lines.push(`    <input>${filled[i].input}</input>`);
      if (filled[i].output.trim()) lines.push(`    <output>${filled[i].output}</output>`);
      lines.push('  </example>');
    }
    lines.push('</examples>');
    if (userMessage.trim()) lines.push(`\n<input>${userMessage}</input>`);
    return lines.join('\n');
  }

  if (format === 'markdown') {
    const lines: string[] = [];
    for (let i = 0; i < filled.length; i++) {
      lines.push(`**Example ${i + 1}**`);
      if (filled[i].input.trim()) lines.push(`Input: ${filled[i].input}`);
      if (filled[i].output.trim()) lines.push(`Output: ${filled[i].output}`);
      lines.push('');
    }
    if (userMessage.trim()) lines.push(`**Your input:** ${userMessage}`);
    return lines.join('\n').trim();
  }

  const lines: string[] = [];
  for (let i = 0; i < filled.length; i++) {
    lines.push(`Example ${i + 1}:`);
    if (filled[i].input.trim()) lines.push(`Input: ${filled[i].input}`);
    if (filled[i].output.trim()) lines.push(`Output: ${filled[i].output}`);
    lines.push('');
  }
  if (userMessage.trim()) lines.push(`Input: ${userMessage}`);
  return lines.join('\n').trim();
}

const DEFAULT_EXAMPLES: Example[] = [
  { input: 'Translate to French: Hello', output: 'Bonjour' },
  { input: 'Translate to French: Good morning', output: 'Bonjour' },
  { input: '', output: '' },
];

export default function FewShotFormatter() {
  const [examples, setExamples] = useState<Example[]>(DEFAULT_EXAMPLES);
  const [format, setFormat] = useState<Format>('chat');
  const [userMessage, setUserMessage] = useState('Translate to French: How are you?');
  const [copied, setCopied] = useState(false);

  const output = formatExamples(examples, format, userMessage);

  const updateExample = (i: number, field: 'input' | 'output', val: string) => {
    setExamples(prev => prev.map((ex, idx) => idx === i ? { ...ex, [field]: val } : ex));
  };

  const addExample = () => setExamples(prev => [...prev, { input: '', output: '' }]);
  const removeExample = (i: number) => setExamples(prev => prev.filter((_, idx) => idx !== i));

  const s: React.CSSProperties = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 6, padding: '7px 10px', color: '#f0f0f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', width: '100%' };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: '#666', alignSelf: 'center' }}>Format:</span>
        {(['chat', 'xml', 'markdown', 'plain'] as Format[]).map(f => (
          <button key={f} onClick={() => setFormat(f)} style={{ background: format === f ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${format === f ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: format === f ? '#60a5fa' : '#888', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: format === f ? 600 : 400, textTransform: 'uppercase' }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Examples (input → output pairs)</div>
          {examples.map((ex, i) => (
            <div key={i} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: '#555', fontFamily: 'ui-monospace, monospace' }}>Example {i + 1}</span>
                {examples.length > 1 && <button onClick={() => removeExample(i)} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>✕ Remove</button>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <input style={s} placeholder="Input" value={ex.input} onChange={e => updateExample(i, 'input', e.target.value)} />
                <input style={{ ...s, color: '#4ade80' }} placeholder="Output" value={ex.output} onChange={e => updateExample(i, 'output', e.target.value)} />
              </div>
            </div>
          ))}
          <button onClick={addExample} style={{ background: '#1a1a1a', border: '1px dashed #333', borderRadius: 8, padding: '10px', color: '#555', fontSize: 12, cursor: 'pointer', textAlign: 'center' }}>+ Add example</button>
          <div>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Your message (appended at end)</div>
            <input style={s} placeholder="The actual user message..." value={userMessage} onChange={e => setUserMessage(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: output ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{output ? 'Ready to copy' : 'Output'}</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 300, fontFamily: 'ui-monospace, monospace', fontSize: 12, lineHeight: 1.6, color: output ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto', flex: 1 }}>
            {output || 'Formatted few-shot prompt will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
