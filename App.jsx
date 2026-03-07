import { useState, useEffect, useRef } from "react";

// ─── ENGINE (KONSISTEN DENGAN RISET LO) ──────────────────────────────────────
function compute(s) {
  const G=s.gini/100, I=s.industrial/100, L=s.stateLed/100, SP=s.spending/100;
  const score = Math.max(0, Math.min(100,(
    G*0.30 + I*0.25 + L*0.15 + SP*I*0.28
    - SP*(1-I)*0.18 - (1-G)*I*0.08 + L*I*0.12
  )*100));
  return {
    score,
    compliance:    Math.max(0,Math.min(100, G*90+L*10)),
    supplyChain:   Math.max(0,Math.min(100, I*70+L*30)),
    fiscalHealth:  Math.max(0,Math.min(100, 100-SP*(1-I)*80)),
    surgeCapacity: Math.max(0,Math.min(100, I*50+L*35+SP*I*15)),
    warnings: [
      SP>0.50&&I<0.35&&"import", G<0.30&&I>0.50&&"polarize",
      L<0.25&&I>0.60&&"profitleak", SP>0.70&&L<0.30&&"capturedspend",
    ].filter(Boolean),
  };
}

const DELTA_SCORE = compute({gini:32,industrial:18,stateLed:24,spending:20}).score;

const PRESETS = {
  statusquo:    {label:"Status Quo",          sub:"Indonesia 2024",           c:"#d97706", gini:32, industrial:22, stateLed:28, spending:23,
    note:"Tanpa reformasi struktural, krisis berikutnya hanya soal waktu. Prediksi: kelangkaan oksigen & faskes kolaps dalam 14 hari."},
  developmental:{label:"Developmental State", sub:"Korea · Vietnam · Taiwan", c:"#16a34a", gini:72, industrial:78, stateLed:74, spending:62,
    note:"Model Ha-Joon Chang. Vietnam $171/kapita tapi outcome COVID bintang 5 — state-led direction kuat, bukan soal berapa uangnya."},
  market:       {label:"Market Liberal",      sub:"Privatisasi penuh",        c:"#dc2626", gini:22, industrial:28, stateLed:12, spending:48,
    note:"AS $11.072/kapita tertinggi dunia, tapi outcome COVID terburuk negara maju. Profit motif + gini tinggi = sistem gagal saat krisis."},
  nordic:       {label:"Nordic Hybrid",       sub:"Pajak tinggi + jaring",    c:"#7c3aed", gini:82, industrial:65, stateLed:58, spending:78,
    note:"Bukan sekadar pajak tinggi. Gini rendah membangun kepercayaan sosial organik — rakyat patuh karena sistemnya adil."},
};

// ─── ANIMATED NUMBER ─────────────────────────────────────────────────────────
function AnimNum({val}) {
  const [n,setN] = useState(val);
  const prev = useRef(val);
  useEffect(() => {
    const from=prev.current, to=val, t0=Date.now(), dur=450;
    const tick = () => {
      const p = Math.min(1,(Date.now()-t0)/dur);
      const e = 1-Math.pow(1-p,3);
      setN(Math.round(from+(to-from)*e));
      if(p<1) requestAnimationFrame(tick); else prev.current=to;
    };
    requestAnimationFrame(tick);
  },[val]);
  return <>{n}</>;
}

