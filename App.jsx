import { useState, useEffect, useRef } from "react";

// ─── ENGINE ───────────────────────────────────────────────────────────────────
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
  statusquo:    {label:"Status Quo",          sub:"Indonesia 2024",          c:"#d97706",gini:32,industrial:22,stateLed:28,spending:23,
    note:"Tanpa reformasi struktural, krisis berikutnya hanya soal waktu. Prediksi: kelangkaan oksigen & faskes kolaps dalam 14 hari gelombang besar."},
  developmental:{label:"Developmental State", sub:"Korea · Vietnam · Taiwan",c:"#16a34a",gini:72,industrial:78,stateLed:74,spending:62,
    note:"Model Ha-Joon Chang. Vietnam spending $171/kapita tapi outcome COVID bintang 5 — state-led direction kuat, bukan soal berapa uangnya."},
  market:       {label:"Market Liberal",      sub:"Privatisasi penuh",       c:"#dc2626",gini:22,industrial:28,stateLed:12,spending:48,
    note:"AS $11.072/kapita — tertinggi dunia — tapi outcome COVID terburuk negara maju. Profit motif + gini tinggi = sistem gagal saat krisis."},
  nordic:       {label:"Nordic Hybrid",       sub:"Pajak tinggi + jaring",   c:"#7c3aed",gini:82,industrial:65,stateLed:58,spending:78,
    note:"Bukan sekadar pajak tinggi. Gini rendah membangun kepercayaan sosial organik — rakyat patuh bukan karena takut, tapi karena sistemnya adil."},
};

const WARN = {
  import:       {icon:"💸",title:"Duit Terbang ke Luar Negeri",  bg:"#fffbeb",bd:"#fde68a",tx:"#92400e"},
  polarize:     {icon:"⚡",title:"Teknologi Tanpa Kepercayaan",   bg:"#fef2f2",bd:"#fecaca",tx:"#991b1b"},
  profitleak:   {icon:"🏥",title:"RS Swasta Prioritaskan Profit", bg:"#fff7ed",bd:"#fed7aa",tx:"#7c2d12"},
  capturedspend:{icon:"🐊",title:"Anggaran Dikuasai Broker",       bg:"#faf5ff",bd:"#d8b4fe",tx:"#6b21a8"},
};

const FLOWS = {
  statusquo:    [["Gini Tinggi","Modal Sosial Lemah"],["Industri Lemah","Impor & Kelangkaan"],["Modal Sosial Lemah","KOLAPS"],["Impor & Kelangkaan","KOLAPS"]],
  developmental:[["State-Led Kuat","Industri Lokal"],["Industri Lokal","Alkes Mandiri"],["Gini Turun","Compliance Organik"],["Alkes Mandiri","RESILIENT"],["Compliance Organik","RESILIENT"]],
  market:       [["Swasta Dominan","ICU Berbayar"],["Gini Tinggi","Distrust Masif"],["ICU Berbayar","KOLAPS"],["Distrust Masif","KOLAPS"]],
  nordic:       [["Pajak Progresif","Gini Rendah"],["Gini Rendah","Kepercayaan Institusi"],["Kepercayaan Institusi","Compliance Organik"],["Spending Universal","RESILIENT"],["Compliance Organik","RESILIENT"]],
};

// ─── ANIMATED NUMBER ──────────────────────────────────────────────────────────
function AnimNum({val}) {
  const [n,setN]=useState(val); const prev=useRef(val);
  useEffect(()=>{
    const from=prev.current,to=val,t0=Date.now(),dur=400;
    const tick=()=>{
      const p=Math.min(1,(Date.now()-t0)/dur),e=1-Math.pow(1-p,3);
      setN(Math.round(from+(to-from)*e));
      if(p<1)requestAnimationFrame(tick); else prev.current=to;
    };
    requestAnimationFrame(tick);
  },[val]);
  return <>{n}</>;
}

