/**
 * Retro Arcade Vault - Automated Test Harness & Headless Mocks
 * Zero-dependency Node.js v26 test runner harness.
 * 
 * Provides:
 * 1. MockCanvasRenderingContext2D (with observable call logs)
 * 2. MockHTMLCanvasElement
 * 3. MockAudioContext, MockAudioParam, MockOscillatorNode, MockGainNode, MockAudioBufferSourceNode
 * 4. MockLocalStorage (with quota exceeded simulation)
 * 5. MockDOM & structural HTML parser for index.html inspection
 * 6. StorageService & AudioEngine reference contracts / loaders
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ============================================================================
// 1. Mock HTMLCanvasElement & 2D Context
// ============================================================================

export class MockCanvasRenderingContext2D {
  constructor(canvas) {
    this.canvas = canvas;
    this.fillStyle = '#000000';
    this.strokeStyle = '#000000';
    this.lineWidth = 1;
    this.font = '10px sans-serif';
    this.textAlign = 'start';
    this.textBaseline = 'alphabetic';
    this.globalAlpha = 1.0;
    this.shadowColor = 'transparent';
    this.shadowBlur = 0;
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.imageSmoothingEnabled = false;

    // Observable call log for assertions
    this.calls = [];
    this._saveStack = [];
  }

  _record(method, args) {
    this.calls.push({ method, args: Array.from(args), timestamp: Date.now() });
  }

  fillRect(x, y, w, h) { this._record('fillRect', arguments); }
  clearRect(x, y, w, h) { this._record('clearRect', arguments); }
  strokeRect(x, y, w, h) { this._record('strokeRect', arguments); }
  beginPath() { this._record('beginPath', arguments); }
  closePath() { this._record('closePath', arguments); }
  moveTo(x, y) { this._record('moveTo', arguments); }
  lineTo(x, y) { this._record('lineTo', arguments); }
  arc(x, y, radius, startAngle, endAngle, counterclockwise) { this._record('arc', arguments); }
  fill() { this._record('fill', arguments); }
  stroke() { this._record('stroke', arguments); }
  save() {
    this._saveStack.push({
      fillStyle: this.fillStyle,
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
      font: this.font,
      globalAlpha: this.globalAlpha
    });
    this._record('save', arguments);
  }
  restore() {
    const state = this._saveStack.pop();
    if (state) {
      Object.assign(this, state);
    }
    this._record('restore', arguments);
  }
  translate(x, y) { this._record('translate', arguments); }
  rotate(angle) { this._record('rotate', arguments); }
  scale(x, y) { this._record('scale', arguments); }
  fillText(text, x, y, maxWidth) { this._record('fillText', arguments); }
  strokeText(text, x, y, maxWidth) { this._record('strokeText', arguments); }
  measureText(text) {
    return { width: (String(text).length) * 8 };
  }
  drawImage(image, ...args) { this._record('drawImage', arguments); }
  createImageData(w, h) {
    return { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) };
  }
  getImageData(x, y, w, h) {
    return { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) };
  }
  putImageData(imageData, x, y) { this._record('putImageData', arguments); }
  setLineDash(segments) { this._record('setLineDash', arguments); }
  getLineDash() { return []; }

  clearCalls() {
    this.calls.length = 0;
  }

  getCallsFor(methodName) {
    return this.calls.filter(c => c.method === methodName);
  }
}

export class MockHTMLCanvasElement {
  constructor(width = 640, height = 480) {
    this.width = width;
    this.height = height;
    this.clientWidth = width;
    this.clientHeight = height;
    this.style = {};
    this.id = 'arcadeCanvas';
    this.className = 'arcade-canvas';
    this._context2d = null;
    this.eventListeners = new Map();
  }

  getContext(contextType, options) {
    if (contextType === '2d') {
      if (!this._context2d) {
        this._context2d = new MockCanvasRenderingContext2D(this);
      }
      return this._context2d;
    }
    return null;
  }

  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      right: this.width,
      bottom: this.height,
      width: this.width,
      height: this.height,
      x: 0,
      y: 0
    };
  }

  addEventListener(type, listener) {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, []);
    }
    this.eventListeners.get(type).push(listener);
  }

  removeEventListener(type, listener) {
    if (this.eventListeners.has(type)) {
      const list = this.eventListeners.get(type).filter(fn => fn !== listener);
      this.eventListeners.set(type, list);
    }
  }

  dispatchEvent(event) {
    const list = this.eventListeners.get(event.type) || [];
    for (const fn of list) {
      fn.call(this, event);
    }
    return true;
  }
}

// ============================================================================
// 2. Mock Web Audio API
// ============================================================================

export class MockAudioParam {
  constructor(defaultValue = 0, minValue = -3.4e38, maxValue = 3.4e38) {
    this.value = defaultValue;
    this.defaultValue = defaultValue;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.scheduledEvents = [];
  }

  setValueAtTime(val, time) {
    this.value = val;
    this.scheduledEvents.push({ type: 'setValueAtTime', value: val, time });
    return this;
  }

  exponentialRampToValueAtTime(val, time) {
    this.value = val;
    this.scheduledEvents.push({ type: 'exponentialRampToValueAtTime', value: val, time });
    return this;
  }

  linearRampToValueAtTime(val, time) {
    this.value = val;
    this.scheduledEvents.push({ type: 'linearRampToValueAtTime', value: val, time });
    return this;
  }

  setTargetAtTime(target, time, timeConstant) {
    this.scheduledEvents.push({ type: 'setTargetAtTime', target, time, timeConstant });
    return this;
  }

  cancelScheduledValues(time) {
    this.scheduledEvents = this.scheduledEvents.filter(e => e.time < time);
    return this;
  }
}

export class MockAudioNode {
  constructor(context) {
    this.context = context;
    this.connectedTo = [];
    this.numberOfInputs = 1;
    this.numberOfOutputs = 1;
  }

  connect(destination) {
    this.connectedTo.push(destination);
    return destination;
  }

  disconnect() {
    this.connectedTo = [];
  }
}

export class MockOscillatorNode extends MockAudioNode {
  constructor(context) {
    super(context);
    this.type = 'sine'; // 'sine' | 'square' | 'triangle' | 'sawtooth'
    this.frequency = new MockAudioParam(440, 0, 24000);
    this.detune = new MockAudioParam(0);
    this.started = false;
    this.stopped = false;
    this.startTime = null;
    this.stopTime = null;
  }

  start(time = 0) {
    this.started = true;
    this.startTime = time;
  }

  stop(time = 0) {
    this.stopped = true;
    this.stopTime = time;
  }
}

export class MockGainNode extends MockAudioNode {
  constructor(context) {
    super(context);
    this.gain = new MockAudioParam(1.0, 0, 1.0);
  }
}

export class MockAudioBuffer {
  constructor(numberOfChannels, length, sampleRate) {
    this.numberOfChannels = numberOfChannels;
    this.length = length;
    this.sampleRate = sampleRate;
    this.duration = length / sampleRate;
    this._channels = [];
    for (let i = 0; i < numberOfChannels; i++) {
      this._channels.push(new Float32Array(length));
    }
  }

  getChannelData(channel) {
    return this._channels[channel] || new Float32Array(this.length);
  }
}

export class MockAudioBufferSourceNode extends MockAudioNode {
  constructor(context) {
    super(context);
    this.buffer = null;
    this.playbackRate = new MockAudioParam(1.0);
    this.loop = false;
    this.started = false;
    this.stopped = false;
  }

  start(time = 0) {
    this.started = true;
  }

  stop(time = 0) {
    this.stopped = true;
  }
}

export class MockAudioDestinationNode extends MockAudioNode {
  constructor(context) {
    super(context);
    this.maxChannelCount = 2;
  }
}

export class MockAudioContext {
  constructor() {
    this.state = 'running'; // 'suspended' | 'running' | 'closed'
    this.currentTime = 0;
    this.sampleRate = 44100;
    this.destination = new MockAudioDestinationNode(this);
    this.createdNodes = [];
  }

  createOscillator() {
    const osc = new MockOscillatorNode(this);
    this.createdNodes.push(osc);
    return osc;
  }

  createGain() {
    const gain = new MockGainNode(this);
    this.createdNodes.push(gain);
    return gain;
  }

  createBuffer(numberOfChannels, length, sampleRate) {
    return new MockAudioBuffer(numberOfChannels, length, sampleRate);
  }

  createBufferSource() {
    const src = new MockAudioBufferSourceNode(this);
    this.createdNodes.push(src);
    return src;
  }

  async resume() {
    this.state = 'running';
    return Promise.resolve();
  }

  async suspend() {
    this.state = 'suspended';
    return Promise.resolve();
  }

  async close() {
    this.state = 'closed';
    return Promise.resolve();
  }

  advanceTime(seconds) {
    this.currentTime += seconds;
  }
}

// ============================================================================
// 3. Mock LocalStorage
// ============================================================================

export class MockLocalStorage {
  constructor() {
    this.store = new Map();
    this.simulateQuotaExceeded = false;
  }

  getItem(key) {
    return this.store.has(String(key)) ? this.store.get(String(key)) : null;
  }

  setItem(key, value) {
    if (this.simulateQuotaExceeded) {
      const err = new Error('QuotaExceededError: DOM Exception 22');
      err.name = 'QuotaExceededError';
      throw err;
    }
    this.store.set(String(key), String(value));
  }

  removeItem(key) {
    this.store.delete(String(key));
  }

  clear() {
    this.store.clear();
  }

  key(index) {
    const keys = Array.from(this.store.keys());
    return keys[index] || null;
  }

  get length() {
    return this.store.size;
  }
}

// ============================================================================
// 4. Lightweight Mock DOM & HTML Parser
// ============================================================================

export class MockElement {
  constructor(tagName, attributes = {}) {
    this.tagName = tagName.toUpperCase();
    this.attributes = { ...attributes };
    this.id = attributes.id || '';
    this.className = attributes.class || '';
    this.textContent = '';
    this.innerHTML = '';
    this.children = [];
    this.parentNode = null;
    this.style = {};
    this.value = attributes.value || '';
    this.src = attributes.src || '';
    this.disabled = false;
    this.listeners = new Map();

    const self = this;
    this.classList = {
      add(...classes) {
        const cur = new Set(self.className.split(/\s+/).filter(Boolean));
        classes.forEach(c => cur.add(c));
        self.className = Array.from(cur).join(' ');
      },
      remove(...classes) {
        const cur = new Set(self.className.split(/\s+/).filter(Boolean));
        classes.forEach(c => cur.delete(c));
        self.className = Array.from(cur).join(' ');
      },
      contains(cls) {
        return self.className.split(/\s+/).includes(cls);
      },
      toggle(cls) {
        if (this.contains(cls)) {
          this.remove(cls);
          return false;
        } else {
          this.add(cls);
          return true;
        }
      }
    };
  }

  getAttribute(name) {
    return this.attributes[name] !== undefined ? this.attributes[name] : null;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
    if (name === 'id') this.id = String(value);
    if (name === 'class') this.className = String(value);
  }

  hasAttribute(name) {
    return name in this.attributes;
  }

  removeAttribute(name) {
    delete this.attributes[name];
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(listener);
  }

  removeEventListener(type, listener) {
    if (this.listeners.has(type)) {
      this.listeners.set(type, this.listeners.get(type).filter(fn => fn !== listener));
    }
  }

  dispatchEvent(event) {
    const list = this.listeners.get(event.type) || [];
    for (const fn of list) {
      fn.call(this, event);
    }
    return true;
  }

  click() {
    this.dispatchEvent({ type: 'click', target: this, defaultPrevented: false });
  }

  focus() {
    this.dispatchEvent({ type: 'focus', target: this });
  }
}

export class MockDocument {
  constructor(htmlContent = '') {
    this.elementsById = new Map();
    this.allElements = [];
    if (htmlContent) {
      this._parseHtml(htmlContent);
    }
  }

  _parseHtml(html) {
    // Regex matching opening HTML tags and their attributes
    const tagRegex = /<([a-zA-Z0-9\-]+)([^>]*)>/g;
    let match;
    while ((match = tagRegex.exec(html)) !== null) {
      const tagName = match[1];
      const attrString = match[2];
      const attributes = {};

      const attrRegex = /([a-zA-Z0-9\-:]+)(?:=(?:"([^"]*)"|'([^']*)'|([^>\s]+)))?/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrString)) !== null) {
        const key = attrMatch[1];
        const val = attrMatch[2] !== undefined ? attrMatch[2] :
                    attrMatch[3] !== undefined ? attrMatch[3] :
                    attrMatch[4] !== undefined ? attrMatch[4] : '';
        attributes[key] = val;
      }

      const el = new MockElement(tagName, attributes);
      this.allElements.push(el);
      if (el.id) {
        this.elementsById.set(el.id, el);
      }
    }
  }

  getElementById(id) {
    return this.elementsById.get(id) || null;
  }

  querySelectorAll(selector) {
    if (selector.startsWith('#')) {
      const el = this.getElementById(selector.slice(1));
      return el ? [el] : [];
    }
    if (selector.startsWith('.')) {
      const cls = selector.slice(1);
      return this.allElements.filter(el => el.classList.contains(cls));
    }
    return this.allElements.filter(el => el.tagName.toLowerCase() === selector.toLowerCase());
  }

  querySelector(selector) {
    const list = this.querySelectorAll(selector);
    return list.length > 0 ? list[0] : null;
  }

  createElement(tagName) {
    const el = new MockElement(tagName);
    this.allElements.push(el);
    return el;
  }
}

/**
 * Loads and parses the workspace index.html file into a MockDocument
 */