// ─── SYSTEMIC ORB ─────────────────────────────────────────────────────────────
function SystemicOrb({ score, showDelta, sliders }) {
  const color   = score>=70 ? "#10b981" : score>=45 ? "#f59e0b" : "#ef4444";
  const colorLt = score>=70 ? "#d1fae5" : score>=45 ? "#fef3c7" : "#fee2e2";
  const colorGl = score>=70 ? "rgba(16,185,129," : score>=45 ? "rgba(245,158,11," : "rgba(239,68,68,";
  const pulseDur = score>=70 ? "3s" : score>=45 ? "2s" : "0.9s";
  const orbR = 78; const CX=220, CY=220, satDist=150;
  const nodes = [
    { key:"gini",      label:"Pemerataan",     val:sliders.gini,      angle:-130, color:"#8b5cf6" },
    { key:"industrial",label:"Basis Industri", val:sliders.industrial,angle:-60,  color:"#0ea5e9" },
    { key:"stateLed",  label:"State-Led",      val:sliders.stateLed,  angle:0,    color:"#6366f1" },
    { key:"spending",  label:"Spending",       val:sliders.spending,  angle:60,   color:"#06b6d4" },
  ];
  return (
    <div className="relative w-[440px] h-[440px] mx-auto shrink-0">
      <style>{`
        @keyframes orbPulse { 0%,100%{transform:scale(1);opacity:0.95;} 50%{transform:scale(1.08);opacity:1;} }
        @keyframes orbGlow { 0%,100%{box-shadow:0 0 40px 10px ${colorGl}0.15), 0 0 80px 20px ${colorGl}0.05);} 50%{box-shadow:0 0 60px 20px ${colorGl}0.25), 0 0 120px 40px ${colorGl}0.1);} }
        @keyframes ripple { 0%{transform:translate(-50%,-50%) scale(1);opacity:0.4;} 100%{transform:translate(-50%,-50%) scale(2.2);opacity:0;} }
      `}</style>
      <svg className="absolute top-0 left-0 overflow-visible w-full h-full">
        {nodes.map(nd => {
          const a=(nd.angle*Math.PI)/180; const sx=CX+satDist*Math.cos(a), sy=CY+satDist*Math.sin(a), ex=CX+orbR*Math.cos(a), ey=CY+orbR*Math.sin(a);
          return (
            <g key={nd.key}>
              <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={nd.color} strokeWidth={nd.val>=50?1.5:1} strokeDasharray={nd.val>=50?"none":"4 4"} opacity={0.2+(nd.val/100)*0.6} />
              <circle cx={sx} cy={sy} r={4+(nd.val/100)*4} fill={nd.color} opacity={0.3+(nd.val/100)*0.5} />
              <text x={CX+(satDist+25)*Math.cos(a)} y={CY+(satDist+25)*Math.sin(a)} textAnchor={nd.angle < -90 || nd.angle > 90 ? "end" : "start"} fill={nd.color} fontSize="10" fontWeight="700" fontFamily="monospace" opacity={0.6}>{nd.label} {nd.val}</text>
            </g>
          );
        })}
        {showDelta && <circle cx={CX} cy={CY} r={orbR+18} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" className="animate-pulse"/>}
      </svg>
      {[0,1,2].map(i=>(<div key={i} className="absolute top-1/2 left-1/2 rounded-full pointer-events-none" style={{width:orbR*2, height:orbR*2, border:`2px solid ${color}`, animation:`ripple ${pulseDur} ${i*(parseFloat(pulseDur)/3)}s infinite`}}/>))}
      <div className="absolute top-1/2 left-1/2 w-[156px] h-[156px] rounded-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-default shadow-2xl" 
        style={{background:`radial-gradient(circle at 35% 35%, ${colorLt}, ${color})`, animation:`orbPulse ${pulseDur} infinite ease-in-out, orbGlow ${pulseDur} infinite ease-in-out`}}>
        <div className="text-5xl font-black text-white font-mono leading-none drop-shadow-md"><AnimNum val={Math.round(score)}/></div>
        <div className="text-[10px] tracking-[4px] text-white/80 font-mono mt-2 uppercase">Score</div>
      </div>
    </div>
  );
}

// ─── MAIN UI ──────────────────────────────────────────────────────────────────
export default function App() {
  const [sl, setSl] = useState({gini:32, industrial:22, stateLed:28, spending:23});
  const [ap, setAp] = useState("statusquo");
  const [showDelta, setShowDelta] = useState(false);

  const r = compute(sl);
  const diagTexts = [
    { range:[0,30], title:"KRITIS — AKAN KOLAPS", c:"#ef4444", body:"Sistem tanpa cadangan. Gini tinggi memblokir kepatuhan warga. Juli 2021 akan terulang." },
    { range:[31,60], title:"WASPADA — RENTAN", c:"#f59e0b", body:"Ada kapasitas teknis tapi struktur hulu (Industri) masih bergantung pada impor." },
    { range:[61,100], title:"RESILIEN — SIAP", c:"#10b981", body:"Model Developmental State. Industri lokal kuat + kepercayaan publik tinggi." }
  ];
  const diag = diagTexts.find(t => r.score >= t.range[0] && r.score <= t.range[1]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-10">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=DM+Mono:wght@500;700&display=swap');`}</style>
      
      {/* ── HEADER (THE NEW GRADIENT HEADLINE) ── */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-slate-100">
        <div className="space-y-3">
          <div className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">Crisis Preparedness Simulator · Indonesia 2029</div>
          
          {/* Headline Gradasi Seksi */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-sm">
            Jika Pandemi Baru Terjadi Besok <br />
            — Apakah Sistem Kita Akan Bertahan?
          </h1>
          
          <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
            Eksperimen kebijakan ekonomi-politik untuk mengukur resiliensi kesehatan nasional sebelum gelombang berikutnya tiba.
          </p>
        </div>
        
        {/* Preset Buttons */}
        <div className="flex gap-2 flex-wrap">
          {Object.entries(PRESETS).map(([k,p])=>(
            <button key={k} onClick={()=>{setSl({gini:p.gini,industrial:p.industrial,stateLed:p.stateLed,spending:p.spending}); setAp(k);}} 
              className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all border-2 ${ap===k? 'bg-slate-900 border-slate-900 text-white scale-105 shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}>
              {p.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── MAIN CONTENT (40/60) ── */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[38%_62%] gap-12">
        
        {/* SLIDERS (LEFT) */}
        <section className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-10 shadow-inner">
          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">Input Kebijakan</div>
          
          {[
            { k:"gini", l:"Pemerataan (Gini)", sub:"Resiliensi Akar Rumput", c:"#8b5cf6" },
            { k:"industrial", l:"Basis Industri", sub:"Kedaulatan Alat Hidup", c:"#0ea5e9" },
            { k:"stateLed", l:"State-Led Direction", sub:"Kontrol vs Profit", c:"#6366f1" },
            { k:"spending", l:"Health Spending", sub:"Efektifitas Anggaran", c:"#06b6d4" }
          ].map(slid => (
            <div key={slid.k} className="group">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <div className="text-xs font-bold text-slate-800">{slid.l}</div>
                  <div className="text-[10px] font-semibold text-slate-400 mt-0.5">{slid.sub}</div>
                </div>
                <div className="text-3xl font-black font-mono tracking-tighter" style={{color:slid.c}}>{sl[slid.k]}</div>
              </div>
              <input type="range" min="0" max="100" value={sl[slid.k]} onChange={e=>setSl({...sl,[slid.k]:Number(e.target.value)})} 
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-slate-900" />
            </div>
          ))}
        </section>

        {/* VISUALS (RIGHT) */}
        <section className="flex flex-col items-center">
          <div className="text-center mb-8">
            <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Survival Probability</div>
            <h2 className="text-2xl font-black font-mono tracking-widest" style={{color:diag.c}}>{diag.title}</h2>
          </div>

          <SystemicOrb score={r.score} showDelta={showDelta} sliders={sl} />

          {/* Diagnosis & Action */}
          <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <div className="text-[9px] font-bold text-slate-400 uppercase mb-3 tracking-widest">X-Ray Diagnosis</div>
              <div className="text-sm font-bold mb-2" style={{color:diag.c}}>{diag.title}</div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{diag.body}</p>
            </div>
            
            <div className="flex flex-col justify-center gap-4">
              <button onClick={()=>setShowDelta(!showDelta)} className={`w-full py-4 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${showDelta?'bg-red-500 text-white shadow-lg shadow-red-200':'bg-white border-2 border-slate-100 text-slate-400 hover:border-slate-300'}`}>
                {showDelta ? '✕ Matikan Reality Anchor' : '⚓ Bandingkan Delta Juli 2021'}
              </button>
              <div className="text-[10px] text-center text-slate-300 font-medium px-4 leading-snug">
                Data historis menunjukkan skor Indonesia saat Delta berada di kisaran 15.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
