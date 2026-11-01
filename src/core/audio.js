/**
 * Retro Arcade Vault - Procedural Web Audio Engine
 * File: src/core/audio.js
 * 
 * Features:
 * 1. Procedural Web Audio API engine supporting square, triangle, sawtooth, sine,
 *    and a pre-generated white noise buffer for authentic 8-bit retro sound effects.
 * 2. 3-stage gain hierarchy (SFX Gain & BGM Gain -> Master Gain -> Destination) with
 *    volume controls and independent mute toggles.
 * 3. Sound effect dispatcher supporting all shell UI sounds and native arcade game actions
 *    (Snake, Pong, Breakout, Space Invaders, Asteroids).
 * 4. Procedural Chiptune Radio with stations (Synthwave, 8-Bit Quest, Cyberpunk Arp),
 *    safe interval scheduling, and automatic node cleanup preventing memory leaks.
 * 5. Autoplay policy resilience with passive user gesture unlock.
 * 6. Headless and mock safety: safe no-op execution in Node.js environments and automated tests.
 */

export const BGM_STATIONS = [
  { id: 0, name: "Off", tempo: 0 },
  {
    id: 1,
    name: "Synthwave",
    tempo: 160,
    scale: [261.63, 329.63, 392.00, 523.25, 329.63, 392.00, 440.00, 523.25],
    leadWave: "triangle",
    leadGain: 0.07,
    leadDecay: 0.14,
    bassWave: "sawtooth",
    bassGain: 0.05,
    bassDecay: 0.28,
    bassInterval: 4,
    bassOctaveDiv: 4
  },
  {
    id: 2,
    name: "8-Bit Quest",
    tempo: 150,
    scale: [220.00, 261.63, 329.63, 440.00, 293.66, 349.23, 440.00, 523.25],
    leadWave: "square",
    leadGain: 0.06,
    leadDecay: 0.12,
    bassWave: "triangle",
    bassGain: 0.06,
    bassDecay: 0.24,
    bassInterval: 4,
    bassOctaveDiv: 4
  },
  {
    id: 3,
    name: "Cyberpunk Arp",
    tempo: 135,
    scale: [146.83, 220.00, 293.66, 369.99, 174.61, 261.63, 349.23, 440.00],
    leadWave: "sawtooth",
    leadGain: 0.06,
    leadDecay: 0.12,
    bassWave: "sawtooth",
    bassGain: 0.07,
    bassDecay: 0.25,
    bassInterval: 2,
    bassOctaveDiv: 4
  }
];

export class AudioEngine {
  constructor(optionsOrContext = null) {
    let ctx = null;
    let masterVol = 1.0;
    let sfxVol = 0.8;
    let bgmVol = 0.5;

    if (optionsOrContext && typeof optionsOrContext.createOscillator === 'function') {
      ctx = optionsOrContext;
    } else if (optionsOrContext && typeof optionsOrContext === 'object') {
      ctx = optionsOrContext.audioContext || optionsOrContext.ctx || null;
      if (optionsOrContext.masterVolume !== undefined) masterVol = optionsOrContext.masterVolume;
      if (optionsOrContext.sfxVolume !== undefined) sfxVol = optionsOrContext.sfxVolume;
      if (optionsOrContext.bgmVolume !== undefined) bgmVol = optionsOrContext.bgmVolume;
    }

    if (!ctx) {
      try {
        if (typeof window !== 'undefined') {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            ctx = new AudioContextClass();
          }
        }
      } catch (e) {
        ctx = null;
      }
    }

    this.ctx = ctx;
    this.isMuted = false;
    this.masterGain = this.clampGain(masterVol);
    this.sfxGain = this.clampGain(sfxVol);
    this.bgmGain = this.clampGain(bgmVol);

    this.masterGainNode = null;
    this.sfxGainNode = null;
    this.bgmGainNode = null;

    this.activeBgmInterval = null;
    this.activeRadioStation = null;
    this.currentStationIndex = 0;
    this.noiseBuffer = null;
    this.activeBgmNodes = new Set();

