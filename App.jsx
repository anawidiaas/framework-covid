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
  const color   = score>=70 ? "#16a34a" : score>=45 ? "#d97706" : "#dc2626";
  const colorLt = score>=70 ? "#bbf7d0" : score>=45 ? "#fde68a" : "#fecdd3";
  const colorGl = score>=70 ? "rgba(22,163,74," : score>=45 ? "rgba(217,119,6," : "rgba(220,38,38,";
  // pulse speed: critical=fast, healthy=slow
  const pulseDur = score>=70 ? "3s" : score>=45 ? "2s" : "0.9s";
  const pulseScale = score>=70 ? "1.04" : score>=45 ? "1.06" : "1.12";

  const CX=220, CY=220, R=220;

  // Satellite nodes: position around the orb
  const nodes = [
    { key:"gini",      label:"Pemerataan",     val:sliders.gini,      angle:-130, color:"#7c3aed" },
    { key:"industrial",label:"Basis Industri", val:sliders.industrial,angle:-60,  color:"#0284c7" },
    { key:"stateLed",  label:"State-Led",      val:sliders.stateLed,  angle:0,    color:"#4f46e5" },
    { key:"spending",  label:"Spending",       val:sliders.spending,  angle:60,   color:"#0891b2" },
  ];

  const toRad = d => d*Math.PI/180;
  const orbR = 78; // orb visual radius
  const satDist = 150; // distance from center to satellite

  return (
    <div style={{position:"relative", width:440, height:440, margin:"0 auto", flexShrink:0}}>
      <style>{`
        @keyframes orbPulse {
          0%,100% { transform: scale(1); opacity:0.9; }
          50%      { transform: scale(${pulseScale}); opacity:1; }
        }
        @keyframes orbGlow {
          0%,100% { box-shadow: 0 0 40px 10px ${colorGl}0.18), 0 0 80px 20px ${colorGl}0.08); }
          50%      { box-shadow: 0 0 60px 20px ${colorGl}0.28), 0 0 120px 40px ${colorGl}0.12); }
        }
        @keyframes ripple {
          0%   { transform:translate(-50%,-50%) scale(1); opacity:0.5; }
          100% { transform:translate(-50%,-50%) scale(2.2); opacity:0; }
        }
        @keyframes dotFloat {
          0%,100%{ opacity:1; transform:translateY(0); }
          50%    { opacity:0.4; transform:translateY(-3px); }
        }
      `}</style>

      <svg width="440" height="440" viewBox="0 0 440 440"
        style={{position:"absolute",top:0,left:0,overflow:"visible"}}>

        {/* Satellite connection lines */}
        {nodes.map(nd => {
          const a = toRad(nd.angle);
          const sx = CX + satDist*Math.cos(a);
          const sy = CY + satDist*Math.sin(a);
          const ex = CX + orbR*Math.cos(a);
          const ey = CY + orbR*Math.sin(a);
          const strong = nd.val >= 50;
          return (
            <g key={nd.key}>
              <line
                x1={sx} y1={sy} x2={ex} y2={ey}
                stroke={nd.color}
                strokeWidth={strong ? 1.5 : 1}
                strokeDasharray={strong ? "none" : "4 4"}
                opacity={0.25 + (nd.val/100)*0.55}
                style={{transition:"all 0.4s ease"}}
              />
              {/* Satellite dot */}
              <circle cx={sx} cy={sy} r={4 + (nd.val/100)*4}
                fill={nd.color} opacity={0.15 + (nd.val/100)*0.5}
                style={{transition:"all 0.4s ease"}}/>
              {/* Flow particle */}
              {strong && (
                <circle r="2.5" fill={nd.color} opacity="0.7">
                  <animateMotion dur={`${1.5 + Math.random()}s`} repeatCount="indefinite"
                    path={`M${sx},${sy} L${ex},${ey}`}/>
                </circle>
              )}
            </g>
          );
        })}

        {/* Satellite labels */}
        {nodes.map(nd => {
          const a = toRad(nd.angle);
          const lx = CX + (satDist+24)*Math.cos(a);
          const ly = CY + (satDist+24)*Math.sin(a);
          const anchor = nd.angle < -90 || nd.angle > 90 ? "end" : nd.angle===0 ? "start" : "middle";
          return (
            <g key={nd.key+"lbl"}>
              <text x={lx} y={ly-5} textAnchor={anchor}
                fill={nd.color} fontSize="10" fontWeight="700"
                fontFamily="'DM Mono',monospace" opacity={0.5+(nd.val/100)*0.5}>
                {nd.label}
              </text>
              <text x={lx} y={ly+8} textAnchor={anchor}
                fill={nd.color} fontSize="11" fontWeight="900"
                fontFamily="'DM Mono',monospace" opacity={0.5+(nd.val/100)*0.5}>
                {nd.val}
              </text>
            </g>
          );
        })}

        {/* Delta ghost ring */}
        {showDelta && (
          <circle cx={CX} cy={CY} r={orbR+18}
            fill="none" stroke="#dc2626" strokeWidth="1.5"
            strokeDasharray="6 4" opacity="0.55">
            <animate attributeName="opacity" values="0.55;0.2;0.55" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        )}
      </svg>

      {/* Ripple rings */}
      {[0,1,2].map(i=>(
        <div key={i} style={{
          position:"absolute", top:"50%", left:"50%",
          width:orbR*2, height:orbR*2, borderRadius:"50%",
          border:`1.5px solid ${color}`,
          animation:`ripple ${pulseDur} ${i*(parseFloat(pulseDur)/3)}s ease-out infinite`,
          pointerEvents:"none",
        }}/>
      ))}

      {/* The Orb */}
      <div style={{
        position:"absolute", top:"50%", left:"50%",
        width:orbR*2, height:orbR*2, borderRadius:"50%",
        transform:"translate(-50%,-50%)",
        background:`radial-gradient(circle at 38% 35%, ${colorLt}, ${color}cc 60%, ${color})`,
        animation:`orbPulse ${pulseDur} ease-in-out infinite, orbGlow ${pulseDur} ease-in-out infinite`,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        cursor:"default",
      }}>
        <div style={{fontSize:52, fontWeight:900, color:"white",
          fontFamily:"'DM Mono',monospace", lineHeight:1, textShadow:"0 2px 12px rgba(0,0,0,0.3)"}}>
          <AnimNum val={Math.round(score)}/>
        </div>
        <div style={{fontSize:8, letterSpacing:3, color:"rgba(255,255,255,0.75)",
          fontFamily:"'DM Mono',monospace", marginTop:3}}>/ 100</div>
      </div>

      {/* Delta label */}
      {showDelta && (
        <div style={{position:"absolute", bottom:38, left:"50%", transform:"translateX(-50%)",
          background:"#fff1f2", border:"1px solid #fecdd3", borderRadius:6,
          padding:"4px 10px", fontSize:9, color:"#dc2626", fontFamily:"'DM Mono',monospace",
          fontWeight:700, whiteSpace:"nowrap", opacity:0.9}}>
          Hantu Delta Jul'21 · {Math.round(DELTA_SCORE)}
        </div>
      )}
    </div>
  );
}

