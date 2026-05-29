'use client';

import { useState } from 'react';

type Model = 'sd' | 'sdxl' | 'flux';

const AR_PRESETS = ['1:1', '16:9', '9:16', '4:3', '3:2', '2:3', '3:4', '21:9'];
const STYLE_PRESETS = [
  { label: 'None', value: '' },
  { label: 'Raw', value: '--style raw' },
  { label: 'Cute', value: '--style cute' },
  { label: 'Expressive', value: '--style expressive' },
  { label: 'Original', value: '--style original' },
];
const VERSIONS = ['6.1', '6', '5.2', '5.1', 'niji 6', 'niji 5'];

export default function MidjourneyParameterBuilder() {
  const [prompt, setPrompt] = useState('');
  const [ar, setAr] = useState('1:1');
  const [version, setVersion] = useState('6.1');
  const [chaos, setChaos] = useState(0);
  const [stylize, setStylize] = useState(100);
  const [weird, setWeird] = useState(0);
  const [quality, setQuality] = useState('1');
  const [style, setStyle] = useState('');
  const [no, setNo] = useState('');
  const [seed, setSeed] = useState('');
  const [tile, setTile] = useState(false);
  const [copied, setCopied] = useState(false);

  function buildCommand(): string {
    if (!prompt.trim()) return '';
    const parts = [prompt.trim()];
    if (ar !== '1:1') parts.push(`--ar ${ar}`);
    parts.push(`--v ${version}`);
    if (chaos > 0) parts.push(`--chaos ${chaos}`);
    if (stylize !== 100) parts.push(`--stylize ${stylize}`);
    if (weird > 0) parts.push(`--weird ${weird}`);
    if (quality !== '1') parts.push(`--quality ${quality}`);
    if (style) parts.push(style);
    if (no.trim()) parts.push(`--no ${no.trim()}`);
    if (seed.trim()) parts.push(`--seed ${seed.trim()}`);
    if (tile) parts.push('--tile');
    return '/imagine prompt: ' + parts.join(' ');
  }

  const command = buildCommand();
  const sliderStyle = { width: '100%', accentColor: '#3b82f6' };
  const inp: React.CSSProperties = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '9px 12px', color: '#f0f0f0', fontSize: 13, width: '100%', fontFamily: 'inherit', outline: 'none' };
  const lbl: React.CSSProperties = { fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' };
  const pill = (active: boolean): React.CSSProperties => ({ background: active ? 'rgba(59,130,246,0.12)' : '#1a1a1a', border: `1px solid ${active ? 'rgba(59,130,246,0.4)' : '#2a2a2a'}`, color: active ? '#60a5fa' : '#888', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: active ? 600 : 400 });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={lbl}>Prompt</label>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe your image... e.g. a cyberpunk city at night, neon lights reflecting on wet streets" style={{ ...inp, resize: 'vertical', minHeight: 80, lineHeight: 1.5 }} />
        </div>
        <div>
          <label style={lbl}>Aspect ratio</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {AR_PRESETS.map(r => <button key={r} onClick={() => setAr(r)} style={pill(ar === r)}>{r}</button>)}
          </div>
        </div>
        <div>
          <label style={lbl}>Model version</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {VERSIONS.map(v => <button key={v} onClick={() => setVersion(v)} style={pill(version === v)}>v{v}</button>)}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={lbl}>Stylize <span style={{ color: '#3b82f6' }}>{stylize}</span></label>
            <input type="range" min={0} max={1000} step={50} value={stylize} onChange={e => setStylize(+e.target.value)} style={sliderStyle} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#444' }}><span>0</span><span>1000</span></div>
          </div>
          <div>
            <label style={lbl}>Chaos <span style={{ color: '#3b82f6' }}>{chaos}</span></label>
            <input type="range" min={0} max={100} step={5} value={chaos} onChange={e => setChaos(+e.target.value)} style={sliderStyle} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#444' }}><span>0</span><span>100</span></div>
          </div>
          <div>
            <label style={lbl}>Weird <span style={{ color: '#3b82f6' }}>{weird}</span></label>
            <input type="range" min={0} max={3000} step={100} value={weird} onChange={e => setWeird(+e.target.value)} style={sliderStyle} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#444' }}><span>0</span><span>3000</span></div>
          </div>
          <div>
            <label style={lbl}>Quality</label>
            <div style={{ display: 'flex', gap: 5 }}>
              {['.25', '.5', '1'].map(q => <button key={q} onClick={() => setQuality(q)} style={pill(quality === q)}>{q}</button>)}
            </div>
          </div>
        </div>
        <div>
          <label style={lbl}>Style preset</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {STYLE_PRESETS.map(s => <button key={s.label} onClick={() => setStyle(s.value)} style={pill(style === s.value)}>{s.label}</button>)}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div><label style={lbl}>Exclude (--no)</label><input style={inp} placeholder="e.g. text, watermark" value={no} onChange={e => setNo(e.target.value)} /></div>
          <div><label style={lbl}>Seed</label><input style={inp} placeholder="e.g. 42" value={seed} onChange={e => setSeed(e.target.value)} /></div>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888', cursor: 'pointer' }}>
          <input type="checkbox" checked={tile} onChange={e => setTile(e.target.checked)} />
          --tile (seamless texture)
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: command ? '#4ade80' : '#666', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{command ? 'Command ready' : 'Output'}</span>
          {command && <button onClick={() => { navigator.clipboard.writeText(command); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? 'rgba(74,222,128,0.12)' : '#222', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : '#333'}`, color: copied ? '#4ade80' : '#888', fontSize: 11, padding: '3px 10px', borderRadius: 4, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 14, minHeight: 120, fontFamily: 'ui-monospace, monospace', fontSize: 12, lineHeight: 1.7, color: command ? '#f0f0f0' : '#444', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {command || 'Your /imagine command will appear here...'}
        </div>
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: '#555', marginBottom: 8 }}>Active parameters:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {[ar !== '1:1' && `--ar ${ar}`, `--v ${version}`, chaos > 0 && `--chaos ${chaos}`, stylize !== 100 && `--stylize ${stylize}`, weird > 0 && `--weird ${weird}`, quality !== '1' && `--quality ${quality}`, style, no.trim() && `--no ${no}`, seed.trim() && `--seed ${seed}`, tile && '--tile'].filter(Boolean).map((p, i) => (
              <span key={i} style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontFamily: 'ui-monospace, monospace' }}>{p as string}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
