/**
 * Retro Arcade Vault - Vector Cover Art Generator
 * File: scripts/generate-covers.js
 * 
 * Generates 15 authentic retro vector SVG box art assets in assets/covers/
 * for titles with broken remote URLs.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../assets/covers');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

export const COVERS = [
  { id: 'bo1-zombies', title: 'Black Ops Zombies', subtitle: 'Call of Duty • 10 Maps', system: 'PC / WASM', color1: '#1f2937', color2: '#7f1d1d', accent: '#ef4444', emoji: '🧟' },
  { id: 'final-fantasy-chronicles', title: 'FF Chronicles', subtitle: 'FF IV & Chrono Trigger', system: 'PlayStation 1', color1: '#00205b', color2: '#003791', accent: '#ffd700', emoji: '⚔️' },
  { id: 'digimon-digital-card-battle', title: 'Digimon Card', subtitle: 'Digital Card Battle', system: 'PlayStation 1', color1: '#00205b', color2: '#064e3b', accent: '#00ff66', emoji: '🦖' },
  { id: 'yu-gi-oh-forbidden-memories', title: 'Yu-Gi-Oh! FM', subtitle: '15 Card Mod Edition', system: 'PlayStation 1', color1: '#00205b', color2: '#713f12', accent: '#eab308', emoji: '👁️' },
  { id: 'crash-team-racing', title: 'Crash Team Racing', subtitle: 'CTR Grand Prix', system: 'PlayStation 1', color1: '#00205b', color2: '#7c2d12', accent: '#f97316', emoji: '🏎️' },
  { id: 'metroid-fusion', title: 'Metroid Fusion', subtitle: 'Biologic Space Labs', system: 'Game Boy Advance', color1: '#3b0764', color2: '#164e63', accent: '#06b6d4', emoji: '🚀' },
  { id: 'advance-wars', title: 'Advance Wars', subtitle: 'Wars World • Orange Star', system: 'Game Boy Advance', color1: '#3b0764', color2: '#7f1d1d', accent: '#ef4444', emoji: '🎖️' },
  { id: 'advance-wars-2', title: 'Advance Wars 2', subtitle: 'Black Hole Rising', system: 'Game Boy Advance', color1: '#3b0764', color2: '#4c1d95', accent: '#a855f7', emoji: '🎖️' },
  { id: 'super-street-fighter-ii-gba', title: 'SSF II Turbo', subtitle: 'Revival Edition', system: 'Game Boy Advance', color1: '#3b0764', color2: '#0369a1', accent: '#38bdf8', emoji: '🥊' },
  { id: 'might-and-magic-clash-of-heroes', title: 'Might & Magic', subtitle: 'Clash of Heroes', system: 'Nintendo DS', color1: '#083344', color2: '#581c87', accent: '#c084fc', emoji: '🧩' },
  { id: 'mario-kart-ds', title: 'Mario Kart DS', subtitle: 'Retro Grand Prix', system: 'Nintendo DS', color1: '#083344', color2: '#831843', accent: '#f43f5e', emoji: '🏎️' },
  { id: 'the-world-ends-with-you', title: 'TWEWY', subtitle: 'The World Ends With You', system: 'Nintendo DS', color1: '#083344', color2: '#78350f', accent: '#f59e0b', emoji: '🎧' },
  { id: 'sonic-3-knuckles', title: 'Sonic & Knuckles', subtitle: 'Sonic The Hedgehog 3', system: 'Sega Genesis', color1: '#450a0a', color2: '#064e3b', accent: '#10b981', emoji: '🌀' },
  { id: 'disney-aladdin', title: "Disney's Aladdin", subtitle: 'Agrabah Adventures', system: 'Sega Genesis', color1: '#450a0a', color2: '#78350f', accent: '#fbbf24', emoji: '🕌' },
  { id: 'road-rash-ii', title: 'Road Rash II', subtitle: 'Super Bike Combat', system: 'Sega Genesis', color1: '#450a0a', color2: '#18181b', accent: '#f97316', emoji: '🏍️' }
];

export function generateAllCovers() {
  COVERS.forEach(c => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c.color1}"/>
      <stop offset="100%" stop-color="${c.color2}"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="300" height="400" rx="16" fill="#0b0e17"/>
  <rect x="8" y="8" width="284" height="384" rx="12" fill="url(#bg)" stroke="${c.accent}" stroke-width="2"/>
  <!-- Console Header Banner -->
  <path d="M8 20 Q8 8 20 8 L280 8 Q292 8 292 20 L292 46 L8 46 Z" fill="rgba(0,0,0,0.65)"/>
  <text x="150" y="32" font-family="'Rajdhani', sans-serif" font-weight="700" font-size="14" fill="${c.accent}" text-anchor="middle" letter-spacing="2">${c.system.toUpperCase()}</text>
  <!-- Center Hologram Glyph -->
  <circle cx="150" cy="180" r="70" fill="rgba(0,0,0,0.4)" stroke="url(#glow)" stroke-width="3"/>
  <text x="150" y="200" font-size="54" text-anchor="middle">${c.emoji}</text>
  <!-- Title Typography -->
  <rect x="20" y="275" width="260" height="100" rx="8" fill="rgba(11,14,23,0.85)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="150" y="312" font-family="'Rajdhani', sans-serif" font-weight="700" font-size="20" fill="#ffffff" text-anchor="middle">${c.title}</text>
  <text x="150" y="338" font-family="'Rajdhani', sans-serif" font-weight="600" font-size="13" fill="#94a3b8" text-anchor="middle">${c.subtitle}</text>
  <rect x="80" y="352" width="140" height="15" rx="7" fill="${c.accent}" opacity="0.2"/>
  <text x="150" y="363" font-family="'Rajdhani', sans-serif" font-weight="700" font-size="10" fill="${c.accent}" text-anchor="middle" letter-spacing="1">AUTHENTIC RETRO CLASSIC</text>
</svg>`;
    fs.writeFileSync(path.join(targetDir, `${c.id}.svg`), svg, 'utf8');
  });
  console.log(`Generated ${COVERS.length} vector SVG cover arts in assets/covers/`);
}

generateAllCovers();
