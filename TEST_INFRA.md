# Automated Test Infrastructure Specification (TEST_INFRA.md)
**Project**: Retro Arcade Vault  
**Version**: 4.0.0  
**Test Architecture Integrity Mode**: Zero-Dependency Native Node.js Test Runner  
**Author**: E2E Test Suite Architect (`e2e_test_writer_1`)  
**Date**: 2026-11-01  

---

## 1. Test Philosophy

### 1.1 Zero External Runtime & Test Dependencies
Retro Arcade Vault is built on a zero-dependency architecture. In accordance with this principle, the automated test infrastructure relies exclusively on built-in capabilities provided by Node.js (`v26.7.0+`):
- `node:test`: Standard execution runner supporting suites (`describe`), sub-tests (`it`), lifecycle hooks (`before`, `after`, `beforeEach`, `afterEach`), and granular timing.
- `node:assert/strict`: Strict deep equality, truthiness, error matching, and rejection assertions.
- Native ES Modules (`import`/`export`) without transpilation steps (Babel, Webpack, Vite).
- Zero `npm install` requirements: any developer, continuous integration agent, or evaluator can clone the repository and run `npm test` or `node --test tests/*.test.js` instantaneously.

### 1.2 Multi-Tier Verification Pyramid
The testing strategy is organized into five structured tiers:

```
                  ▲
                 / \
                /   \     Tier 5: Adversarial & Stress (Challenger)
               / Tier\    ---------------------------------------
              /   5   \   Corrupted backups, quota limits, rapid mash
             /─────────\
            /  Tier 4   \  Tier 4: Real-World Scenarios (End-to-End)
           /─────────────\ -----------------------------------------
          /    Tier 3     \ Complete user gameplay, scoring, backup roundtrip
         /─────────────────\ Tier 3: DOM, Accessibility & Shell
        /      Tier 2       \ -----------------------------------
       /─────────────────────\ Layout, modals, ARIA labels, shaders
      /        Tier 1         \ Tier 2: Subsystem Contracts (Harness Mocks)
     /─────────────────────────\ ------------------------------------------
    /                           \ Canvas 2D render calls, Web Audio graph, Storage
   ─────────────────────────────── Tier 1: Unit & Math (Physics, Clamps, Schemas)
```

1. **Tier 1 — Unit & Mathematical Logic**:
   Deterministic verification of pure algorithms: fixed-timestep physics updates, vector momentum, collision bounding boxes, audio parameter clamping, audio frequency calculations, and data migration functions. Execution speed: `< 5ms` per suite.
2. **Tier 2 — Subsystem & Interface Contracts**:
   Verifies interactions between subsystems via lightweight headless mocks (`MockCanvasRenderingContext2D`, `MockAudioContext`, `MockLocalStorage`). Ensures compliance with interface contracts specified in `PROJECT.md` (`ArcadeGame` ↔ `VaultApi`, `StorageService` Schema v4.0).
3. **Tier 3 — DOM, Accessibility & Shell Verification**:
   Inspects the structural integrity of `index.html`, verifying all interactive buttons, filter tabs, modal dialogs, accessibility attributes (`aria-label`, `role`), and keyboard shortcuts.
4. **Tier 4 — Real-World Application Scenarios (E2E Workflows)**:
   Simulates end-to-end user journeys: starting a game, scoring points, reaching game over, entering 3-letter initials into the High Score Hall of Fame, receiving achievement notifications, and executing zero-loss backup export/import cycles.
5. **Tier 5 — Adversarial & Stress Verification**:
   Exercises malicious, malformed, or boundary inputs: corrupted JSON payloads, prototype pollution keys, storage quota saturation, rapid audio trigger multi-fire, and headless environments where Web Audio or Canvas is absent.

### 1.3 Authoritative Output Derivation
Every test assertion is grounded in an explicit authoritative source:
- **Mathematical / Physical Laws**: Kinematic equations ($s = v \cdot dt$, elastic paddle deflection angles) and 12-TET musical scale frequencies ($f = 440 \cdot 2^{(n-69)/12}$).
- **Interface Specifications**: `PROJECT.md` contracts for `HighScoreRecord`, `VaultBackupFile`, and `ArcadeGameInstance`.
- **Existing User Data Formats**: Retro Vault v1/v2.1 schemas from `index.html` to guarantee backward-compatible migration.
- **W3C Standards**: Web Audio API AudioParam automation curves, HTML5 Canvas 2D Context specifications, and WAI-ARIA 1.2 authoring practices.

