/**
 * Milestone 1 Comprehensive Integrity & Defect Remediation Test Suite
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

describe('Milestone 1 Core & Foundation Integrity Verification', () => {
  const htmlPath = path.join(PROJECT_ROOT, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  describe('1. 15 Local Vector SVG Box Art Assets', () => {
    const brokenIds = [
      'bo1-zombies', 'final-fantasy-chronicles', 'digimon-digital-card-battle',
      'yu-gi-oh-forbidden-memories', 'crash-team-racing', 'metroid-fusion',
      'advance-wars', 'advance-wars-2', 'super-street-fighter-ii-gba',
      'might-and-magic-clash-of-heroes', 'mario-kart-ds', 'the-world-ends-with-you',
      'sonic-3-knuckles', 'disney-aladdin', 'road-rash-ii'
    ];

    it('verifies all 15 SVG cover files exist in assets/covers/', () => {
      brokenIds.forEach(id => {
        const coverFile = path.join(PROJECT_ROOT, 'assets', 'covers', `${id}.svg`);
        assert.ok(fs.existsSync(coverFile), `Cover file missing: assets/covers/${id}.svg`);
        const stat = fs.statSync(coverFile);
        assert.ok(stat.size > 500, `Cover file is suspiciously small: ${coverFile}`);
        const content = fs.readFileSync(coverFile, 'utf8');
        assert.ok(content.startsWith('<svg') && content.includes('</svg>'), `Invalid SVG content: ${coverFile}`);
      });
    });

    it('verifies DEFAULT_GAMES in index.html points to local assets/covers/', () => {
      brokenIds.forEach(id => {
        assert.ok(
          html.includes(`assets/covers/${id}.svg`),
          `index.html does not point to assets/covers/${id}.svg`
        );
      });
    });

    it('verifies spotlight thumbnail points to local bo1-zombies.svg', () => {
      assert.ok(
        html.includes('src="assets/covers/bo1-zombies.svg"'),
        'Spotlight thumbnail does not point to assets/covers/bo1-zombies.svg'
      );
    });
  });

  describe('2. Dual-Hall Navigation & Canvas Elements in index.html', () => {
    it('contains #hallNavBar with Native Arcade and Emulation Vault tabs', () => {
      assert.ok(html.includes('id="hallNavBar"'), 'Missing #hallNavBar in index.html');
      assert.ok(html.includes('id="nativeHallTab"'), 'Missing #nativeHallTab button');
      assert.ok(html.includes('id="emulationHallTab"'), 'Missing #emulationHallTab button');
    });

    it('contains #arcadeCanvas inside #screenContainer', () => {
      assert.ok(html.includes('id="arcadeCanvas"'), 'Missing #arcadeCanvas in index.html');
      assert.ok(html.includes('class="arcade-canvas"'), 'Missing .arcade-canvas class');
    });

    it('contains #externalNoticeOverlay for COD Zombies HTTP 451 status notice', () => {
      assert.ok(html.includes('id="externalNoticeOverlay"'), 'Missing #externalNoticeOverlay');
      assert.ok(html.includes('HTTP 451 • UNAVAILABLE FOR LEGAL REASONS'), 'Missing HTTP 451 notice text');
      assert.ok(html.includes('id="noticeSwitchNativeBtn"'), 'Missing switch to native button');
    });
  });

  describe('3. Audited Defect Remediation in index.html', () => {
    it('fixes Sega Genesis category (crusader-of-centy, landstalker, shining-in-the-darkness)', () => {
      const segaIds = ['crusader-of-centy', 'landstalker', 'shining-in-the-darkness'];
      segaIds.forEach(id => {
        const idIdx = html.indexOf(`"id": "${id}"`);
        assert.ok(idIdx !== -1, `Game ID ${id} not found in index.html`);
        const gameChunk = html.slice(idIdx, idIdx + 300);
        assert.ok(gameChunk.includes('"category": "SEGA"'), `Game ${id} is not category SEGA`);
        assert.ok(!gameChunk.includes('"category": "GENESIS"'), `Game ${id} still has category GENESIS`);
      });
    });

    it('calls startSessionTimer() inside selectGame()', () => {
      const selectGameIdx = html.indexOf('function selectGame(id)');
      assert.ok(selectGameIdx !== -1, 'selectGame function not found');
      const selectGameBody = html.slice(selectGameIdx, selectGameIdx + 1200);
      assert.ok(selectGameBody.includes('startSessionTimer()'), 'startSessionTimer() not invoked in selectGame');
    });

    it('increments playStats[id] inside selectGame()', () => {
      const selectGameIdx = html.indexOf('function selectGame(id)');
      const selectGameBody = html.slice(selectGameIdx, selectGameIdx + 1200);
      assert.ok(
        selectGameBody.includes('playStats[id] = (playStats[id] || 0) + 1;'),
        'playStats[id] not incremented in selectGame'
      );
      assert.ok(selectGameBody.includes('savePlayStats()'), 'savePlayStats() not called in selectGame');
    });

    it('unlocks COIN_DROP trophy inside selectGame()', () => {
      const selectGameIdx = html.indexOf('function selectGame(id)');
      const selectGameBody = html.slice(selectGameIdx, selectGameIdx + 1200);
      assert.ok(selectGameBody.includes('unlockTrophy("COIN_DROP")'), 'COIN_DROP trophy not unlocked in selectGame');
    });

    it('calls checkPassiveTrophies() across required triggers', () => {
      const occurrences = html.split('checkPassiveTrophies()').length - 1;
      assert.ok(occurrences >= 4, `Expected at least 4 calls to checkPassiveTrophies(), found ${occurrences}`);
    });

    it('removes hardcoded /12 from trophy badge count', () => {
      assert.ok(!html.includes('count + "/12"'), 'Found obsolete hardcoded "/12" in updateTrophiesBadge');
    });

    it('persists deleted default game IDs eliminating resurrection bug', () => {
      assert.ok(html.includes('DELETED_DEFAULTS_KEY = "retro_vault_deleted_defaults"'), 'Missing DELETED_DEFAULTS_KEY');
      assert.ok(html.includes('deletedDefaultIds = new Set('), 'Missing deletedDefaultIds Set');
      assert.ok(html.includes('saveDeletedDefaults()'), 'Missing saveDeletedDefaults function');
    });

    it('fixes backup export/import silent data loss', () => {
      const exportIdx = html.indexOf('function exportLibrary()');
      assert.ok(exportIdx !== -1, 'exportLibrary not found');
      const exportBody = html.slice(exportIdx, exportIdx + 1000);
      assert.ok(exportBody.includes('userNotes: userNotes'), 'userNotes not exported');
      assert.ok(exportBody.includes('playTimes: playTimes'), 'playTimes not exported');

      const importIdx = html.indexOf('function importLibrary(');
      assert.ok(importIdx !== -1, 'importLibrary not found');
      const importBody = html.slice(importIdx, importIdx + 1800);
      assert.ok(importBody.includes('playTimes = data.playTimes'), 'playTimes not imported');
      assert.ok(importBody.includes('userNotes = data.userNotes'), 'userNotes not imported');
    });
  });
});