// ─── THICK SEMI-CIRCLE GAUGE ─────────────────────────────────────────────────
function Gauge({score, showDelta}) {
  const W=320, H=185, cx=W/2, cy=H-10, R=130, SW=26;
  const toXY=(deg,r)=>({x:cx+r*Math.cos(deg*Math.PI/180),y:cy+r*Math.sin(deg*Math.PI/180)});
  const arc=(r,a1,a2)=>{
    const p1=toXY(a1,r),p2=toXY(a2,r),large=Math.abs(a2-a1)>180?1:0;
    return `M${p1.x} ${p1.y} A${r} ${r} 0 ${large} 0 ${p2.x} ${p2.y}`;
  };
  const color=score>=70?"#16a34a":score>=45?"#d97706":"#dc2626";
  const endDeg=180-(score/100)*180;
  const needleDeg=180-(score/100)*180;
  const nTip=toXY(needleDeg,R-14);
  const dDeg=180-(DELTA_SCORE/100)*180;
  const dOuter=toXY(dDeg,R+4),dInner=toXY(dDeg,R-SW-6);

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible",display:"block",margin:"0 auto"}}>
      {/* Track */}
      <path d={arc(R,180,0)} fill="none" stroke="#f1f5f9" strokeWidth={SW} strokeLinecap="round"/>
      {/* Fill */}
      {score>0.5&&<path d={arc(R,180,endDeg)} fill="none" stroke={color} strokeWidth={SW} strokeLinecap="round"
        style={{transition:"stroke 0.4s"}}/>}
      {/* Delta ghost */}
      {showDelta&&<>
        <line x1={dInner.x} y1={dInner.y} x2={dOuter.x} y2={dOuter.y}
          stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.9"/>
        <circle cx={dOuter.x} cy={dOuter.y} r="5" fill="#dc2626" opacity="0.85">
          <animate attributeName="opacity" values="0.85;0.3;0.85" dur="1.4s" repeatCount="indefinite"/>
        </circle>
        <text x={dOuter.x} y={dOuter.y-12} textAnchor="middle"
          fill="#dc2626" fontSize="8" fontWeight="700" fontFamily="'DM Mono',monospace">Jul'21</text>
      </>}
      {/* Needle */}
      <g style={{transformOrigin:`${cx}px ${cy}px`,transform:`rotate(${needleDeg-180}deg)`,
        transition:"transform 0.5s cubic-bezier(0.34,1.4,0.64,1)"}}>
        <line x1={cx} y1={cy} x2={cx} y2={cy-R+16} stroke={color} strokeWidth="3" strokeLinecap="round"
          style={{transition:"stroke 0.4s"}}/>
      </g>
      <circle cx={cx} cy={cy} r="9" fill={color} style={{transition:"fill 0.4s"}}/>
      <circle cx={cx} cy={cy} r="4.5" fill="white"/>
      {/* Score */}
      <text x={cx} y={cy-32} textAnchor="middle" fill={color}
        fontSize="56" fontWeight="900" fontFamily="'DM Mono',monospace"
        style={{transition:"fill 0.4s"}}>
        <AnimNum val={Math.round(score)}/>
      </text>
      {/* End labels */}
      <text x={20} y={H-2} fill="#cbd5e1" fontSize="9" fontFamily="'DM Mono',monospace">0</text>
      <text x={W-20} y={H-2} fill="#cbd5e1" fontSize="9" fontFamily="'DM Mono',monospace" textAnchor="end">100</text>
    </svg>
  );
}

