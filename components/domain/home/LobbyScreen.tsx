import { useMemo } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { useTheme } from "@/hooks/useTheme";
import { createLobbyScreenStyles } from "./lobbyScreen.styles";
import { Player } from "@/types/game";
import { useTranslation } from "react-i18next";

interface LobbyScreenProps {
  activeMatchId: string | null;
  lobbyPlayers: Player[];
  hostPlayerId: string | null;
  localPlayerId: string | null;
  isSubmitting: boolean;
  errorMessage: string;
  onStartMatch: () => void;
  onLeaveLobby: () => void;
  onToggleReady: () => void;
}

interface LobbyPlayerCardProps {
  player: Player;
  statusLabel: string;
}

function LobbyPlayerCard({ player, statusLabel }: LobbyPlayerCardProps) {
  const { theme } = useTheme();
  const lobbyScreenStyles = useMemo(
    () => createLobbyScreenStyles(theme),
    [theme],
  );
  return (
    <View style={lobbyScreenStyles.playerCard}>
      <Text style={lobbyScreenStyles.playerName}>{player.name}</Text>
      <View style={lobbyScreenStyles.playerActions}>
        <Text style={lobbyScreenStyles.playerStatus}>{statusLabel}</Text>
      </View>
    </View>
  );
}

export function LobbyScreen({
  activeMatchId,
  lobbyPlayers,
  hostPlayerId,
  localPlayerId,
  isSubmitting,
  errorMessage,
  onStartMatch,
  onLeaveLobby,
  onToggleReady,
}: LobbyScreenProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const lobbyScreenStyles = useMemo(
    () => createLobbyScreenStyles(theme),
    [theme],
  );

  const isHost = Boolean(hostPlayerId && localPlayerId === hostPlayerId);
  const hasEnoughPlayers = lobbyPlayers.length >= 2;
  const allNonHostReady = lobbyPlayers.every((player) =>
    player.id === hostPlayerId ? true : player.isReady,
  );
  const canStart = hasEnoughPlayers && allNonHostReady;
  const localPlayerReady = lobbyPlayers.find(
    (player) => player.id === localPlayerId,
  )?.isReady;

  const playerCards = useMemo(
    () =>
      lobbyPlayers.map((player) => {
        const statusLabel = player.isReady
          ? t("lobby.ready")
          : t("lobby.notReady");
        return (
          <LobbyPlayerCard
            key={player.id}
            player={player}
            statusLabel={statusLabel}
          />
        );
      }),
    [lobbyPlayers, t],
  );

  return (
    <View style={lobbyScreenStyles.container}>
      <View style={lobbyScreenStyles.lobbyCard}>
        <Text style={lobbyScreenStyles.sectionLabelCentered}>
          {t("lobby.lobbyIdLabel")}
        </Text>
        <Text style={lobbyScreenStyles.lobbyIdValue}>
          {activeMatchId || "-"}
        </Text>
        <Text style={lobbyScreenStyles.sectionLabel}>
          {t("lobby.playersLabel")}
        </Text>
        <View style={lobbyScreenStyles.lobbyPlayers}>{playerCards}</View>
        <Text style={lobbyScreenStyles.waitingText}>
          {t("lobby.waitingReady")}
        </Text>
        {isHost ? (
          <Button
            label={isSubmitting ? t("lobby.starting") : t("lobby.startMatch")}
            onPress={onStartMatch}
            disabled={isSubmitting || !canStart}
          />
        ) : (
          <Button
            label={
              isSubmitting
                ? t("lobby.updatingReady")
                : localPlayerReady
                  ? t("lobby.unready")
                  : t("lobby.readyUp")
            }
            onPress={onToggleReady}
            disabled={isSubmitting}
          />
        )}
        <Button
          label={isSubmitting ? t("lobby.leaving") : t("lobby.leaveLobby")}
          variant="secondary"
          onPress={onLeaveLobby}
          disabled={isSubmitting}
        />
      </View>

      {errorMessage.length > 0 ? (
        <Text style={lobbyScreenStyles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}
