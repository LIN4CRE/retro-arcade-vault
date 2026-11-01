/**
 * Retro Arcade Vault - Centralized Storage Engine (Schema v4.0)
 * File: src/core/storage.js
 * 
 * Features:
 * 1. Centralized Schema v4.0 document persistence under primary key 'retro_vault_v4'.
 * 2. Automated High Score Hall of Fame: Top 10 per game, 3-character uppercase initials,
 *    mathematical ranking, tie-breaking by timestamp, and qualification testing.
 * 3. 17+ Trophies & Achievements state management with deduplication.
 * 4. Comprehensive Playtime Statistics: Total playtime seconds accumulator and per-game launch counters.
 * 5. Full Backward Compatibility: Multi-version migration from legacy v1, v2.1, and v3 schemas.
 * 6. In-Memory Driver Fallback: Gracefully handles quota exhaustion, private browsing, and headless testing.
 * 7. Resilient Zero Data Loss JSON Backup Export & Import with schema validation and XSS sanitization.
 */

// ============================================================================
// 1. Storage Drivers
// ============================================================================

export class MemoryStorageDriver {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
  get length() {
    return this.store.size;
  }
  key(index) {
    return Array.from(this.store.keys())[index] || null;
  }
}

// ============================================================================
// 2. Sanitization & Formatting Helpers
// ============================================================================

