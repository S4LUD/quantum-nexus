import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
  type ReactNode,
} from "react";
import { SOUND_FILES, SoundKey } from "@/services/soundAssets";
import {
  createAudioPlayer,
  setAudioModeAsync,
  setIsAudioActiveAsync,
  type AudioPlayer,
} from "expo-audio";
import * as SecureStore from "expo-secure-store";

type SoundContextValue = {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (value: boolean) => void;
  play: (key: SoundKey) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

type SoundProviderProps = {
  children: ReactNode;
};

export function SoundProvider({ children }: SoundProviderProps) {
  const [isSoundEnabled, setSoundEnabled] = useState(true);
  const storageKey = "quantum_nexus_sound_enabled";
  const soundsRef = useRef<Record<SoundKey, AudioPlayer | null>>({
    primary_click: null,
    secondary_click: null,
    error_pop: null,
    success_sparkle: null,
    modal_whoosh: null,
    victory: null,
  });
  const readyRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const soundsRefSnapshot = soundsRef;
    const loadSounds = async () => {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: false,
          interruptionMode: "mixWithOthers",
        });
        const entries = Object.entries(SOUND_FILES) as [SoundKey, number][];
        const loaded = entries.map(([key, source]) => {
          const player = createAudioPlayer(source);
          player.volume = 1;
          player.loop = false;
          return [key, player] as const;
        });
        if (!isMounted) {
          loaded.forEach(([, player]) => {
            player.remove();
          });
          return;
        }
        loaded.forEach(([key, sound]) => {
          soundsRefSnapshot.current[key] = sound;
        });
        readyRef.current = true;
      } catch {
        console.warn("[Sound] failed to load sounds");
        readyRef.current = false;
      }
    };
    loadSounds();
    return () => {
      isMounted = false;
      const sounds = Object.values(soundsRefSnapshot.current).filter(
        Boolean,
      ) as AudioPlayer[];
      sounds.forEach((player) => {
        player.remove();
      });
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadSoundSetting = async () => {
      try {
        const stored = await SecureStore.getItemAsync(storageKey);
        if (!isMounted || stored === null) {
          return;
        }
        setSoundEnabled(stored === "true");
      } catch {
        // ignore storage errors
      }
    };
    loadSoundSetting();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  useEffect(() => {
    setIsAudioActiveAsync(isSoundEnabled).catch(() => {});
  }, [isSoundEnabled]);

  useEffect(() => {
    SecureStore.setItemAsync(storageKey, String(isSoundEnabled)).catch(() => {});
  }, [isSoundEnabled]);

  const play = useCallback(
    (key: SoundKey) => {
      if (!isSoundEnabled) {
        console.warn("[Sound] disabled");
        return;
      }
      if (!readyRef.current) {
        console.warn("[Sound] not ready yet");
        return;
      }
      const sound = soundsRef.current[key];
      if (!sound) {
        console.warn("[Sound] missing player", key);
        return;
      }
      if (!sound.isLoaded) {
        console.warn("[Sound] not loaded", key);
      }
      sound.seekTo(0);
      sound.play();
    },
    [isSoundEnabled],
  );

  const value = useMemo(
    () => ({ isSoundEnabled, toggleSound, setSoundEnabled, play }),
    [isSoundEnabled, play, toggleSound],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSoundContext() {
  return useContext(SoundContext);
}
