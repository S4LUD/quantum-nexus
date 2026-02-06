import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { GameContext } from "./GameContext";
import { gameReducer } from "./gameReducer";
import { BotDifficulty, GameState } from "../types/game";
import { createInitialGameState } from "../logic/gameEngine";
import { MatchStatePatch, MultiplayerSession, RealtimeAction } from "@/types/realtime";
import { realtimeClient } from "@/services/realtimeClient";
import { mapRealtimeStateToGameState } from "@/services/realtimeMapper";

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [gameState, dispatch] = useReducer(
    gameReducer,
    null as GameState | null,
  );
  const [multiplayerSession, setMultiplayerSession] =
    useState<MultiplayerSession>(realtimeClient.getSession());
  const [lastActionPatch, setLastActionPatch] = useState<MatchStatePatch | null>(null);
  const sessionRef = useRef(multiplayerSession);

  useEffect(() => {
    sessionRef.current = multiplayerSession;
  }, [multiplayerSession]);

  useEffect(() => {
    realtimeClient.setListeners({
      onSnapshot: (state) => {
        const currentSession = sessionRef.current;
        if (
          currentSession.active &&
          currentSession.playerId &&
          !state.players.some(
            (player) => player.playerId === currentSession.playerId,
          )
        ) {
          realtimeClient.clearSession();
          setMultiplayerSession(realtimeClient.getSession());
          dispatch({ type: "RESET" });
          return;
        }
        setMultiplayerSession((prev) => ({
          ...prev,
          hostPlayerId: state.hostPlayerId,
        }));
        dispatch({
          type: "UPDATE",
          payload: mapRealtimeStateToGameState(state),
        });
      },
      onPatch: (patch) => {
        setLastActionPatch(patch);
      },
      onEnded: (state) => {
        setMultiplayerSession((prev) => ({
          ...prev,
          hostPlayerId: state.hostPlayerId,
        }));
        dispatch({ type: "END", payload: mapRealtimeStateToGameState(state) });
      },
      onConnected: () => {
        setMultiplayerSession(realtimeClient.getSession());
      },
      onDisconnected: () => {
        setMultiplayerSession(realtimeClient.getSession());
      },
    });
    return () => {
      realtimeClient.setListeners({});
    };
  }, []);

  const initializeGame = useCallback(
    (
      playerCount: number,
      botCount = 0,
      botDifficulty: BotDifficulty = "easy",
    ) => {
      if (multiplayerSession.active) {
        void realtimeClient.leaveMatch().catch(() => {});
        setMultiplayerSession({
          active: false,
          matchId: null,
          playerId: null,
          playerName: null,
          hostPlayerId: null,
          isConnected: false,
        });
      }
      dispatch({
        type: "INIT",
        payload: createInitialGameState(playerCount, botCount, botDifficulty),
      });
    },
    [multiplayerSession.active],
  );

  const updateGameState = useCallback((nextState: GameState) => {
    dispatch({ type: "UPDATE", payload: nextState });
  }, []);

  const endGame = useCallback((finalState: GameState) => {
    dispatch({ type: "END", payload: finalState });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const createMultiplayerMatch = useCallback(
    async (name: string, maxPlayers = 4) => {
      const result = await realtimeClient.createMatch(name, maxPlayers);
      setMultiplayerSession(realtimeClient.getSession());
      dispatch({
        type: "INIT",
        payload: mapRealtimeStateToGameState(result.state),
      });
    },
    [],
  );

  const quickMultiplayerMatch = useCallback(
    async (name: string, maxPlayers = 4) => {
      const result = await realtimeClient.quickMatch(name, maxPlayers);
      setMultiplayerSession(realtimeClient.getSession());
      dispatch({
        type: "INIT",
        payload: mapRealtimeStateToGameState(result.state),
      });
    },
    [],
  );

  const joinMultiplayerMatch = useCallback(
    async (matchId: string, name: string) => {
      const result = await realtimeClient.joinMatch(matchId, name);
      setMultiplayerSession(realtimeClient.getSession());
      dispatch({
        type: "INIT",
        payload: mapRealtimeStateToGameState(result.state),
      });
    },
    [],
  );

  const leaveMultiplayerMatch = useCallback(async () => {
    try {
      await realtimeClient.leaveMatch();
    } catch {
      // ignore network errors; always clear local session
    } finally {
      setMultiplayerSession(realtimeClient.getSession());
      dispatch({ type: "RESET" });
    }
  }, []);

  const submitMultiplayerAction = useCallback(
    async (action: RealtimeAction) => {
      try {
        const result = await realtimeClient.submitAction(action);
        dispatch({
          type: "UPDATE",
          payload: mapRealtimeStateToGameState(result.state),
        });
        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  const startMultiplayerMatch = useCallback(async () => {
    const result = await realtimeClient.startMatch();
    dispatch({
      type: "UPDATE",
      payload: mapRealtimeStateToGameState(result.state),
    });
  }, []);

  const setLobbyReady = useCallback(async (ready: boolean) => {
    const result = await realtimeClient.setReady(ready);
    dispatch({
      type: "UPDATE",
      payload: mapRealtimeStateToGameState(result.state),
    });
  }, []);


  const value = useMemo(
    () => ({
      gameState,
      multiplayerSession,
      lastActionPatch,
      initializeGame,
      updateGameState,
      endGame,
      resetGame,
      createMultiplayerMatch,
      quickMultiplayerMatch,
      joinMultiplayerMatch,
      leaveMultiplayerMatch,
      submitMultiplayerAction,
      startMultiplayerMatch,
      setLobbyReady,
    }),
    [
      createMultiplayerMatch,
      endGame,
      gameState,
      initializeGame,
      joinMultiplayerMatch,
      leaveMultiplayerMatch,
      lastActionPatch,
      multiplayerSession,
      resetGame,
      submitMultiplayerAction,
      startMultiplayerMatch,
      setLobbyReady,
      updateGameState,
      quickMultiplayerMatch,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
