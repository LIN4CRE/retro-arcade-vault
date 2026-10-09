<p align="center">
  <img src="assets/banner.svg" alt="Retro Arcade Vault Banner" width="100%">
</p>

<p align="center">
  <a href="https://lin4cre.github.io/retro-arcade-vault/"><img src="https://img.shields.io/badge/Live%20Demo-Play%20Now-00ffcc?style=for-the-badge&logo=googlechrome&logoColor=black" alt="Live Demo"></a>
  <a href="#-curated-game-library-124-titles"><img src="https://img.shields.io/badge/Games%20Preloaded-124%20Titles-ff2a85?style=for-the-badge&logo=gamepad" alt="Games Preloaded"></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge" alt="License"></a>
  <img src="https://img.shields.io/badge/Gamepad-API%20Supported-00e5ff?style=for-the-badge&logo=target" alt="Gamepad Supported">
  <img src="https://img.shields.io/badge/Stack-Vanilla%20HTML5%2FCSS3%2FJS-ffd000?style=for-the-badge&logo=html5&logoColor=black" alt="Vanilla Stack">
  <img src="https://img.shields.io/badge/Version-v4.1%20Operator-00ffcc?style=for-the-badge" alt="v4.1 Operator">
</p>

---

## 📖 Overview

**Retro Arcade Vault** is a standalone neon arcade cabinet that lives in your browser. Insert a coin, pick from **124 hand-curated classics** across PlayStation 1, Game Boy Advance, Nintendo DS, Super Nintendo, and Sega Genesis, and play instantly — no install, no build step, no framework.

Zero dependencies. One HTML file, a handful of assets, and your save data in `localStorage`.

