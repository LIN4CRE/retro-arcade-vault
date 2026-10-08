<p align="center">
  <img src="assets/banner.svg" alt="Retro Arcade Vault Banner" width="100%">
</p>

<p align="center">
  <a href="https://lin4cre.github.io/retro-arcade-vault/"><img src="https://img.shields.io/badge/Live%20Demo-Play%20Now-00ffcc?style=for-the-badge&logo=googlechrome&logoColor=black" alt="Live Demo"></a>
  <a href="#-curated-game-library"><img src="https://img.shields.io/badge/Games%20Preloaded-87%20Titles-ff2a85?style=for-the-badge&logo=gamepad" alt="Games Preloaded"></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge" alt="License"></a>
  <img src="https://img.shields.io/badge/Gamepad-API%20Supported-00e5ff?style=for-the-badge&logo=target" alt="Gamepad Supported">
  <img src="https://img.shields.io/badge/Stack-Vanilla%20HTML5%2FCSS3%2FJS-ffd000?style=for-the-badge&logo=html5&logoColor=black" alt="Vanilla Stack">
</p>

---

## 📖 Overview

**Retro Arcade Vault** is an ultra-fast, standalone retro gaming hub and emulator frontend designed for instant browser play. Preloaded with **87 hand-curated classics** across PlayStation 1, Game Boy Advance, Nintendo DS, Super Nintendo, and Sega Genesis.

Zero installation required. Zero dependencies. Completely self-contained in a single responsive web client with zero build pipelines.