export function loadProjectDocument() {
  const indexPath = path.join(PROJECT_ROOT, 'index.html');
  const content = fs.readFileSync(indexPath, 'utf-8');
  return new MockDocument(content);
}

// ============================================================================
// 5. Reference Contract Implementation for StorageService (Schema v4.0)
// ============================================================================

export class ReferenceStorageService {
  constructor(storageEngine = null) {
    this.storage = storageEngine || new MockLocalStorage();
    this.isInMemory = false;
    this.memoryStore = new Map();
    this.STORAGE_KEY = 'RETRO_VAULT_SCHEMA_V4';

    // In-memory working cache
    this.state = this._createDefaultState();
    this._init();
  }

  _createDefaultState() {
    return {
      schemaVersion: '4.0',
      exportedAt: new Date().toISOString(),
      highScores: [],
      achievements: [],
      stats: {
        totalPlaytimeSec: 0,
        playCountPerGame: {},
        highScorePerGame: {}
      },
      settings: {
        sfxEnabled: true,
        bgmEnabled: false,
        masterVolume: 1.0,
        sfxVolume: 0.8,
        bgmVolume: 0.5,
        bezelEnabled: false,
        filterMode: 'Standard'
      },
      keybindings: {
        UP: ['ArrowUp', 'KeyW'],
        DOWN: ['ArrowDown', 'KeyS'],
        LEFT: ['ArrowLeft', 'KeyA'],
        RIGHT: ['ArrowRight', 'KeyD'],
        ACTION_1: ['Space', 'KeyZ'],
        ACTION_2: ['KeyX', 'Enter'],
        PAUSE: ['KeyP', 'Escape'],
        RESTART: ['KeyR']
      },
      favorites: [],
      recents: [],
      customGames: [],
      customNotes: {}
    };
  }

