/**
 * Test Harness Verification Suite
 * Tests:
 * 1. MockHTMLCanvasElement properties and dimensions
 * 2. MockCanvasRenderingContext2D draw methods, calls logging, and state stack
 * 3. MockLocalStorage operations and quota simulation
 * 4. MockAudioContext node creation and parameter automation
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  MockHTMLCanvasElement,
  MockCanvasRenderingContext2D,
  MockLocalStorage,
  MockAudioContext
} from './test-harness.js';

describe('Test Harness Mocks & Environment Verification', () => {
  describe('1. MockHTMLCanvasElement & Context 2D', () => {
    it('creates canvas with default 640x480 resolution', () => {
      const canvas = new MockHTMLCanvasElement(640, 480);
      assert.strictEqual(canvas.width, 640);
      assert.strictEqual(canvas.height, 480);

      const rect = canvas.getBoundingClientRect();
      assert.strictEqual(rect.width, 640);
      assert.strictEqual(rect.height, 480);
    });

    it('returns 2D context and logs render calls', () => {
      const canvas = new MockHTMLCanvasElement(640, 480);
      const ctx = canvas.getContext('2d');
      assert.ok(ctx instanceof MockCanvasRenderingContext2D);

      ctx.fillStyle = '#00ffcc';
      ctx.fillRect(10, 20, 100, 50);
      ctx.clearRect(0, 0, 640, 480);

      const calls = ctx.calls;
      assert.strictEqual(calls.length, 2);
      assert.strictEqual(calls[0].method, 'fillRect');
      assert.deepStrictEqual(calls[0].args, [10, 20, 100, 50]);
      assert.strictEqual(calls[1].method, 'clearRect');
      assert.deepStrictEqual(calls[1].args, [0, 0, 640, 480]);
    });

    it('manages save and restore state stack', () => {
      const canvas = new MockHTMLCanvasElement();
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#ff0000';
      ctx.lineWidth = 5;
      ctx.save();

      ctx.fillStyle = '#00ff00';
      ctx.lineWidth = 1;
      assert.strictEqual(ctx.fillStyle, '#00ff00');
      assert.strictEqual(ctx.lineWidth, 1);

      ctx.restore();
      assert.strictEqual(ctx.fillStyle, '#ff0000');
      assert.strictEqual(ctx.lineWidth, 5);
    });

    it('handles canvas event listeners', () => {
      const canvas = new MockHTMLCanvasElement();
      let clicked = false;
      const handler = () => { clicked = true; };

      canvas.addEventListener('click', handler);
      canvas.dispatchEvent({ type: 'click' });
      assert.strictEqual(clicked, true);

      canvas.removeEventListener('click', handler);
      clicked = false;
      canvas.dispatchEvent({ type: 'click' });
      assert.strictEqual(clicked, false);
    });
  });

  describe('2. MockLocalStorage', () => {
    it('supports basic key-value storage and length reporting', () => {
      const storage = new MockLocalStorage();
      storage.setItem('key1', 'value1');
      storage.setItem('key2', '123');

      assert.strictEqual(storage.getItem('key1'), 'value1');
      assert.strictEqual(storage.getItem('key2'), '123');
      assert.strictEqual(storage.length, 2);

      storage.removeItem('key1');
      assert.strictEqual(storage.getItem('key1'), null);
      assert.strictEqual(storage.length, 1);

      storage.clear();
      assert.strictEqual(storage.length, 0);
    });

    it('simulates quota exceeded exceptions', () => {
      const storage = new MockLocalStorage();
      storage.simulateQuotaExceeded = true;

      assert.throws(() => {
        storage.setItem('data', 'overflow');
      }, /QuotaExceededError/);
    });
  });

  describe('3. MockAudioContext Graph', () => {
    it('creates oscillators, gain nodes, and buffer sources', () => {
      const ctx = new MockAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      assert.strictEqual(osc.connectedTo[0], gain);
      assert.strictEqual(gain.connectedTo[0], ctx.destination);
    });

    it('schedules audio parameter changes', () => {
      const ctx = new MockAudioContext();
      const gain = ctx.createGain();

      gain.gain.setValueAtTime(0.5, 0);
      gain.gain.exponentialRampToValueAtTime(0.01, 1.0);

      assert.strictEqual(gain.gain.scheduledEvents.length, 2);
      assert.strictEqual(gain.gain.scheduledEvents[0].type, 'setValueAtTime');
      assert.strictEqual(gain.gain.scheduledEvents[1].type, 'exponentialRampToValueAtTime');
    });
  });
});
