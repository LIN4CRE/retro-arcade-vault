# Project: Retro Arcade Vault Enhancement

## Architecture
- **Application Paradigm**: Dual-Hall Arcade Web Application (Zero-dependency Vanilla HTML5 Canvas + Web Audio API + CSS3 Shaders). Runs 100% locally with zero external npm dependencies or network requirements.
- **Architectural Halls**:
  1. **Native Arcade Hall**: Standalone, offline-capable 60 FPS HTML5 Canvas arcade games (Snake, Pong, Breakout, Space Invaders, Asteroids) with procedural 8-bit sound effects, automated high score logging, and responsive controls.
  2. **Emulation Vault Hall**: Preserves the curated 126-game retro catalog with fixed metadata, repaired cover arts, and graceful offline/legal status fallbacks.
- **Core Subsystems**:
  - `Engine`: Fixed-timestep accumulator (60Hz) game loop, canvas viewport scaling, state transitions (`READY`, `PLAYING`, `PAUSED`, `GAMEOVER`, `VICTORY`).
  - `Audio`: Procedural Web Audio API synthesizer (square, triangle, sawtooth, and white noise buffer for drums/explosions), master/SFX/BGM gain staging, chiptune arpeggiator radio.
  - `Storage`: Centralized `StorageService` managing versioned schema v4.0, top-10 per-game high score leaderboards, 17+ trophies, playtime tracking, settings, keybindings, and resilient JSON export/import.
  - `Input`: Multi-input coordinator supporting keyboard (with configurable remapping), responsive on-screen virtual touch D-pad/action buttons, and Gamepad API.
  - `UI & Aesthetics`: CRT scanline shaders, tube curvature, vignette, retro arcade bezel toggle, color themes, search/filtering, and game instruction manuals.
  - `Automated Verification`: Zero-dependency test runner utilizing Node.js built-in `node:test` + `node:assert` and headless Google Chrome via DevTools Protocol.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Native Arcade Engine Core | Central 60 FPS canvas loop, fixed-timestep accumulator, game switching & lifecycle management | M2 | Survey 2 & 3 |