👉 **Play Live**: **[https://lin4cre.github.io/retro-arcade-vault/](https://lin4cre.github.io/retro-arcade-vault/)**

---

## ✨ Features — Vault v4.1 Operator's Cut

### New in v4.1
- **Operator's Lab**: Themes (Neon / Phosphor / Amber / Ice), radio volume, 3-letter operator tag, and a decluttered header. <kbd>Ctrl</kbd>+<kbd>,</kbd>
- **Deep links**: Every game is `#play/chrono-trigger-snes`. Share copies a cabinet URL; arriving via hash unlocks *Linked Cabinet*.
- **Collection meter + Continue card**: See how much of the 124 you've actually launched; resume last session in one tap.
- **Radio ducks in-game**: Chiptune BGM drops under the emulator so it doesn't fight the soundtrack (toggle in Lab).
- **Cabinet toasts** instead of `alert()` / `confirm()` — wipe memory, restore backup, and delete custom games stay in-universe.
- **22 trophies**: *Floor Manager*, *Linked Cabinet*, *Cabinet Painter*, *Ten Credits* join the board.

### From v4.0
- **Insert Coin boot**: CRT scanline splash. Click / Enter / Space to start. Last game restores when you return.
- **Command palette**: Press <kbd>Ctrl</kbd>+<kbd>K</kbd> (or <kbd>⌘</kbd>+<kbd>K</kbd>) to jump to any title, system, or publisher.
- **Box-art binder**: Toggle the library from a list into a game-store wall of covers.
- **Game of the Day**: A deterministic daily pick on the cabinet, with its own trophy.
- **Prize-wheel shuffle**: Random doesn't snap — titles spin like a slot machine before they land.
- **CONTINUE?**: Go idle for 3 minutes mid-session and the cabinet asks if you want to continue (9…8…7…), then drops into attract mode with cycling box art.
- **Konami code**: ↑ ↑ ↓ ↓ ← → ← → B A unlocks *Contra Kid*, a rainbow cabinet, and 30 lives of attitude.
- **Live cabinet stats**: Launches, total playtime, favorites, and trophy count on a LED-style strip, plus a scrolling marquee.
- **Real genre tags**: Every title is tagged (RPG, Action, Pokémon, Fighting, Racing, Adventure, Strategy) so chips actually filter.
- **Smarter search**: Title, system, publisher, year, and genre. Press <kbd>/</kbd> to focus.
- **Honest backups**: Export/import round-trips notes, trophies, high scores, *and* playtime.
- **Shaders that do something**: Scanline / bloom / vignette / curvature sliders write CSS variables the CRT overlays actually read.
- **Trophies that match the catalog**: Unlock rules are real (3 unique sound pads, all 4 filters, etc.).
- **Installable PWA**: `manifest.webmanifest` + cabinet icon. Add to home screen on mobile.
- **Accessibility pass**: Skip link, `:focus-visible`, `prefers-reduced-motion`, live announcements, zoomable viewport.

### Cabinet systems (still here, now wired)
- Universal fullscreen & mobile immersive mode (<kbd>F11</kbd>, double-tap bezel, auto-dim exit).
- Off-canvas slide-over library on tablets/phones.
- 3-tab Game Compendium: lore / secrets / personal logbook — every game has year, publisher, genre, and a synopsis.
- 10-pad procedural sound test (<kbd>1</kbd>–<kbd>0</kbd>). Sound Engineer unlocks after **3** unique pads.
- Hall of Fame ledger with 3-letter initials.
- CRT calibrator + 4 display filters. Shader Wizard requires cycling **all four**.
- Chiptune radio: Synthwave / 8-Bit Quest / Cyberpunk Arp.
- Session stopwatch + persistent per-game playtime and launch counts (these actually increment now).
- Curved CRT bezel, theater mode, CRT power-on beam.
- Live Gamepad tester (Xbox / PlayStation / generic).
- JSON backup & restore of the whole profile.

> Games are streamed from [RetroGames.cc](https://www.retrogames.cc/) embeds. This repo is a frontend cabinet, not a ROM host. Use an ad blocker (uBlock Origin / Brave) if you want a cleaner canvas.

---

## 🕹️ Controls Reference Guide

Click the **🕹️ CONTROLS** button on the top bar at any time to inspect mappings and test your controller:

### Keyboard Mappings (RetroGames.cc Default)
| Action / Button | RetroGames Keyboard Key | Gamepad (Standard Layout) |
| :--- | :---: | :---: |
| **D-Pad Up / Down / Left / Right** | <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> Arrow Keys | D-Pad / Left Analog Stick |
| **A / Cross (✕) / Confirm** | <kbd>X</kbd> | Bottom Face Button (<kbd>A</kbd> / <kbd>✕</kbd>) |
| **B / Circle (○) / Cancel** | <kbd>Z</kbd> | Right Face Button (<kbd>B</kbd> / <kbd>○</kbd>) |
| **X / Square (□)** | <kbd>S</kbd> | Left Face Button (<kbd>X</kbd> / <kbd>□</kbd>) |
| **Y / Triangle (△)** | <kbd>A</kbd> | Top Face Button (<kbd>Y</kbd> / <kbd>△</kbd>) |
| **Left Shoulder (L1 / L)** | <kbd>Q</kbd> | Left Bumper / Trigger (<kbd>LB</kbd> / <kbd>L1</kbd>) |
| **Right Shoulder (R1 / R)** | <kbd>W</kbd> | Right Bumper / Trigger (<kbd>RB</kbd> / <kbd>R1</kbd>) |
| **Select / Back** | <kbd>Shift</kbd> | Back / View / Share |
| **Start / Pause** | <kbd>Enter</kbd> | Start / Menu / Options |

### Cabinet & Emulator Hotkeys
| Action | Hotkey / Control |
| :--- | :--- |
| **Quick Search Focus** | <kbd>/</kbd> |
| **Jump / command palette** | <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> |
| **Operator's Lab** | <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>,</kbd> |
| **Shortcut cheat sheet** | <kbd>?</kbd> |
| **Close any overlay / exit theater / exit fullscreen** | <kbd>Esc</kbd> |
| **Save State** | <kbd>Shift</kbd> + <kbd>F2</kbd> (in emulator) |
| **Load State** | <kbd>Shift</kbd> + <kbd>F4</kbd> (in emulator) |
| **Pause Emulator** | <kbd>P</kbd> |
| **Fullscreen** | <kbd>F11</kbd> or ⛶ button |
| **Cycle Display Filters** | 📺 Filter (Clean HD → CRT Arcade → Trinitron Glow → LCD Grid) |
| **Cycle Aspect Ratio** | 📐 RATIO (Auto → 4:3 → 3:2 → 16:9) |
| **Sound test pads** | <kbd>1</kbd>–<kbd>0</kbd> while Sound Test is open |
| **Konami code** | ↑ ↑ ↓ ↓ ← → ← → <kbd>B</kbd> <kbd>A</kbd> |

> [!TIP]
> **Ad-Free Tip**: To bypass third-party video ads inside game embeds, use an ad-blocker like **uBlock Origin** or the **Brave Browser**, which blocks ad server requests before they reach the game canvas.

---

## 🕹️ Curated Game Library (124 Titles)

<details open>
<summary><b>🎮 PlayStation 1 (37 Titles)</b></summary>

| Game Title | System | Cover Artwork |
| :--- | :--- | :---: |
| ⚔️ **Vandal Hearts** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Vandal%20Hearts%20(USA).png) |
| ⚔️ **Vandal Hearts II** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Vandal%20Hearts%20II%20(USA).png) |
| ⚔️ **Final Fantasy Tactics** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20Tactics%20(USA).png) |
| ⚔️ **Final Fantasy VII (Disc 1)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20VII%20(USA).png) |
| ⚔️ **Final Fantasy VII (Disc 2)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20VII%20(USA).png) |
| ⚔️ **Final Fantasy Origins (FF I & II)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20Origins%20(USA).png) |
| ⚔️ **Final Fantasy Chronicles (FF IV & Chrono Trigger)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20Chronicles%20(USA).png) |
| ⏳ **Chrono Cross** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Chrono%20Cross%20(USA).png) |
| 🛡️ **Suikoden II** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Suikoden%20II%20(USA).png) |
| 🦇 **Castlevania: Symphony of the Night** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Castlevania%20-%20Symphony%20of%20the%20Night%20(USA).png) |
| 🛡️ **Xenogears** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Xenogears%20(USA).png) |
| 🛡️ **Breath of Fire III** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Breath%20of%20Fire%20III%20(USA).png) |
| 🛡️ **Breath of Fire IV** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Breath%20of%20Fire%20IV%20(USA).png) |
| 🦖 **Digimon World** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Digimon%20World%20(USA).png) |
| 🦖 **Digimon World 2** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Digimon%20World%202%20(USA).png) |
| 🦖 **Digimon World 3** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Digimon%20World%203%20(USA).png) |
| 🦖 **Digimon Digital Card Battle** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Digimon%20Digital%20Card%20Battle%20(USA).png) |
| 🃏 **Yu-Gi-Oh! Forbidden Memories (15 Card Mod)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Yu-Gi-Oh!%20-%20Forbidden%20Memories%20(USA).png) |
| 🥊 **Tekken 3** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Tekken%203%20(USA).png) |
| 💎 **Crash Bandicoot** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Crash%20Bandicoot%20(USA).png) |
| 💎 **Crash Team Racing (CTR)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Crash%20Team%20Racing%20(USA).png) |
| 💎 **Spyro the Dragon** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Spyro%20the%20Dragon%20(USA).png) |
| 💥 **Metal Gear Solid (Disc 1)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Metal%20Gear%20Solid%20(USA).png) |
| 🛹 **Tony Hawk's Pro Skater** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Tony%20Hawk%27s%20Pro%20Skater%20(USA).png) |
| 🧬 **Parasite Eve** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Parasite%20Eve%20(USA).png) |
| 🗡️ **Final Fantasy VIII (Disc 1)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20VIII%20(USA).png) |
| 🎭 **Final Fantasy IX (Disc 1)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20IX%20(USA).png) |
| 🏰 **Suikoden** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Suikoden%20(USA).png) |
| 🤖 **Front Mission 3** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Front%20Mission%203%20(USA).png) |
| 🛡️ **Tactics Ogre: Let Us Cling Together** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Tactics%20Ogre%20(USA).png) |
| 🧭 **Grandia (Disc 1)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Grandia%20(USA)%20(Disc%201).png) |
| ✨ **Star Ocean: The Second Story** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Star%20Ocean%20-%20The%20Second%20Story%20(USA)%20(Disc%201).png) |
| 🐉 **The Legend of Dragoon (Disc 1)** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Legend%20of%20Dragoon%2C%20The%20(USA)%20(Disc%201).png) |
| 🪶 **Valkyrie Profile** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Valkyrie%20Profile%20(USA)%20(Disc%201).png) |
| 🌙 **Lunar: Silver Star Story Complete** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Lunar%20-%20Silver%20Star%20Story%20Complete%20(USA)%20(Disc%201).png) |
| 🤠 **Wild Arms** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Wild%20Arms%20(USA).png) |
| 🗡️ **Alundra** | PlayStation 1 | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Alundra%20(USA).png) |