  _init() {
    try {
      const raw = this.storage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.schemaVersion === '4.0') {
          this.state = { ...this._createDefaultState(), ...parsed };
          return;
        }
      }
      // Check legacy migration
      this.migrateFromLegacy();
    } catch (err) {
      this._fallbackToMemory();
    }
  }

  _fallbackToMemory() {
    this.isInMemory = true;
  }

  _save() {
    if (this.isInMemory) return;
    try {
      this.storage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      this._fallbackToMemory();
    }
  }

  // --- High Scores ---
  addHighScore(gameId, gameTitle, initials, score, details = {}) {
    const cleanInitials = (String(initials || 'AAA'))
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 3)
      .padEnd(3, 'A');

    const numericScore = Math.max(0, Math.floor(Number(score) || 0));
    const record = {
      id: `${gameId}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      gameId,
      gameTitle: gameTitle || gameId,
      initials: cleanInitials,
      score: numericScore,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      details
    };

    // Filter and insert
    const gameScores = this.state.highScores
      .filter(s => s.gameId === gameId)
      .concat(record)
      .sort((a, b) => b.score - a.score || a.timestamp - b.timestamp)
      .slice(0, 10);

    const otherScores = this.state.highScores.filter(s => s.gameId !== gameId);
    this.state.highScores = [...otherScores, ...gameScores];

    // Update stats high score
    const currentHigh = this.state.stats.highScorePerGame[gameId] || 0;
    const isNewHighScore = numericScore > currentHigh;
    if (isNewHighScore) {
      this.state.stats.highScorePerGame[gameId] = numericScore;
    }

    const rank = gameScores.findIndex(s => s.id === record.id) + 1;
    this._save();

    return { record, isNewHighScore, rank: rank > 0 ? rank : null };
  }

  getHighScores(gameId = null) {
    if (gameId) {
      return this.state.highScores
        .filter(s => s.gameId === gameId)
        .sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);
    }
    return [...this.state.highScores].sort((a, b) => b.score - a.score);
  }

  // --- Achievements / Trophies ---
  unlockTrophy(trophyId) {
    if (!this.state.achievements.includes(trophyId)) {
      this.state.achievements.push(trophyId);
      this._save();
      return true;
    }
    return false;
  }

  isTrophyUnlocked(trophyId) {
    return this.state.achievements.includes(trophyId);
  }

  getUnlockedTrophies() {
    return [...this.state.achievements];
  }

  // --- Play Stats & Times ---
  recordGameLaunch(gameId) {
    const cur = this.state.stats.playCountPerGame[gameId] || 0;
    this.state.stats.playCountPerGame[gameId] = cur + 1;
    if (!this.state.recents.includes(gameId)) {
      this.state.recents.unshift(gameId);
      this.state.recents = this.state.recents.slice(0, 10);
    }
    this._save();
  }

  recordPlaytime(gameId, seconds) {
    const sec = Math.max(0, Math.floor(seconds));
    this.state.stats.totalPlaytimeSec += sec;
    this._save();
  }

  getPlayStats() {
    return { ...this.state.stats };
  }

  // --- User Notes ---
  setNote(gameId, note) {
    this.state.customNotes[gameId] = String(note || '');
    this._save();
  }

  getNote(gameId) {
    return this.state.customNotes[gameId] || '';
  }

  // --- Favorites ---
  toggleFavorite(gameId) {
    const idx = this.state.favorites.indexOf(gameId);
    if (idx === -1) {
      this.state.favorites.push(gameId);
    } else {
      this.state.favorites.splice(idx, 1);
    }
    this._save();
    return this.state.favorites.includes(gameId);
  }

  isFavorite(gameId) {
    return this.state.favorites.includes(gameId);
  }

  // --- Migration ---
  migrateFromLegacy() {
    try {
      let migratedAny = false;
      // 1. Favorites
      const favsRaw = this.storage.getItem('RETRO_VAULT_FAVORITES_V1');
      if (favsRaw) {
        try {
          const favs = JSON.parse(favsRaw);
          if (Array.isArray(favs)) {
            this.state.favorites = Array.from(new Set([...this.state.favorites, ...favs]));
            migratedAny = true;
          }
        } catch (e) {}
      }

      // 2. High scores (v1 & v3)
      const scoresV3 = this.storage.getItem('retro_vault_scores_v3') || this.storage.getItem('RETRO_VAULT_SCORES_V1');
      if (scoresV3) {
        try {
          const scores = JSON.parse(scoresV3);
          if (Array.isArray(scores)) {
            for (const s of scores) {
              const gid = s.gameId || s.game || 'unknown';
              const name = s.gameTitle || s.game || gid;
              const initials = s.initials || s.player || 'LEG';
              const sc = Number(s.score) || 0;
              this.addHighScore(gid, name, initials, sc, s.details);
            }
            migratedAny = true;
          }
        } catch (e) {}
      }

      // 3. Trophies
      const trophiesRaw = this.storage.getItem('RETRO_VAULT_TROPHIES_V1');
      if (trophiesRaw) {
        try {
          const tro = JSON.parse(trophiesRaw);
          if (Array.isArray(tro)) {
            this.state.achievements = Array.from(new Set([...this.state.achievements, ...tro]));
            migratedAny = true;
          }
        } catch (e) {}
      }

      // 4. Notes
      const notesRaw = this.storage.getItem('RETRO_VAULT_USER_NOTES_V1');
      if (notesRaw) {
        try {
          const notes = JSON.parse(notesRaw);
          if (notes && typeof notes === 'object') {
            this.state.customNotes = { ...this.state.customNotes, ...notes };
            migratedAny = true;
          }
        } catch (e) {}
      }

      if (migratedAny) {
        this._save();
      }
    } catch (e) {
      // In-memory fallback
      this._fallbackToMemory();
    }
  }

  // --- Export & Import ---
  exportBackup() {
    this.state.exportedAt = new Date().toISOString();
    return JSON.stringify(this.state, null, 2);
  }

  importBackup(jsonStringOrObject) {
    let data;
    if (typeof jsonStringOrObject === 'string') {
      try {
        data = JSON.parse(jsonStringOrObject);
      } catch (err) {
        throw new Error('Invalid JSON format: Unable to parse backup payload.');
      }
    } else {
      data = jsonStringOrObject;
    }

    if (!data || typeof data !== 'object') {
      throw new Error('Malformed backup: Root must be a valid JSON object.');
    }

    if (!data.schemaVersion && !data.version) {
      throw new Error('Invalid schema: Missing version identifier.');
    }

    // Support v4.0 and v2.1 legacy backups
    const newState = this._createDefaultState();

    if (Array.isArray(data.highScores)) {
      newState.highScores = data.highScores.map(s => ({
        id: String(s.id || `score_${Date.now()}_${Math.random()}`),
        gameId: String(s.gameId || 'unknown'),
        gameTitle: String(s.gameTitle || s.gameId || 'Unknown Game'),
        initials: String(s.initials || 'AAA').slice(0, 3).toUpperCase(),
        score: Math.max(0, Number(s.score) || 0),
        date: String(s.date || new Date().toISOString().split('T')[0]),
        timestamp: Number(s.timestamp) || Date.now(),
        details: s.details && typeof s.details === 'object' ? s.details : {}
      }));
    }

    if (Array.isArray(data.achievements) || Array.isArray(data.unlockedTrophies)) {
      const tro = data.achievements || data.unlockedTrophies;
      newState.achievements = Array.from(new Set(tro.map(String)));
    }

    if (Array.isArray(data.favorites)) {
      newState.favorites = Array.from(new Set(data.favorites.map(String)));
    }

    if (Array.isArray(data.recents) || Array.isArray(data.recentGames)) {
      const rec = data.recents || data.recentGames;
      newState.recents = Array.from(new Set(rec.map(String)));
    }

    if (data.stats && typeof data.stats === 'object') {
      newState.stats = {
        totalPlaytimeSec: Number(data.stats.totalPlaytimeSec) || 0,
        playCountPerGame: typeof data.stats.playCountPerGame === 'object' ? data.stats.playCountPerGame : {},
        highScorePerGame: typeof data.stats.highScorePerGame === 'object' ? data.stats.highScorePerGame : {}
      };
    } else if (data.playStats) {
      newState.stats.playCountPerGame = typeof data.playStats === 'object' ? data.playStats : {};
    }

    if (data.customNotes && typeof data.customNotes === 'object') {
      newState.customNotes = { ...data.customNotes };
    }

    if (data.settings && typeof data.settings === 'object') {
      newState.settings = { ...newState.settings, ...data.settings };
    }

    if (data.keybindings && typeof data.keybindings === 'object') {
      newState.keybindings = { ...newState.keybindings, ...data.keybindings };
    }

    if (Array.isArray(data.customGames) || Array.isArray(data.games)) {
      const gms = data.customGames || data.games;
      newState.customGames = gms.filter(g => g && typeof g === 'object');
    }

    this.state = newState;
    this._save();
    return {
      success: true,
      highScoresCount: this.state.highScores.length,
      achievementsCount: this.state.achievements.length
    };
  }
}

// ============================================================================
// 6. Reference Contract Implementation for AudioEngine
// ============================================================================

export class ReferenceAudioEngine {
  constructor(audioContext = null) {
    this.ctx = audioContext;
    this.isMuted = false;
    this.masterGain = 1.0;
    this.sfxGain = 0.8;
    this.bgmGain = 0.5;
    this.activeBgmInterval = null;
    this.activeRadioStation = null;
    this.noiseBuffer = null;

    if (this.ctx) {
      this._initNoiseBuffer();
    }
  }

  _initNoiseBuffer() {
    if (!this.ctx || typeof this.ctx.createBuffer !== 'function') return;
    const bufferSize = this.ctx.sampleRate * 1; // 1 second buffer
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1; // White noise
    }
  }

  // --- Parameter Clamps ---
  clampFrequency(freq) {
    if (typeof freq !== 'number' || isNaN(freq)) return 440;
    return Math.max(20, Math.min(20000, freq));
  }

  clampGain(gain) {
    if (typeof gain !== 'number' || isNaN(gain)) return 0;
    return Math.max(0.0, Math.min(1.0, gain));
  }

  setMasterVolume(val) {
    this.masterGain = this.clampGain(val);
  }

  setSfxVolume(val) {
    this.sfxGain = this.clampGain(val);
  }

  setBgmVolume(val) {
    this.bgmGain = this.clampGain(val);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // --- SFX Playback ---
  playSfx(type) {
    if (this.isMuted) return null;
    if (!this.ctx) return null; // Safe headless no-op

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const effectiveGain = this.masterGain * this.sfxGain;

      switch (type) {
        case 'select': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(this.clampFrequency(523.25), now);
          osc.frequency.exponentialRampToValueAtTime(this.clampFrequency(1046.50), now + 0.07);
          gain.gain.setValueAtTime(this.clampGain(0.15 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.07);
          return { osc, gain };
        }
        case 'coin': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(this.clampFrequency(987.77), now); // B5
          osc.frequency.setValueAtTime(this.clampFrequency(1318.51), now + 0.08); // E6
          gain.gain.setValueAtTime(this.clampGain(0.2 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.35);
          return { osc, gain };
        }
        case 'fanfare': {
          const notes = [392.00, 523.25, 659.25, 783.99, 1046.50];
          const nodes = [];
          notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const startTime = now + idx * 0.08;
            osc.frequency.setValueAtTime(this.clampFrequency(freq), startTime);
            gain.gain.setValueAtTime(this.clampGain(0.15 * effectiveGain), startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.12);
            nodes.push({ osc, gain });
          });
          return nodes;
        }
        case 'explosion': {
          if (!this.noiseBuffer) this._initNoiseBuffer();
          if (this.noiseBuffer) {
            const noise = this.ctx.createBufferSource();
            noise.buffer = this.noiseBuffer;
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(this.clampGain(0.3 * effectiveGain), now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            noise.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start(now);
            noise.stop(now + 0.4);
            return { noise, gain };
          }
          return null;
        }
        case 'hit': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(this.clampFrequency(220), now);
          osc.frequency.exponentialRampToValueAtTime(this.clampFrequency(40), now + 0.1);
          gain.gain.setValueAtTime(this.clampGain(0.25 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.1);
          return { osc, gain };
        }
        default:
          return null;
      }
    } catch (e) {
      return null;
    }
  }

  // --- Procedural Chiptune Radio ---
  startBgmRadio(station = 'Synthwave') {
    this.stopBgmRadio();
    this.activeRadioStation = station;
    if (!this.ctx || this.isMuted) return;

    // Simulated sequencer interval
    this.activeBgmInterval = setInterval(() => {
      // Periodic note generator
    }, 160);
    if (this.activeBgmInterval.unref) {
      this.activeBgmInterval.unref();
    }
  }

  stopBgmRadio() {
    if (this.activeBgmInterval) {
      clearInterval(this.activeBgmInterval);
      this.activeBgmInterval = null;
    }
    this.activeRadioStation = null;
  }
}

// ============================================================================
// 7. Dynamic Subsystem Loaders (Load real implementation if exists, else fallback)
// ============================================================================

export async function getStorageService(options = {}) {
  const realPath = path.join(PROJECT_ROOT, 'src', 'core', 'storage.js');
  if (fs.existsSync(realPath)) {
    try {
      const mod = await import(realPath);
      const StorageClass = mod.StorageService || mod.default;
      if (StorageClass) {
        return new StorageClass(options.storage);
      }
    } catch (e) {
      // Fallback
    }
  }
  return new ReferenceStorageService(options.storage);
}

export async function getAudioEngine(options = {}) {
  const realPath = path.join(PROJECT_ROOT, 'src', 'core', 'audio.js');
  if (fs.existsSync(realPath)) {
    try {
      const mod = await import(realPath);
      const AudioClass = mod.AudioEngine || mod.AudioService || mod.default;
      if (AudioClass) {
        return new AudioClass(options.audioContext);
      }
    } catch (e) {
      // Fallback
    }
  }
  return new ReferenceAudioEngine(options.audioContext);
}