| 2 | Built-in Snake Arcade | Complete retro Snake with food spawns, speed ramping, 180° reversal prevention input queue, score & game over | M2 | Survey 1, 2 & 3 |
| 3 | Built-in Pong Classic | 1P vs AI paddle tennis, deflection angles, rally acceleration, match point scoring | M2 | Survey 1, 2 & 3 |
| 4 | Built-in Breakout Retro | 5-row colored destructible brick wall, ball-paddle physics, powerups, 3 lives, score & level clear | M2 | Survey 1, 2 & 3 |
| 5 | Built-in Space Invaders | Marching alien horde, escalating tempo, 4 destructible bunkers, alien bombs, mystery saucer, 3 lives | M2 | Survey 1, 2 & 3 |
| 6 | Built-in Asteroids Odyssey | Vector space shooter, 360° thrust/inertia physics, toroidal wrap-around, 3-tier splitting rocks, particles, hyperspace | M2 | Survey 1, 2 & 3 |
| 7 | StorageService & Schema v4.0 | Centralized storage, migration from older schemas, in-memory fallback, zero data loss | M1 | Survey 2 & 3 |
| 8 | Automated High Score Hall of Fame | Auto-submits on game over for top 10, 3-letter initials prompt, medals, timestamps, game filter | M3 | Survey 1 & 3 |
| 9 | Dual Library Navigation | Toggle between Native Arcade Classics and Curated Emulation Catalog with responsive cards & badges | M1 | Survey 1, 2 & 3 |
| 10 | Multi-Dimensional Filtering & Search | Filter games simultaneously by system, genre, difficulty (Easy/Med/Hard), era (70s/80s/90s), instant search (`/`) | M3 | Survey 1 & 3 |
| 11 | Game Instructions & Manual Modal | Modal presenting backstory, control keys, objective, scoring rules, and strategy tips per game | M3 | Survey 3 |
| 12 | CRT Display Shader Suite | Live CSS/SVG shader toggles: scanline opacity, phosphor bloom, vignette shadow, curvature sliders | M3 | Survey 1 & 2 |
| 13 | Vintage Arcade Bezel Mode | Toggle between modern frameless view and vintage arcade cabinet chassis with screen glare | M3 | Survey 1 & 2 |
| 14 | Retro Color Palette Themes | Theme switcher: Cyberpunk Neon, Classic Arcade Dark, Phosphor Green, Amber CRT | M3 | Survey 2 & 3 |
| 15 | Synthesized 8-Bit SFX Engine | Web Audio API procedural synthesis with square, triangle, saw, and noise buffer for authentic sound effects | M1 | Survey 1, 2 & 3 |
| 16 | Procedural Chiptune Radio | Background arpeggiator radio with selectable stations (Synthwave, 8-Bit Quest, Cyberpunk Arp), volume control | M1 | Survey 1 & 2 |
| 17 | Keybinding Customization Modal | Remappable keyboard controls (Up, Down, Left, Right, Action 1, Action 2, Pause, Restart) with localStorage persistence | M3 | Survey 2 & 3 |
| 18 | Responsive Virtual Touch D-Pad & Buttons | On-screen touch D-pad and action buttons for mobile, tablet, and mouse play | M3 | Survey 1, 2 & 3 |
| 19 | Gamepad API Integration | Direct hardware controller support (Xbox, PS, USB arcade stick) with connection indicator | M3 | Survey 1 & 2 |
| 20 | Unified Achievements & Trophy System | 17+ retro achievements with real-time trigger conditions, toast notifications, audio fanfare, correct X/17 counter | M3 | Survey 1 & 3 |
| 21 | Live Session Stopwatch & Playtime Stats | Functional `startSessionTimer()` stopwatch (`MM:SS`), persistent playtime accumulation, play count sorting | M1 | Survey 1 |
| 22 | Resilient JSON Export & Import Engine | Full backup & restore for all state (games, scores, trophies, stats, notes, settings, keybindings) with schema validation | M3 | Survey 1, 2 & 3 |
| 23 | Defect Remediation: Core Bug Fixes | Fix `checkPassiveTrophies()`, `COIN_DROP` call site, Sega `GENESIS`->`SEGA` category discrepancy, 15 broken 404 cover arts, default game deletion illusion | M1 | Survey 1 |
| 24 | Headline Fallback & Notice | Graceful status notice for blocked external games (COD Zombies 451) with direct external launcher popout | M1 | Survey 1 |
| 25 | Konami Code Easter Egg | Native keyboard listener (`↑ ↑ ↓ ↓ ← → ← → B A`) triggering retro fanfare and secret retro arcade perks | M3 | Survey 1 |
| 26 | Standalone Automated Verification Suite | Headless test suite (Node `node:test` + headless Chrome CDP runner) executing all unit, physics, storage, audio, and DOM checks | M4 | Survey 2 & 3 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Core Engine, Storage, Audio & Shell Foundation | StorageService (schema v4.0), procedural Web Audio API with noise buffer, Dual-Hall UI navigation, session timer & play count fixes, core bug fixes (10 defects, Sega category, 15 cover fallbacks), package.json & npm scripts | none | PLANNED |
| M2 | Native Arcade Games Engine & Classic Game Suite | ArcadeGame interface, 60 FPS fixed-timestep accumulator, complete implementations of Snake, Pong, Breakout, Space Invaders, and Asteroids with full gameplay loops | M1 | PLANNED |
| M3 | Arcade Experience, Controls, Customization & Gamification | Automated high score initials entry & leaderboard, customizable keybindings, touch virtual D-pad/buttons, Gamepad API, CRT shaders & bezel mode, themes, game manuals modal, 17+ trophies, export/import v4.0, Konami code | M1, M2 | PLANNED |
| M4 | Final Milestone: Full E2E Verification & Adversarial Hardening | Phase 1: Pass 100% of E2E test suite (Tiers 1-4). Phase 2: Adversarial coverage hardening (Tier 5) with Challenger stress tests | M1, M2, M3, E2E Test Suite | PLANNED |