</details>

<details>
<summary><b>⚡ Game Boy Advance (28 Titles)</b></summary>

| Game Title | System | Cover Artwork |
| :--- | :--- | :---: |
| ⚡ **Pokemon Quetzal (Alpha 0.6.9)** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20Emerald%20Version%20(USA%2C%20Europe).png) |
| ⚡ **Pokemon Hyper Emerald v5.7 Lost Artifacts** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20Emerald%20Version%20(USA%2C%20Europe).png) |
| ⚡ **Pokemon Radical Red v4.1** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20FireRed%20Version%20(USA%2C%20Europe).png) |
| ⚡ **Pokemon Unbound v2.1.1.1** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20FireRed%20Version%20(USA%2C%20Europe).png) |
| ⚡ **Pokemon Emerald Rogue (Vanilla 1.2.0)** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20Emerald%20Version%20(USA%2C%20Europe).png) |
| ⚔️ **Final Fantasy Tactics Advance** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Final%20Fantasy%20Tactics%20Advance%20(USA).png) |
| 🛡️ **Golden Sun** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Golden%20Sun%20(USA%2C%20Europe).png) |
| 🛡️ **Golden Sun: The Lost Age** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Golden%20Sun%20-%20The%20Lost%20Age%20(USA%2C%20Europe).png) |
| 🦇 **Castlevania: Aria of Sorrow** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Castlevania%20-%20Aria%20of%20Sorrow%20(USA).png) |
| ⚔️ **Fire Emblem: The Blazing Blade** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Fire%20Emblem%20(USA%2C%20Australia).png) |
| 🤖 **Mega Man Battle Network 6 - Cybeast Falzar** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Mega%20Man%20Battle%20Network%206%20-%20Cybeast%20Falzar%20(USA).png) |
| 🚀 **Metroid Fusion** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Metroid%20Fusion%20(USA%2C%20Australia).png) |
| 🍄 **Mario Kart: Super Circuit XXL** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Mario%20Kart%20-%20Super%20Circuit%20(USA).png) |
| 🎖️ **Advance Wars** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Advance%20Wars%20(USA%2C%20Australia).png) |
| 🎖️ **Advance Wars 2: Black Hole Rising** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Advance%20Wars%202%20-%20Black%20Hole%20Rising%20(USA%2C%20Australia).png) |
| ⚡ **Super Street Fighter II Turbo Revival** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Super%20Street%20Fighter%20II%20Turbo%20Revival%20(USA).png) |
| ⚡ **Mega Man Battle Network 3 Blue** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Mega%20Man%20Battle%20Network%203%20-%20Blue%20Version%20(USA).png) |
| 🔥 **Fire Emblem: The Sacred Stones** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Fire%20Emblem%20-%20The%20Sacred%20Stones%20(USA%2C%20Australia).png) |
| ⚔️ **Tactics Ogre: The Knight of Lodis** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Tactics%20Ogre%20-%20The%20Knight%20of%20Lodis%20(USA).png) |
| 🗡️ **The Legend of Zelda: The Minish Cap** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Legend%20of%20Zelda%2C%20The%20-%20The%20Minish%20Cap%20(USA).png) |
| 🍄 **Mario & Luigi: Superstar Saga** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Mario%20_%20Luigi%20-%20Superstar%20Saga%20(USA).png) |
| 🗡️ **Sword of Mana** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Sword%20of%20Mana%20(USA%2C%20Australia).png) |
| 🔮 **Final Fantasy V Advance** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Final%20Fantasy%20V%20Advance%20(USA).png) |
| 🌕 **Castlevania: Circle of the Moon** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Castlevania%20-%20Circle%20of%20the%20Moon%20(USA).png) |
| 🦇 **Castlevania: Harmony of Dissonance** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Castlevania%20-%20Harmony%20of%20Dissonance%20(USA).png) |
| ⚡ **Mega Man Zero** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Mega%20Man%20Zero%20(USA%2C%20Europe).png) |
| 🦔 **Sonic Advance** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Sonic%20Advance%20(USA)%20(En%2CJa).png) |
| ⭐ **Kirby & The Amazing Mirror** | Game Boy Advance | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Kirby%20_%20The%20Amazing%20Mirror%20(USA).png) |