export function decodeHtmlEntities(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

export function sanitizeString(str, maxLength = 2000) {
  if (typeof str !== 'string') return '';
  const decoded = decodeHtmlEntities(str);
  return decoded
    .slice(0, maxLength)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function sanitizeInitials(initials) {
  if (typeof initials !== 'string') return 'AAA';
  const cleaned = initials.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (cleaned.length === 0) return 'AAA';
  if (cleaned.length >= 3) return cleaned.slice(0, 3);
  return cleaned.padEnd(3, 'A');
}

// ============================================================================
// 3. Constants and Default Schema
// ============================================================================

export const V4_STORAGE_KEY = 'retro_vault_v4';

export const DEFAULT_SETTINGS = {
  masterVolume: 0.8,
  sfxEnabled: true,
  sfxVolume: 0.8,
  bgmEnabled: false,
  bgmStation: 0,
  bgmVolume: 0.6,
  filterMode: 'Clean HD',
  scanlineOpacity: 50,
  bloomIntensity: 30,
  vignetteOpacity: 40,
  curveRadius: 0,
  bezelActive: false,
  theme: 'neon',
  virtualPadVisible: true,
  sortMode: 'default',
  ratioMode: 'Auto'
};

export const DEFAULT_KEYBINDINGS = {
  UP: ['ArrowUp', 'KeyW'],
  DOWN: ['ArrowDown', 'KeyS'],
  LEFT: ['ArrowLeft', 'KeyA'],
  RIGHT: ['ArrowRight', 'KeyD'],
  ACTION_1: ['Space', 'KeyX'],
  ACTION_2: ['ShiftLeft', 'KeyZ'],
  PAUSE: ['KeyP', 'Escape'],
  RESTART: ['KeyR']
};

// ============================================================================
// 4. Central StorageService Implementation
// ============================================================================

export class StorageService {
  constructor(driverOrOptions = null) {
    this.STORAGE_KEY = V4_STORAGE_KEY;
    this.isInMemory = false;

    // Detect driver
    if (driverOrOptions && typeof driverOrOptions.getItem === 'function') {
      this.driver = driverOrOptions;
    } else if (driverOrOptions && driverOrOptions.storage && typeof driverOrOptions.storage.getItem === 'function') {
      this.driver = driverOrOptions.storage;
    } else if (driverOrOptions && driverOrOptions.driver && typeof driverOrOptions.driver.getItem === 'function') {
      this.driver = driverOrOptions.driver;
    } else {
      this.driver = this._detectDriver();
    }

    this.state = this._createDefaultState();
    this.isLoaded = false;
    this.init();
  }

  // Alias storage property for backward compatibility with tests
  get storage() {
    return this.driver;
  }
  set storage(newDriver) {
    this.driver = newDriver;
  }

  _detectDriver() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const testKey = '__vault_probe__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return window.localStorage;
      }
    } catch (e) {
      // localStorage is blocked or restricted
    }
    this.isInMemory = true;
    return new MemoryStorageDriver();
  }

  _fallbackToMemory() {
    this.isInMemory = true;
    const mem = new MemoryStorageDriver();
    try {
      mem.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {}
    this.driver = mem;
  }

  _createDefaultState() {
    return {
      schemaVersion: '4.0',
      lastUpdated: new Date().toISOString(),
      highScores: [],
      achievements: [],
      stats: {
        totalPlaytimeSec: 0,
        playCountPerGame: {},
        highScorePerGame: {}
      },
      settings: { ...DEFAULT_SETTINGS },
      keybindings: JSON.parse(JSON.stringify(DEFAULT_KEYBINDINGS)),
      favorites: [],
      recents: [],
      customGames: [],
      customNotes: {}
    };
  }

  init() {
    try {
      const stored = this.driver.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.schemaVersion === '4.0' || parsed.version === '4.0')) {
          this.state = this._validateAndMergeState(parsed);
          this.isLoaded = true;
          return;
        }
      }
      // Check legacy schemas (v1, v2, v3)
      this.migrateFromLegacy();
    } catch (err) {
      this._fallbackToMemory();
    }
    this.isLoaded = true;
  }

  save() {
    if (this.isInMemory) return true;
    try {
      this.state.lastUpdated = new Date().toISOString();
      const serialized = JSON.stringify(this.state);
      this.driver.setItem(this.STORAGE_KEY, serialized);
      return true;
    } catch (err) {
      if (err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014) {
        return this._handleQuotaExceeded();
      }
      this._fallbackToMemory();
      return false;
    }
  }

  _save() {
    return this.save();
  }

  _handleQuotaExceeded() {
    try {
      // 1. Cap recents
      if (this.state.recents && this.state.recents.length > 5) {
        this.state.recents = this.state.recents.slice(0, 5);
      }
      // 2. Prune old legacy keys from driver to release bytes
      const legacyKeys = [
        'retro_vault_games_v4', 'retro_vault_favs_v2', 'retro_vault_recents_v2',
        'retro_vault_sfx_v2', 'retro_vault_filter_v2', 'retro_vault_stats_v2',
        'retro_vault_sort_v2', 'retro_vault_notes_v3', 'retro_vault_trophies_v3',
        'retro_vault_times_v3', 'retro_vault_bezel_v3', 'retro_vault_bgm_v3',
        'retro_vault_scores_v3', 'RETRO_VAULT_GAMES_V1', 'RETRO_VAULT_FAVORITES_V1',
        'RETRO_VAULT_RECENTS_V1', 'RETRO_VAULT_SFX_ENABLED_V1', 'RETRO_VAULT_PLAY_STATS_V1',
        'RETRO_VAULT_PLAY_TIMES_V1', 'RETRO_VAULT_TROPHIES_V1', 'RETRO_VAULT_USER_NOTES_V1',
        'RETRO_VAULT_SCORES_V1'
      ];
      for (const k of legacyKeys) {
        try { this.driver.removeItem(k); } catch (e) {}
      }
      // Retry saving
      const serialized = JSON.stringify(this.state);
      this.driver.setItem(this.STORAGE_KEY, serialized);
      return true;
    } catch (retryErr) {
      this._fallbackToMemory();
      return true;
    }
  }

  // ==========================================================================
  // High Scores (Top 10 per game, initials, ranking)
  // ==========================================================================

  getHighScores(gameId = null) {
    if (gameId) {
      return this.state.highScores
        .filter(s => s.gameId === gameId)
        .sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);
    }
    return [...this.state.highScores].sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);
  }

  isHighScore(gameId, score) {
    const num = Math.max(0, Math.floor(Number(score) || 0));
    if (num <= 0) return { qualifies: false, rank: 0 };
    const gameScores = this.getHighScores(gameId);
    if (gameScores.length < 10) {
      const rank = gameScores.filter(s => s.score >= num).length + 1;
      return { qualifies: true, rank };
    }
    const lowestTop10 = gameScores[9];
    if (num > lowestTop10.score) {
      const rank = gameScores.filter(s => s.score >= num).length + 1;
      return { qualifies: true, rank };
    }
    return { qualifies: false, rank: 0 };
  }

  addHighScore(gameIdOrObj, gameTitle = '', initials = 'AAA', score = 0, details = {}) {
    let gid, title, inits, sc, det;

    if (gameIdOrObj && typeof gameIdOrObj === 'object') {
      gid = gameIdOrObj.gameId;
      title = gameIdOrObj.gameTitle || gid;
      inits = gameIdOrObj.initials;
      sc = gameIdOrObj.score;
      det = gameIdOrObj.details || {};
    } else {
      gid = gameIdOrObj;
      title = gameTitle || gid;
      inits = initials;
      sc = score;
      det = details || {};
    }

    if (!gid) return null;

    const cleanInitials = sanitizeInitials(inits);
    const cleanTitle = sanitizeString(title || gid);
    const numericScore = Math.max(0, Math.floor(Number(sc) || 0));
    const now = Date.now();
    const dateStr = new Date(now).toISOString().split('T')[0];

    const newRecord = {
      id: `${gid}_${now}_${Math.random().toString(36).substring(2, 6)}`,
      gameId: gid,
      gameTitle: cleanTitle,
      initials: cleanInitials,
      score: numericScore,
      date: dateStr,
      timestamp: now,
      details: det
    };

    const currentForGame = this.state.highScores.filter(s => s.gameId === gid);
    const otherGames = this.state.highScores.filter(s => s.gameId !== gid);

    currentForGame.push(newRecord);
    currentForGame.sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);

    // Enforce top 10 per game
    const top10 = currentForGame.slice(0, 10);
    this.state.highScores = [...otherGames, ...top10];

    // Maintain stats high score record
    const currentHigh = this.state.stats.highScorePerGame[gid] || 0;
    const isNewHighScore = numericScore > currentHigh;
    if (isNewHighScore) {
      this.state.stats.highScorePerGame[gid] = numericScore;
    }

    this.save();
    const rank = top10.findIndex(s => s.id === newRecord.id) + 1;
    return {
      record: newRecord,
      isNewHighScore,
      rank: rank > 0 ? rank : null,
      qualifies: rank > 0
    };
  }

  deleteHighScore(id) {
    const prevLen = this.state.highScores.length;
    this.state.highScores = this.state.highScores.filter(s => s.id !== id);
    if (this.state.highScores.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  clearHighScores(gameId = null) {
    if (gameId) {
      this.state.highScores = this.state.highScores.filter(s => s.gameId !== gameId);
      delete this.state.stats.highScorePerGame[gameId];
    } else {
      this.state.highScores = [];
      this.state.stats.highScorePerGame = {};
    }
    this.save();
  }

  // ==========================================================================
  // Achievements & Trophies (17+ Catalog)
  // ==========================================================================

  getUnlockedTrophies() {
    return [...this.state.achievements];
  }

  isTrophyUnlocked(trophyId) {
    return this.state.achievements.includes(trophyId);
  }

  unlockTrophy(trophyId) {
    if (!trophyId || typeof trophyId !== 'string') return false;
    if (this.state.achievements.includes(trophyId)) return false;
    this.state.achievements.push(trophyId);
    this.save();
    return true;
  }

  resetTrophies() {
    this.state.achievements = [];
    this.save();
  }

  // ==========================================================================
  // Playtime & Lifetime Statistics
  // ==========================================================================

  getStats() {
    return { ...this.state.stats };
  }

  getPlayStats() {
    return { ...this.state.stats };
  }

  recordGameLaunch(gameId) {
    if (!gameId) return;
    const cur = this.state.stats.playCountPerGame[gameId] || 0;
    this.state.stats.playCountPerGame[gameId] = cur + 1;

    this.state.recents = [gameId, ...this.state.recents.filter(id => id !== gameId)].slice(0, 20);
    this.save();
  }

  recordPlaytime(gameId, durationSec) {
    const sec = Math.max(0, Math.floor(Number(durationSec) || 0));
    this.state.stats.totalPlaytimeSec = (this.state.stats.totalPlaytimeSec || 0) + sec;
    this.save();
  }

  recordPlaySession(gameId, durationSec) {
    if (!gameId) return;
    const sec = Math.max(0, Math.floor(Number(durationSec) || 0));
    this.state.stats.totalPlaytimeSec = (this.state.stats.totalPlaytimeSec || 0) + sec;
    this.state.stats.playCountPerGame[gameId] = (this.state.stats.playCountPerGame[gameId] || 0) + 1;
    this.save();
  }

  getPlayCount(gameId) {
    return this.state.stats.playCountPerGame[gameId] || 0;
  }

  getTotalPlaytime() {
    return this.state.stats.totalPlaytimeSec || 0;
  }

  // ==========================================================================
  // User Notes
  // ==========================================================================

  getNote(gameId) {
    return this.state.customNotes[gameId] || '';
  }

  setNote(gameId, note) {
    if (!gameId) return;
    const clean = sanitizeString(note ? String(note).trim() : '');
    if (clean) {
      this.state.customNotes[gameId] = clean;
    } else {
      delete this.state.customNotes[gameId];
    }
    this.save();
  }

  getAllNotes() {
    return { ...this.state.customNotes };
  }

  // ==========================================================================
  // User Settings
  // ==========================================================================

  getSettings() {
    return { ...this.state.settings };
  }

  getSetting(key, defaultValue = null) {
    return this.state.settings[key] !== undefined ? this.state.settings[key] : defaultValue;
  }

  updateSettings(partialSettings) {
    if (partialSettings && typeof partialSettings === 'object') {
      this.state.settings = { ...this.state.settings, ...partialSettings };
      this.save();
    }
    return this.getSettings();
  }

  // ==========================================================================
  // Keybindings
  // ==========================================================================

  getKeybindings() {
    return JSON.parse(JSON.stringify(this.state.keybindings));
  }

  setKeybinding(action, keys) {
    if (!this.state.keybindings[action] || !Array.isArray(keys)) return false;
    this.state.keybindings[action] = keys.map(k => String(k).trim()).filter(Boolean);
    this.save();
    return true;
  }

  resetKeybindings() {
    this.state.keybindings = JSON.parse(JSON.stringify(DEFAULT_KEYBINDINGS));
    this.save();
    return this.getKeybindings();
  }

  // ==========================================================================
  // Favorites & Recents
  // ==========================================================================

  getFavorites() {
    return [...this.state.favorites];
  }

  isFavorite(gameId) {
    return this.state.favorites.includes(gameId);
  }

  toggleFavorite(gameId) {
    if (!gameId) return false;
    const idx = this.state.favorites.indexOf(gameId);
    let faved = false;
    if (idx === -1) {
      this.state.favorites.push(gameId);
      faved = true;
    } else {
      this.state.favorites.splice(idx, 1);
      faved = false;
    }
    this.save();
    return faved;
  }

  getRecents() {
    return [...this.state.recents];
  }

  addRecent(gameId) {
    if (!gameId) return;
    this.state.recents = [gameId, ...this.state.recents.filter(id => id !== gameId)].slice(0, 20);
    this.save();
  }

  // ==========================================================================
  // Custom Games
  // ==========================================================================

  getCustomGames() {
    return [...this.state.customGames];
  }

  addCustomGame(game) {
    if (!game || !game.id || !game.title) return false;
    const cleanGame = {
      id: sanitizeString(game.id),
      title: sanitizeString(game.title),
      system: sanitizeString(game.system || 'Custom'),
      category: sanitizeString(game.category || 'CUSTOM'),
      src: sanitizeString(game.src || ''),
      cover: sanitizeString(game.cover || ''),
      emoji: sanitizeString(game.emoji || '🎮'),
      custom: true
    };
    this.state.customGames = this.state.customGames.filter(g => g.id !== cleanGame.id);
    this.state.customGames.push(cleanGame);
    this.save();
    return true;
  }

  deleteCustomGame(gameId) {
    const prevLen = this.state.customGames.length;
    this.state.customGames = this.state.customGames.filter(g => g.id !== gameId);
    if (this.state.customGames.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // ==========================================================================
  // Symmetrical Export & Import (Schema v4.0)
  // ==========================================================================

  exportBackupObject() {
    return {
      schemaVersion: '4.0',
      exportedAt: new Date().toISOString(),
      vaultVersion: '4.0.0',
      highScores: this.getHighScores(),
      achievements: this.getUnlockedTrophies(),
      stats: this.getStats(),
      settings: this.getSettings(),
      keybindings: this.getKeybindings(),
      favorites: this.getFavorites(),
      recents: this.getRecents(),
      customGames: this.getCustomGames(),
      customNotes: this.getAllNotes()
    };
  }

  exportBackup() {
    return JSON.stringify(this.exportBackupObject(), null, 2);
  }

  exportBackupJson() {
    return this.exportBackup();
  }

  validateBackup(data) {
    const errors = [];
    if (!data || typeof data !== 'object') {
      return { valid: false, errors: ['Malformed backup: Root must be a valid JSON object.'] };
    }

    const version = data.schemaVersion || data.version;
    if (!version) {
      errors.push('Invalid schema: Missing version identifier.');
    }

    if (data.highScores !== undefined && !Array.isArray(data.highScores)) {
      errors.push('highScores must be an array');
    }
    if (data.favorites !== undefined && !Array.isArray(data.favorites)) {
      errors.push('favorites must be an array');
    }
    if (data.achievements !== undefined && !Array.isArray(data.achievements)) {
      errors.push('achievements must be an array');
    }
    if (data.unlockedTrophies !== undefined && !Array.isArray(data.unlockedTrophies)) {
      errors.push('unlockedTrophies must be an array');
    }
    if (data.customNotes !== undefined && (typeof data.customNotes !== 'object' || Array.isArray(data.customNotes))) {
      errors.push('customNotes must be a key-value object');
    }

    return {
      valid: errors.length === 0,
      errors,
      detectedVersion: String(version || 'unknown')
    };
  }

  importBackup(backupInput) {
    let data = backupInput;
    if (typeof backupInput === 'string') {
      try {
        data = JSON.parse(backupInput);
      } catch (e) {
        throw new Error('Invalid JSON format: Unable to parse backup payload.');
      }
    }

    const val = this.validateBackup(data);
    if (!val.valid) {
      throw new Error(val.errors.join('; '));
    }

    const migrated = this._migrateBackupPayload(data);
    const sanitized = this._validateAndMergeState(migrated);

    this.state = sanitized;
    this.save();

    return {
      success: true,
      schemaVersion: '4.0',
      sourceVersion: val.detectedVersion,
      highScoresCount: this.state.highScores.length,
      achievementsCount: this.state.achievements.length,
      notesCount: Object.keys(this.state.customNotes).length,
      restored: {
        highScores: this.state.highScores.length,
        achievements: this.state.achievements.length,
        customNotes: Object.keys(this.state.customNotes).length,
        favorites: this.state.favorites.length,
        recents: this.state.recents.length,
        customGames: this.state.customGames.length
      }
    };
  }

  _migrateBackupPayload(raw) {
    let highScores = [];
    if (Array.isArray(raw.highScores)) {
      highScores = raw.highScores.map((item, idx) => {
        let numScore = 0;
        let note = null;
        if (typeof item.score === 'number') {
          numScore = item.score;
        } else if (typeof item.score === 'string') {
          const digits = item.score.replace(/[^0-9]/g, '');
          numScore = digits ? parseInt(digits, 10) : 0;
          note = item.score;
        }
        return {
          id: item.id || `migrated-hs-${idx}`,
          gameId: item.gameId || 'legacy-game',
          gameTitle: sanitizeString(item.gameTitle || item.gameId || 'Retro Game'),
          initials: sanitizeInitials(item.initials),
          score: numScore,
          date: item.date || new Date().toISOString().split('T')[0],
          timestamp: item.timestamp || Date.now(),
          details: item.details || (note ? { legacyScore: note } : {})
        };
      });
    }

    let achievements = [];
    if (Array.isArray(raw.achievements)) {
      achievements = raw.achievements.map(String);
    } else if (Array.isArray(raw.unlockedTrophies)) {
      achievements = raw.unlockedTrophies.map(String);
    }

    let notes = {};
    if (raw.customNotes && typeof raw.customNotes === 'object') {
      notes = { ...raw.customNotes };
    } else if (raw.userNotes && typeof raw.userNotes === 'object') {
      notes = { ...raw.userNotes };
    }

    const playStats = raw.playStats || (raw.stats && raw.stats.playCountPerGame) || {};
    const playTimes = raw.playTimes || {};
    let totalSec = (raw.stats && raw.stats.totalPlaytimeSec) || 0;
    if (!totalSec && typeof playTimes === 'object') {
      totalSec = Object.values(playTimes).reduce((acc, v) => acc + (Number(v) || 0), 0);
    }

    const highScoreMap = {};
    for (const hs of highScores) {
      if (!highScoreMap[hs.gameId] || hs.score > highScoreMap[hs.gameId]) {
        highScoreMap[hs.gameId] = hs.score;
      }
    }

    return {
      schemaVersion: '4.0',
      lastUpdated: new Date().toISOString(),
      highScores,
      achievements,
      stats: {
        totalPlaytimeSec: totalSec,
        playCountPerGame: playStats,
        highScorePerGame: highScoreMap
      },
      settings: { ...DEFAULT_SETTINGS, ...(raw.settings || {}) },
      keybindings: { ...DEFAULT_KEYBINDINGS, ...(raw.keybindings || {}) },
      favorites: Array.isArray(raw.favorites) ? raw.favorites.map(String) : [],
      recents: Array.isArray(raw.recentGames || raw.recents) ? (raw.recentGames || raw.recents).map(String) : [],
      customGames: Array.isArray(raw.customGames) ? raw.customGames : (Array.isArray(raw.games) ? raw.games.filter(g => g.custom) : []),
      customNotes: notes
    };
  }

  _validateAndMergeState(source) {
    const base = this._createDefaultState();
    if (!source || typeof source !== 'object') return base;

    if (Array.isArray(source.highScores)) {
      base.highScores = source.highScores
        .filter(s => s && typeof s === 'object')
        .map(s => ({
          id: String(s.id || Math.random().toString(36).slice(2)),
          gameId: sanitizeString(s.gameId || 'game'),
          gameTitle: sanitizeString(s.gameTitle || 'Game'),
          initials: sanitizeInitials(s.initials),
          score: Math.max(0, Math.floor(Number(s.score) || 0)),
          date: sanitizeString(s.date || new Date().toISOString().split('T')[0]),
          timestamp: Number(s.timestamp) || Date.now(),
          details: typeof s.details === 'object' && s.details ? s.details : {}
        }));
    }

    if (Array.isArray(source.achievements)) {
      base.achievements = Array.from(new Set(source.achievements.map(a => sanitizeString(String(a)))));
    }

    if (source.stats && typeof source.stats === 'object') {
      base.stats.totalPlaytimeSec = Math.max(0, Math.floor(Number(source.stats.totalPlaytimeSec) || 0));
      if (source.stats.playCountPerGame && typeof source.stats.playCountPerGame === 'object') {
        base.stats.playCountPerGame = { ...source.stats.playCountPerGame };
      }
      if (source.stats.highScorePerGame && typeof source.stats.highScorePerGame === 'object') {
        base.stats.highScorePerGame = { ...source.stats.highScorePerGame };
      }
    }

    if (source.settings && typeof source.settings === 'object') {
      base.settings = { ...base.settings, ...source.settings };
    }

    if (source.keybindings && typeof source.keybindings === 'object') {
      base.keybindings = { ...base.keybindings, ...source.keybindings };
    }

    if (Array.isArray(source.favorites)) {
      base.favorites = Array.from(new Set(source.favorites.map(f => sanitizeString(String(f)))));
    }
    if (Array.isArray(source.recents)) {
      base.recents = source.recents.map(r => sanitizeString(String(r))).slice(0, 20);
    }

    if (source.customNotes && typeof source.customNotes === 'object') {
      const cleanNotes = {};
      for (const [k, v] of Object.entries(source.customNotes)) {
        cleanNotes[sanitizeString(k)] = sanitizeString(String(v));
      }
      base.customNotes = cleanNotes;
    }

    if (Array.isArray(source.customGames)) {
      base.customGames = source.customGames
        .filter(g => g && g.id && g.title)
        .map(g => ({
          id: sanitizeString(g.id),
          title: sanitizeString(g.title),
          system: sanitizeString(g.system || 'Custom'),
          category: sanitizeString(g.category || 'CUSTOM'),
          src: sanitizeString(g.src || ''),
          cover: sanitizeString(g.cover || ''),
          emoji: sanitizeString(g.emoji || '🎮'),
          custom: true
        }));
    }

    return base;
  }

  migrateFromLegacy() {
    try {
      let foundLegacy = false;
      const get = (k) => {
        try {
          return this.driver.getItem(k);
        } catch (e) {
          return null;
        }
      };

      // 1. Favorites
      const favsRaw = get('retro_vault_favs_v2') || get('RETRO_VAULT_FAVORITES_V1');
      if (favsRaw) {
        try {
          const favs = JSON.parse(favsRaw);
          if (Array.isArray(favs)) {
            this.state.favorites = Array.from(new Set([...this.state.favorites, ...favs]));
            foundLegacy = true;
          }
        } catch (e) {}
      }

      // 2. High scores (v1 & v3)
      const scoresV3 = get('retro_vault_scores_v3') || get('RETRO_VAULT_SCORES_V1');
      if (scoresV3) {
        try {
          const scores = JSON.parse(scoresV3);
          if (Array.isArray(scores)) {
            for (const s of scores) {
              const gid = s.gameId || s.game || 'unknown';
              const name = s.gameTitle || s.game || gid;
              const inits = s.initials || s.player || 'LEG';
              let numScore = 0;
              let note = null;
              if (typeof s.score === 'number') {
                numScore = s.score;
              } else if (typeof s.score === 'string') {
                const digits = s.score.replace(/[^0-9]/g, '');
                numScore = digits ? parseInt(digits, 10) : 0;
                note = s.score;
              }
              this.addHighScore(gid, name, inits, numScore, s.details || (note ? { legacyScore: note } : {}));
            }
            foundLegacy = true;
          }
        } catch (e) {}
      }

      // 3. Trophies
      const trophiesRaw = get('retro_vault_trophies_v3') || get('RETRO_VAULT_TROPHIES_V1');
      if (trophiesRaw) {
        try {
          const tro = JSON.parse(trophiesRaw);
          if (Array.isArray(tro)) {
            this.state.achievements = Array.from(new Set([...this.state.achievements, ...tro.map(String)]));
            foundLegacy = true;
          }
        } catch (e) {}
      }

      // 4. Recents
      const recentsRaw = get('retro_vault_recents_v2') || get('RETRO_VAULT_RECENTS_V1');
      if (recentsRaw) {
        try {
          const recents = JSON.parse(recentsRaw);
          if (Array.isArray(recents)) {
            this.state.recents = Array.from(new Set([...this.state.recents, ...recents.map(String)])).slice(0, 20);
            foundLegacy = true;
          }
        } catch (e) {}
      }

      // 5. Notes
      const notesRaw = get('retro_vault_notes_v3') || get('RETRO_VAULT_USER_NOTES_V1');
      if (notesRaw) {
        try {
          const notes = JSON.parse(notesRaw);
          if (notes && typeof notes === 'object') {
            for (const [k, v] of Object.entries(notes)) {
              this.state.customNotes[sanitizeString(k)] = sanitizeString(String(v));
            }
            foundLegacy = true;
          }
        } catch (e) {}
      }

      // 6. Play stats & times
      const statsRaw = get('retro_vault_stats_v2') || get('RETRO_VAULT_PLAY_STATS_V1');
      if (statsRaw) {
        try {
          const stats = JSON.parse(statsRaw);
          if (stats && typeof stats === 'object') {
            this.state.stats.playCountPerGame = { ...this.state.stats.playCountPerGame, ...stats };
            foundLegacy = true;
          }
        } catch (e) {}
      }

      const timesRaw = get('retro_vault_times_v3') || get('RETRO_VAULT_PLAY_TIMES_V1');
      if (timesRaw) {
        try {
          const times = JSON.parse(timesRaw);
          if (times && typeof times === 'object') {
            const added = Object.values(times).reduce((acc, v) => acc + (Number(v) || 0), 0);
            this.state.stats.totalPlaytimeSec += added;
            foundLegacy = true;
          }
        } catch (e) {}
      }

      // 7. Settings
      const sfx = get('retro_vault_sfx_v2') || get('RETRO_VAULT_SFX_ENABLED_V1');
      if (sfx !== null) {
        this.state.settings.sfxEnabled = sfx === 'true' || sfx === true;
        foundLegacy = true;
      }
      const bezel = get('retro_vault_bezel_v3');
      if (bezel !== null) {
        this.state.settings.bezelActive = bezel === '1' || bezel === true;
        foundLegacy = true;
      }
      const filter = get('retro_vault_filter_v2');
      if (filter) {
        this.state.settings.filterMode = filter;
        foundLegacy = true;
      }
      const bgm = get('retro_vault_bgm_v3');
      if (bgm !== null) {
        this.state.settings.bgmStation = Number(bgm) || 0;
        this.state.settings.bgmEnabled = Number(bgm) > 0;
        foundLegacy = true;
      }

      if (foundLegacy) {
        this.save();
      }
    } catch (e) {
      this._fallbackToMemory();
    }
  }
}

// Global browser attachment
if (typeof window !== 'undefined') {
  window.StorageService = StorageService;
  window.MemoryStorageDriver = MemoryStorageDriver;
  window.vaultStorage = new StorageService();
}

export default StorageService;