👉 **Play Live**: **[https://lin4cre.github.io/retro-arcade-vault/](https://lin4cre.github.io/retro-arcade-vault/)**

---

## ✨ Features & Upgrades

### 🎮 Quality & Controls Improvements
- **🕹️ Native Gamepad API & Live Visual Tester**: Plug in any USB or Bluetooth controller (Xbox Wireless, DualShock/DualSense, 8BitDo, Nintendo Switch Pro). The arcade detects your controller in real time, displays its name in the top badge, and features a **Live Interactive Controller Tester** inside the Controls modal that illuminates every button press and thumbstick tilt in real-time.
- **🎯 100% Dedicated Controller Gameplay**: Full controller pass-through directly to emulators without window event hijacking or accidental library switching during in-game movement.
- **📺 Multi-Shader Retro Display Filters**: Cycle between 4 authentic visual display modes with one click:
  - **Clean HD**: Crisp digital, unfiltered pixel-perfect presentation.
  - **CRT Arcade**: Classic arcade scanlines with RGB phosphor mask.
  - **CRT Trinitron Glow**: Scanlines with tube bloom, vignette, and phosphor warmth.
  - **Handheld LCD Grid**: Authentic pixel matrix grid designed for Game Boy Advance & Nintendo DS.
- **🎭 Cinema / Theater Focus Mode**: Dedicated Theater button that smoothly hides the header and sidebar, centering the arcade screen with enhanced full-width ambient backlighting.
- **⚡ Authentic CRT Power-On Animation**: Authentic 200ms horizontal beam-on flare and degauss harmonic chime whenever switching games.
- **⚔️ Smart Genre & Franchise Filtering**: Quick one-click filter chips for **⚔️ RPG & Tactics**, **⚡ Action / Platform**, **⚡ Pokémon**, **🥊 Fighting**, and **🏎️ Racing**.
- **↕️ Library Sorting & Play Tracker**: Sort by Curated, Title (A-Z / Z-A), System, or **🔥 Most Played** with persistent play count badges.
- **💾 Library Backup & Restore**: Export your customized favorites and game library to `.json` or restore anytime.
- **📖 On-Screen Controls Reference Modal**: Integrated `[🕹️ CONTROLS]` reference dialog documenting default keyboard mappings, gamepad equivalents, and emulator hotkeys across all 5 console platforms.
- **📐 Pixel-Perfect Aspect Ratio Switcher**: Automatically adjusts display ratios depending on console (GBA 3:2, PS1/SNES/Sega 4:3, or manual 16:9).
- **🎲 Instant Shuffle / Random Game Picker**: Click **🎲 Shuffle** to launch an instant surprise classic from the library.
- **⭐ Favorites & Recents**: Pin your favorite titles with the ⭐ button. Filter on the fly with **⭐ Favorites** or **🕒 Recently Played** quick-pills. Persisted locally in `localStorage`.
- **🌈 Dynamic Ambient Bias Lighting**: Immersion halo glow behind the CRT bezel that dynamically shifts tint to match the active console's iconic aesthetic (PlayStation Blue, GBA Purple, DS Teal, SNES Violet, Sega Crimson).
- **🔊 8-Bit Web Audio Synthesizer**: Built-in procedural chiptune sound effects for menu interactions, game launching, arpeggio starring, and degauss beam audio.
- **🛡️ Anti-Popup Iframe Sandboxing**: Restricts external embeds to stop intrusive popups, tab hijacking, and click-redirects.

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

### Emulator Hotkeys & Shortcuts
| Action | Hotkey / Control |
| :--- | :--- |
| **Save State** | <kbd>Shift</kbd> + <kbd>F2</kbd> (in emulator) |
| **Load State** | <kbd>Shift</kbd> + <kbd>F4</kbd> (in emulator) |
| **Pause Emulator** | <kbd>P</kbd> |
| **Toggle Theater Mode** | <kbd>🎭 Theater</kbd> Button / <kbd>Esc</kbd> to exit |
| **Fullscreen** | <kbd>⛶ Fullscreen</kbd> Button |
| **Cycle Display Filters** | <kbd>📺 Filter</kbd> Button (Clean HD → CRT Arcade → Trinitron Glow → LCD Grid) |
| **Cycle Aspect Ratio** | <kbd>📐 RATIO</kbd> Button (Auto → 4:3 → 3:2 → 16:9) |
| **Sound FX** | <kbd>🔊 SFX</kbd> Button (Toggle audio synthesizer) |

> [!TIP]
> **Ad-Free Tip**: To bypass third-party video ads inside game embeds, use an ad-blocker like **uBlock Origin** or the **Brave Browser**, which blocks ad server requests before they reach the game canvas.

---

## 🕹️ Curated Game Library (87 Titles)

<details open>
<summary><b>🎮 PlayStation 1 (24 Titles)</b></summary>

| Game Title | Genre | Artwork |
| :--- | :--- | :---: |
| **Vandal Hearts** | Tactical RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Vandal%20Hearts%20(USA).png) |
| **Vandal Hearts II** | Tactical RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Vandal%20Hearts%20II%20(USA).png) |
| **Final Fantasy Tactics** | Tactical RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20Tactics%20(USA).png) |
| **Final Fantasy VII (Disc 1)** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20VII%20(USA).png) |
| **Final Fantasy VII (Disc 2)** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20VII%20(USA).png) |
| **Final Fantasy Origins (FF I & II)** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20Origins%20(USA).png) |
| **Final Fantasy Chronicles (FF IV & Chrono Trigger)** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Final%20Fantasy%20Chronicles%20(USA).png) |
| **Chrono Cross** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Chrono%20Cross%20(USA).png) |
| **Suikoden II** | JRPG / Strategy | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Suikoden%20II%20(USA).png) |
| **Castlevania: Symphony of the Night** | Metroidvania / Action | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Castlevania%20-%20Symphony%20of%20the%20Night%20(USA).png) |
| **Xenogears (Disc 1)** | Mecha JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Xenogears%20(USA).png) |
| **Breath of Fire III** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Breath%20of%20Fire%20III%20(USA).png) |
| **Breath of Fire IV** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Breath%20of%20Fire%20IV%20(USA).png) |
| **Digimon World** | Monster Raising / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Digimon%20World%20(USA).png) |
| **Digimon World 2** | Dungeon Crawler / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Digimon%20World%202%20(USA).png) |
| **Digimon World 3** | Turn-based RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Digimon%20World%203%20(USA).png) |
| **Digimon Digital Card Battle** | Card Battler | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Digimon%20Digital%20Card%20Battle%20(USA).png) |
| **Yu-Gi-Oh! Forbidden Memories (15 Card Mod)** | Card Battler | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Yu-Gi-Oh!%20-%20Forbidden%20Memories%20(USA).png) |
| **Tekken 3** | 3D Fighting | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Tekken%203%20(USA).png) |
| **Metal Gear Solid (Disc 1)** | Tactical Espionage Action | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Metal%20Gear%20Solid%20(USA).png) |
| **Resident Evil 2 (Leon Disc)** | Survival Horror | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Resident%20Evil%202%20(USA).png) |
| **Crash Bandicoot: Warped** | 3D Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Crash%20Bandicoot%20-%20Warped%20(USA).png) |
| **Spyro the Dragon** | 3D Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Spyro%20the%20Dragon%20(USA).png) |
| **Tony Hawk's Pro Skater 2** | Extreme Sports | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation/master/Named_Boxarts/Tony%20Hawk%27s%20Pro%20Skater%202%20(USA).png) |