---

## 2. Feature Inventory & Verification Mapping

The 26 features defined in `PROJECT.md` are mapped to automated test suites, execution tiers, and authoritative derivation sources:

| # | Feature | Target Test Suite | Tier | Verification Method | Authoritative Source / Oracle |
|---|---------|-------------------|------|---------------------|-------------------------------|
| 1 | Native Arcade Engine Core | `tests/games.test.js` | T1/T2 | Fixed-timestep accumulator (60Hz), lifecycle transitions (`READY`→`PLAYING`→`GAMEOVER`) | `PROJECT.md` § Interface Contracts |
| 2 | Built-in Snake Arcade | `tests/games.test.js` | T1/T2 | Grid movement, food spawning, 180° reversal rejection, body collision, score tally | Classic Snake mechanics specification |
| 3 | Built-in Pong Classic | `tests/games.test.js` | T1/T2 | Paddle deflection angles, rally acceleration, boundary clamps, AI tracking | Elastic collision math & kinematic law |
| 4 | Built-in Breakout Retro | `tests/games.test.js` | T1/T2 | 5-row colored brick AABB collision, destructible brick count, life deduction | Atari Breakout mechanics specification |
| 5 | Built-in Space Invaders | `tests/games.test.js` | T1/T2 | Marching alien grid step, edge drop & speedup, bunker degradation, alien bombs | Taito Space Invaders tempo curves |
| 6 | Built-in Asteroids Odyssey | `tests/games.test.js` | T1/T2 | 360° inertia physics, screen wrap-around, 3-tier splitting rocks, bullet lifetime | Vector physics & Euler integration |
| 7 | StorageService & Schema v4.0 | `tests/storage.test.js` | T1/T2 | Versioned persistence, v1/v2/v3 migration, in-memory fallback on quota block | `PROJECT.md` § Schema v4.0 Contract |
| 8 | Automated High Score Hall of Fame | `tests/storage.test.js` | T2/T4 | Top-10 ranking, 3-letter initials validation (`[A-Z0-9]{3}`), date stamping | Arcade Hall of Fame standard |
| 9 | Dual Library Navigation | `tests/dom.test.js` | T3 | Hall toggle tabs, visibility switching between native games and emulation catalog | `PROJECT.md` § Architecture |
| 10 | Multi-Dimensional Filtering & Search | `tests/dom.test.js` | T3 | Genre, platform, era, difficulty chips and instant search input filtering | `index.html` DOM contracts |
| 11 | Game Instructions & Manual Modal | `tests/dom.test.js` | T3 | Objective, control keys, rules, tips rendering for native games | `PROJECT.md` § GameMetadata |
| 12 | CRT Display Shader Suite | `tests/dom.test.js` | T3 | Scanline opacity, phosphor bloom, curvature sliders, bezel classes | CSS custom property definitions |
| 13 | Vintage Arcade Bezel Mode | `tests/dom.test.js` | T3 | Bezel container class toggle (`.bezel-mode`), CRT glare overlay | `index.html` style rules |
| 14 | Retro Color Palette Themes | `tests/dom.test.js` | T3 | Palette class applications: Cyberpunk, Classic, Phosphor Green, Amber | CSS theme variables |
| 15 | Synthesized 8-Bit SFX Engine | `tests/audio.test.js` | T1/T2 | Procedural oscillator node generation (square, triangle, saw, white noise) | Web Audio API W3C Recommendation |
| 16 | Procedural Chiptune Radio | `tests/audio.test.js` | T2 | Station progression timers, chord intervals, safe stop/clear without leaks | Musical arpeggio progression tables |
| 17 | Keybinding Customization Modal | `tests/input.test.js` | T2/T3 | Keyboard code remapping (Up, Down, Left, Right, Action 1/2), localStorage | Web KeyboardEvent `code` spec |
| 18 | Responsive Virtual Touch D-Pad | `tests/input.test.js` | T2/T3 | Touch start/move/end directional vector calculation and action dispatches | TouchEvent pointer API contract |
| 19 | Gamepad API Integration | `tests/input.test.js` | T2 | Standard gamepad mapping (axes and buttons 0-15), connection event listener | W3C Gamepad specification |
| 20 | Unified Achievements System | `tests/storage.test.js` | T2/T4 | 17+ trophies trigger conditions, deduplication, toast notification dispatch | `index.html` TROPHIES list |
| 21 | Session Stopwatch & Playtime Stats | `tests/storage.test.js` | T1/T2 | Playtime accumulation math (`MM:SS`), play counts increment on launch | Time arithmetic specification |
| 22 | Resilient JSON Export & Import | `tests/storage.test.js` | T1/T5 | Full roundtrip serialization of all state with zero data loss & sanitization | `PROJECT.md` § VaultBackupFile |
| 23 | Defect Remediation: Bug Fixes | `tests/storage.test.js`, `tests/dom.test.js` | T1/T3 | Sega category fix (`GENESIS`→`SEGA`), trophy count (`X/17`), cover fallbacks | Survey 1 Defect Audit Findings |
| 24 | Headline Fallback & Notice | `tests/dom.test.js` | T3 | COD Zombies HTTP 451 external launcher popout notice & direct link | Survey 1 Defect Findings |
| 25 | Konami Code Easter Egg | `tests/input.test.js` | T2/T4 | Sequential keystroke buffer matching `↑ ↑ ↓ ↓ ← → ← → B A`, audio fanfare | Classic Konami sequence contract |
| 26 | Standalone Automated Suite | `tests/e2e-browser.test.js` | T4/T5 | Headless Chrome DevTools Protocol end-to-end browser execution | System Chrome CDP WebSocket protocol |