</details>

<details>
<summary><b>📜 Nintendo DS (21 Titles)</b></summary>

| Game Title | System | Cover Artwork |
| :--- | :--- | :---: |
| 🧩 **Might & Magic - Clash of Heroes** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Might%20%26%20Magic%20-%20Clash%20of%20Heroes%20(USA)%20(En%2CFr%2CEs).png) |
| ⏳ **Chrono Trigger (DS Edition)** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Chrono%20Trigger%20(USA)%20(En%2CFr).png) |
| ⏳ **Radiant Historia** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Radiant%20Historia%20(USA).png) |
| ⚔️ **Final Fantasy Tactics A2: Grimoire of the Rift** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Final%20Fantasy%20Tactics%20A2%20-%20Grimoire%20of%20the%20Rift%20(USA)%20(En%2CFr%2CEs).png) |
| 🦇 **Castlevania: Dawn of Sorrow** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Castlevania%20-%20Dawn%20of%20Sorrow%20(USA).png) |
| 🦇 **Castlevania: Order of Ecclesia** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Castlevania%20-%20Order%20of%20Ecclesia%20(USA)%20(En%2CFr).png) |
| ⚡ **Pokemon - Platinum Version** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Pokemon%20-%20Platinum%20Version%20(USA).png) |
| ⚡ **Pokemon - HeartGold Version** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Pokemon%20-%20HeartGold%20Version%20(USA).png) |
| 🛡️ **Dragon Quest IX: Sentinels of the Starry Skies** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Dragon%20Quest%20IX%20-%20Sentinels%20of%20the%20Starry%20Skies%20(USA)%20(En%2CFr%2CEs).png) |
| 🛡️ **Dragon Quest V: Hand of the Heavenly Bride** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Dragon%20Quest%20V%20-%20Hand%20of%20the%20Heavenly%20Bride%20(USA)%20(En%2CFr%2CEs).png) |
| 🛡️ **Golden Sun: Dark Dawn** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Golden%20Sun%20-%20Dark%20Dawn%20(USA)%20(En%2CEs).png) |
| ⚖️ **Phoenix Wright: Ace Attorney** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Phoenix%20Wright%20-%20Ace%20Attorney%20(USA).png) |
| 🍄 **New Mario Kart DS** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Mario%20Kart%20DS%20(USA).png) |
| 🎖️ **Advance Wars: Dual Strike** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Advance%20Wars%20-%20Dual%20Strike%20(USA).png) |
| 🎖️ **Advance Wars: Days of Ruin** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Advance%20Wars%20-%20Days%20of%20Ruin%20(USA)%20(En%2CFr%2CEs).png) |
| 🎧 **The World Ends With You** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/The%20World%20Ends%20with%20You%20(USA).png) |
| 👑 **Dragon Quest IV: Chapters of the Chosen** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Dragon%20Quest%20IV%20-%20Chapters%20of%20the%20Chosen%20(USA)%20(En%2CFr%2CEs).png) |
| 🏰 **Dragon Quest VI: Realms of Revelation** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Dragon%20Quest%20VI%20-%20Realms%20of%20Revelation%20(USA)%20(En%2CFr%2CEs).png) |
| 🐢 **Mario & Luigi: Bowser's Inside Story** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Mario%20_%20Luigi%20-%20Bowser%27s%20Inside%20Story%20(USA)%20(En%2CFr%2CEs).png) |
| ⏳ **Mario & Luigi: Partners in Time** | Nintendo DS | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Mario%20_%20Luigi%20-%20Partners%20in%20Time%20(USA).png) |

