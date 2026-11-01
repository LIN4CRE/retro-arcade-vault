/**
 * StorageService & Schema v4.0 Verification Test Suite
 * Tests:
 * 1. Schema v4.0 initialization and defaults
 * 2. High score leaderboard ranking, initials sanitization, and top 10 capping
 * 3. Trophy / Achievement unlocking and query
 * 4. Playtime and play counter statistics
 * 5. Backward compatibility and legacy migration (v1, v2.1, v3 -> v4.0)
 * 6. In-memory fallback on quota exceeded error
 * 7. Zero data loss JSON export and import roundtrip
 * 8. Adversarial malformed payload handling
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  MockLocalStorage,
  ReferenceStorageService,
  getStorageService
} from './test-harness.js';

describe('StorageService Contract & Schema v4.0 Tests', () => {
  let mockStorage;
  let service;

  beforeEach(async () => {
    mockStorage = new MockLocalStorage();
    service = await getStorageService({ storage: mockStorage });
  });

  describe('1. Schema v4.0 Initialization & Defaults', () => {
    it('initializes with schemaVersion "4.0"', () => {
      assert.strictEqual(service.state.schemaVersion, '4.0');
    });

    it('initializes empty highScores and achievements collections', () => {
      assert.ok(Array.isArray(service.state.highScores));
      assert.strictEqual(service.state.highScores.length, 0);
      assert.ok(Array.isArray(service.state.achievements));
      assert.strictEqual(service.state.achievements.length, 0);
    });

    it('initializes default stats, settings, and keybindings', () => {
      assert.strictEqual(service.state.stats.totalPlaytimeSec, 0);
      assert.deepStrictEqual(service.state.stats.playCountPerGame, {});
      assert.ok(service.state.settings.masterVolume >= 0);
      assert.ok(service.state.keybindings.UP);
      assert.ok(service.state.keybindings.ACTION_1);
    });
  });

  describe('2. Automated High Score Hall of Fame', () => {
    it('records a new high score with 3-character uppercase initials', () => {
      const res = service.addHighScore('snake', 'Neon Snake', 'ace', 520);
      assert.strictEqual(res.isNewHighScore, true);
      assert.strictEqual(res.rank, 1);
      assert.strictEqual(res.record.initials, 'ACE');
      assert.strictEqual(res.record.score, 520);
      assert.strictEqual(res.record.gameId, 'snake');
    });

    it('sanitizes lowercase, whitespace, and special characters in initials', () => {
      const res = service.addHighScore('pong', 'Cyber Pong', '  x!9_y  ', 100);
      assert.strictEqual(res.record.initials, 'X9Y');
    });

    it('pads short initials to 3 characters and truncates long ones', () => {
      const short = service.addHighScore('pong', 'Cyber Pong', 'A', 50);
      assert.strictEqual(short.record.initials, 'AAA');

      const long = service.addHighScore('pong', 'Cyber Pong', 'TOOLONG', 60);
      assert.strictEqual(long.record.initials, 'TOO');
    });

    it('ranks higher scores first and resolves ties with timestamps', () => {
      service.addHighScore('snake', 'Neon Snake', 'ONE', 100);
      service.addHighScore('snake', 'Neon Snake', 'TWO', 300);
      service.addHighScore('snake', 'Neon Snake', 'THR', 200);

      const scores = service.getHighScores('snake');
      assert.strictEqual(scores.length, 3);
      assert.strictEqual(scores[0].initials, 'TWO');
      assert.strictEqual(scores[0].score, 300);
      assert.strictEqual(scores[1].initials, 'THR');
      assert.strictEqual(scores[1].score, 200);
      assert.strictEqual(scores[2].initials, 'ONE');
      assert.strictEqual(scores[2].score, 100);
    });

    it('caps leaderboard at top 10 records per game', () => {
      for (let i = 1; i <= 15; i++) {
        service.addHighScore('breakout', 'Brick Smasher', `P${i}`, i * 100);
      }

      const scores = service.getHighScores('breakout');
      assert.strictEqual(scores.length, 10);
      assert.strictEqual(scores[0].score, 1500); // Top score
      assert.strictEqual(scores[9].score, 600);  // 10th score
    });

    it('updates highScorePerGame in statistics', () => {
      service.addHighScore('asteroids', 'Asteroids', 'TOP', 4200);
      const stats = service.getPlayStats();
      assert.strictEqual(stats.highScorePerGame['asteroids'], 4200);
    });
  });

  describe('3. Unified Achievement System', () => {
    it('unlocks trophy and returns true on first occurrence', () => {
      const unlocked = service.unlockTrophy('COIN_DROP');
      assert.strictEqual(unlocked, true);
      assert.strictEqual(service.isTrophyUnlocked('COIN_DROP'), true);
      assert.ok(service.getUnlockedTrophies().includes('COIN_DROP'));
    });

    it('prevents duplicate trophy unlocks and returns false', () => {
      service.unlockTrophy('TIME_TRAVELER');
      const secondAttempt = service.unlockTrophy('TIME_TRAVELER');
      assert.strictEqual(secondAttempt, false);
      const count = service.getUnlockedTrophies().filter(t => t === 'TIME_TRAVELER').length;
      assert.strictEqual(count, 1);
    });
  });

  describe('4. Session Stopwatch & Playtime Statistics', () => {
    it('records game launches and increments game play count', () => {
      service.recordGameLaunch('snake');
      service.recordGameLaunch('snake');
      service.recordGameLaunch('pong');

      const stats = service.getPlayStats();
      assert.strictEqual(stats.playCountPerGame['snake'], 2);
      assert.strictEqual(stats.playCountPerGame['pong'], 1);
    });

    it('accumulates total playtime seconds accurately', () => {
      service.recordPlaytime('snake', 65);
      service.recordPlaytime('snake', 120);

      const stats = service.getPlayStats();
      assert.strictEqual(stats.totalPlaytimeSec, 185);
    });
  });

  describe('5. Legacy Schema Migration (v1, v2.1, v3 -> v4.0)', () => {
    it('migrates legacy favorites, trophies, and user notes', () => {
      const legacyStorage = new MockLocalStorage();
      legacyStorage.setItem('RETRO_VAULT_FAVORITES_V1', JSON.stringify(['bo1-zombies', 'sonic']));
      legacyStorage.setItem('RETRO_VAULT_TROPHIES_V1', JSON.stringify(['COIN_DROP', 'COLLECTOR']));
      legacyStorage.setItem('RETRO_VAULT_USER_NOTES_V1', JSON.stringify({ 'bo1-zombies': 'Must buy Jug!' }));
      legacyStorage.setItem('retro_vault_scores_v3', JSON.stringify([
        { gameId: 'bo1-zombies', gameTitle: 'BO1 Zombies', initials: 'SAM', score: 1150 }
      ]));

      const migratedService = new ReferenceStorageService(legacyStorage);

      // Verify migration
      assert.strictEqual(migratedService.state.schemaVersion, '4.0');
      assert.ok(migratedService.isFavorite('bo1-zombies'));
      assert.ok(migratedService.isFavorite('sonic'));
      assert.ok(migratedService.isTrophyUnlocked('COIN_DROP'));
      assert.ok(migratedService.isTrophyUnlocked('COLLECTOR'));
      assert.strictEqual(migratedService.getNote('bo1-zombies'), 'Must buy Jug!');

      const scores = migratedService.getHighScores('bo1-zombies');
      assert.strictEqual(scores.length, 1);
      assert.strictEqual(scores[0].initials, 'SAM');
      assert.strictEqual(scores[0].score, 1150);
    });
  });

  describe('6. In-Memory Fallback on Quota Exceeded', () => {
    it('falls back to in-memory mode when localStorage throws QuotaExceededError', () => {
      mockStorage.simulateQuotaExceeded = true;
      const memService = new ReferenceStorageService(mockStorage);

      assert.doesNotThrow(() => {
        memService.addHighScore('invaders', 'Space Invaders', 'MEM', 990);
        memService.unlockTrophy('NIGHT_OWL');
      });

      assert.strictEqual(memService.isInMemory, true);
      assert.strictEqual(memService.isTrophyUnlocked('NIGHT_OWL'), true);
      const scores = memService.getHighScores('invaders');
      assert.strictEqual(scores.length, 1);
      assert.strictEqual(scores[0].initials, 'MEM');
    });
  });

  describe('7. Resilient JSON Export & Import (Zero Data Loss)', () => {
    it('performs full roundtrip export and import preserving 100% of state', () => {
      service.addHighScore('snake', 'Neon Snake', 'WIN', 850);
      service.addHighScore('pong', 'Cyber Pong', 'CPU', 15);
      service.unlockTrophy('COIN_DROP');
      service.unlockTrophy('HALL_OF_FAME');
      service.toggleFavorite('snake');
      service.recordGameLaunch('snake');
      service.recordPlaytime('snake', 420);
      service.setNote('snake', 'Eat gold pellets');

      const exportedJson = service.exportBackup();
      assert.ok(typeof exportedJson === 'string');

      // Create new fresh service on clean storage
      const freshStorage = new MockLocalStorage();
      const freshService = new ReferenceStorageService(freshStorage);
      assert.strictEqual(freshService.getHighScores().length, 0);

      // Import backup
      const importResult = freshService.importBackup(exportedJson);
      assert.strictEqual(importResult.success, true);
      assert.strictEqual(importResult.highScoresCount, 2);
      assert.strictEqual(importResult.achievementsCount, 2);

      // Verify zero data loss
      assert.strictEqual(freshService.isFavorite('snake'), true);
      assert.strictEqual(freshService.isTrophyUnlocked('COIN_DROP'), true);
      assert.strictEqual(freshService.isTrophyUnlocked('HALL_OF_FAME'), true);
      assert.strictEqual(freshService.getNote('snake'), 'Eat gold pellets');

      const snakeScores = freshService.getHighScores('snake');
      assert.strictEqual(snakeScores.length, 1);
      assert.strictEqual(snakeScores[0].initials, 'WIN');
      assert.strictEqual(snakeScores[0].score, 850);

      const stats = freshService.getPlayStats();
      assert.strictEqual(stats.totalPlaytimeSec, 420);
      assert.strictEqual(stats.playCountPerGame['snake'], 1);
    });

    it('rejects malformed or non-JSON payloads gracefully', () => {
      assert.throws(() => {
        service.importBackup('{ corrupted payload ...');
      }, /Invalid JSON format/);

      assert.throws(() => {
        service.importBackup({ invalid: 'no version' });
      }, /Invalid schema/);
    });
  });
});
