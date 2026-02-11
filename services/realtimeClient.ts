import { io, Socket } from "socket.io-client";
import {
  ActionSubmitResult,
  EventError,
  MatchCreateResult,
  MatchQuickResult,
  MatchJoinResult,
  MatchLeaveResult,
  MatchReadyResult,
  MatchReconnectResult,
  MatchStartResult,
  MultiplayerSession,
  PublicMatchState,
  RealtimeAction,
  ResyncRequestResult,
} from "@/types/realtime";
import { reportRuntimeError } from "@/utils/runtimeError";

type AckResponse<T> = { ok: true; data: T } | { ok: false; error: EventError };

type ServerToClientEvents = {
  "match:state_snapshot": (state: PublicMatchState) => void;
  "match:state_patch": (patch: ActionSubmitResult["patch"]) => void;
  "match:ended": (state: PublicMatchState) => void;
  "action:rejected": (error: EventError) => void;
};

type ClientToServerEvents = {
  "match:create": (
    payload: { name: string; maxPlayers?: number; accessKey?: string },
    ack: (response: AckResponse<MatchCreateResult>) => void,
  ) => void;
  "match:quick": (
    payload: { name: string; maxPlayers?: number; accessKey?: string },
    ack: (response: AckResponse<MatchQuickResult>) => void,
  ) => void;
  "match:join": (
    payload: { matchId: string; name: string; accessKey?: string },
    ack: (response: AckResponse<MatchJoinResult>) => void,
  ) => void;
  "match:reconnect": (
    payload: { matchId: string; playerId: string; sessionToken: string },
    ack: (response: AckResponse<MatchReconnectResult>) => void,
  ) => void;
  "player:heartbeat": (payload: {
    matchId: string;
    playerId: string;
    sessionToken: string;
  }) => void;
  "match:leave": (
    payload: { matchId: string; playerId: string; sessionToken: string },
    ack: (response: AckResponse<MatchLeaveResult>) => void,
  ) => void;
  "match:start": (
    payload: { matchId: string; playerId: string; sessionToken: string },
    ack: (response: AckResponse<MatchStartResult>) => void,
  ) => void;
  "match:ready": (
    payload: {
      matchId: string;
      playerId: string;
      ready: boolean;
      sessionToken: string;
    },
    ack: (response: AckResponse<MatchReadyResult>) => void,
  ) => void;
  "action:submit": (
    payload: {
      matchId: string;
      playerId: string;
      sessionToken: string;
      actionId: string;
      action: RealtimeAction;
      knownStateVersion: number;
    },
    ack: (response: AckResponse<ActionSubmitResult>) => void,
  ) => void;
  "state:resync_request": (
    payload: { matchId: string; playerId: string; sessionToken: string },
    ack: (response: AckResponse<ResyncRequestResult>) => void,
  ) => void;
};

type RealtimeClientListeners = {
  onSnapshot?: (state: PublicMatchState) => void;
  onPatch?: (patch: ActionSubmitResult["patch"]) => void;
  onEnded?: (state: PublicMatchState) => void;
  onRejected?: (error: EventError) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
};

const REALTIME_URL_ENV_NAME = "EXPO_PUBLIC_REALTIME_URL";
function resolveRealtimeUrl() {
  const raw = process.env.EXPO_PUBLIC_REALTIME_URL?.trim();
  if (!raw) {
    throw new Error(
      `[realtime] Missing ${REALTIME_URL_ENV_NAME}. Configure it before starting multiplayer.`,
    );
  }
  try {
    return new URL(raw).toString();
  } catch {
    throw new Error(
      `[realtime] Invalid ${REALTIME_URL_ENV_NAME}: "${raw}". Expected absolute URL (http/https).`,
    );
  }
}

function resolveMultiplayerAccessKey() {
  const raw = process.env.EXPO_PUBLIC_MULTIPLAYER_ACCESS_KEY?.trim();
  return raw && raw.length > 0 ? raw : undefined;
}

class RealtimeClient {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null =
    null;

