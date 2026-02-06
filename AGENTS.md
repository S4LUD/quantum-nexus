# AGENTS.md

## Purpose

This document defines **mandatory rules for AI agents** (Codex, GPT, etc.) operating in this workspace.

Its goals are:

- Enforce **legal separation** from Splendor
- Preserve the **Quantum Nexus redesign** exactly as specified in Figma
- Control **code structure, naming, and behavior** during conversion or refactors
- Prevent accidental copyright, trademark, or trade-dress regression

This file is authoritative. Agents must follow it without deviation.

---

## Project Identity (NON-NEGOTIABLE)

- **Product Name** : Quantum Nexus
- **Genre** : Strategic Network-Building Game
- **Theme** : Sci-fi / Quantum Computing
- **Legal Status** : Explicitly NOT related to Splendor

### Forbidden References

Agents MUST NOT introduce or reference:

- The word "Splendor"
- Gem names (diamond, ruby, sapphire, emerald, onyx, gold)
- Nobles, aristocracy, prestige, or Renaissance themes
- Any comparison language ("like", "inspired by", "based on")

---

## Legal-Compliance Rules

### 1. Mechanics Are Abstract — Expression Is Not

- Game mechanics MAY resemble generic engine-building concepts
- **Visuals, terminology, layout, and progression MUST remain Quantum Nexus–specific**

### 2. Terminology Mapping (LOCKED)

Agents must use ONLY the following terms:

| Allowed Term | Forbidden Equivalent    |
| ------------ | ----------------------- |
| Energy       | Gem / Token             |
| Node         | Card / Development Card |
| Protocol     | Noble                   |
| Efficiency   | Prestige / Points       |
| Collect      | Take                    |
| Build        | Purchase                |
| Pool         | Bank                    |
| Output       | Bonus                   |
| Category     | Tier / Level            |

No substitutions allowed.

---

## Game System Constraints (DO NOT CHANGE)

### Energy System

- 4 base energies + Flux wild
- Flux cannot be collected normally
- Flux gained only via reservation
- **Exchange action allowed** (1:1 or 2-for-3) using base energies only
- **Flux cannot be exchanged** and cannot be taken from the pool

### Node System

- 4 categories: Research, Production, Network, Control
- No hierarchical tiers
- Effects are conditional or temporary (not permanent discounts)
- **Output Generation may be used as a cost deduction when building Nodes** (rules will define exact formula)

### Protocol System

- Must be **actively claimed**
- Provide ongoing effects
- Variable efficiency values

### Victory Conditions

- Multiple win paths
- No fixed point race
- Turn-based evaluation only

Agents may NOT simplify, rebalance, or redesign these systems.

---

## Figma → React Native Conversion Rules

### UI Fidelity

- Pixel-faithful to Figma
- No redesign, reinterpretation, or simplification
- Mobile-first (375–428px logic)

### Platform Constraints

- Target: **React Native + Expo**
- Remove ALL web-only constructs:
  - `div`, `span`, `img`, `button`
  - CSS files, Tailwind classes, media queries

### Allowed Replacements

| Web      | React Native |
| -------- | ------------ |
| div      | View         |
| span / p | Text         |
| img      | Image        |
| button   | Pressable    |
| CSS      | StyleSheet   |

---

## File Structure (MANDATORY)

```
app/
  _layout.tsx
  index.tsx
  (screens)/
    Home/
      HomeScreen.tsx
    Game/
      GameScreen.tsx
    Multiplayer/
      MultiplayerScreen.tsx
    Lobby/
      LobbyScreen.tsx
    Settings/
      SettingsScreen.tsx
    _types.ts

components/
  ui/
    Button/
      Button.tsx
      button.styles.ts
      types.ts
    Text/
      Text.tsx
      text.styles.ts
      types.ts
    Input/
      Input.tsx
      input.styles.ts
      types.ts
    Card/
      Card.tsx
      card.styles.ts
    Modal/
      BaseModal.tsx
      modal.styles.ts
    Icon/
      Icon.tsx
  layout/
    Screen.tsx
    Header.tsx
    Footer.tsx
  domain/
    home/
      HomeHeader.tsx
      home.styles.ts
    game/
      EnergyPool/
        EnergyPool.tsx
        energyPool.styles.ts
      NodeCard/
        NodeCard.tsx
        nodeCard.styles.ts
      ProtocolCard/
        ProtocolCard.tsx
        protocolCard.styles.ts
      PlayerArea/
        PlayerArea.tsx
        playerArea.styles.ts
      GameHeader.tsx
      GameTabs.tsx
      game.styles.ts
      gameHeader.styles.ts
      gameTabs.styles.ts
      game.types.ts
    settings/
      settings.styles.ts
      ThemeToggle.tsx
    tutorial/
      TutorialPager.tsx

hooks/
  useTheme.ts
  useModal.ts
  useTurnManager.ts
  useBotTurn.ts

logic/
  gameEngine.ts
  botEngine.ts
  rules.ts
  selectors.ts

state/
  GameContext.tsx
  GameProvider.tsx
  gameReducer.ts

constants/
  colors.ts
  spacing.ts
  typography.ts
  layout.ts
  animations.ts

services/
  storage.ts
  ads.ts

utils/
  math.ts
  guards.ts
  helpers.ts

types/
  game.ts
  ui.ts
  index.ts
```

### Ownership Rules

- UI primitives → `components/ui`
- Structural layout → `components/layout`
- Feature-specific UI → `components/domain`
- Game logic → `logic`
- Bot logic → `logic/botEngine.ts`
- Screens contain composition only

No logic leakage allowed.

---

## Component Discipline

- Any reused element MUST be a component
- No inline styles
- No anonymous functions in JSX
- No magic numbers (use constants)

---

## Versioning & Localization (MANDATORY)

- App version MUST be updated for every major, minor, or patch change
- Any new or modified user-facing text MUST be added and verified in all localization files

---

## Bot / AI Rules

- Bots must be:
  - Deterministic
  - Stateless per turn
  - UI-agnostic
- Bots cannot import React or UI code
- Bots operate only on game state and rules

---

## Forbidden Agent Actions

Agents MUST NOT:

- Add new gameplay features
- Rename domain concepts
- Change win conditions
- Introduce monetization logic
- Add external libraries unless explicitly instructed
- Add sound, multiplayer, analytics, or polish features

---

## Approved Exceptions (User-Approved)

- Lobby idle auto-kick (multiplayer lobby only).
- Lobby UI adjustments as explicitly specified by the user.

## Definition of Done

A task is complete ONLY if:

- Game remains legally distinct from Splendor
- UI matches Figma exactly
- App runs in Expo Go
- No forbidden terminology exists
- App version is updated for the change
- Localization files include and verify any new or modified text
- Structure matches this document

---

## Enforcement

If an agent violates ANY rule above:

- The output is considered invalid
- The change must be reverted
- The agent must re-run using AGENTS.md

This file exists to **constrain AI behavior** , not to guide humans casually.

Quantum Nexus © 2026