</details>

<details>
<summary><b>⚡ Game Boy Advance (16 Titles)</b></summary>

| Game Title | Genre | Artwork |
| :--- | :--- | :---: |
| **Pokemon Quetzal (Alpha 0.6.9)** | Romhack / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20Emerald%20Version%20(USA%2C%20Europe).png) |
| **Pokemon Hyper Emerald v5.7 Lost Artifacts** | Romhack / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20Emerald%20Version%20(USA%2C%20Europe).png) |
| **Pokemon Radical Red v4.1** | Romhack / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20FireRed%20Version%20(USA%2C%20Europe).png) |
| **Pokemon Unbound v2.1.1.1** | Romhack / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20FireRed%20Version%20(USA%2C%20Europe).png) |
| **Pokemon Emerald Rogue** | Roguelite / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Pokemon%20-%20Emerald%20Version%20(USA%2C%20Europe).png) |
| **Final Fantasy Tactics Advance** | Tactical RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Final%20Fantasy%20Tactics%20Advance%20(USA).png) |
| **Golden Sun** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Golden%20Sun%20(USA%2C%20Europe).png) |
| **Golden Sun: The Lost Age** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Golden%20Sun%20-%20The%20Lost%20Age%20(USA%2C%20Europe).png) |
| **Castlevania: Aria of Sorrow** | Metroidvania / Action | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Castlevania%20-%20Aria%20of%20Sorrow%20(USA).png) |
| **Fire Emblem: The Blazing Blade** | Tactical RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Fire%20Emblem%20(USA%2C%20Australia).png) |
| **Mega Man Battle Network 6 - Cybeast Falzar** | Action RPG / Deckbuilder | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Mega%20Man%20Battle%20Network%206%20-%20Cybeast%20Falzar%20(USA).png) |
| **Metroid Fusion** | Sci-Fi Action / Exploration | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Metroid%20Fusion%20(USA%2C%20Australia).png) |
| **The Legend of Zelda: The Minish Cap** | Action Adventure | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Legend%20of%20Zelda%2C%20The%20-%20The%20Minish%20Cap%20(USA).png) |
| **Mario & Luigi: Superstar Saga** | Turn-based RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Mario%20%26%20Luigi%20-%20Superstar%20Saga%20(USA%2C%20Australia).png) |
| **Advance Wars 2: Black Hole Rising** | Turn-based Military Strategy | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Advance%20Wars%202%20-%20Black%20Hole%20Rising%20(USA%2C%20Australia).png) |
| **Sonic Advance 3** | Fast Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Sonic%20Advance%203%20(USA).png) |

</details>

<details>
<summary><b>📜 Nintendo DS (15 Titles)</b></summary>

