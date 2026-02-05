import { GameProvider } from "@/state/GameProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GameProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GameProvider>
  );
}
