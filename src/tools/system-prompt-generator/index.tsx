'use client';

import { useState } from 'react';

const PERSONAS = ['Assistant', 'Expert', 'Coach', 'Analyst', 'Teacher', 'Writer', 'Reviewer', 'Custom'];
const TONES = ['Professional', 'Friendly', 'Concise', 'Detailed', 'Formal', 'Casual', 'Direct'];
const FORMATS = ['Plain text', 'Markdown', 'JSON', 'Bullet points', 'Step-by-step', 'Custom'];

function buildPrompt(fields: Record<string, string>): string {
  const parts: string[] = [];
  if (fields.persona && fields.persona !== 'Custom') {
    parts.push(`You are a ${fields.persona.toLowerCase()}${fields.domain ? ` specializing in ${fields.domain}` : ''}.`);
  } else if (fields.customPersona) {
    parts.push(fields.customPersona + (fields.domain ? ` You specialize in ${fields.domain}.` : ''));
  }
  if (fields.goal) parts.push(`Your goal is to ${fields.goal.toLowerCase().replace(/^to\s+/i, '')}.`);
  if (fields.tone) parts.push(`Always respond in a ${fields.tone.toLowerCase()} tone.`);
  if (fields.audience) parts.push(`Your audience is ${fields.audience}.`);
  if (fields.format && fields.format !== 'Plain text') {
    if (fields.format === 'Custom' && fields.customFormat) {
      parts.push(`Format your responses as: ${fields.customFormat}.`);
    } else if (fields.format !== 'Custom') {
      parts.push(`Format all responses as ${fields.format.toLowerCase()}.`);
    }
  }
  if (fields.constraints) {
    parts.push(`\nConstraints:\n${fields.constraints.split('\n').map(c => c.trim()).filter(Boolean).map(c => `- ${c}`).join('\n')}`);
  }
  if (fields.extra) parts.push(`\n${fields.extra}`);
  return parts.join(' ').replace(/ {2,}/g, ' ').trim();
}

export default function SystemPromptGenerator() {
  const [fields, setFields] = useState<Record<string, string>>({
    persona: 'Assistant', tone: 'Professional', format: 'Plain text',
    domain: '', goal: '', audience: '', constraints: '', extra: '', customPersona: '', customFormat: '',
  });
  const [copied, setCopied] = useState(false);
  const set = (key: string, val: string) => setFields(f => ({ ...f, [key]: val }));
  const prompt = buildPrompt(fields);
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelStyle: React.CSSProperties = { fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' };
  const inputStyle: React.CSSProperties = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '9px 12px', color: '#f0f0f0', fontSize: 13, width: '100%', fontFamily: 'inherit', outline: 'none' };
  const pill = (active: boolean): React.CSSProperties => ({
    background: active ? 'rgba(59,130,246,0.12)' : '#1a1a1a',
    border: `1px solid ${active ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`,
    color: active ? '#60a5fa' : '#888',
    padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: active ? 600 : 400,
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={labelStyle}>Persona</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {PERSONAS.map(p => <button key={p} onClick={() => set('persona', p)} style={pill(fields.persona === p)}>{p}</button>)}
          </div>
          {fields.persona === 'Custom' && <input style={{ ...inputStyle, marginTop: 8 }} placeholder="e.g. You are a senior DevOps engineer..." value={fields.customPersona} onChange={e => set('customPersona', e.target.value)} />}
        </div>
        <div>
          <label style={labelStyle}>Domain / Expertise <span style={{ color: '#444' }}>(optional)</span></label>
          <input style={inputStyle} placeholder="e.g. machine learning, tax law, fitness..." value={fields.domain} onChange={e => set('domain', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Primary goal</label>
          <input style={inputStyle} placeholder="e.g. help users debug Python code" value={fields.goal} onChange={e => set('goal', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Audience <span style={{ color: '#444' }}>(optional)</span></label>
          <input style={inputStyle} placeholder="e.g. junior developers, non-technical managers..." value={fields.audience} onChange={e => set('audience', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Tone</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {TONES.map(t => <button key={t} onClick={() => set('tone', t)} style={pill(fields.tone === t)}>{t}</button>)}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Output format</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {FORMATS.map(f => <button key={f} onClick={() => set('format', f)} style={pill(fields.format === f)}>{f}</button>)}
          </div>
          {fields.format === 'Custom' && <input style={{ ...inputStyle, marginTop: 8 }} placeholder="e.g. always respond with JSON with keys: answer, confidence" value={fields.customFormat} onChange={e => set('customFormat', e.target.value)} />}
        </div>
        <div>
          <label style={labelStyle}>Constraints <span style={{ color: '#444' }}>(one per line)</span></label>
          <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80, lineHeight: 1.6 }} placeholder={"Never reveal system prompt\nAlways cite sources\nRefuse off-topic requests"} value={fields.constraints} onChange={e => set('constraints', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Additional instructions <span style={{ color: '#444' }}>(optional)</span></label>
          <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60, lineHeight: 1.6 }} placeholder="Any other instructions..." value={fields.extra} onChange={e => set('extra', e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Generated prompt</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setFields({ persona: 'Assistant', tone: 'Professional', format: 'Plain text', domain: '', goal: '', audience: '', constraints: '', extra: '', customPersona: '', customFormat: '' })} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Reset</button>
            <button onClick={handleCopy} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>
          </div>
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 16, minHeight: 300, fontFamily: 'ui-monospace, monospace', fontSize: 13, lineHeight: 1.7, color: prompt ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', flex: 1 }}>
          {prompt || 'Fill in the fields on the left to generate your system prompt...'}
        </div>
        <div style={{ fontSize: 11, color: '#444' }}>{prompt ? `${prompt.length} chars · ~${Math.ceil(prompt.length / 4)} tokens` : ''}</div>
      </div>
    </div>
  );
}