| Game Title | Genre | Artwork |
| :--- | :--- | :---: |
| **Might & Magic - Clash of Heroes** | Puzzle RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Might%20%26%20Magic%20-%20Clash%20of%20Heroes%20(USA)%20(En%2CFr%2CEs).png) |
| **Chrono Trigger (DS Edition)** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Chrono%20Trigger%20(USA)%20(En%2CFr).png) |
| **Radiant Historia** | Time-Travel RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Radiant%20Historia%20(USA).png) |
| **Final Fantasy Tactics A2** | Tactical RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Final%20Fantasy%20Tactics%20A2%20-%20Grimoire%20of%20the%20Rift%20(USA)%20(En%2CFr%2CEs).png) |
| **Castlevania: Dawn of Sorrow** | Metroidvania | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Castlevania%20-%20Dawn%20of%20Sorrow%20(USA).png) |
| **Castlevania: Order of Ecclesia** | Metroidvania | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Castlevania%20-%20Order%20of%20Ecclesia%20(USA)%20(En%2CFr).png) |
| **Pokemon Platinum Version** | Monster Collecting / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Pokemon%20-%20Platinum%20Version%20(USA).png) |
| **Pokemon HeartGold Version** | Monster Collecting / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Pokemon%20-%20HeartGold%20Version%20(USA).png) |
| **Dragon Quest IX: Sentinels of the Starry Skies** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Dragon%20Quest%20IX%20-%20Sentinels%20of%20the%20Starry%20Skies%20(USA)%20(En%2CFr%2CEs).png) |
| **Dragon Quest V: Hand of the Heavenly Bride** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Dragon%20Quest%20V%20-%20Hand%20of%20the%20Heavenly%20Bride%20(USA)%20(En%2CFr%2CEs).png) |
| **Golden Sun: Dark Dawn** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Golden%20Sun%20-%20Dark%20Dawn%20(USA)%20(En%2CEs).png) |
| **Phoenix Wright: Ace Attorney** | Courtroom Mystery / Adventure | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Phoenix%20Wright%20-%20Ace%20Attorney%20(USA).png) |
| **Professor Layton and the Curious Village** | Puzzle Adventure | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/Professor%20Layton%20and%20the%20Curious%20Village%20(USA).png) |
| **The World Ends With You** | Stylized Urban Action RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/World%20Ends%20with%20You%2C%20The%20(USA).png) |
| **New Super Mario Bros.** | Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_DS/master/Named_Boxarts/New%20Super%20Mario%20Bros.%20(USA).png) |

</details>

<details>
<summary><b>🍄 Super Nintendo / SNES (14 Titles)</b></summary>

| Game Title | Genre | Artwork |
| :--- | :--- | :---: |
| **Chrono Trigger** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Chrono%20Trigger%20(USA).png) |
| **Final Fantasy III (VI)** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Final%20Fantasy%20III%20(USA).png) |
| **Super Mario World** | Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Mario%20World%20(USA).png) |
| **Super Metroid** | Action / Exploration | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Metroid%20(Japan%2C%20USA)%20(En%2CJa).png) |
| **EarthBound** | Quirky RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/EarthBound%20(USA).png) |
| **Secret of Mana** | Action RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Secret%20of%20Mana%20(USA).png) |
| **Super Mario RPG: Legend of the Seven Stars** | RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Mario%20RPG%20-%20Legend%20of%20the%20Seven%20Stars%20(USA).png) |
| **The Legend of Zelda: A Link to the Past** | Action Adventure | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Legend%20of%20Zelda%2C%20The%20-%20A%20Link%20to%20the%20Past%20(USA).png) |
| **Mega Man X** | Action Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Mega%20Man%20X%20(USA).png) |
| **Super Mario World 2: Yoshi's Island** | Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Mario%20World%202%20-%20Yoshi%27s%20Island%20(USA).png) |
| **Donkey Kong Country 2: Diddy's Kong Quest** | Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Donkey%20Kong%20Country%202%20-%20Diddy%27s%20Kong%20Quest%20(USA).png) |
| **Super Castlevania IV** | Gothic Action | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Super%20Castlevania%20IV%20(USA).png) |
| **Lufia II: Rise of the Sinistrals** | JRPG / Puzzle | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Lufia%20II%20-%20Rise%20of%20the%20Sinistrals%20(USA).png) |
| **Breath of Fire II** | JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Super_Nintendo_Entertainment_System/master/Named_Boxarts/Breath%20of%20Fire%20II%20(USA).png) |

