import React, { useState, useEffect, useRef } from "react";

// ─── ENGINE SIMULATOR ────────────────────────────────────────────────────────
function compute(s) {
  const G=s.gini/100, I=s.industrial/100, L=s.stateLed/100, SP=s.spending/100;
  const score = Math.max(0, Math.min(100,(G*0.30 + I*0.25 + L*0.15 + SP*I*0.28 - SP*(1-I)*0.18 - (1-G)*I*0.08 + L*I*0.12)*100));
  return {
    score,
    compliance: Math.max(0,Math.min(100, G*90+L*10)),
    supplyChain: Math.max(0,Math.min(100, I*70+L*30)),
    fiscalHealth: Math.max(0,Math.min(100, 100-SP*(1-I)*80)),
    surgeCapacity: Math.max(0,Math.min(100, I*50+L*35+SP*I*15)),
  };
}

const PRESETS = {
  statusquo: {label:"Status Quo", c:"#d97706", gini:32, industrial:22, stateLed:28, spending:23},
  developmental: {label:"Developmental State", c:"#16a34a", gini:72, industrial:78, stateLed:74, spending:62},
  market: {label:"Market Liberal", c:"#dc2626", gini:22, industrial:28, stateLed:12, spending:48},
  nordic: {label:"Nordic Hybrid", c:"#7c3aed", gini:82, industrial:65, stateLed:58, spending:78},
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [sl, setSl] = useState({gini:32, industrial:22, stateLed:28, spending:23});
  const [ap, setAp] = useState("statusquo");
  const [showDelta, setShowDelta] = useState(false);

  const r = compute(sl);
  const color = r.score >= 70 ? "#10b981" : r.score >= 45 ? "#f59e0b" : "#ef4444";
  const statusLabel = r.score >= 70 ? "SISTEM SIAP" : r.score >= 45 ? "WASPADA — RENTAN" : "KRITIS — AKAN KOLAPS";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", color: "#0f172a", fontFamily: "sans-serif", padding: "40px" }}>
      <style>{`
        @keyframes orbPulse { 0%,100%{transform:scale(1);opacity:0.95;} 50%{transform:scale(1.08);opacity:1;} }
        input[type=range] { width: 100%; cursor: pointer; accent-color: #0f172a; margin: 10px 0; }
        .pbtn:hover { background-color: #f1f5f9 !important; border-color: #cbd5e1 !important; }
      `}</style>
      
      {/* ── HEADER DENGAN HEADLINE GRADASI BERWARNA ── */}
      <header style={{ maxWidth: "1200px", margin: "0 auto 48px", paddingBottom: "32px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
        <div style={{ flex: "1 1 600px" }}>
          <div style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "0.3em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "12px" }}>Crisis Preparedness Simulator · Indonesia 2029</div>
          
          <h1 style={{
            background: 'linear-gradient(90deg, #4f46e5, #0ea5e9, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            letterSpacing: '-0.025em',
            margin: 0,
            display: 'inline-block'
          }}>
            Jika Pandemi Baru Terjadi Besok <br />
            — Apakah Sistem Kita Akan Bertahan?
          </h1>
          
          <p style={{ color: "#64748b", fontWeight: 500, fontSize: "1.1rem", maxWidth: "600px", marginTop: "16px", lineHeight: "1.6" }}>
            Eksperimen kebijakan ekonomi-politik untuk mengukur resiliensi kesehatan nasional sebelum gelombang berikutnya tiba.
          </p>
        </div>

        {/* PRESET BUTTONS */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {Object.entries(PRESETS).map(([k, p]) => (
            <button key={k} onClick={() => { setSl({ gini: p.gini, industrial: p.industrial, stateLed: p.stateLed, spending: p.spending }); setAp(k); }} 
              style={{ padding: "10px 16px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold", border: "2px solid", cursor: "pointer", transition: "all 0.2s", backgroundColor: ap === k ? '#0f172a' : 'white', borderColor: ap === k ? '#0f172a' : '#f1f5f9', color: ap === k ? 'white' : '#94a3b8' }}>
              {p.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── MAIN CONTENT (LAYOUT 2 KOLOM) ── */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "60px" }}>
        
        {/* KOLOM KIRI: SLIDERS (40%) */}
        <section style={{ flex: "1 1 400px", backgroundColor: "#f8fafc", padding: "32px", borderRadius: "32px", border: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: "0.1em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "30px" }}>Input Kebijakan</div>
          
          {[
            { k:"gini", l:"Pemerataan (Gini)", sub:"Resiliensi Akar Rumput", c:"#8b5cf6" },
            { k:"industrial", l:"Basis Industri", sub:"Kedaulatan Alat Hidup", c:"#0ea5e9" },
            { k:"stateLed", l:"State-Led Direction", sub:"Kontrol vs Profit", c:"#6366f1" },
            { k:"spending", l:"Health Spending", sub:"Efektifitas Anggaran", c:"#06b6d4" }
          ].map(slid => (
            <div key={slid.k} style={{ marginBottom: "35px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "12px" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>{slid.l}</div>
                  <div style={{ fontSize: "10px", fontWeight: "600", color: "#94a3b8", marginTop: "2px" }}>{slid.sub}</div>
                </div>
                <div style={{ fontSize: "28px", fontWeight: "900", color: slid.c, fontFamily: "monospace" }}>{sl[slid.k]}</div>
              </div>
              <input type="range" min="0" max="100" value={sl[slid.k]} onChange={e => setSl({ ...sl, [slid.k]: Number(e.target.value) })} />
            </div>
          ))}
        </section>

        {/* KOLOM KANAN: RESULT (60%) */}
        <section style={{ flex: "1.5 1 500px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: "0.1em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "10px" }}>Survival Probability</div>
            <h2 style={{ fontSize: "2rem", fontWeight: "900", fontFamily: "monospace", letterSpacing: "0.1em", color: color, margin: 0 }}>{statusLabel}</h2>
          </div>

          {/* THE SYSTEMIC ORB */}
          <div style={{ 
            width: "240px", height: "240px", borderRadius: "50%", backgroundColor: color, 
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", 
            boxShadow: `0 0 60px ${color}44`, animation: "orbPulse 2s infinite ease-in-out",
            border: "8px solid white"
          }}>
            <div style={{ fontSize: "5rem", fontWeight: "900", color: "white", fontFamily: "monospace", lineHeight: 1 }}>{Math.round(r.score)}</div>
            <div style={{ fontSize: "11px", color: "white", opacity: 0.8, fontWeight: "bold", letterSpacing: "3px", marginTop: "10px" }}>SURVIVAL</div>
          </div>

          {/* DIAGNOSIS BOX */}
          <div style={{ width: "100%", marginTop: "50px", padding: "30px", backgroundColor: "white", border: "1px solid #f1f5f9", borderRadius: "28px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", textAlign: "center" }}>
             <p style={{ fontSize: "15px", color: "#475569", fontWeight: 500, lineHeight: "1.6", margin: 0 }}>
               Geser slider di sebelah kiri untuk melihat bagaimana pilihan politik ekonomi memengaruhi kemampuan sistem bertahan dari pandemi.
             </p>
          </div>
          
          <button onClick={() => setShowDelta(!showDelta)} style={{ marginTop: "25px", background: "none", border: "none", color: "#94a3b8", textDecoration: "underline", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}>
            {showDelta ? "Sembunyikan Data Historis" : "Bandingkan dengan Skor Delta 2021"}
          </button>
        </section>
      </main>
    </div>
  );
}
