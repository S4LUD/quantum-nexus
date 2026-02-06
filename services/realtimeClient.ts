import { io, Socket } from "socket.io-client";
import {
  ActionSubmitResult,
  EventError,
  MatchCreateResult,
  MatchQuickResult,
  MatchJoinResult,
  MatchLeaveResult,
  MatchReadyResult,
  MatchStartResult,
  MultiplayerSession,
  PublicMatchState,
  RealtimeAction,
  ResyncRequestResult,
} from "@/types/realtime";

type AckResponse<T> = { ok: true; data: T } | { ok: false; error: EventError };

type ServerToClientEvents = {
  "match:state_snapshot": (state: PublicMatchState) => void;
  "match:state_patch": (patch: ActionSubmitResult["patch"]) => void;
  "match:ended": (state: PublicMatchState) => void;
  "action:rejected": (error: EventError) => void;
};

type ClientToServerEvents = {
  "match:create": (
    payload: { name: string; maxPlayers?: number },
    ack: (response: AckResponse<MatchCreateResult>) => void,
  ) => void;
  "match:quick": (
    payload: { name: string; maxPlayers?: number },
    ack: (response: AckResponse<MatchQuickResult>) => void,
  ) => void;
  "match:join": (
    payload: { matchId: string; name: string },
    ack: (response: AckResponse<MatchJoinResult>) => void,
  ) => void;
  "match:leave": (
    payload: { matchId: string },
    ack: (response: AckResponse<MatchLeaveResult>) => void,
  ) => void;
  "match:start": (
    payload: { matchId: string; playerId: string },
    ack: (response: AckResponse<MatchStartResult>) => void,
  ) => void;
  "match:ready": (
    payload: { matchId: string; playerId: string; ready: boolean },
    ack: (response: AckResponse<MatchReadyResult>) => void,
  ) => void;
  "action:submit": (
    payload: {
      matchId: string;
      playerId: string;
      actionId: string;
      action: RealtimeAction;
      knownStateVersion: number;
    },
    ack: (response: AckResponse<ActionSubmitResult>) => void,
  ) => void;
  "state:resync_request": (
    payload: { matchId: string },
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

class RealtimeClient {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null =
    null;

  private listeners: RealtimeClientListeners = {};

  private session: MultiplayerSession = {
    active: false,
    matchId: null,
    playerId: null,
    playerName: null,
    hostPlayerId: null,
    isConnected: false,
  };

  private latestStateVersion = 1;

  setListeners(listeners: RealtimeClientListeners) {
    this.listeners = listeners;
  }

  getSession() {
    return this.session;
  }

  connect() {
    if (this.socket) {
      return;
    }
    const url =
      process.env.EXPO_PUBLIC_REALTIME_URL?.trim() ||
      "http://192.168.1.29:3001";
    this.socket = io(url, {
      transports: ["websocket"],
      autoConnect: true,
    });
    this.socket.on("connect", () => {
      this.session = { ...this.session, isConnected: true };
      if (this.session.active && this.session.matchId) {
        void this.resync(this.session.matchId);
      }
      this.listeners.onConnected?.();
    });
    this.socket.on("disconnect", () => {
      this.session = { ...this.session, isConnected: false };
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
    });
    this.session = {
      active: true,
      matchId: response.state.matchId,
      playerId: response.playerId,
      playerName: name,
      hostPlayerId: response.state.hostPlayerId,
      isConnected: socket.connected,
    };
    this.latestStateVersion = response.state.stateVersion;
    return response;
  }

  async quickMatch(name: string, maxPlayers = 2) {
    const socket = this.ensureSocket();
    const response = await this.emitAck<MatchQuickResult>("match:quick", {
      name,
      maxPlayers,
    });
    this.session = {
      active: true,
      matchId: response.state.matchId,
      playerId: response.playerId,
      playerName: name,
      hostPlayerId: response.state.hostPlayerId,
      isConnected: socket.connected,
    };
    this.latestStateVersion = response.state.stateVersion;
    return response;
  }

  async joinMatch(matchId: string, name: string) {
    const socket = this.ensureSocket();
    const normalizedMatchId = matchId.trim().toUpperCase();
    const response = await this.emitAck<MatchJoinResult>("match:join", {
      matchId: normalizedMatchId,
      name,
    });
    this.session = {
      active: true,
      matchId: response.state.matchId,
      playerId: response.playerId,
      playerName: name,
      hostPlayerId: response.state.hostPlayerId,
      isConnected: socket.connected,
    };
    this.latestStateVersion = response.state.stateVersion;
    return response;
  }

  async leaveMatch() {
    if (!this.session.active || !this.session.matchId) {
      return;
    }
    await this.emitAck<MatchLeaveResult>("match:leave", {
      matchId: this.session.matchId,
    });
    this.session = {
      active: false,
      matchId: null,
      playerId: null,
      playerName: null,
      hostPlayerId: null,
      isConnected: this.socket?.connected ?? false,
    };
    this.latestStateVersion = 1;
  }

  async startMatch() {
    if (!this.session.active || !this.session.matchId || !this.session.playerId) {
      throw new Error("No active multiplayer session");
    }
    const result = await this.emitAck<MatchStartResult>("match:start", {
      matchId: this.session.matchId,
      playerId: this.session.playerId,
    });
    this.latestStateVersion = result.state.stateVersion;
    return result;
  }

  async setReady(ready: boolean) {
    if (!this.session.active || !this.session.matchId || !this.session.playerId) {
      throw new Error("No active multiplayer session");
    }
    const result = await this.emitAck<MatchReadyResult>("match:ready", {
      matchId: this.session.matchId,
      playerId: this.session.playerId,
      ready,
    });
    this.latestStateVersion = result.state.stateVersion;
    return result;
  }

  async submitAction(action: RealtimeAction) {
    if (
      !this.session.active ||
      !this.session.matchId ||
      !this.session.playerId
    ) {
      throw new Error("No active multiplayer session");
    }
    const actionId = `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const result = await this.emitAck<ActionSubmitResult>("action:submit", {
      matchId: this.session.matchId,
      playerId: this.session.playerId,
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
      playerName: null,
      hostPlayerId: null,
      isConnected: false,
    };
    this.latestStateVersion = 1;
  }

  clearSession() {
    this.session = {
      active: false,
      matchId: null,
      playerId: null,
      playerName: null,
      hostPlayerId: null,
      isConnected: this.socket?.connected ?? false,
    };
    this.latestStateVersion = 1;
  }

  private async resync(matchId: string) {
    const response = await this.emitAck<ResyncRequestResult>(
      "state:resync_request",
      { matchId },
    );
    this.latestStateVersion = response.state.stateVersion;
    this.listeners.onSnapshot?.(response.state);
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
          payload as { name: string; maxPlayers?: number },
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
          payload as { name: string; maxPlayers?: number },
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
          payload as { matchId: string; name: string },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      if (event === "match:leave") {
        socket.emit(event, payload as { matchId: string }, (response) => {
          clearTimeout(timeout);
          this.resolveAck(response as AckResponse<T>, resolve, reject);
        });
        return;
      }
      if (event === "action:submit") {
        socket.emit(
          event,
          payload as {
            matchId: string;
            playerId: string;
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
          payload as { matchId: string; playerId: string },
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
          payload as { matchId: string; playerId: string; ready: boolean },
          (response) => {
            clearTimeout(timeout);
            this.resolveAck(response as AckResponse<T>, resolve, reject);
          },
        );
        return;
      }
      socket.emit(event, payload as { matchId: string }, (response) => {
        clearTimeout(timeout);
        this.resolveAck(response as AckResponse<T>, resolve, reject);
      });
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
}

export const realtimeClient = new RealtimeClient();
