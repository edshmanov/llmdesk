'use client';

import { useState } from 'react';

type Variable = { name: string; value: string; occurrences: number };

function extractVariables(text: string): Variable[] {
  const patterns = [
    /\{\{([^}]+)\}\}/g,
    /\{([^}]+)\}/g,
    /\[([A-Z_][A-Z0-9_]*)\]/g,
    /<([A-Z_][A-Z0-9_]*)>/g,
  ];

  const found = new Map<string, number>();
  for (const pattern of patterns) {
    let match;
    const re = new RegExp(pattern.source, 'g');
    while ((match = re.exec(text)) !== null) {
      const name = match[1].trim();
      if (name.length > 0 && name.length < 50) {
        found.set(name, (found.get(name) ?? 0) + 1);
      }
    }
  }

  return Array.from(found.entries()).map(([name, occurrences]) => ({ name, value: '', occurrences }));
}

function fillTemplate(text: string, variables: Variable[]): string {
  let result = text;
  for (const v of variables) {
    if (!v.value.trim()) continue;
    const escaped = v.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result
      .replace(new RegExp(`\\{\\{${escaped}\\}\\}`, 'g'), v.value)
      .replace(new RegExp(`\\{${escaped}\\}`, 'g'), v.value)
      .replace(new RegExp(`\\[${escaped}\\]`, 'g'), v.value)
      .replace(new RegExp(`<${escaped}>`, 'g'), v.value);
  }
  return result;
}

const EXAMPLE = `You are a helpful {{role}} specializing in {{domain}}.

Your task is to {{task}}.

Always respond in a {{tone}} tone.
Limit your response to {{word_limit}} words.

User query: {{user_input}}`;

export default function PromptVariableExtractor() {
  const [template, setTemplate] = useState('');
  const [variables, setVariables] = useState<Variable[]>([]);
  const [copied, setCopied] = useState(false);

  const handleExtract = () => {
    setVariables(extractVariables(template));
  };

  const updateValue = (name: string, value: string) => {
    setVariables(prev => prev.map(v => v.name === name ? { ...v, value } : v));
  };

  const filled = fillTemplate(template, variables);
  const allFilled = variables.length > 0 && variables.every(v => v.value.trim());

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Prompt template</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => { setTemplate(EXAMPLE); setVariables([]); }} style={{ background: '#222', border: '1px solid #333', color: '#888', fontSize: 11, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>Example</button>
              {template && <button onClick={() => { setTemplate(''); setVariables([]); }} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          <textarea value={template} onChange={e => { setTemplate(e.target.value); setVariables([]); }} placeholder={"Paste a prompt with variables like {{variable}}, {var}, [VAR], or <VAR>..."} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, color: '#f0f0f0', fontSize: 13, lineHeight: 1.6, resize: 'vertical', minHeight: 200, width: '100%', fontFamily: 'ui-monospace, monospace', outline: 'none' }} />
          <button onClick={handleExtract} disabled={!template.trim()} style={{ background: template.trim() ? '#3b82f6' : '#222', border: 'none', borderRadius: 8, padding: '10px', color: template.trim() ? '#fff' : '#555', fontSize: 13, fontWeight: 600, cursor: template.trim() ? 'pointer' : 'default' }}>
            Extract Variables
          </button>
          {variables.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{variables.length} variables found — fill in values</div>
              {variables.map(v => (
                <div key={v.name} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontFamily: 'ui-monospace, monospace', color: '#60a5fa' }}>{`{{${v.name}}}`}</span>
                    <span style={{ fontSize: 11, color: '#444' }}>{v.occurrences}× in template</span>
                  </div>
                  <input value={v.value} onChange={e => updateValue(v.name, e.target.value)} placeholder={`Value for ${v.name}...`} style={{ background: '#111', border: '1px solid #222', borderRadius: 6, padding: '7px 10px', color: '#f0f0f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', width: '100%' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: allFilled ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{allFilled ? 'Ready to use' : 'Filled prompt'}</span>
            {variables.length > 0 && <button onClick={() => { navigator.clipboard.writeText(filled); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 300, fontFamily: 'ui-monospace, monospace', fontSize: 13, lineHeight: 1.6, color: variables.length > 0 ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', overflowY: 'auto', flex: 1 }}>
            {variables.length > 0 ? (filled || template) : 'Filled prompt will appear here after you extract and fill variables...'}
          </div>
          <div style={{ fontSize: 11, color: '#444' }}>Supports: {'{{var}}'} · {'{var}'} · [VAR] · {'<VAR>'}</div>
        </div>
      </div>
    </div>
  );
}
