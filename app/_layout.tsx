import { GameProvider } from "@/state/GameProvider";
import { ThemeProvider } from "@/state/ThemeContext";
import { SoundProvider } from "@/state/SoundContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <GameProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </GameProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}
