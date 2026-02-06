import { useSoundContext } from "@/state/SoundContext";

export function useSound() {
  const context = useSoundContext();
  if (!context) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return context;
}
