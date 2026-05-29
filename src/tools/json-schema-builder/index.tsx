'use client';

import { useState } from 'react';

type FieldType = 'string' | 'number' | 'boolean' | 'array' | 'object';
type Field = { id: string; name: string; type: FieldType; description: string; required: boolean; example: string };

let idCounter = 3;

function buildSchema(fields: Field[], title: string, description: string): object {
  const properties: Record<string, object> = {};
  const required: string[] = [];
  for (const f of fields) {
    if (!f.name.trim()) continue;
    const prop: Record<string, unknown> = { type: f.type };
    if (f.description.trim()) prop.description = f.description;
    if (f.example.trim()) {
      try { prop.example = JSON.parse(f.example); } catch { prop.example = f.example; }
    }
    if (f.type === 'array') prop.items = { type: 'string' };
    properties[f.name.trim()] = prop;
    if (f.required) required.push(f.name.trim());
  }
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    ...(title.trim() ? { title } : {}),
    ...(description.trim() ? { description } : {}),
    properties,
    ...(required.length > 0 ? { required } : {}),
    additionalProperties: false,
  };
}

function buildPrompt(schema: object, title: string): string {
  return `You must respond with a valid JSON object that strictly follows this schema:\n\n\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\`\n\nImportant:\n- Return ONLY the JSON object, no explanations\n- All required fields must be present\n- Do not include any fields not in the schema${title ? `\n- This is a ${title} object` : ''}`;
}

const DEFAULT_FIELDS: Field[] = [
  { id: '1', name: 'name', type: 'string', description: 'Full name of the person', required: true, example: 'John Doe' },
  { id: '2', name: 'age', type: 'number', description: 'Age in years', required: true, example: '30' },
  { id: '3', name: 'tags', type: 'array', description: 'List of tags', required: false, example: '' },
];

export default function JsonSchemaBuilder() {
  const [fields, setFields] = useState<Field[]>(DEFAULT_FIELDS);
  const [title, setTitle] = useState('Person');
  const [description, setDescription] = useState('');
  const [tab, setTab] = useState<'schema' | 'prompt'>('schema');
  const [copied, setCopied] = useState(false);

  const schema = buildSchema(fields, title, description);
  const schemaStr = JSON.stringify(schema, null, 2);
  const promptStr = buildPrompt(schema, title);
  const output = tab === 'schema' ? schemaStr : promptStr;

  const addField = () => {
    setFields(prev => [...prev, { id: String(++idCounter), name: '', type: 'string', description: '', required: false, example: '' }]);
  };
  const removeField = (id: string) => setFields(prev => prev.filter(f => f.id !== id));
  const updateField = (id: string, key: keyof Field, val: unknown) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, [key]: val } : f));
  };

  const inp: React.CSSProperties = { background: '#111', border: '1px solid #222', borderRadius: 6, padding: '6px 9px', color: '#f0f0f0', fontSize: 12, fontFamily: 'inherit', outline: 'none', width: '100%' };
  const sel: React.CSSProperties = { ...inp, cursor: 'pointer' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Schema title</div>
            <input style={inp} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Person, Product..." />
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Description</div>
            <input style={inp} value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description..." />
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Fields</div>
        {fields.map(f => (
          <div key={f.id} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px auto', gap: 6, alignItems: 'center' }}>
              <input style={inp} placeholder="field_name" value={f.name} onChange={e => updateField(f.id, 'name', e.target.value)} />
              <select style={sel} value={f.type} onChange={e => updateField(f.id, 'type', e.target.value)}>
                {(['string', 'number', 'boolean', 'array', 'object'] as FieldType[]).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={() => removeField(f.id)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 14 }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 6, alignItems: 'center' }}>
              <input style={inp} placeholder="Description..." value={f.description} onChange={e => updateField(f.id, 'description', e.target.value)} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#888', cursor: 'pointer' }}>
                <input type="checkbox" checked={f.required} onChange={e => updateField(f.id, 'required', e.target.checked)} />
                Required
              </label>
            </div>
          </div>
        ))}
        <button onClick={addField} style={{ background: '#1a1a1a', border: '1px dashed #333', borderRadius: 8, padding: 10, color: '#555', fontSize: 12, cursor: 'pointer' }}>+ Add field</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['schema', 'prompt'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${tab === t ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: tab === t ? '#60a5fa' : '#888', padding: '5px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: tab === t ? 600 : 400 }}>{t === 'schema' ? 'JSON Schema' : 'System Prompt'}</button>
          ))}
          <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ marginLeft: 'auto', background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 400, fontFamily: 'ui-monospace, monospace', fontSize: 12, lineHeight: 1.6, color: '#f0f0f0', whiteSpace: 'pre-wrap', overflowY: 'auto', flex: 1 }}>
          {output}
        </div>
      </div>
    </div>
  );
}