---

## 3. Test Architecture

### 3.1 Directory Layout
```
retro_arcade_vault/
├── package.json                 # Test execution scripts ("test": "node --test tests/*.test.js")
├── TEST_INFRA.md                # Master test architecture and verification document
└── tests/
    ├── test-harness.js          # Shared lightweight mocks (Canvas 2D, Web Audio, DOM, Storage)
    ├── storage.test.js          # Tier 1 & 2: StorageService schema v4.0, high scores, export/import
    ├── audio.test.js            # Tier 1 & 2: Procedural audio math, parameter clamps, headless safety
    ├── dom.test.js              # Tier 3: DOM layout, navigation buttons, accessibility, modals
    ├── input.test.js            # Tier 2: Keybindings, virtual touch D-pad, gamepad coordinator
    ├── games.test.js            # Tier 1 & 2: Physics, collision, state machines for 5 native games
    └── e2e-browser.test.js      # Tier 4: Headless Chrome CDP end-to-end browser runner
```

### 3.2 Lightweight Test Harness (`tests/test-harness.js`)
To enable zero-dependency execution in headless Node.js without external npm libraries (such as `jsdom`, `canvas`, or `web-audio-api`), the test harness implements lightweight, performant in-memory mocks:

1. **`MockCanvasRenderingContext2D`**:
   - Implements standard 2D context methods: `fillRect`, `clearRect`, `strokeRect`, `beginPath`, `closePath`, `moveTo`, `lineTo`, `arc`, `fill`, `stroke`, `save`, `restore`, `fillText`, `strokeText`, `drawImage`, etc.
   - Maintains an observable call log (`context.calls: Array<{method, args}>`) allowing test assertions on draw operations, coordinate transforms, and styling changes.
2. **`MockHTMLCanvasElement`**:
   - Provides `width`, `height`, `clientWidth`, `clientHeight`, `style`, and `getContext('2d')`.
   - Simulates `getBoundingClientRect()` with standard 640x480 resolution.
3. **`MockAudioContext`**:
   - Simulates Web Audio API graph: `createOscillator()`, `createGain()`, `createBufferSource()`, `createBuffer()`, `destination`, `currentTime`, and state transitions (`running`, `suspended`, `closed`).
   - `MockAudioParam` accurately records `setValueAtTime`, `exponentialRampToValueAtTime`, and `linearRampToValueAtTime` schedules with strict parameter bounds checking.
4. **`MockLocalStorage`**:
   - In-memory implementation of the Web Storage API (`getItem`, `setItem`, `removeItem`, `clear`, `length`, `key`).
   - Includes a controllable `simulateQuotaExceeded` toggle to verify in-memory fallback resilience when localStorage is disabled or quota is breached.