</details>

<details>
<summary><b>🦔 Sega Genesis (18 Titles)</b></summary>

| Game Title | Genre | Artwork |
| :--- | :--- | :---: |
| **Sonic The Hedgehog** | Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Sonic%20The%20Hedgehog%20(USA%2C%20Europe).png) |
| **Sonic The Hedgehog 2** | Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Sonic%20The%20Hedgehog%202%20(World).png) |
| **Sonic & Knuckles + Sonic 3** | Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Sonic%20%26%20Knuckles%20(World).png) |
| **Shining Force** | Tactical Strategy RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Shining%20Force%20(USA).png) |
| **Shining Force II** | Tactical Strategy RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Shining%20Force%20II%20(USA).png) |
| **Phantasy Star IV** | Sci-Fi JRPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Phantasy%20Star%20IV%20(USA).png) |
| **Streets of Rage 2** | Beat 'em Up | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Streets%20of%20Rage%202%20(USA).png) |
| **Streets of Rage 3** | Beat 'em Up | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Streets%20of%20Rage%203%20(USA).png) |
| **Gunstar Heroes** | Run and Gun | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Gunstar%20Heroes%20(USA).png) |
| **Castlevania: Bloodlines** | Action Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Castlevania%20-%20Bloodlines%20(USA).png) |
| **Beyond Oasis** | Action RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Beyond%20Oasis%20(USA).png) |
| **Shinobi III: Return of the Ninja Master** | Action Ninja | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Shinobi%20III%20-%20Return%20of%20the%20Ninja%20Master%20(USA).png) |
| **Golden Axe** | Hack and Slash | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Golden%20Axe%20(World).png) |
| **Crusader of Centy** | Action Adventure / RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Crusader%20of%20Centy%20(USA).png) |
| **Ristar** | Platformer | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Ristar%20(USA%2C%20Europe).png) |
| **Comix Zone** | Comic Beat 'em Up | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Comix%20Zone%20(USA).png) |
| **Landstalker** | Isometric Action RPG | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Landstalker%20(USA).png) |
| **Contra: Hard Corps** | Run and Gun | [Cover](https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Contra%20-%20Hard%20Corps%20(USA%2C%20Korea).png) |

</details>

---

## 🚀 Quick Start

### Option 1: Play Online
Visit the live hosted GitHub Pages deployment:
👉 **[https://lin4cre.github.io/retro-arcade-vault/](https://lin4cre.github.io/retro-arcade-vault/)**

### Option 2: Run Locally (Standalone)
No build process, NodeJS, or web server needed:
1. Clone the repository:
   ```bash
   git clone https://github.com/LIN4CRE/retro-arcade-vault.git
   ```
2. Double-click `index.html` to open it in Chrome, Edge, Brave, or Firefox.

---

## ➕ How to Add Custom Games

### From the Web Interface:
1. Click the **"+ Add Game"** button in the top navigation bar.
2. Enter the Game Title and choose the Console system.
3. Paste either the direct URL or the full `<iframe>...</iframe>` embed snippet (from RetroGames.cc or other web emulators).
4. *(Optional)* Paste an image URL to official box art.
5. Click **Add to Library**. Your game is saved directly into your browser's persistent `localStorage`.

---

## 🛠️ Tech Stack

- **Frontend**: 100% Vanilla HTML5, modern CSS3 (Custom Properties, Flexbox, Grid, CSS animations), ES6+ JavaScript.
- **Controller Layer**: HTML5 Gamepad API with polling loop and dynamic button detection.
- **Audio Engine**: Native Web Audio API procedural oscillator synthesis (zero external audio files).
- **Styling**: Cyberpunk / Dark Neon Arcade theme with Google Fonts (*Press Start 2P*, *Rajdhani*).
- **Storage**: Browser `localStorage` with JSON state management.
- **Artwork**: Vector SVG Arcade Marquee banner & high-resolution Libretro box art repository.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

Developed with ❤️ by [David Linacre (LIN4CRE)](https://github.com/LIN4CRE).
