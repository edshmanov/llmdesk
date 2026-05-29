'use client';

import { useState } from 'react';

const ROLES = ['Customer support agent', 'Sales assistant', 'Technical expert', 'Writing coach', 'Research analyst', 'Code reviewer', 'Product manager', 'Data scientist', 'Legal advisor', 'Marketing strategist', 'Custom'];
const TONES = ['Professional', 'Friendly', 'Direct', 'Empathetic', 'Authoritative', 'Casual', 'Formal', 'Enthusiastic'];
const EXPERTISE = ['Beginner-friendly', 'Intermediate', 'Expert-level', 'Mixed audience'];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Russian', 'Chinese', 'Japanese'];

function generatePersona(fields: Record<string, string>): string {
  const lines: string[] = [];
  const role = fields.role === 'Custom' ? fields.customRole : fields.role;
  if (!role) return '';
  lines.push(`You are ${/^[aeiou]/i.test(role) ? 'an' : 'a'} ${role.toLowerCase()}${fields.company ? ` at ${fields.company}` : ''}.`);
  if (fields.name) lines.push(`Your name is ${fields.name}.`);
  if (fields.expertise) lines.push(`You communicate at a ${fields.expertise.toLowerCase()} level.`);
  if (fields.tone) lines.push(`Your tone is ${fields.tone.toLowerCase()}.`);
  if (fields.domain) lines.push(`You specialize in ${fields.domain}.`);
  if (fields.language && fields.language !== 'English') lines.push(`Always respond in ${fields.language}.`);
  if (fields.goal) lines.push(`\nYour primary goal is to ${fields.goal.toLowerCase().replace(/^to\s+/i, '')}.`);
  const donts: string[] = [];
  if (fields.noOpinions === 'true') donts.push('share personal opinions on controversial topics');
  if (fields.noCompetitors === 'true') donts.push("mention or recommend competitor products");
  if (fields.noGuesses === 'true') donts.push("guess or make up information — say you don't know instead");
  if (donts.length > 0) lines.push(`\nNever ${donts.join(', or ')}.`);
  if (fields.customInstructions) lines.push(`\n${fields.customInstructions}`);
  return lines.join(' ').replace(/ {2,}/g, ' ').replace(/\n /g, '\n').trim();
}

export default function AiPersonaGenerator() {
  const [fields, setFields] = useState<Record<string, string>>({
    role: 'Customer support agent', customRole: '', name: '', company: '', tone: 'Professional',
    expertise: 'Beginner-friendly', domain: '', language: 'English', goal: '',
    noOpinions: 'false', noCompetitors: 'false', noGuesses: 'true', customInstructions: '',
  });
  const [copied, setCopied] = useState(false);
  const set = (k: string, v: string) => setFields(f => ({ ...f, [k]: v }));
  const persona = generatePersona(fields);

  const inp: React.CSSProperties = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '9px 12px', color: '#f0f0f0', fontSize: 13, width: '100%', fontFamily: 'inherit', outline: 'none' };
  const lbl: React.CSSProperties = { fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' };
  const pill = (active: boolean): React.CSSProperties => ({ background: active ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${active ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: active ? '#60a5fa' : '#888', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: active ? 600 : 400 });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={lbl}>Role</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {ROLES.map(r => <button key={r} onClick={() => set('role', r)} style={pill(fields.role === r)}>{r}</button>)}
          </div>
          {fields.role === 'Custom' && <input style={{ ...inp, marginTop: 8 }} placeholder="e.g. Fitness coach, Tax advisor..." value={fields.customRole} onChange={e => set('customRole', e.target.value)} />}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div><label style={lbl}>Name (optional)</label><input style={inp} placeholder="e.g. Alex" value={fields.name} onChange={e => set('name', e.target.value)} /></div>
          <div><label style={lbl}>Company (optional)</label><input style={inp} placeholder="e.g. Acme Inc." value={fields.company} onChange={e => set('company', e.target.value)} /></div>
        </div>
        <div><label style={lbl}>Domain / Specialty</label><input style={inp} placeholder="e.g. B2B SaaS, personal finance..." value={fields.domain} onChange={e => set('domain', e.target.value)} /></div>
        <div><label style={lbl}>Tone</label><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{TONES.map(t => <button key={t} onClick={() => set('tone', t)} style={pill(fields.tone === t)}>{t}</button>)}</div></div>
        <div><label style={lbl}>Expertise level</label><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{EXPERTISE.map(e => <button key={e} onClick={() => set('expertise', e)} style={pill(fields.expertise === e)}>{e}</button>)}</div></div>
        <div><label style={lbl}>Response language</label><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{LANGUAGES.map(l => <button key={l} onClick={() => set('language', l)} style={pill(fields.language === l)}>{l}</button>)}</div></div>
        <div><label style={lbl}>Primary goal</label><input style={inp} placeholder="e.g. help users resolve issues quickly" value={fields.goal} onChange={e => set('goal', e.target.value)} /></div>
        <div>
          <label style={lbl}>Restrictions</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[['noOpinions', 'No controversial opinions'], ['noCompetitors', "Don't mention competitors"], ['noGuesses', "Don't guess — admit uncertainty"]].map(([key, label]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888', cursor: 'pointer' }}>
                <input type="checkbox" checked={fields[key] === 'true'} onChange={e => set(key, String(e.target.checked))} />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div><label style={lbl}>Custom instructions</label><textarea style={{ ...inp, resize: 'vertical', minHeight: 60, lineHeight: 1.5 }} placeholder="Any additional behavior..." value={fields.customInstructions} onChange={e => set('customInstructions', e.target.value)} /></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: persona ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{persona ? 'Persona ready' : 'Generated persona'}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setFields({ role: 'Customer support agent', customRole: '', name: '', company: '', tone: 'Professional', expertise: 'Beginner-friendly', domain: '', language: 'English', goal: '', noOpinions: 'false', noCompetitors: 'false', noGuesses: 'true', customInstructions: '' })} style={{ background: 'none', border: 'none', color: '#555', fontSize: 11, cursor: 'pointer' }}>Reset</button>
            {persona && <button onClick={() => { navigator.clipboard.writeText(persona); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 16, minHeight: 300, fontSize: 13, lineHeight: 1.7, color: persona ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', flex: 1 }}>
          {persona || 'Fill in the fields to generate a persona...'}
        </div>
        {persona && <div style={{ fontSize: 11, color: '#444' }}>{persona.length} chars · ~{Math.ceil(persona.length / 4)} tokens</div>}
      </div>
    </div>
  );
}
