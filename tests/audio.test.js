/**
 * Web Audio & Procedural Synthesizer Verification Test Suite
 * Tests:
 * 1. Procedural audio parameter clamping (frequencies, gain stages)
 * 2. Master, SFX, and BGM volume controls and mute toggles
 * 3. Sound event mapping (select, coin, fanfare, explosion, hit)
 * 4. Procedural Chiptune Radio lifecycle and timer leak prevention
 * 5. Headless environment safety (null context resilience)
 * 6. AudioContext suspension & autoplay policy handling
 */

import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  MockAudioContext,
  ReferenceAudioEngine,
  getAudioEngine
} from './test-harness.js';

describe('AudioEngine Procedural Sound & Clamping Tests', () => {
  let mockCtx;
  let audio;

  beforeEach(async () => {
    mockCtx = new MockAudioContext();
    audio = await getAudioEngine({ audioContext: mockCtx });
  });

  afterEach(() => {
    if (audio) {
      audio.stopBgmRadio();
    }
  });

  describe('1. Procedural Audio Parameter Clamping', () => {
    it('clamps frequencies below 20Hz to 20Hz', () => {
      assert.strictEqual(audio.clampFrequency(-100), 20);
      assert.strictEqual(audio.clampFrequency(0), 20);
      assert.strictEqual(audio.clampFrequency(15), 20);
    });

    it('clamps frequencies above 20,000Hz to 20,000Hz', () => {
      assert.strictEqual(audio.clampFrequency(25000), 20000);
      assert.strictEqual(audio.clampFrequency(999999), 20000);
    });

    it('preserves valid audible frequencies within [20, 20000] range', () => {
      assert.strictEqual(audio.clampFrequency(440), 440);
      assert.strictEqual(audio.clampFrequency(1046.50), 1046.50);
    });

    it('safely handles NaN and non-number frequencies', () => {
      assert.strictEqual(audio.clampFrequency(NaN), 440);
      assert.strictEqual(audio.clampFrequency('invalid'), 440);
    });

    it('clamps volume gain levels strictly between 0.0 and 1.0', () => {
      assert.strictEqual(audio.clampGain(-0.5), 0.0);
      assert.strictEqual(audio.clampGain(1.8), 1.0);
      assert.strictEqual(audio.clampGain(0.65), 0.65);
      assert.strictEqual(audio.clampGain(NaN), 0.0);
    });
  });

  describe('2. Volume Gain Staging & Mute Controls', () => {
    it('sets master, sfx, and bgm volume with clamping', () => {
      audio.setMasterVolume(0.75);
      audio.setSfxVolume(1.5); // should clamp to 1.0
      audio.setBgmVolume(-0.2); // should clamp to 0.0

      assert.strictEqual(audio.masterGain, 0.75);
      assert.strictEqual(audio.sfxGain, 1.0);
      assert.strictEqual(audio.bgmGain, 0.0);
    });

    it('toggles mute on and off and suppresses sfx when muted', () => {
      assert.strictEqual(audio.isMuted, false);
      const muted = audio.toggleMute();
      assert.strictEqual(muted, true);
      assert.strictEqual(audio.isMuted, true);

      // Playing sound when muted returns null without error
      const sfxResult = audio.playSfx('select');
      assert.strictEqual(sfxResult, null);

      audio.toggleMute();
      assert.strictEqual(audio.isMuted, false);
      const unmutedResult = audio.playSfx('select');
      assert.ok(unmutedResult !== null);
    });
  });

  describe('3. Sound Event Mapping & Waveforms', () => {
    it('maps "select" to a triangle wave oscillator with frequency ramp', () => {
      const result = audio.playSfx('select');
      assert.ok(result);
      assert.strictEqual(result.osc.type, 'triangle');
      assert.strictEqual(result.osc.started, true);
      assert.strictEqual(result.osc.stopped, true);

      // Verify scheduled parameter events
      const freqEvents = result.osc.frequency.scheduledEvents;
      assert.ok(freqEvents.length >= 2);
      assert.strictEqual(freqEvents[0].type, 'setValueAtTime');
      assert.strictEqual(freqEvents[0].value, 523.25);
      assert.strictEqual(freqEvents[1].type, 'exponentialRampToValueAtTime');
      assert.strictEqual(freqEvents[1].value, 1046.50);
    });

    it('maps "coin" to a 2-tone square wave oscillator', () => {
      const result = audio.playSfx('coin');
      assert.ok(result);
      assert.strictEqual(result.osc.type, 'square');
      assert.strictEqual(result.osc.started, true);

      const freqEvents = result.osc.frequency.scheduledEvents;
      assert.ok(freqEvents.length >= 2);
      assert.strictEqual(freqEvents[0].value, 987.77);
      assert.strictEqual(freqEvents[1].value, 1318.51);
    });

    it('maps "fanfare" to a 5-note melodic progression', () => {
      const notes = audio.playSfx('fanfare');
      assert.ok(Array.isArray(notes));
      assert.strictEqual(notes.length, 5);

      notes.forEach(n => {
        assert.strictEqual(n.osc.type, 'triangle');
        assert.strictEqual(n.osc.started, true);
      });
    });

    it('maps "explosion" to white noise buffer source', () => {
      const result = audio.playSfx('explosion');
      assert.ok(result);
      assert.ok(result.noise);
      assert.ok(result.noise.buffer);
      assert.strictEqual(result.noise.started, true);
      assert.strictEqual(result.noise.stopped, true);
    });

    it('maps "hit" to a descending sawtooth pitch drop', () => {
      const result = audio.playSfx('hit');
      assert.ok(result);
      assert.strictEqual(result.osc.type, 'sawtooth');

      const freqEvents = result.osc.frequency.scheduledEvents;
      assert.ok(freqEvents.length >= 2);
      assert.strictEqual(freqEvents[0].value, 220);
      assert.strictEqual(freqEvents[1].value, 40);
    });
  });

  describe('4. Procedural Chiptune Radio Lifecycle', () => {
    it('starts radio station with valid interval and station identifier', () => {
      audio.startBgmRadio('8-Bit Quest');
      assert.strictEqual(audio.activeRadioStation, '8-Bit Quest');
      assert.ok(audio.activeBgmInterval !== null);
    });

    it('cleans up interval timer on stop without memory leaks', () => {
      audio.startBgmRadio('Synthwave');
      assert.ok(audio.activeBgmInterval !== null);

      audio.stopBgmRadio();
      assert.strictEqual(audio.activeBgmInterval, null);
      assert.strictEqual(audio.activeRadioStation, null);
    });
  });

  describe('5. Headless Safety & Autoplay Resilience', () => {
    it('safely no-ops when AudioContext is null without throwing errors', () => {
      const headlessAudio = new ReferenceAudioEngine(null);

      assert.doesNotThrow(() => {
        headlessAudio.playSfx('select');
        headlessAudio.playSfx('coin');
        headlessAudio.playSfx('fanfare');
        headlessAudio.playSfx('explosion');
        headlessAudio.startBgmRadio('Synthwave');
        headlessAudio.stopBgmRadio();
      });
    });

    it('resumes suspended AudioContext on user interaction', async () => {
      mockCtx.state = 'suspended';
      audio.playSfx('select');

      assert.strictEqual(mockCtx.state, 'running');
    });
  });
});