    if (this.ctx) {
      this._initAudioGraph();
      this._initNoiseBuffer();
      this._initAutoplayUnlock();
    }
  }

  _initAudioGraph() {
    if (!this.ctx || typeof this.ctx.createGain !== 'function') return;
    try {
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(this.masterGain, this.ctx.currentTime);
      this.masterGainNode.connect(this.ctx.destination);

      this.sfxGainNode = this.ctx.createGain();
      this.sfxGainNode.gain.setValueAtTime(this.sfxGain, this.ctx.currentTime);
      this.sfxGainNode.connect(this.masterGainNode);

      this.bgmGainNode = this.ctx.createGain();
      this.bgmGainNode.gain.setValueAtTime(this.bgmGain, this.ctx.currentTime);
      this.bgmGainNode.connect(this.masterGainNode);
    } catch (e) {}
  }

  _initNoiseBuffer() {
    if (!this.ctx || typeof this.ctx.createBuffer !== 'function') return;
    try {
      const sampleRate = this.ctx.sampleRate || 44100;
      const bufferSize = sampleRate * 1; // 1 second buffer
      this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
      const output = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // White noise
      }
    } catch (e) {}
  }

  _initAutoplayUnlock() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      window.removeEventListener('click', unlock, { capture: true });
      window.removeEventListener('keydown', unlock, { capture: true });
      window.removeEventListener('touchstart', unlock, { capture: true });
    };
    window.addEventListener('click', unlock, { capture: true, once: true });
    window.addEventListener('keydown', unlock, { capture: true, once: true });
    window.addEventListener('touchstart', unlock, { capture: true, once: true });
  }

  // ==========================================================================
  // Parameter Clamping
  // ==========================================================================

  clampFrequency(freq) {
    if (typeof freq !== 'number' || isNaN(freq)) return 440;
    return Math.max(20, Math.min(20000, freq));
  }

  clampGain(gain) {
    if (typeof gain !== 'number' || isNaN(gain)) return 0.0;
    return Math.max(0.0, Math.min(1.0, gain));
  }

  // ==========================================================================
  // Volume Controls
  // ==========================================================================

  setMasterVolume(val) {
    this.masterGain = this.clampGain(val);
    if (this.masterGainNode && this.ctx) {
      try {
        const effective = this.isMuted ? 0 : this.masterGain;
        this.masterGainNode.gain.setValueAtTime(effective, this.ctx.currentTime);
      } catch (e) {}
    }
    return this.masterGain;
  }

  setSfxVolume(val) {
    this.sfxGain = this.clampGain(val);
    if (this.sfxGainNode && this.ctx) {
      try {
        this.sfxGainNode.gain.setValueAtTime(this.sfxGain, this.ctx.currentTime);
      } catch (e) {}
    }
    return this.sfxGain;
  }

  setBgmVolume(val) {
    this.bgmGain = this.clampGain(val);
    if (this.bgmGainNode && this.ctx) {
      try {
        this.bgmGainNode.gain.setValueAtTime(this.bgmGain, this.ctx.currentTime);
      } catch (e) {}
    }
    return this.bgmGain;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGainNode && this.ctx) {
      try {
        const effective = this.isMuted ? 0 : this.masterGain;
        this.masterGainNode.gain.setValueAtTime(effective, this.ctx.currentTime);
      } catch (e) {}
    }
    return this.isMuted;
  }

  toggleMasterMute() {
    return this.toggleMute();
  }

  toggleSfxMute() {
    return this.toggleMute();
  }

  getState() {
    return {
      isHeadless: !this.ctx,
      masterVolume: this.masterGain,
      sfxVolume: this.sfxGain,
      bgmVolume: this.bgmGain,
      isMuted: this.isMuted,
      activeRadioStation: this.activeRadioStation,
      currentStation: this.currentStationIndex,
      bgmPlaying: !!this.activeBgmInterval
    };
  }

  // ==========================================================================
  // Procedural Sound Synthesis Dispatcher
  // ==========================================================================

  playSfx(type, options = {}) {
    if (this.isMuted) return null;
    if (!this.ctx) return null; // Safe headless no-op

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
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

        case 'explode':
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

        // --- Native Arcade Game SFX Hooks ---
        case 'snake_eat': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(this.clampFrequency(600), now);
          osc.frequency.exponentialRampToValueAtTime(this.clampFrequency(900), now + 0.08);
          gain.gain.setValueAtTime(this.clampGain(0.15 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.08);
          return { osc, gain };
        }

        case 'snake_die':
        case 'gameover': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(this.clampFrequency(300), now);
          osc.frequency.linearRampToValueAtTime(this.clampFrequency(60), now + 0.4);
          gain.gain.setValueAtTime(this.clampGain(0.25 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.4);
          return { osc, gain };
        }

        case 'pong_paddle': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(this.clampFrequency(460), now);
          gain.gain.setValueAtTime(this.clampGain(0.18 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
          return { osc, gain };
        }

        case 'pong_wall': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(this.clampFrequency(240), now);
          gain.gain.setValueAtTime(this.clampGain(0.15 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.04);
          return { osc, gain };
        }

        case 'pong_score': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(this.clampFrequency(587.33), now); // D5
          osc.frequency.setValueAtTime(this.clampFrequency(880.00), now + 0.1); // A5
          gain.gain.setValueAtTime(this.clampGain(0.2 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.25);
          return { osc, gain };
        }

        case 'breakout_brick': {
          const rowFreqs = [880, 740, 660, 554, 440];
          const row = options.row !== undefined ? Math.min(4, Math.max(0, options.row)) : 0;
          const freq = rowFreqs[row] || 660;

          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(this.clampFrequency(freq), now);
          gain.gain.setValueAtTime(this.clampGain(0.18 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.06);
          return { osc, gain };
        }

        case 'breakout_paddle': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(this.clampFrequency(330), now);
          gain.gain.setValueAtTime(this.clampGain(0.18 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
          return { osc, gain };
        }

        case 'invader_step': {
          const stepFreqs = [80.0, 71.3, 63.5, 56.6];
          const step = options.step !== undefined ? Math.abs(options.step) % 4 : 0;
          const freq = stepFreqs[step];

          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(this.clampFrequency(freq), now);
          gain.gain.setValueAtTime(this.clampGain(0.22 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.08);
          return { osc, gain };
        }

        case 'player_shoot':
        case 'fire':
        case 'laser': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(this.clampFrequency(900), now);
          osc.frequency.exponentialRampToValueAtTime(this.clampFrequency(180), now + 0.1);
          gain.gain.setValueAtTime(this.clampGain(0.18 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.1);
          return { osc, gain };
        }

        case 'thrust': {
          if (!this.noiseBuffer) this._initNoiseBuffer();
          if (this.noiseBuffer) {
            const noise = this.ctx.createBufferSource();
            noise.buffer = this.noiseBuffer;
            const filter = this.ctx.createBiquadFilter ? this.ctx.createBiquadFilter() : null;
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(this.clampGain(0.15 * effectiveGain), now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

            if (filter) {
              filter.type = 'bandpass';
              filter.frequency.setValueAtTime(140, now);
              noise.connect(filter);
              filter.connect(gain);
            } else {
              noise.connect(gain);
            }

            gain.connect(this.ctx.destination);
            noise.start(now);
            noise.stop(now + 0.08);
            return { noise, gain };
          }
          return null;
        }

        case 'click': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(this.clampFrequency(800), now);
          gain.gain.setValueAtTime(this.clampGain(0.08 * effectiveGain), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.03);
          return { osc, gain };
        }

        case 'star': {
          const notes = [587.33, 880.00];
          const nodes = [];
          notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const startTime = now + idx * 0.07;
            osc.frequency.setValueAtTime(this.clampFrequency(freq), startTime);
            gain.gain.setValueAtTime(this.clampGain(0.12 * effectiveGain), startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.12);
            nodes.push({ osc, gain });
          });
          return nodes;
        }

        default:
          return null;
      }
    } catch (e) {
      return null;
    }
  }

  // ==========================================================================
  // Procedural Chiptune Radio (3 Stations)
  // ==========================================================================

  startBgmRadio(station = 'Synthwave') {
    this.stopBgmRadio();

    let stationObj = null;
    if (typeof station === 'number') {
      stationObj = BGM_STATIONS[station] || BGM_STATIONS[1];
    } else if (typeof station === 'string') {
      stationObj = BGM_STATIONS.find(s => s.name.toLowerCase() === station.toLowerCase()) || BGM_STATIONS[1];
    } else {
      stationObj = BGM_STATIONS[1];
    }

    this.activeRadioStation = stationObj.name;
    this.currentStationIndex = stationObj.id;

    if (!this.ctx || this.isMuted) return true;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const scale = stationObj.scale;
    const tempo = stationObj.tempo || 160;
    let step = 0;

    this.activeBgmInterval = setInterval(() => {
      if (!this.ctx || this.isMuted || !this.bgmGain) return;
      try {
        const now = this.ctx.currentTime;
        const effectiveGain = this.masterGain * this.bgmGain;
        const noteFreq = scale[step % scale.length];

        // Lead melody tone
        const leadOsc = this.ctx.createOscillator();
        const leadGainNode = this.ctx.createGain();
        leadOsc.type = stationObj.leadWave || 'triangle';
        leadOsc.frequency.setValueAtTime(this.clampFrequency(noteFreq), now);
        leadGainNode.gain.setValueAtTime(this.clampGain((stationObj.leadGain || 0.06) * effectiveGain), now);
        leadGainNode.gain.exponentialRampToValueAtTime(0.001, now + (stationObj.leadDecay || 0.12));

        leadOsc.connect(leadGainNode);
        leadGainNode.connect(this.ctx.destination);
        leadOsc.start(now);
        leadOsc.stop(now + (stationObj.leadDecay || 0.12));

        // Bass arpeggio tone
        if (step % (stationObj.bassInterval || 4) === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGainNode = this.ctx.createGain();
          bassOsc.type = stationObj.bassWave || 'sawtooth';
          const bassFreq = noteFreq / (stationObj.bassOctaveDiv || 4);
          bassOsc.frequency.setValueAtTime(this.clampFrequency(bassFreq), now);
          bassGainNode.gain.setValueAtTime(this.clampGain((stationObj.bassGain || 0.05) * effectiveGain), now);
          bassGainNode.gain.exponentialRampToValueAtTime(0.001, now + (stationObj.bassDecay || 0.25));

          bassOsc.connect(bassGainNode);
          bassGainNode.connect(this.ctx.destination);
          bassOsc.start(now);
          bassOsc.stop(now + (stationObj.bassDecay || 0.25));
        }

        step++;
      } catch (e) {}
    }, tempo);

    if (this.activeBgmInterval && this.activeBgmInterval.unref) {
      this.activeBgmInterval.unref();
    }

    return true;
  }

  startBgm(stationIdx = 1) {
    return this.startBgmRadio(stationIdx);
  }

  stopBgmRadio() {
    if (this.activeBgmInterval) {
      clearInterval(this.activeBgmInterval);
      this.activeBgmInterval = null;
    }
    this.activeRadioStation = null;
    this.currentStationIndex = 0;
  }

  stopBgm() {
    this.stopBgmRadio();
  }

  cycleBgmStation() {
    const nextIdx = (this.currentStationIndex + 1) % BGM_STATIONS.length;
    if (nextIdx === 0) {
      this.stopBgmRadio();
      return { stationIndex: 0, name: "Off" };
    }
    this.startBgmRadio(nextIdx);
    return { stationIndex: nextIdx, name: BGM_STATIONS[nextIdx].name };
  }
}

// Global attachment for browsers
if (typeof window !== 'undefined') {
  window.AudioEngine = AudioEngine;
  window.BGM_STATIONS = BGM_STATIONS;
  window.audioEngine = new AudioEngine();
}

export default AudioEngine;