</details>

<details>
<summary><b>🍄 Super Nintendo / SNES (18 Titles)</b></summary>

| Game Title | System | Cover Artwork |
| :--- | :--- | :---: |
| ⏳ **Chrono Trigger** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Chrono%20Trigger%20(USA).png) |
| ⚔️ **Final Fantasy III (VI)** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Final%20Fantasy%20III%20(USA).png) |
| 🍄 **Super Mario World** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Mario%20World%20(USA).png) |
| 🚀 **Super Metroid** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Metroid%20(Japan%2C%20USA)%20(En%2CJa).png) |
| 🍄 **EarthBound** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/EarthBound%20(USA).png) |
| 🍄 **Secret of Mana** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Secret%20of%20Mana%20(USA).png) |
| 🍄 **Super Mario RPG: Legend of the Seven Stars** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Mario%20RPG%20-%20Legend%20of%20the%20Seven%20Stars%20(USA).png) |
| 🗡️ **The Legend of Zelda: A Link to the Past** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Legend%20of%20Zelda%2C%20The%20-%20A%20Link%20to%20the%20Past%20(USA).png) |
| 🤖 **Mega Man X** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Mega%20Man%20X%20(USA).png) |
| 🍄 **Super Mario World 2: Yoshi's Island** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Mario%20World%202%20-%20Yoshi%27s%20Island%20(USA).png) |
| 🍄 **TMNT IV: Turtles in Time** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Teenage%20Mutant%20Ninja%20Turtles%20IV%20-%20Turtles%20in%20Time%20(USA).png) |
| 🍄 **Donkey Kong Country** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Donkey%20Kong%20Country%20(USA).png) |
| 🍄 **Donkey Kong Country 2: Diddy's Kong Quest** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Donkey%20Kong%20Country%202%20-%20Diddy%27s%20Kong%20Quest%20(USA)%20(En%2CFr).png) |
| 🍄 **Super Mario All-Stars Enhanced** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Mario%20All-Stars%20(USA).png) |
| 🌍 **Terranigma** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Terranigma%20(Europe).png) |
| 🐕 **Secret of Evermore** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Secret%20of%20Evermore%20(USA).png) |
| 💎 **Lufia II: Rise of the Sinistrals** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Lufia%20II%20-%20Rise%20of%20the%20Sinistrals%20(USA).png) |
| 👑 **Ogre Battle: The March of the Black Queen** | Super Nintendo | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Ogre%20Battle%20-%20The%20March%20of%20the%20Black%20Queen%20(USA).png) |

