'use client';

import { useState } from 'react';

type Section = { tag: string; content: string; enabled: boolean };

const DEFAULT_SECTIONS: Section[] = [
  { tag: 'context', content: '', enabled: true },
  { tag: 'instructions', content: '', enabled: true },
  { tag: 'examples', content: '', enabled: false },
  { tag: 'constraints', content: '', enabled: false },
  { tag: 'output_format', content: '', enabled: false },
];

const TAG_HINTS: Record<string, string> = {
  context: 'Background information the model needs to understand the task...',
  instructions: 'Step-by-step instructions for what the model should do...',
  examples: 'Example inputs and outputs to guide the model...',
  constraints: "What the model should NOT do or limitations to observe...",
  output_format: 'How the response should be structured or formatted...',
};

function buildXml(sections: Section[], customTag: string, customContent: string, userInput: string): string {
  const parts: string[] = [];
  for (const s of sections) {
    if (!s.enabled || !s.content.trim()) continue;
    parts.push(`<${s.tag}>\n${s.content.trim()}\n</${s.tag}>`);
  }
  if (customTag.trim() && customContent.trim()) {
    parts.push(`<${customTag.trim()}>\n${customContent.trim()}\n</${customTag.trim()}>`);
  }
  if (userInput.trim()) {
    parts.push(`<user_input>\n${userInput.trim()}\n</user_input>`);
  }
  return parts.join('\n\n');
}

export default function XmlPromptFormatter() {
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);
  const [customTag, setCustomTag] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [userInput, setUserInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = buildXml(sections, customTag, customContent, userInput);

  const toggle = (i: number) => setSections(prev => prev.map((s, idx) => idx === i ? { ...s, enabled: !s.enabled } : s));
  const update = (i: number, content: string) => setSections(prev => prev.map((s, idx) => idx === i ? { ...s, content } : s));

  const ta: React.CSSProperties = { background: '#111', border: '1px solid #222', borderRadius: 6, padding: '8px 10px', color: '#f0f0f0', fontSize: 12, fontFamily: 'inherit', outline: 'none', width: '100%', resize: 'vertical', minHeight: 60, lineHeight: 1.5 };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sections — toggle to enable</div>
        {sections.map((s, i) => (
          <div key={s.tag} style={{ background: '#1a1a1a', border: `1px solid ${s.enabled ? 'rgba(59,130,246,0.3)' : '#2a2a2a'}`, borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: s.enabled ? 8 : 0 }}>
              <span style={{ fontSize: 12, fontFamily: 'ui-monospace, monospace', color: s.enabled ? '#60a5fa' : '#555' }}>&lt;{s.tag}&gt;</span>
              <button onClick={() => toggle(i)} style={{ background: s.enabled ? 'rgba(59,130,246,0.12)' : '#222', border: `1px solid ${s.enabled ? 'rgba(59,130,246,0.4)' : '#333'}`, color: s.enabled ? '#60a5fa' : '#555', fontSize: 11, padding: '2px 10px', borderRadius: 4, cursor: 'pointer' }}>{s.enabled ? 'On' : 'Off'}</button>
            </div>
            {s.enabled && <textarea style={ta} placeholder={TAG_HINTS[s.tag] ?? ''} value={s.content} onChange={e => update(i, e.target.value)} />}
          </div>
        ))}
        <div style={{ background: '#1a1a1a', border: '1px dashed #333', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 11, color: '#555', marginBottom: 8 }}>Custom tag (optional)</div>
          <input style={{ background: '#111', border: '1px solid #222', borderRadius: 6, padding: '7px 10px', color: '#f0f0f0', fontSize: 12, fontFamily: 'ui-monospace, monospace', outline: 'none', width: '100%', marginBottom: 6 }} placeholder="tag_name" value={customTag} onChange={e => setCustomTag(e.target.value)} />
          <textarea style={ta} placeholder="Content..." value={customContent} onChange={e => setCustomContent(e.target.value)} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>User input (appended last)</div>
          <textarea style={{ ...ta, minHeight: 50 }} placeholder="The actual user query or task..." value={userInput} onChange={e => setUserInput(e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: output ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{output ? 'XML prompt ready' : 'Output'}</span>
          {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 400, fontFamily: 'ui-monospace, monospace', fontSize: 12, lineHeight: 1.7, color: output ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto', flex: 1 }}>
          {output || 'Enable sections on the left and fill in content to build your XML prompt...'}
        </div>
        <div style={{ fontSize: 11, color: '#444' }}>Works great with Claude — Anthropic recommends XML tags for structured prompts.</div>
      </div>
    </div>
  );
}