// ─── SLIDER ───────────────────────────────────────────────────────────────────
function Slider({label, provLabel, sub, value, onChange, color, leftLabel, rightLabel}) {
  return (
    <div style={{marginBottom:26}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6}}>
        <div style={{flex:1, paddingRight:14}}>
          <div style={{fontSize:11, fontWeight:700, color:"#0f172a", letterSpacing:0.2}}>{label}</div>
          <div style={{fontSize:10, fontWeight:600, color, marginTop:2}}>{provLabel}</div>
          <div style={{fontSize:10, color:"#94a3b8", marginTop:3, lineHeight:1.6}}>{sub}</div>
        </div>
        <div style={{fontSize:22, fontWeight:900, color, fontFamily:"'DM Mono',monospace",
          lineHeight:1, flexShrink:0, transition:"color 0.3s"}}>{value}</div>
      </div>
      <input type="range" min="0" max="100" value={value}
        onChange={e=>onChange(Number(e.target.value))}
        style={{width:"100%", height:4, appearance:"none", borderRadius:2, outline:"none", cursor:"pointer",
          background:`linear-gradient(to right,${color} ${value}%,#e2e8f0 ${value}%)`,
          transition:"background 0.1s"}}/>
      <div style={{display:"flex", justifyContent:"space-between", marginTop:3}}>
        <span style={{fontSize:9, color:"#d1d5db"}}>{leftLabel}</span>
        <span style={{fontSize:9, color:"#d1d5db"}}>{rightLabel}</span>
      </div>
    </div>
  );
}

