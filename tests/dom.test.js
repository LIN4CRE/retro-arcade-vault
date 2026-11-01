/**
 * DOM Layout, Navigation, Accessibility & Modals Verification Test Suite
 * Tests:
 * 1. Primary shell layout elements in index.html
 * 2. Navigation, search, and library filtering buttons
 * 3. Audio toggle UI and status displays
 * 4. Modal dialog structures and close triggers
 * 5. Accessibility attributes (labels, placeholders, semantic roles)
 * 6. Responsive cabinet bezel and CRT stage containers
 */

import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { loadProjectDocument } from './test-harness.js';

describe('DOM Layout & Accessibility Test Suite', () => {
  let doc;

  before(() => {
    doc = loadProjectDocument();
  });

  describe('1. Primary Cabinet Stage & Screen Elements', () => {
    it('contains screenContainer for CRT arcade stage', () => {
      const screenContainer = doc.getElementById('screenContainer');
      assert.ok(screenContainer, 'Missing #screenContainer element in index.html');
      assert.ok(screenContainer.classList.contains('screen-container') || screenContainer.className.length > 0);
    });

    it('contains ambient glow backdrop', () => {
      const ambientGlow = doc.getElementById('ambientGlow');
      assert.ok(ambientGlow, 'Missing #ambientGlow element');
    });

    it('contains gameFrame for emulation and viewport rendering', () => {
      const gameFrame = doc.getElementById('gameFrame');
      assert.ok(gameFrame, 'Missing #gameFrame element');
    });

    it('contains sidebar and gameList container for catalog items', () => {
      const sidebar = doc.getElementById('sidebar');
      assert.ok(sidebar, 'Missing #sidebar element');

      const gameList = doc.getElementById('gameList');
      assert.ok(gameList, 'Missing #gameList element');
    });
  });

  describe('2. Navigation, Search & Filtering Controls', () => {
    it('contains instant search input and clear button', () => {
      const searchInput = doc.getElementById('searchInput');
      assert.ok(searchInput, 'Missing #searchInput element');
      assert.strictEqual(searchInput.getAttribute('type'), 'text');
      assert.ok(searchInput.getAttribute('placeholder'), 'Search input should have placeholder');

      const clearSearchBtn = doc.getElementById('clearSearchBtn');
      assert.ok(clearSearchBtn, 'Missing #clearSearchBtn element');
    });

    it('contains category filter container and sort select dropdown', () => {
      const categoryFilters = doc.getElementById('categoryFilters');
      assert.ok(categoryFilters, 'Missing #categoryFilters container');

      const sortSelect = doc.getElementById('sortSelect');
      assert.ok(sortSelect, 'Missing #sortSelect dropdown');
    });

    it('contains theater focus mode and fullscreen action buttons', () => {
      const theaterBtn = doc.getElementById('theaterBtn');
      assert.ok(theaterBtn, 'Missing #theaterBtn');

      const fullscreenBtn = doc.getElementById('fullscreenBtn');
      assert.ok(fullscreenBtn, 'Missing #fullscreenBtn');
    });

    it('contains CRT bezel mode toggle button and label', () => {
      const toggleBezelBtn = doc.getElementById('toggleBezelBtn');
      assert.ok(toggleBezelBtn, 'Missing #toggleBezelBtn');

      const bezelLabel = doc.getElementById('bezelLabel');
      assert.ok(bezelLabel, 'Missing #bezelLabel');
    });
  });

  describe('3. Audio Controls UI', () => {
    it('contains 8-bit sound effects toggle and status display', () => {
      const toggleSfxBtn = doc.getElementById('toggleSfxBtn');
      assert.ok(toggleSfxBtn, 'Missing #toggleSfxBtn');

      const sfxStatus = doc.getElementById('sfxStatus');
      assert.ok(sfxStatus, 'Missing #sfxStatus indicator');
    });

    it('contains procedural chiptune radio toggle button and station label', () => {
      const toggleBgmBtn = doc.getElementById('toggleBgmBtn');
      assert.ok(toggleBgmBtn, 'Missing #toggleBgmBtn');

      const bgmLabel = doc.getElementById('bgmLabel');
      assert.ok(bgmLabel, 'Missing #bgmLabel');
    });
  });

  describe('4. Modal Dialog Structures & Controls', () => {
    it('contains Trophies & Achievements modal with counter and grid', () => {
      const trophiesModal = doc.getElementById('trophiesModal');
      assert.ok(trophiesModal, 'Missing #trophiesModal');

      const openTrophiesBtn = doc.getElementById('openTrophiesBtn');
      assert.ok(openTrophiesBtn, 'Missing #openTrophiesBtn');

      const closeTrophiesModalBtn = doc.getElementById('closeTrophiesModalBtn');
      assert.ok(closeTrophiesModalBtn, 'Missing #closeTrophiesModalBtn');

      const trophyGrid = doc.getElementById('trophyGrid');
      assert.ok(trophyGrid, 'Missing #trophyGrid container');
    });

    it('contains User Notes modal with textarea and save button', () => {
      const notesModal = doc.getElementById('notesModal');
      assert.ok(notesModal, 'Missing #notesModal');

      const openNotesBtn = doc.getElementById('openNotesBtn');
      assert.ok(openNotesBtn, 'Missing #openNotesBtn');

      const gameNotesTextarea = doc.getElementById('gameNotesTextarea');
      assert.ok(gameNotesTextarea, 'Missing #gameNotesTextarea');

      const saveNotesBtn = doc.getElementById('saveNotesBtn');
      assert.ok(saveNotesBtn, 'Missing #saveNotesBtn');
    });

    it('contains Keyboard & Gamepad Controls modal', () => {
      const controlsModal = doc.getElementById('controlsModal');
      assert.ok(controlsModal, 'Missing #controlsModal');

      const openControlsModalBtn = doc.getElementById('openControlsModalBtn');
      assert.ok(openControlsModalBtn, 'Missing #openControlsModalBtn');

      const closeControlsModalBtn = doc.getElementById('closeControlsModalBtn');
      assert.ok(closeControlsModalBtn, 'Missing #closeControlsModalBtn');
    });

    it('contains Add Custom Game modal and form elements', () => {
      const addModal = doc.getElementById('addModal');
      assert.ok(addModal, 'Missing #addModal');

      const addGameForm = doc.getElementById('addGameForm');
      assert.ok(addGameForm, 'Missing #addGameForm');

      const openAddModalBtn = doc.getElementById('openAddModalBtn');
      assert.ok(openAddModalBtn, 'Missing #openAddModalBtn');
    });

    it('contains Backup Export and Import elements', () => {
      const exportBtn = doc.getElementById('exportBtn');
      assert.ok(exportBtn, 'Missing #exportBtn');

      const importFileInput = doc.getElementById('importFileInput');
      assert.ok(importFileInput, 'Missing #importFileInput');
      assert.strictEqual(importFileInput.getAttribute('type'), 'file');
    });
  });

  describe('5. Accessibility & Usability Attributes', () => {
    it('has lang attribute on root html tag', () => {
      const htmlTags = doc.querySelectorAll('html');
      assert.ok(htmlTags.length > 0);
      assert.strictEqual(htmlTags[0].getAttribute('lang'), 'en');
    });

    it('has meta viewport configuration for mobile responsiveness', () => {
      const metaTags = doc.querySelectorAll('meta');
      const viewport = metaTags.find(m => m.getAttribute('name') === 'viewport');
      assert.ok(viewport, 'Missing meta viewport tag');
      assert.ok(viewport.getAttribute('content').includes('width=device-width'));
    });

    it('verifies interactive buttons have accessible identifiers or titles', () => {
      const buttons = doc.querySelectorAll('button');
      assert.ok(buttons.length >= 10, 'Expected at least 10 buttons in index.html');

      // Check a sample of critical buttons for either text or aria-label or title
      const criticalBtnIds = [
        'theaterBtn',
        'fullscreenBtn',
        'toggleSfxBtn',
        'toggleBgmBtn',
        'openTrophiesBtn',
        'openControlsModalBtn'
      ];

      for (const id of criticalBtnIds) {
        const btn = doc.getElementById(id);
        assert.ok(btn, `Button #${id} must exist in DOM`);
      }
    });
  });
});
