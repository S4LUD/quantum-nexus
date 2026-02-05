# Old Splendor Implementation - Reference Only

⚠️ **DO NOT USE THESE FILES** - They are kept for reference only

## Old File Locations (Deprecated)

These files contain the Splendor implementation that has been replaced by Quantum Nexus:

```
/components/splendor/
├── types.ts
├── gameData.ts
├── gameUtils.ts
├── SplashScreen.tsx
├── MainMenu.tsx
├── GameBoard.tsx
├── PlayerArea.tsx
├── DevelopmentCardComponent.tsx
├── CardDetailModal.tsx
├── NobleComponent.tsx
├── EndGameScreen.tsx
├── MultiplayerMenu.tsx
├── GameLobby.tsx
├── TutorialModal.tsx
├── SettingsModal.tsx
├── NotificationToast.tsx
├── QuickRulesCard.tsx
├── TokenComponent.tsx
└── GemIcon.tsx
```

## What to Do With These Files

### Option 1: Keep for Reference (Recommended)
Keep them in `/components/splendor/` as a reference if you need to compare implementations or migrate specific features.

### Option 2: Delete (After Verification)
Once you've verified Quantum Nexus works perfectly and you're confident you won't need to reference the old implementation, you can safely delete the entire `/components/splendor/` directory.

### Option 3: Archive
Move to a separate branch or archive directory if you want to preserve the code history.

## Key Differences Reference

| Feature | Splendor (Old) | Quantum Nexus (New) |
|---------|---------------|-------------------|
| **Name** | Splendor | Quantum Nexus |
| **Resources** | 5 gems + gold | 4 energy + flux |
| **Cards** | 3 levels | 4 categories |
| **Bonuses** | Permanent discounts | Temporary effects |
| **Nobles** | Auto-trigger | Active protocols |
| **Victory** | 15 points | Multiple conditions |
| **Theme** | Renaissance gems | Sci-fi quantum |
| **Layout** | Tabletop mirror | Mobile vertical |

## Migration Notes

If you need to migrate any Splendor-specific features to Quantum Nexus:

1. **Terminology**: Update all variable names and UI text
2. **Colors**: Map gem colors to energy types
3. **Mechanics**: Adapt permanent bonuses to temporary effects
4. **UI**: Convert horizontal layouts to vertical tabs
5. **Backend**: Update data structures to use new types

## Legal Reminder

⚠️ **Never deploy or reference Splendor implementation publicly**
- Do not use Splendor name in marketing
- Do not show Splendor UI in screenshots
- Do not compare to Splendor in app store
- Do not mention Splendor in code comments for public code

## Recommended Action

After testing Quantum Nexus thoroughly:
1. ✅ Verify all features work
2. ✅ Test all game mechanics
3. ✅ Confirm win conditions
4. ✅ Play through complete games
5. ✅ Check for bugs
6. 🗑️ Delete `/components/splendor/` directory
7. 🗑️ Remove old imports from codebase
8. 🗑️ Clean up any Splendor references

---

**Current Status**: Quantum Nexus is the ONLY active implementation. Splendor files are deprecated and should not be used.