// ─── BAR ──────────────────────────────────────────────────────────────────────
function Bar({label, value, color}) {
  return (
    <div style={{marginBottom:8}}>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:3}}>
        <span style={{fontSize:10, color:"#94a3b8"}}>{label}</span>
        <span style={{fontSize:10, color, fontWeight:700, fontFamily:"'DM Mono',monospace"}}>{Math.round(value)}</span>
      </div>
      <div style={{height:4, background:"#f1f5f9", borderRadius:2, overflow:"hidden"}}>
        <div style={{height:"100%", width:`${value}%`, background:color,
          borderRadius:2, transition:"width 0.4s ease"}}/>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [sl, setSl] = useState({gini:32, industrial:22, stateLed:28, spending:23});
  const [ap, setAp] = useState("statusquo");
  const [showDelta, setShowDelta] = useState(false);

  const r = compute(sl);
  const sc = r.score;
  const color   = sc>=70?"#16a34a":sc>=45?"#d97706":"#dc2626";
  const statusLabel = sc>=70?"SISTEM SIAP":sc>=45?"WASPADA — RENTAN":"KRITIS — AKAN KOLAPS";

  const applyPreset = k => {
    const p=PRESETS[k];
    setSl({gini:p.gini,industrial:p.industrial,stateLed:p.stateLed,spending:p.spending});
    setAp(k);
  };
  const upd = k => v => { setSl(s=>({...s,[k]:v})); setAp(null); };

  const FLOWS = {
    statusquo:    [["Gini Tinggi","→","Modal Sosial Lemah"],["Industri Lemah","→","Impor & Kelangkaan"],["Modal Sosial Lemah","→","KOLAPS"],["Impor & Kelangkaan","→","KOLAPS"]],
    developmental:[["State-Led Kuat","→","Industri Lokal"],["Industri Lokal","→","Alkes Mandiri"],["Gini Turun","→","Compliance Organik"],["Alkes Mandiri","→","RESILIENT"],["Compliance Organik","→","RESILIENT"]],
    market:       [["Swasta Dominan","→","ICU Berbayar"],["Gini Tinggi","→","Distrust Masif"],["ICU Berbayar","→","KOLAPS"],["Distrust Masif","→","KOLAPS"]],
    nordic:       [["Pajak Progresif","→","Gini Rendah"],["Gini Rendah","→","Kepercayaan"],["Kepercayaan","→","Compliance Organik"],["Spending Universal","→","RESILIENT"],["Compliance Organik","→","RESILIENT"]],
  };
  const flows = FLOWS[ap||"statusquo"];

  const WARN = {
    import:       {icon:"💸",title:"Duit terbang ke luar negeri — ~"+Math.round(sl.spending*(1-sl.industrial/100)*0.7)+"% anggaran jadi impor alkes.", tx:"#92400e",bg:"#fffbeb"},
    polarize:     {icon:"⚡",title:"Teknologi tanpa kepercayaan — ketimpangan memblokir compliance organik.", tx:"#991b1b",bg:"#fef2f2"},
    profitleak:   {icon:"🏥",title:"RS swasta prioritaskan profit — ICU dikosongkan untuk pasien VIP.", tx:"#7c2d12",bg:"#fff7ed"},
    capturedspend:{icon:"🐊",title:"Anggaran besar tanpa kontrol = mangsa broker. APD mark-up 900% seperti 2020.", tx:"#6b21a8",bg:"#faf5ff"},
  };

  const diagnoses = [];
  const {gini:G,industrial:I,stateLed:L,spending:SP} = sl;
  if(G<35&&I>50)  diagnoses.push({c:"#dc2626",t:"Teknologi Tanpa Kepercayaan.",    d:"Ketimpangan tinggi memblokir compliance organik — identik AS 2020."});
  if(I<30&&SP>55) diagnoses.push({c:"#d97706",t:"Low Industrial + High Spending = Debt.",  d:"Anggaran jadi beban impor tanpa membangun kapasitas nyata."});
  if(L>65&&I>60)  diagnoses.push({c:"#16a34a",t:"State-Led + Industrial = Surge Capacity.",d:"Sistem bisa napas saat gelombang krisis. Vietnam membuktikan ini."});
  if(G>65&&I>55)  diagnoses.push({c:"#7c3aed",t:"Equality + Industry = Formula Paling Robust.",d:"Compliance organik + kapasitas nyata. Dikonfirmasi 20 negara."});
  if(SP>70&&L<30) diagnoses.push({c:"#be185d",t:"Anggaran Besar = Mangsa Broker.",  d:"APD mark-up 900% seperti 2020. Uang habis, kapasitas tidak bertambah."});
  if(diagnoses.length===0) diagnoses.push({c:"#94a3b8",t:"Geser slider untuk aktivasi diagnosis.",d:"Setiap kombinasi kebijakan punya konsekuensi sistemik yang berbeda."});

  return (
    <div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#0f172a",display:"flex",flexDirection:"column"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input[type=range]{-webkit-appearance:none;appearance:none;}
        input[type=range]::-webkit-slider-thumb{
          -webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:white;
          cursor:pointer;border:2px solid #d1d5db;box-shadow:0 1px 4px rgba(0,0,0,0.12);
          transition:box-shadow .15s,transform .1s;}
        input[type=range]::-webkit-slider-thumb:hover{box-shadow:0 2px 8px rgba(0,0,0,0.2);transform:scale(1.1);}
        input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:white;cursor:pointer;border:2px solid #d1d5db;}
        .pbtn{transition:all .15s;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;}
        .pbtn:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(0,0,0,0.1);}
        .fadein{animation:fi .25s ease;}
        @keyframes fi{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:2px;}
      `}</style>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div style={{background:"white",borderBottom:"1px solid #e8ecf0",padding:"16px 36px",
        display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap",
        boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
        <div>
          <div style={{fontSize:9,letterSpacing:3.5,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
            textTransform:"uppercase",marginBottom:5}}>
            Crisis Preparedness Simulator · Indonesia 2029
          </div>
          <h1 style={{fontSize:"clamp(15px,1.8vw,21px)",fontWeight:700,color:"#0f172a",lineHeight:1.3,letterSpacing:-0.3}}>
            Jika Pandemi Baru Terjadi Besok —&nbsp;
            <span style={{fontWeight:300,color:"#94a3b8"}}>Apakah Sistem Kita Akan Bertahan?</span>
          </h1>
        </div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          {Object.entries(PRESETS).map(([k,p])=>(
            <button key={k} className="pbtn" onClick={()=>applyPreset(k)} style={{
              padding:"6px 13px",borderRadius:8,fontSize:10,fontWeight:700,
              background:ap===k?p.c+"12":"white",
              color:ap===k?p.c:"#94a3b8",
              border:`1.5px solid ${ap===k?p.c:"#e2e8f0"}`,
            }}>
              {p.label}
              <span style={{display:"block",fontSize:8,fontWeight:400,opacity:0.6,marginTop:1}}>{p.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preset note */}
      {ap && (
        <div style={{background:PRESETS[ap].c+"0c",borderBottom:`1px solid ${PRESETS[ap].c}1a`,
          padding:"7px 36px",fontSize:11,color:"#475569",lineHeight:1.7}}>
          <span style={{fontWeight:700,color:PRESETS[ap].c}}>{PRESETS[ap].label}: </span>
          {PRESETS[ap].note}
        </div>
      )}

      {/* ── MAIN 40/60 ─────────────────────────────────────────── */}
      <div style={{display:"grid",gridTemplateColumns:"40% 60%",flex:1}}>

        {/* ═══ LEFT 40%: SLIDERS ════════════════════════════════ */}
        <div style={{background:"#f1f5f9",borderRight:"1px solid #e2e8f0",
          padding:"28px 30px",overflowY:"auto"}}>
          <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
            textTransform:"uppercase",marginBottom:24}}>Input Kebijakan</div>

          <Slider label="PEMERATAAN (GINI)"   provLabel="→ Resiliensi Akar Rumput"
            sub="Pajak progresif, jaring pengaman. Gini rendah = modal sosial tidak kolaps — rakyat patuh secara organik."
            value={sl.gini}       onChange={upd("gini")}       color="#7c3aed" leftLabel="Timpang" rightLabel="Merata"/>
          <Slider label="BASIS INDUSTRI"        provLabel="→ Kedaulatan Alat Hidup"
            sub="Pabrik ventilator, APD, obat lokal. Tanpa ini: krisis = impor darurat harga 10× lipat."
            value={sl.industrial} onChange={upd("industrial")} color="#0284c7" leftLabel="Impor semua" rightLabel="Mandiri"/>
          <Slider label="STATE-LED DIRECTION"   provLabel="→ Kontrol vs Profit"
            sub="Negara kendalikan RS swasta saat darurat. Tanpa kontrol: ICU dikosongkan untuk pasien VIP."
            value={sl.stateLed}   onChange={upd("stateLed")}   color="#4f46e5" leftLabel="Pasar bebas" rightLabel="Negara pimpin"/>
          <Slider label="HEALTH SPENDING"       provLabel="→ Hanya Efektif Jika Struktur Benar"
            sub="Kuba $971/kapita: baik. AS $11.072/kapita: terburuk negara maju. Struktur yang menentukan."
            value={sl.spending}   onChange={upd("spending")}   color="#0891b2" leftLabel="Minimal" rightLabel="Masif"/>

          {/* Warnings */}
          {r.warnings.length>0 && (
            <div style={{marginTop:4}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
                textTransform:"uppercase",marginBottom:10}}>Warning Aktif</div>
              {r.warnings.map(w=>{const wd=WARN[w];return(
                <div key={w} className="fadein" style={{background:wd.bg,borderRadius:8,
                  padding:"9px 12px",marginBottom:7,display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{fontSize:13,flexShrink:0,marginTop:1}}>{wd.icon}</span>
                  <span style={{fontSize:10,color:wd.tx,lineHeight:1.6}}>{wd.title}</span>
                </div>
              );})}
            </div>
          )}

          {/* Legend */}
          <div style={{marginTop:28,paddingTop:22,borderTop:"1px dashed #e2e8f0"}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
              textTransform:"uppercase",marginBottom:12}}>Legenda Skor</div>
            {[["0–30","Collapse","#dc2626"],["31–44","Kritis","#ea580c"],
              ["45–59","Waspada","#d97706"],["60–74","Resilient","#65a30d"],["75–100","Siap","#16a34a"]].map(([rng,lbl,c])=>(
              <div key={rng} style={{display:"flex",alignItems:"center",gap:9,marginBottom:7}}>
                <div style={{width:22,height:4,background:c,borderRadius:2,flexShrink:0}}/>
                <span style={{fontSize:10,color:"#64748b"}}>
                  <span style={{color:c,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{rng}</span>&ensp;{lbl}
                </span>
              </div>
            ))}
            <div style={{marginTop:16,fontSize:9,color:"#cbd5e1",fontFamily:"'DM Mono',monospace",lineHeight:1.9}}>
              Model: Ostrom · Putnam<br/>Ha-Joon Chang · Marmot
            </div>
          </div>
        </div>

        {/* ═══ RIGHT 60%: RESULTS ══════════════════════════════ */}
        <div style={{padding:"28px 32px",overflowY:"auto",background:"white"}}>

          {/* Status headline */}
          <div style={{textAlign:"center",marginBottom:4}}>
            <div style={{fontSize:9,letterSpacing:3.5,color:color+"99",
              fontFamily:"'DM Mono',monospace",textTransform:"uppercase",marginBottom:6}}>
              Survival Probability
            </div>
            <div style={{fontSize:18,fontWeight:900,color,fontFamily:"'DM Mono',monospace",
              letterSpacing:1.5,transition:"color 0.4s",lineHeight:1.2}}>
              {statusLabel}
            </div>
            {sc<45&&(
              <div className="fadein" style={{fontSize:10,color:"#94a3b8",marginTop:4,fontStyle:"italic"}}>
                Tanpa perubahan struktural, skenario Juli 2021 akan terulang atau lebih buruk.
              </div>
            )}
          </div>

          {/* THE ORB */}
          <SystemicOrb score={sc} showDelta={showDelta} sliders={sl}/>

          {/* Delta toggle */}
          <div style={{textAlign:"center",marginTop:0,marginBottom:20}}>
            <button onClick={()=>setShowDelta(d=>!d)} className="pbtn" style={{
              padding:"7px 18px",borderRadius:7,fontSize:10,
              background:showDelta?"#fee2e2":"#f8fafc",
              border:`1.5px solid ${showDelta?"#fca5a5":"#e2e8f0"}`,
              color:showDelta?"#dc2626":"#94a3b8",
              fontFamily:"'DM Mono',monospace",fontWeight:700,letterSpacing:0.5,
            }}>
              {showDelta?"▲ SEMBUNYIKAN HANTU DELTA":"▼ TAMPILKAN HANTU DELTA JULI 2021"}
            </button>
            {showDelta&&(
              <div className="fadein" style={{marginTop:6,fontSize:10,color:"#dc2626",lineHeight:1.7,
                background:"#fff1f2",border:"1px solid #fecdd3",borderRadius:7,
                padding:"7px 14px",display:"inline-block"}}>
                <strong style={{fontFamily:"'DM Mono',monospace"}}>Jul'21 · skor {Math.round(DELTA_SCORE)}</strong>
                &ensp;·&ensp;1.700 kematian/hari · RS overload 120%+ · Oksigen habis di Jawa
                <div style={{marginTop:3,fontWeight:700}}>
                  {sc>=60?"✓ Sistem mampu menahan gelombang setara Delta."
                    :sc>=40?"⚠ ICU kemungkinan overload — tidak kolaps total."
                    :"✗ Skenario Juli 2021 akan terulang atau lebih buruk."}
                </div>
              </div>
            )}
          </div>

          {/* Metric bars */}
          <div style={{background:"#f8fafc",borderRadius:12,padding:"14px 18px",marginBottom:16,
            border:"1px solid #f1f5f9"}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
              textTransform:"uppercase",marginBottom:12}}>Breakdown Komponen</div>
            <Bar label="Kepatuhan Rakyat"   value={r.compliance}    color="#7c3aed"/>
            <Bar label="Rantai Pasok Alkes"  value={r.supplyChain}   color="#0284c7"/>
            <Bar label="Kesehatan Fiskal"    value={r.fiscalHealth}  color="#0891b2"/>
            <Bar label="Kapasitas Surge ICU" value={r.surgeCapacity} color="#4f46e5"/>
          </div>

          {/* Flow + Diagnosis */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>

            {/* Causal flow — pure text, no boxes */}
            <div>
              <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
                textTransform:"uppercase",marginBottom:12}}>Diagram Kausalitas</div>
              {flows.map(([from,arr,to],i)=>{
                const isResult = to==="KOLAPS"||to==="RESILIENT";
                const rc = to==="KOLAPS"?"#dc2626":"#16a34a";
                return (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:5,marginBottom:7}}>
                    <span style={{fontSize:10,color:"#64748b"}}>{from}</span>
                    <span style={{color:"#d1d5db",fontSize:11,flexShrink:0}}>→</span>
                    <span style={{fontSize:10,fontWeight:isResult?800:400,
                      color:isResult?rc:"#64748b",
                      fontFamily:isResult?"'DM Mono',monospace":"inherit"}}>{to}</span>
                  </div>
                );
              })}
            </div>

            {/* X-Ray Diagnosis */}
            <div>
              <div style={{fontSize:9,letterSpacing:3,color:"#94a3b8",fontFamily:"'DM Mono',monospace",
                textTransform:"uppercase",marginBottom:12}}>Diagnosis X-Ray</div>
              {diagnoses.map((d,i)=>(
                <div key={i} style={{borderLeft:`2px solid ${d.c}`,paddingLeft:10,marginBottom:10}}>
                  <div style={{fontSize:10,fontWeight:800,color:d.c,
                    fontFamily:"'DM Mono',monospace",lineHeight:1.4,marginBottom:2}}>{d.t}</div>
                  <div style={{fontSize:10,color:"#64748b",lineHeight:1.65}}>{d.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
