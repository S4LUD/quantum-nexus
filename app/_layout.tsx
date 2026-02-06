import { GameProvider } from "@/state/GameProvider";
import { ThemeProvider } from "@/state/ThemeContext";
import { SoundProvider } from "@/state/SoundContext";
import { LocaleProvider } from "@/state/LocaleContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LocaleProvider>
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
    </LocaleProvider>
  );
}
