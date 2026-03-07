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
  market:       {label:"Market Liberal",      sub:"Privatisasi penuh",        c:"#dc2626",