  private listeners: RealtimeClientListeners = {};
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  private session: MultiplayerSession = {
    active: false,
    matchId: null,
    playerId: null,
    sessionToken: null,
    playerName: null,
    hostPlayerId: null,
    isQuickMatch: false,
    isConnected: false,
  };

  private latestStateVersion = 1;

  setListeners(listeners: RealtimeClientListeners) {
    this.listeners = listeners;
  }

  getSession() {
    return this.session;
  }

  pauseActiveSession() {
    if (!this.session.active) {
      return;
    }
    this.stopHeartbeat();
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.session = { ...this.session, isConnected: false };
    this.listeners.onDisconnected?.();
  }

  async resumeActiveSession() {
    if (
      !this.session.active ||
      !this.session.matchId ||
      !this.session.playerId ||
      !this.session.sessionToken
    ) {
      return;
    }
    this.connect();
    this.startHeartbeat();
    if (!this.socket?.connected) {
      return;
    }
    try {
      await this.reconnectMatch(
        this.session.matchId,
        this.session.playerId,
        this.session.sessionToken,
      );
    } catch (error) {
      reportRuntimeError(
        {
          scope: "RealtimeClient",
          action: "resume_active_session",
          metadata: { matchId: this.session.matchId },
        },
        error,
      );
      await this.resync(
        this.session.matchId,
        this.session.playerId,
        this.session.sessionToken,
      );
    }
  }

  connect() {
    if (this.socket) {
      return;
    }
    const url = resolveRealtimeUrl();
    this.socket = io(url, {
      transports: ["websocket"],
      autoConnect: true,
    });
    this.socket.on("connect", () => {
      this.session = { ...this.session, isConnected: true };
      if (
        this.session.active &&
        this.session.matchId &&
        this.session.playerId &&
        this.session.sessionToken
      ) {
        void this.reconnectMatch(
          this.session.matchId,
          this.session.playerId,
          this.session.sessionToken,
        ).catch((error) => {
          reportRuntimeError(
            {
              scope: "RealtimeClient",
              action: "reconnect_match",
              metadata: { matchId: this.session.matchId },
            },
            error,
          );
          if (
            this.session.matchId &&
            this.session.playerId &&
            this.session.sessionToken
          ) {
            void this.resync(
              this.session.matchId,
              this.session.playerId,
              this.session.sessionToken,
            );
          }
        });
      }
      this.startHeartbeat();
      this.listeners.onConnected?.();
    });
    this.socket.on("disconnect", () => {
      this.session = { ...this.session, isConnected: false };
      this.stopHeartbeat();
      this.listeners.onDisconnected?.();
    });
    this.socket.on("match:state_snapshot", (state) => {
      this.latestStateVersion = state.stateVersion;
      this.listeners.onSnapshot?.(state);
    });
    this.socket.on("match:state_patch", (patch) => {
      this.latestStateVersion = patch.stateVersion;
      this.listeners.onPatch?.(patch);
    });
    this.socket.on("match:ended", (state) => {
      this.latestStateVersion = state.stateVersion;
      this.listeners.onEnded?.(state);
    });
    this.socket.on("action:rejected", (error) => {
      this.listeners.onRejected?.(error);
    });
  }

  async createMatch(name: string, maxPlayers = 2) {
    const socket = this.ensureSocket();
    const response = await this.emitAck<MatchCreateResult>("match:create", {
      name,
      maxPlayers,
      accessKey: resolveMultiplayerAccessKey(),
    });
    this.session = {
      active: true,
      matchId: response.state.matchId,
      playerId: response.playerId,
      sessionToken: response.sessionToken,
      playerName: name,
      hostPlayerId: response.state.hostPlayerId,
      isQuickMatch: response.state.isQuickMatch,
      isConnected: socket.connected,
    };
    this.latestStateVersion = response.state.stateVersion;
    this.startHeartbeat();
    return response;
  }

