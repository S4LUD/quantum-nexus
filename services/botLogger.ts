import { BotDifficulty } from "@/types";

interface BotLogPayload {
  playerId: string;
  playerName: string;
  difficulty: BotDifficulty;
  turn: number;
  message: string;
}

const BOT_LOGGER_URL = "http://192.168.1.29:3000/logs";
const BOT_LOGGER_TIMEOUT_MS = 1500;
const BOT_LOGGER_ENABLED = false;

export async function logBotDecision(payload: BotLogPayload): Promise<void> {
  if (!__DEV__ || !BOT_LOGGER_ENABLED) {
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), BOT_LOGGER_TIMEOUT_MS);

  try {
    await fetch(BOT_LOGGER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: "info",
        message: payload.message,
        meta: {
          playerId: payload.playerId,
          playerName: payload.playerName,
          difficulty: payload.difficulty,
          turn: payload.turn,
        },
      }),
      signal: controller.signal,
    });
  } catch {
    // Ignore logging failures to keep bot turns deterministic.
  } finally {
    clearTimeout(timeoutId);
  }
}