5. **`MockDOM` & Structural HTML Parser**:
   - Parses `index.html` without third-party dependencies, extracting elements by `id`, `class`, tag, and attributes.
   - Provides DOM querying (`getElementById`, `querySelector`, `querySelectorAll`) and synthetic event dispatching (`addEventListener`, `dispatchEvent`).
6. **Contract Loaders & Fallbacks**:
   - Exposes `getStorageService()` and `getAudioEngine()`, which dynamically link to `src/core/storage.js` and `src/core/audio.js` if present, while providing fully compliant reference contract implementations when testing foundation contracts before worker file creation.

---

## 4. Real-World Application Scenarios (Tier 4)

### Scenario 1: First-Time Player Onboarding & "Coin Drop" Achievement
- **Trigger**: Player opens Retro Arcade Vault for the very first time with empty `localStorage`.
- **Pre-Conditions**: Storage contains no keys; default games list initialized; unlocked achievements set is empty (`0/17`).
- **User Actions**:
  1. User clicks the "Play Classic Arcade" button or selects the first built-in game ("Neon Snake").
  2. Game engine switches state from `READY` to `PLAYING`.
- **System Expectations**:
  - `StorageService.recordGameLaunch("snake")` increments the play count for "snake" from 0 to 1.
  - The achievement `"COIN_DROP"` ("First Quarter Inserted") is evaluated and unlocked.
  - An achievement toast notification is dispatched with the title "Coin Drop".
  - Chiptune victory fanfare (`fanfare`) audio synthesizer trigger is requested.
  - Achievement counter updates from `0/17` to `1/17`.
  - Session stopwatch starts ticking at `00:00`.

### Scenario 2: High Score Setting & Top-10 Leaderboard Initials Entry
- **Trigger**: Player completes a game of Space Invaders and achieves a score of 1,450 points.
- **Pre-Conditions**: Existing top score for Space Invaders is 800 points.
- **User Actions**:
  1. The alien horde reaches the bunker baseline, triggering player death and `onGameOver(1450, {wave: 3})`.
  2. Arcade cabinet halts fixed-timestep loop and transitions to state `GAMEOVER`.
  3. High score submission dialog opens, prompting for a 3-character arcade tag.
  4. Player types `"ACE"` and submits.
- **System Expectations**:
  - `StorageService.addHighScore("invaders", "Space Invaders", "ACE", 1450)` executes.
  - New record is placed at Rank 1 in the Space Invaders leaderboard.
  - Leaderboard is trimmed to a maximum of 10 records.
  - Record payload contains valid timestamp, ISO date string, and sanitized 3-letter uppercase initials.
  - If score qualifies for the overall Hall of Fame, achievement `"HALL_OF_FAME"` unlocks.
  - Top score display badge on game selection card refreshes to show `1,450`.

### Scenario 3: Resilient JSON Export & Import (Zero Data Loss Roundtrip)
- **Trigger**: Player backs up their vault data and restores it on a new computer.
- **Pre-Conditions**: Vault contains 3 custom added games, 14 high score records across 4 games, 9 unlocked achievements, 45 minutes of tracked playtime, custom keyboard remappings, and customized CRT bloom settings.
- **User Actions**:
  1. User opens the "Backup & Restore" modal and clicks "Export Vault Data (.json)".
  2. Browser downloads `retro-arcade-vault-backup-v4.0.json`.
  3. `localStorage.clear()` is executed to simulate a clean browser state.
  4. User clicks "Import Vault Data" and provides the backup JSON file.
- **System Expectations**:
  - Schema version `4.0` is verified; invalid/malformed JSON is rejected with descriptive error.
  - 100% of state is restored: all 3 custom games are present in `games`, 14 high scores intact with ranks and initials, 9 achievements restored with correct dates, total playtime equals 45 minutes, keybindings are applied to active controls, CRT shader settings restored.
  - Zero silent data loss occurs (remediating the original v2.1 import defect where scores, trophies, and notes were discarded).

### Scenario 4: Procedural Chiptune Radio & Dynamic Gain Staging
- **Trigger**: Player toggles background music radio while playing an arcade game.
- **Pre-Conditions**: Sound effects enabled (`sfx = ON`), BGM radio currently stopped.
- **User Actions**:
  1. User clicks the "BGM Radio" button.
  2. Radio engine starts playing the `"8-Bit Quest"` arpeggiator preset.
  3. User adjusts master volume slider to `70%` and SFX slider to `50%`.
  4. User launches a game sound effect (e.g. Breakout paddle deflection).
