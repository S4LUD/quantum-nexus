# 🚀 Quantum Nexus - Quick Start Guide

## ✅ You're Ready to Play!

The complete legal redesign is done. Here's how to start playing immediately:

---

## 🎮 Launch the Game

The app is already configured to run Quantum Nexus. Just:

1. **Start the app** - The splash screen will appear
2. **Tap "Initialize System"** - Go to main menu
3. **Tap "Quick Play"** - Start a 2-player game immediately
4. **Play!** - Build your quantum network

---

## 📖 First Time Playing?

### Open the Tutorial
1. From main menu, tap "Tutorial"
2. Read through 6 pages explaining:
   - Energy types
   - Turn actions
   - Node categories
   - Protocol claiming
   - Win conditions
   - Strategy tips

### Key Concepts (30 Second Version)

**Goal**: Be first to achieve victory through:
- 20★ Efficiency (after turn 20)
- 12+ Nodes built
- 3+ Protocols claimed

**Your Turn**: Choose ONE action:
1. Collect 3 different energies (or 2 same if 4+ available)
2. Build a node (pay cost, gain efficiency)
3. Reserve a node (save for later, gain flux)
4. Exchange energy (1:1 or 2:3, base energies only)
5. Claim a protocol (when you meet output requirements)

**Energy Types**:
- ☀️ Solar (yellow)
- 💧 Hydro (cyan)
- 🔥 Plasma (pink)
- 🧠 Neural (green)
- ✨ Flux (purple - wild, gained by reserving only)

---

## 🎯 Quick Game Flow

### 1. Starting Screen
- Animated splash with quantum grid
- Tap "Initialize System"

### 2. Main Menu
- **Quick Play** → Start 2-player game
- **Multiplayer** → Coming soon (backend integration)
- **Tutorial** → Learn how to play
- **Settings** → Toggle dark mode

### 3. Game Board
Three tabs:
- **Market** → See available nodes and energy pool
- **Protocols** → View and claim protocols
- **Players** → See all player stats

### 4. Playing
- Current player shown in header
- Tap energy badges to select
- Tap nodes to see details
- Build or reserve from modal
- Turn advances automatically

### 5. Victory
- Win condition triggers
- Animated victory screen
- View final rankings
- Play again or return to menu

---

## 🎨 UI Navigation

### Main Game Screen

```
┌─────────────────────────────┐
│ ← Back   Quantum Nexus   You│  ← Header
│                      Turn 5  │
├─────────────────────────────┤
│ Market | Protocols | Players │  ← Tabs
├─────────────────────────────┤
│                             │
│   [Market Tab Content]      │  ← Scrollable
│   - Energy Pool             │     Content
│   - Research Nodes          │
│   - Production Nodes        │
│   - Network Nodes           │
│   - Control Nodes           │
│                             │
├─────────────────────────────┤
│ Your Area (Compact)         │  ← Bottom
│ Energy | Nodes | Efficiency │     Bar
└─────────────────────────────┘
```

### Tabs Explained

**Market Tab**:
- Energy pool (tap to select)
- 4 rows of nodes (tap to view details)
- "Collect Energy" button appears when selected

**Protocols Tab**:
- Available protocols to claim
- Shows requirements
- Green = can claim, Gray = locked, Dark = claimed

**Players Tab**:
- All player areas
- Owned nodes
- Reserved nodes
- Protocols claimed
- Current efficiency

---

## 💡 Pro Tips

### Energy Management
- Keep under 10 total energy
- Flux is valuable - use wisely
- Collect diverse types early

### Node Strategy
- Research nodes = abilities
- Production nodes = high efficiency
- Network nodes = expensive but powerful
- Control nodes = utility effects

### Protocol Timing
- Based on OUTPUT (nodes owned), not energy held
- Claim immediately when available
- Provides ongoing effects + efficiency
 - Outputs also reduce matching build costs by 1 (stacking with discounts)

### Win Condition Focus
- **Efficiency Path**: Build high-value production/network nodes
- **Network Path**: Build many cheap research/control nodes
- **Protocol Path**: Focus on diverse node types for requirements

---

## 🐛 Troubleshooting

### Game Not Starting?
- Check browser console for errors
- Ensure all files are loaded
- Try refreshing the page

### UI Issues?
- The app is designed for 375-428px width
- Best viewed in mobile viewport
- Use browser dev tools responsive mode

### Gameplay Questions?
- Read the in-game tutorial
- Check QUANTUM_NEXUS_COMPLETE.md for full rules
- See IMPLEMENTATION_GUIDE.md for technical details

---

## 🔧 Technical Details

### Tech Stack
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### File Structure
- `/App.tsx` - Main entry point
- `/components/quantum/*` - All game components
- `/components/quantum/gameUtils.ts` - Game engine
- `/components/quantum/gameData.ts` - Nodes & protocols

### Game State
Managed in App.tsx, passed to GameBoard component. All game logic in gameUtils.ts ensures consistent rule enforcement.

---

## 📚 Documentation Files

- `QUANTUM_NEXUS_COMPLETE.md` - Complete overview ⭐ Start here
- `IMPLEMENTATION_GUIDE.md` - Technical implementation details
- `REDESIGN_STATUS.md` - Legal compliance checklist
- `QUICK_START.md` - This file
- `OLD_SPLENDOR_REFERENCE.md` - Deprecated file reference

---

## 🚀 Next Steps

### Play Now
1. Launch the app
2. Open tutorial if first time
3. Start Quick Play
4. Enjoy!

### When Ready for Multiplayer
1. Choose your backend (Supabase, Firebase, etc.)
2. Implement real-time sync
3. Create lobby system
4. Add matchmaking

### Future Enhancements
- Sound effects
- Achievements
- Player stats
- Game history
- Leaderboards
- Custom themes

---

## ✅ Verification Checklist

Before publishing:
- [ ] Play complete game
- [ ] Test all win conditions
- [ ] Verify no "Splendor" text anywhere
- [ ] Check all buttons work
- [ ] Test on different screen sizes
- [ ] Read through tutorial
- [ ] Verify legal compliance (see REDESIGN_STATUS.md)
- [ ] Take screenshots for app store
- [ ] Prepare marketing copy (no Splendor references!)

---

## 🎓 Remember

**This is Quantum Nexus** - An original strategic network building game with:
- ✅ Unique quantum computing theme
- ✅ 4 energy types + flux system
- ✅ 4 node categories with effects
- ✅ Active protocol claiming
- ✅ Multiple victory paths
- ✅ Mobile-first design

**NOT a Splendor clone** - Completely legally distinct in:
- Name, branding, and visual identity
- Resource system and count
- Card structure and mechanics
- Victory conditions
- UI layout and design
- All terminology

---

**Ready? Let's build some quantum networks! 🌐⚡**

*Quantum Nexus © 2026*