// ─── METRIC BAR ───────────────────────────────────────────────────────────────
function Bar({label,value,color}) {
  return (
    <div style={{marginBottom:9}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
        <span style={{fontSize:11,color:"#64748b"}}>{label}</span>
        <span style={{fontSize:11,color,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{Math.round(value)}</span>
      </div>
      <div style={{height:5,background:"#f1f5f9",borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${value}%`,background:color,borderRadius:3,transition:"width 0.4s ease"}}/>
      </div>
    </div>
  );
}

// ─── SLIDER ───────────────────────────────────────────────────────────────────
function Slider({label,provLabel,sub,value,onChange,color,leftLabel,rightLabel}) {
  return (
    <div style={{marginBottom:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
        <div style={{flex:1,paddingRight:12}}>
          <div style={{fontSize:12,fontWeight:700,color:"#0f172a",letterSpacing:0.2}}>{label}</div>
          <div style={{fontSize:10,fontWeight:600,color,marginTop:2,letterSpacing:0.2}}>{provLabel}</div>
          <div style={{fontSize:10,color:"#94a3b8",marginTop:3,lineHeight:1.6}}>{sub}</div>
        </div>
        <div style={{fontSize:22,fontWeight:900,color,fontFamily:"'DM Mono',monospace",
          lineHeight:1,flexShrink:0,minWidth:32,textAlign:"right",transition:"color 0.3s"}}>{value}</div>
      </div>
      <input type="range" min="0" max="100" value={value} onChange={e=>onChange(Number(e.target.value))}
        style={{width:"100%",height:4,appearance:"none",borderRadius:2,outline:"none",cursor:"pointer",
          background:`linear-gradient(to right,${color} ${value}%,#e2e8f0 ${value}%)`,transition:"background 0.1s"}}/>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
        <span style={{fontSize:9,color:"#d1d5db"}}>{leftLabel}</span>
        <span style={{fontSize:9,color:"#d1d5db"}}>{rightLabel}</span>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [sl,setSl]=useState({gini:32,industrial:22,stateLed:28,spending:23});
  const [ap,setAp]=useState("statusquo");
  const [showDelta,setShowDelta]=useState(false);

  const r=compute(sl);
  const scoreColor=r.score>=70?"#16a34a":r.score>=45?"#d97706":"#dc2626";
  const statusLabel=r.score>=70?"SISTEM SIAP":r.score>=45?"WASPADA — RENTAN":"KRITIS — AKAN KOLAPS";
  const statusBg=r.score>=70?"#f0fdf4":r.score>=45?"#fffbeb":"#fff1f2";
  const statusBd=r.score>=70?"#bbf7d0":r.score>=45?"#fde68a":"#fecdd3";

  const applyPreset=k=>{const p=PRESETS[k];setSl({gini:p.gini,industrial:p.industrial,stateLed:p.stateLed,spending:p.spending});setAp(k);};
  const upd=k=>v=>{setSl(s=>({...s,[k]:v}));setAp(null);};

  const flows=FLOWS[ap||"statusquo"];
  const flowColor=ap==="market"?"#dc2626":ap==="statusquo"?"#dc2626":ap==="developmental"?"#16a34a":"#16a34a";

  return (
    <div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#0f172a"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input[type=range]{-webkit-appearance:none;appearance:none;}
        input[type=range]::-webkit-slider-thumb{
          -webkit-appearance:none;width:18px;height:18px;border-radius:50%;
          background:white;cursor:pointer;border:2px solid #d1d5db;
          box-shadow:0 1px 4px rgba(0,0,0,0.12);transition:box-shadow 0.15s,transform 0.1s;}
        input[type=range]::-webkit-slider-thumb:hover{box-shadow:0 2px 8px rgba(0,0,0,0.2);transform:scale(1.1);}
        input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:white;cursor:pointer;border:2px solid #d1d5db;}
        .pbtn{transition:all .15s;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;}
        .pbtn:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(0,0,0,0.09);}
        .fadein{animation:fi .22s ease;}
        @keyframes fi{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
        .card{background:white;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.06),0 1px 3px rgba(0,0,0,0.04);}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:2px;}
      `}</style>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div style={{background:"white",borderBottom:"1px solid #f1f5f9",
        boxShadow:"0 1px 0 #e2e8f0",padding:"18px 36px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:9,letterSpacing:3.5,color:"#94a3b8",fontFamily:"'DM Mono',monospace",marginBottom:5,textTransform:"uppercase"}}>
              Crisis Preparedness Simulator · Indonesia 2029
            </div>
            <h1 style={{fontSize:"clamp(16px,2vw,22px)",fontWeight:700,color:"#0f172a",lineHeight:1.3,letterSpacing:-0.3}}>
              Jika Pandemi Baru Terjadi Besok —{" "}
              <span style={{fontWeight:300,color:"#64748b"}}>Apakah Sistem Kita Akan Bertahan?</span>
            </h1>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {Object.entries(PRESETS).map(([k,p])=>(
              <button key={k} className="pbtn" onClick={()=>applyPreset(k)} style={{
                padding:"6px 14px",borderRadius:8,fontSize:10,fontWeight:700,
                background:ap===k?p.c+"12":"white",
                color:ap===k?p.c:"#94a3b8",
                border:`1.5px solid ${ap===k?p.c:"#e2e8f0"}`,
              }}>
                {p.label}
                <span style={{display:"block",fontSize:8,fontWeight:400,opacity:0.65,marginTop:1}}>{p.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preset note strip */}
      {ap && (
        <div style={{background:PRESETS[ap].c+"0b",borderBottom:`1px solid ${PRESETS[ap].c}1a`,
          padding:"8px 36px",fontSize:11,color:"#475569",lineHeight:1.7}}>
          <span style={{fontWeight:700,color:PRESETS[ap].c}}>{PRESETS[ap].label}: </span>
          {PRESETS[ap].note}
        </div>
      )}

      {/* ── 40/60 COLUMNS ───────────────────────────────────────── */}
      <div style={{display:"grid",gridTemplateColumns:"40% 60%",maxWidth:1280,margin:"0 auto",
        minHeight:"calc(100vh - 90px)"}}>

        {/* ═══ LEFT 40%: SLIDERS ══════════════════════════════════ */}
        <div style={{background:"#f1f5f9",borderRight:"1px solid #e8ecf0",padding:"32px 32px",overflowY:"auto"}}>
          <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
            textTransform:"uppercase",marginBottom:28}}>Input Kebijakan</div>

          <Slider label="PEMERATAAN (GINI)"     provLabel="→ Resiliensi Akar Rumput"
            sub="Pajak progresif, jaring pengaman. Gini rendah = modal sosial tidak kolaps — rakyat patuh secara organik."
            value={sl.gini}       onChange={upd("gini")}       color="#7c3aed" leftLabel="Timpang ekstrem" rightLabel="Sangat merata"/>
          <Slider label="BASIS INDUSTRI"          provLabel="→ Kedaulatan Alat Hidup"
            sub="Pabrik ventilator, APD, obat lokal. Tanpa ini: krisis = impor darurat harga 10× lipat."
            value={sl.industrial} onChange={upd("industrial")} color="#0284c7" leftLabel="Impor semua"     rightLabel="Mandiri penuh"/>
          <Slider label="STATE-LED DIRECTION"     provLabel="→ Kontrol vs Profit"
            sub="Negara kendalikan RS swasta & farmasi saat darurat. Tanpa kontrol: ICU untuk pasien VIP saja."
            value={sl.stateLed}   onChange={upd("stateLed")}   color="#4f46e5" leftLabel="Pasar bebas"     rightLabel="Negara pimpin"/>
          <Slider label="HEALTH SPENDING"         provLabel="→ Hanya Efektif Jika Struktur Benar"
            sub="Kuba $971/kapita: outcome baik. AS $11.072/kapita: outcome terburuk negara maju."
            value={sl.spending}   onChange={upd("spending")}   color="#0891b2" leftLabel="Minimal"         rightLabel="Masif"/>

          {sl.spending>50&&sl.industrial<35&&(
            <div className="fadein" style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,
              padding:"12px 14px",marginTop:-10,marginBottom:20}}>
              <div style={{fontSize:11,color:"#854d0e",fontWeight:700}}>💸 Duit Terbang ke Luar Negeri</div>
              <div style={{fontSize:10,color:"#a16207",marginTop:3,lineHeight:1.65}}>
                ~{Math.round(sl.spending*(1-sl.industrial/100)*0.7)}% anggaran lari sebagai impor alkes karena industri domestik lemah.
              </div>
            </div>
          )}

          {r.warnings.length>0&&(
            <div style={{marginTop:8}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
                textTransform:"uppercase",marginBottom:10}}>Warning Aktif</div>
              {r.warnings.map(w=>{const wd=WARN[w];return(
                <div key={w} className="fadein" style={{background:wd.bg,border:`1px solid ${wd.bd}`,
                  borderRadius:9,padding:"9px 12px",marginBottom:7,display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:14}}>{wd.icon}</span>
                  <span style={{fontSize:10,color:wd.tx,fontWeight:600}}>{wd.title}</span>
                </div>
              );})}
            </div>
          )}

          {/* Legend */}
          <div style={{marginTop:32,paddingTop:24,borderTop:"1px solid #e2e8f0"}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
              textTransform:"uppercase",marginBottom:12}}>Legenda Skor</div>
            {[["0–30","Collapse","#dc2626"],["31–44","Kritis","#ea580c"],
              ["45–59","Waspada","#d97706"],["60–74","Resilient","#65a30d"],["75–100","Siap","#16a34a"]].map(([r,l,c])=>(
              <div key={r} style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
                <div style={{width:24,height:5,background:c,borderRadius:2,flexShrink:0}}/>
                <span style={{fontSize:10,color:"#64748b"}}>
                  <span style={{color:c,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{r}</span>&ensp;{l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ RIGHT 60%: RESULTS ════════════════════════════════ */}
        <div style={{padding:"28px 32px",overflowY:"auto",display:"flex",flexDirection:"column",gap:16}}>

          {/* CARD 1: GAUGE + STATUS ─────────────────────────────── */}
          <div className="card" style={{padding:"28px 28px 20px",background:statusBg,
            border:`1px solid ${statusBd}`,transition:"background 0.4s,border-color 0.4s"}}>
            {/* Status sub-headline */}
            <div style={{textAlign:"center",marginBottom:4}}>
              <span style={{fontSize:9,letterSpacing:3,color:scoreColor+"99",
                fontFamily:"'DM Mono',monospace",textTransform:"uppercase"}}>Survival Probability</span>
            </div>
            <div style={{textAlign:"center",marginBottom:10}}>
              <span style={{
                fontSize:18,fontWeight:900,color:scoreColor,
                fontFamily:"'DM Mono',monospace",letterSpacing:1.5,
                transition:"color 0.4s",
              }}>{statusLabel}</span>
            </div>

            {/* Gauge */}
            <Gauge score={r.score} showDelta={showDelta}/>

            {/* Delta toggle */}
            <div style={{textAlign:"center",marginTop:8}}>
              <button onClick={()=>setShowDelta(d=>!d)} className="pbtn" style={{
                padding:"7px 18px",borderRadius:7,fontSize:10,
                background:showDelta?"#fee2e2":"white",
                border:`1.5px solid ${showDelta?"#fca5a5":"#e2e8f0"}`,
                color:showDelta?"#dc2626":"#94a3b8",
                fontFamily:"'DM Mono',monospace",fontWeight:700,letterSpacing:0.5,
              }}>
                {showDelta?"▲ SEMBUNYIKAN HANTU DELTA":"▼ TAMPILKAN HANTU DELTA JULI 2021"}
              </button>
              {showDelta&&(
                <div className="fadein" style={{marginTop:8,fontSize:10,color:"#dc2626",
                  background:"#fff1f2",border:"1px solid #fecdd3",borderRadius:7,
                  padding:"8px 14px",display:"inline-block",lineHeight:1.7}}>
                  <strong style={{fontFamily:"'DM Mono',monospace"}}>Juli 2021 · skor {Math.round(DELTA_SCORE)}</strong>
                  &ensp;·&ensp;~1.700 kematian/hari · RS overload 120%+ · Oksigen habis di Jawa
                  <div style={{marginTop:4,fontWeight:700}}>
                    {r.score>=60?"✓ Sistem mampu menahan gelombang setara Delta."
                      :r.score>=40?"⚠ ICU kemungkinan overload — tidak kolaps total."
                      :"✗ Skenario Juli 2021 akan terulang atau lebih buruk."}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CARD 2: METRIC BARS ─────────────────────────────────── */}
          <div className="card" style={{padding:"20px 24px"}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
              textTransform:"uppercase",marginBottom:16}}>Breakdown Komponen</div>
            <Bar label="Kepatuhan Rakyat"   value={r.compliance}    color="#7c3aed"/>
            <Bar label="Rantai Pasok Alkes"  value={r.supplyChain}   color="#0284c7"/>
            <Bar label="Kesehatan Fiskal"    value={r.fiscalHealth}  color="#0891b2"/>
            <Bar label="Kapasitas Surge ICU" value={r.surgeCapacity} color="#4f46e5"/>
          </div>

          {/* CARD 3: FLOW + DIAGNOSIS side by side ──────────────── */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>

            {/* Causal flow — NO boxes, pure text + arrows */}
            <div className="card" style={{padding:"20px 24px"}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
                textTransform:"uppercase",marginBottom:16}}>Diagram Kausalitas</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {flows.map(([from,to],i)=>{
                  const isResult=to==="KOLAPS"||to==="RESILIENT";
                  const rc=to==="KOLAPS"?"#dc2626":"#16a34a";
                  return (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:11,color:"#64748b",fontWeight:500}}>{from}</span>
                      <span style={{color:"#cbd5e1",fontSize:13,lineHeight:1,flexShrink:0}}>→</span>
                      <span style={{fontSize:11,fontWeight:isResult?800:500,
                        color:isResult?rc:"#64748b",
                        fontFamily:isResult?"'DM Mono',monospace":"inherit"}}>{to}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Diagnosis */}
            <div className="card" style={{padding:"20px 24px"}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
                textTransform:"uppercase",marginBottom:16}}>Diagnosis Sistem</div>
              {(()=>{
                const {gini:G,industrial:I,stateLed:L,spending:SP}=sl;
                const ins=[];
                if(G<35&&I>50) ins.push({c:"#dc2626",t:"Teknologi tanpa kepercayaan",d:"Ketimpangan tinggi memblokir compliance organik — identik dengan AS 2020."});
                if(I<30&&SP>55) ins.push({c:"#d97706",t:"Low Industrial + High Spending = Debt",d:"Anggaran jadi beban impor tanpa membangun kapasitas nyata."});
                if(L>65&&I>60) ins.push({c:"#16a34a",t:"State-Led + Industrial = Surge Capacity",d:"Sistem bisa napas saat gelombang krisis. Vietnam membuktikan ini."});
                if(G>65&&I>55) ins.push({c:"#7c3aed",t:"Equality + Industry = Formula Paling Robust",d:"Compliance organik + kapasitas nyata. Dikonfirmasi data 20 negara."});
                if(SP>70&&L<30) ins.push({c:"#be185d",t:"Anggaran Besar = Mangsa Broker",d:"APD mark-up 900% seperti 2020. Uang habis, kapasitas tidak bertambah."});
                if(ins.length===0) ins.push({c:"#94a3b8",t:"Geser slider untuk diagnosis",d:"Setiap kombinasi kebijakan punya konsekuensi sistemik yang berbeda."});
                return ins.map((item,i)=>(
                  <div key={i} style={{borderLeft:`2px solid ${item.c}`,paddingLeft:10,marginBottom:12}}>
                    <div style={{fontSize:10,fontWeight:800,color:item.c,
                      fontFamily:"'DM Mono',monospace",marginBottom:2}}>{item.t}</div>
                    <div style={{fontSize:10,color:"#64748b",lineHeight:1.7}}>{item.d}</div>
                  </div>
                ));
              })()}
            </div>
          </div>

          <div style={{fontSize:9,color:"#d1d5db",fontFamily:"'DM Mono',monospace",textAlign:"right",paddingBottom:8}}>
            Model: Ostrom · Putnam · Ha-Joon Chang · Marmot
          </div>
        </div>
      </div>
    </div>
  );
}