- **System Expectations**:
  - BGM arpeggiator loop schedules 160ms tone pulses through a dedicated `bgmGainNode`.
  - Master gain node reflects `0.70`, SFX gain node reflects `0.50`, BGM gain reflects `0.70 * 0.40`.
  - SFX playback does not interrupt or clip the active BGM radio stream.
  - When user clicks "Stop Radio", interval timers are immediately cleared (`clearInterval`), preventing memory leaks and orphaned oscillator blips.

### Scenario 5: Dual-Hall Navigation & Game Manual Inspection
- **Trigger**: Player switches between the Native Arcade Hall and Curated Emulation Vault.
- **Pre-Conditions**: Active view is the Native Arcade Hall showing 5 classic canvas games.
- **User Actions**:
  1. User clicks the "Curated Vault (126 Titles)" tab.
  2. Grid transitions to display retro console categories (PS1, GBA, NDS, SNES, Sega).
  3. User clicks the "Instructions" / "Manual" button on "Sonic The Hedgehog".
- **System Expectations**:
  - The native canvas stage pauses its render loop to conserve CPU/battery.
  - Category filters update badges: Sega shows 21 titles (correcting the legacy `GENESIS` discrepancy).
  - Manual modal renders authentic backstory, controls guide, objective, scoring table, and pro tips.
  - Focus trap confines Tab navigation inside the open modal; Escape key closes the modal and restores focus.

### Scenario 6: CRT Shader & Vintage Arcade Bezel Calibration
- **Trigger**: Player configures visual aesthetic to match a vintage 1980s arcade cabinet.
- **Pre-Conditions**: Default flat view with standard scanlines.
- **User Actions**:
  1. User toggles "Arcade Bezel Mode".
  2. User increases scanline density to `80%` and enables phosphor bloom.
  3. User toggles CRT curvature from flat to `Curved Glass`.
- **System Expectations**:
  - `#screenContainer` receives the class `bezel-mode`.
  - Vintage arcade cabinet frame artwork, marquees, and speaker grilles render around the 4:3 canvas viewport.
  - CSS variables `--scanline-opacity: 0.8` and `--phosphor-bloom: 1.2` update dynamically.
  - Settings are saved to `StorageService` and persist across page reloads.

---

## 5. Coverage Thresholds & Quality Gates

To ensure continuous high quality and prevent regressions throughout development, the following gates are enforced:

| Subsystem / Metric | Minimum Threshold | Enforcement Method | Failure Action |
|--------------------|-------------------|--------------------|----------------|
| `StorageService` Contract | 100% of Schema v4.0 fields | `tests/storage.test.js` | Block milestone merge |
| Migration Compatibility | 100% v1, v2.1, v3 schemas | `tests/storage.test.js` | Block milestone merge |
| Zero Data Loss Export/Import | 100% roundtrip state equality | `tests/storage.test.js` | Block milestone merge |
| Audio Parameter Safety | 100% frequency/gain clamped | `tests/audio.test.js` | Block milestone merge |
| Audio Headless Fallback | Zero crashes on null AudioContext | `tests/audio.test.js` | Block milestone merge |
| DOM Element Integrity | All 28 critical UI elements present | `tests/dom.test.js` | Block milestone merge |
| Modal Lifecycle & ARIA | All 6 modals accessible & closable | `tests/dom.test.js` | Block milestone merge |
| Test Suite Execution Speed | `< 1,500ms` for all unit suites | Node.js test runner | Fail CI / optimize |
| Runtime Console Warnings | 0 unhandled rejections / errors | Test runner global error listener | Fail CI |

---

## 6. How to Run Verification

### 6.1 Running All Automated Tests
```bash
npm test
```
*Equivalent command*:
```bash
node --test tests/*.test.js
```

### 6.2 Running Individual Test Suites
```bash
# Run Storage & Persistence Contract Suite
node --test tests/storage.test.js

# Run Web Audio & Procedural Sound Suite
node --test tests/audio.test.js

# Run DOM Layout & Accessibility Suite
node --test tests/dom.test.js
```
