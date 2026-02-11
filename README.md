
  # Quantum Nexus Game Design

  This is a code bundle for Quantum Nexus Game Design. The original project is available at https://www.figma.com/design/cBog2c22BrT1iszzrfPb1l/Quantum-Nexus-Game-Design.

  ## Running the app

  Run `npm i` to install the dependencies.

  Run `npm run start` to launch Expo.

  ## Multiplayer configuration

  Set `EXPO_PUBLIC_REALTIME_URL` before launching the app when using multiplayer.
  Example:

  - PowerShell: `$env:EXPO_PUBLIC_REALTIME_URL="http://localhost:3001"`

  If the server sets `MATCH_ACCESS_KEY`, also set:

  - PowerShell: `$env:EXPO_PUBLIC_MULTIPLAYER_ACCESS_KEY="your_match_access_key"`

  ## CI validation

  Run `npm run ci:validate` to execute lint, typecheck, app build, server build, and server tests.
  