  async quickMatch(name: string, maxPlayers = 2) {
    const socket = this.ensureSocket();
    const response = await this.emitAck<MatchQuickResult>("match:quick", {
      name,
      maxPlayers,
      accessKey: resolveMultiplayerAccessKey(),
    });
    this.session = {
      active: true,
      matchId: response.state.matchId,
      playerId: response.playerId,
      sessionToken: response.sessionToken,
      playerName: name,
      hostPlayerId: response.state.hostPlayerId,
      isQuickMatch: response.state.isQuickMatch,
      isConnected: socket.connected,
    };
    this.latestStateVersion = response.state.stateVersion;
    this.startHeartbeat();
    return response;
  }

  async joinMatch(matchId: string, name: string) {
    const socket = this.ensureSocket();
    const normalizedMatchId = matchId.trim().toUpperCase();
    const response = await this.emitAck<MatchJoinResult>("match:join", {
      matchId: normalizedMatchId,
      name,
      accessKey: resolveMultiplayerAccessKey(),
    });
    this.session = {
      active: true,
      matchId: response.state.matchId,
      playerId: response.playerId,
      sessionToken: response.sessionToken,
      playerName: name,
      hostPlayerId: response.state.hostPlayerId,
      isQuickMatch: response.state.isQuickMatch,
      isConnected: socket.connected,
    };
    this.latestStateVersion = response.state.stateVersion;
    this.startHeartbeat();
    return response;
  }

  async reconnectMatch(matchId: string, playerId: string, sessionToken: string) {
    const socket = this.ensureSocket();
    const response = await this.emitAck<MatchReconnectResult>(
      "match:reconnect",
      {
        matchId: matchId.trim().toUpperCase(),
        playerId,
        sessionToken,
      },
    );
    this.session = {
      ...this.session,
      active: true,
      matchId: response.state.matchId,
      sessionToken: response.sessionToken,
      hostPlayerId: response.state.hostPlayerId,
      isQuickMatch: response.state.isQuickMatch,
      isConnected: socket.connected,
    };
    this.latestStateVersion = response.state.stateVersion;
    this.startHeartbeat();
    return response;
  }

  async leaveMatch() {
    if (
      !this.session.active ||
      !this.session.matchId ||
      !this.session.playerId ||
      !this.session.sessionToken
    ) {
      return;
    }
    try {
      await this.emitAck<MatchLeaveResult>("match:leave", {
        matchId: this.session.matchId,
        playerId: this.session.playerId,
        sessionToken: this.session.sessionToken,
      });
    } catch (error) {
      reportRuntimeError(
        {
          scope: "RealtimeClient",
          action: "leave_match",
          metadata: {
            matchId: this.session.matchId,
            playerId: this.session.playerId,
          },
        },
        error,
      );
    } finally {
      this.clearSession();
    }
  }

  async startMatch() {
    if (
      !this.session.active ||
      !this.session.matchId ||
      !this.session.playerId ||
      !this.session.sessionToken
    ) {
      throw new Error("No active multiplayer session");
    }
    const result = await this.emitAck<MatchStartResult>("match:start", {
      matchId: this.session.matchId,
      playerId: this.session.playerId,
      sessionToken: this.session.sessionToken,
    });
    this.latestStateVersion = result.state.stateVersion;
    return result;
  }

  async setReady(ready: boolean) {
    if (
      !this.session.active ||
      !this.session.matchId ||
      !this.session.playerId ||
      !this.session.sessionToken
    ) {
      throw new Error("No active multiplayer session");
    }
    const result = await this.emitAck<MatchReadyResult>("match:ready", {
      matchId: this.session.matchId,
      playerId: this.session.playerId,
      ready,
      sessionToken: this.session.sessionToken,
    });
    this.latestStateVersion = result.state.stateVersion;
    return result;
  }