</details>

<details>
<summary><b>🦔 Sega Genesis (21 Titles)</b></summary>

| Game Title | System | Cover Artwork |
| :--- | :--- | :---: |
| 🦔 **Sonic The Hedgehog** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Sonic%20The%20Hedgehog%20(USA%2C%20Europe).png) |
| 🦔 **Sonic The Hedgehog 2** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Sonic%20The%20Hedgehog%202%20(World).png) |
| 🦔 **Sonic & Knuckles + Sonic 3** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Sonic%20%26%20Knuckles%20(World).png) |
| ⚔️ **Shining Force** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Shining%20Force%20(USA).png) |
| ⚔️ **Shining Force II** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Shining%20Force%20II%20(USA).png) |
| 🛡️ **Phantasy Star IV** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Phantasy%20Star%20IV%20(USA).png) |
| 🥊 **Streets of Rage 2** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Streets%20of%20Rage%202%20(USA).png) |
| 💥 **Gunstar Heroes** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Gunstar%20Heroes%20(USA).png) |
| 🦇 **Castlevania: Bloodlines** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Castlevania%20-%20Bloodlines%20(USA).png) |
| 🛡️ **Beyond Oasis** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Beyond%20Oasis%20(USA).png) |
| 🥷 **Shinobi III: Return of the Ninja Master** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Shinobi%20III%20-%20Return%20of%20the%20Ninja%20Master%20(USA).png) |
| 🌀 **Golden Axe** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Golden%20Axe%20(World).png) |
| 🎨 **Comix Zone** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Comix%20Zone%20(USA).png) |
| 🌀 **Earthworm Jim** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Earthworm%20Jim%20(USA).png) |
| 🌀 **Earthworm Jim 2** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Earthworm%20Jim%202%20(USA).png) |
| 🌀 **Disney's Aladdin** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Disney%27s%20Aladdin%20(USA).png) |
| 🌀 **Road Rash II** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Road%20Rash%20II%20(USA%2C%20Europe).png) |
| 🥊 **Streets of Rage 3** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Streets%20of%20Rage%203%20(USA).png) |
| ⚔️ **Crusader of Centy** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Crusader%20of%20Centy%20(USA).png) |
| 🗺️ **Landstalker: The Treasures of King Nole** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Landstalker%20(USA).png) |
| 🕯️ **Shining in the Darkness** | Sega Genesis | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Shining%20in%20the%20Darkness%20(USA%2C%20Europe).png) |