## Interface Contracts
### `ArcadeGame` ↔ `VaultApi`
```typescript
export interface GameMetadata {
  id: string;
  title: string;
  system: string;
  category: "NATIVE_ARCADE";
  genre: "Arcade" | "Action" | "Shooter" | "Sports" | "Puzzle";
  difficulty: "Easy" | "Medium" | "Hard";
  era: "70s" | "80s" | "90s";
  emoji: string;
  instructions: {
    objective: string;
    controls: Record<string, string>;
    rules: string[];
    tips: string[];
  };
}

export type GameAction = "UP" | "DOWN" | "LEFT" | "RIGHT" | "ACTION_1" | "ACTION_2" | "PAUSE" | "RESTART";

export interface VaultApi {
  onScoreUpdate: (score: number) => void;
  onGameOver: (finalScore: number, stats: Record<string, any>) => void;
  onLevelComplete: (level: number, score: number) => void;
  onAchievementTrigger: (trophyId: string) => void;
  playSfx: (sfxName: string) => void;
}

export interface ArcadeGameInstance {
  readonly meta: GameMetadata;
  init(canvas: HTMLCanvasElement, vaultApi: VaultApi): void;
  start(): void;
  pause(): void;
  resume(): void;
  reset(): void;
  destroy(): void;
  handleInput(action: GameAction, isDown: boolean): void;
  tick(dt: number): void;
  render(ctx: CanvasRenderingContext2D): void;
  getState(): {
    score: number;
    lives?: number;
    level?: number;
    state: "READY" | "PLAYING" | "PAUSED" | "GAMEOVER" | "VICTORY";
    stats: Record<string, number>;
  };
}
```

### `StorageService` Schema v4.0
```typescript
export interface HighScoreRecord {
  id: string;
  gameId: string;
  gameTitle: string;
  initials: string; // 3 uppercase chars
  score: number;
  date: string;
  timestamp: number;
  details?: Record<string, any>;
}

export interface VaultBackupFile {
  schemaVersion: "4.0";
  exportedAt: string;
  highScores: HighScoreRecord[];
  achievements: string[];
  stats: {
    totalPlaytimeSec: number;
    playCountPerGame: Record<string, number>;
    highScorePerGame: Record<string, number>;
  };
  settings: Record<string, any>;
  keybindings: Record<string, string[]>;
  favorites: string[];
  recents: string[];
  customGames: any[];
  customNotes: Record<string, string>;
}
```

## Code Layout
```
retro_arcade_vault/
├── index.html                   # Primary entry point: cabinet UI shell, CRT stage, modals
├── package.json                 # Project configuration (scripts: test, serve)
├── README.md                    # Updated user documentation and features guide
├── 404.html                     # Fallback routing
├── manifest.webmanifest         # PWA configuration
├── assets/                      # Icons, banners, fallback assets
│   ├── icon.svg
│   ├── banner.svg
│   └── covers/                  # Local fallback covers for broken remote URLs
├── src/
│   ├── core/                    # Engine & shared subsystems
│   │   ├── storage.js           # StorageService & schema v4.0
│   │   ├── audio.js             # Web Audio procedural synthesis & radio
│   │   ├── input.js             # Keyboard, virtual D-pad, gamepad coordinator
│   │   └── achievements.js      # Trophy evaluation & notification
│   ├── games/                   # Native HTML5 Canvas arcade games
│   │   ├── game-base.js         # Base class & contracts
│   │   ├── snake.js             # Neon Snake
│   │   ├── pong.js              # Cyber Pong
│   │   ├── breakout.js          # Brick Smasher
│   │   ├── space-invaders.js    # Space Invaders
│   │   └── asteroids.js         # Asteroids Odyssey
│   └── ui/                      # UI components & aesthetics
│       ├── crt-shaders.js       # Scanlines, bloom, vignette, curvature
│       ├── leaderboard-modal.js # High score initials entry & top 10
│       ├── keybindings-modal.js # Keyboard remapping
│       ├── manuals-modal.js     # Game instructions & strategy
│       └── backup-modal.js      # Schema v4.0 export/import
├── tests/                       # Automated verification test suite
│   ├── test-harness.js          # Canvas & Audio mocks for headless testing
│   ├── storage.test.js          # Schema v4.0 & data loss prevention tests
│   ├── audio.test.js            # Audio engine math & parameter clamp tests
│   ├── input.test.js            # Keybindings & touch action mapping tests
│   ├── games.test.js            # Physics, state loops & collision tests for all 5 games
│   ├── dom.test.js              # DOM layout, modal rendering & accessibility tests
│   └── e2e-browser.test.js      # Headless Chrome DevTools Protocol end-to-end runner
└── scripts/
    └── serve.js                 # Zero-dependency local Node static HTTP server
```