  async submitAction(action: RealtimeAction) {
    if (
      !this.session.active ||
      !this.session.matchId ||
      !this.session.playerId ||
      !this.session.sessionToken
    ) {
      throw new Error("No active multiplayer session");
    }
    const actionId = `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const result = await this.emitAck<ActionSubmitResult>("action:submit", {
      matchId: this.session.matchId,
      playerId: this.session.playerId,
      sessionToken: this.session.sessionToken,
      actionId,
      action,
      knownStateVersion: this.latestStateVersion,
    });
    this.latestStateVersion = result.state.stateVersion;
    return result;
  }

  disconnect() {
    if (!this.socket) {
      return;
    }
    this.socket.removeAllListeners();
    this.socket.disconnect();
    this.socket = null;
    this.session = {
      active: false,
      matchId: null,
      playerId: null,
      sessionToken: null,
      playerName: null,
      hostPlayerId: null,
      isQuickMatch: false,
      isConnected: false,
    };
    this.latestStateVersion = 1;
    this.stopHeartbeat();
  }

  clearSession() {
    this.session = {
      active: false,
      matchId: null,
      playerId: null,
      sessionToken: null,
      playerName: null,
      hostPlayerId: null,
      isQuickMatch: false,
      isConnected: this.socket?.connected ?? false,
    };
    this.latestStateVersion = 1;
    this.stopHeartbeat();
  }

  private async resync(matchId: string, playerId: string, sessionToken: string) {
    const response = await this.emitAck<ResyncRequestResult>(
      "state:resync_request",
      { matchId, playerId, sessionToken },
    );
    this.latestStateVersion = response.state.stateVersion;
    this.listeners.onSnapshot?.(response.state);
  }

  async resyncMatch(matchId: string) {
    if (!this.session.playerId || !this.session.sessionToken) {
      throw new Error("No active multiplayer session");
    }
    await this.resync(matchId, this.session.playerId, this.session.sessionToken);
  }

  private ensureSocket() {
    this.connect();
    if (!this.socket) {
      throw new Error("Realtime socket is unavailable");
    }
    return this.socket;
  }

  private emitAck<T>(
    event: keyof ClientToServerEvents,
    payload: unknown,
  ): Promise<T> {
    const socket = this.ensureSocket();
    return new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Realtime request timed out"));
      }, 7000);

      if (event === "match:create") {
        socket.emit(
          event,
          payload as { name: string; maxPlayers?: number; accessKey?: string },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      if (event === "match:quick") {
        socket.emit(
          event,
          payload as { name: string; maxPlayers?: number; accessKey?: string },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      if (event === "match:join") {
        socket.emit(
          event,
          payload as { matchId: string; name: string; accessKey?: string },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      if (event === "match:reconnect") {
        socket.emit(
          event,
          payload as { matchId: string; playerId: string; sessionToken: string },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      if (event === "match:leave") {
        socket.emit(
          event,
          payload as { matchId: string; playerId: string; sessionToken: string },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      if (event === "action:submit") {
        socket.emit(
          event,
          payload as {
            matchId: string;
            playerId: string;
            sessionToken: string;
            actionId: string;
            action: RealtimeAction;
            knownStateVersion: number;
          },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      if (event === "match:start") {
        socket.emit(
          event,
          payload as { matchId: string; playerId: string; sessionToken: string },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      if (event === "match:ready") {
        socket.emit(
          event,
          payload as {
            matchId: string;
            playerId: string;
            ready: boolean;
            sessionToken: string;
          },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      socket.emit(
        event,
        payload as { matchId: string; playerId: string; sessionToken: string },
        (response) => {
          clearTimeout(timeout);
          this.resolveAck(response as AckResponse<T>, resolve, reject);
        },
      );
    });
  }

  private resolveAck<T>(
    response: AckResponse<T>,
    resolve: (value: T) => void,
    reject: (reason?: unknown) => void,
  ) {
    if (response.ok) {
      resolve(response.data);
      return;
    }
    reject(new Error(response.error.message));
  }

  private startHeartbeat() {
    if (this.heartbeatTimer || !this.socket) {
      return;
    }
    this.heartbeatTimer = setInterval(() => {
      if (
        !this.socket ||
        !this.session.active ||
        !this.session.matchId ||
        !this.session.playerId ||
        !this.session.sessionToken ||
        !this.socket.connected
      ) {
        return;
      }
      this.socket.emit("player:heartbeat", {
        matchId: this.session.matchId,
        playerId: this.session.playerId,
        sessionToken: this.session.sessionToken,
      });
    }, 5000);
  }

  private stopHeartbeat() {
    if (!this.heartbeatTimer) {
      return;
    }
    clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = null;
  }
}

export const realtimeClient = new RealtimeClient();