</details>

---

## 🚀 Getting Started

### Play locally
Open `index.html` in Chrome, Edge, Firefox, Brave, or Safari. No server, no install.

If a browser blocks `file://` embeds, serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

### Host with GitHub Pages
1. Fork or clone:
   ```bash
   git clone https://github.com/LIN4CRE/retro-arcade-vault.git
   ```
2. Repo **Settings → Pages → Deploy from a branch → `main` / `/` (root)**.
3. The cabinet is live in about a minute.

### Install as an app
On Chromium mobile/desktop, **Install** / **Add to Home Screen**. The PWA launches standalone with the neon cabinet icon.

---

## 🛠️ Project layout

| Path | What |
| :--- | :--- |
| `index.html` | The whole cabinet: UI, 124-game library, Web Audio, trophies |
| `assets/banner.svg` | README / Open Graph banner |
| `assets/icon.svg` | Favicon / PWA / apple-touch icon |
| `manifest.webmanifest` | Add-to-home-screen manifest |
| `404.html` | GitHub Pages bounce back to the cabinet |

Profile data (favorites, notes, playtime, trophies, scores) lives in `localStorage` under `retro_vault_*` keys. **Backup** downloads a JSON snapshot; **Restore** reads it back.

---

## ⚖️ License
This project is open-source under the [MIT License](LICENSE). Game ROMs and artwork remain the property of their original publishers; embeds are provided by third-party hosts.
