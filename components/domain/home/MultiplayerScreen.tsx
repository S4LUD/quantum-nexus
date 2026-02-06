import { useMemo } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { useTheme } from "@/hooks/useTheme";
import { createMultiplayerScreenStyles } from "./multiplayerScreen.styles";
import { useTranslation } from "react-i18next";
interface MultiplayerScreenProps {
  playerName: string;
  matchId: string;
  isSubmitting: boolean;
  errorMessage: string;
  onChangePlayerName: (value: string) => void;
  onChangeMatchId: (value: string) => void;
  onQuickMatch: () => void;
  onCreateLobby: () => void;
  onJoinLobby: () => void;
  onBack: () => void;
}

export function MultiplayerScreen({
  playerName,
  matchId,
  isSubmitting,
  errorMessage,
  onChangePlayerName,
  onChangeMatchId,
  onQuickMatch,
  onCreateLobby,
  onJoinLobby,
  onBack,
}: MultiplayerScreenProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const multiplayerScreenStyles = useMemo(
    () => createMultiplayerScreenStyles(theme),
    [theme],
  );

  return (
    <View style={multiplayerScreenStyles.container}>
      <Text style={multiplayerScreenStyles.title}>
        {t("multiplayer.title")}
      </Text>
      <Text style={multiplayerScreenStyles.subtitle}>
        {t("multiplayer.subtitle")}
      </Text>
      <View style={multiplayerScreenStyles.actionsCard}>
        <View style={multiplayerScreenStyles.section}>
          <Text style={multiplayerScreenStyles.sectionLabel}>
            {t("multiplayer.playerNameLabel")}
          </Text>
          <Input
            value={playerName}
            onChangeText={onChangePlayerName}
            editable={!isSubmitting}
            autoCapitalize="words"
            autoCorrect={false}
            autoComplete="off"
            textContentType="name"
            placeholder={t("multiplayer.playerNamePlaceholder")}
          />
        </View>

        <Button
          label={
            isSubmitting
              ? t("multiplayer.connecting")
              : t("multiplayer.quickMatch")
          }
          onPress={onQuickMatch}
          disabled={isSubmitting || playerName.trim().length === 0}
        />

        <Button
          label={
            isSubmitting
              ? t("multiplayer.connecting")
              : t("multiplayer.createLobby")
          }
          variant="secondary"
          onPress={onCreateLobby}
          disabled={isSubmitting || playerName.trim().length === 0}
        />

        <View style={multiplayerScreenStyles.section}>
          <Text style={multiplayerScreenStyles.sectionLabel}>
            {t("multiplayer.joinLobbyLabel")}
          </Text>
          <Input
            value={matchId}
            onChangeText={onChangeMatchId}
            editable={!isSubmitting}
            autoCapitalize="characters"
            autoCorrect={false}
            autoComplete="off"
            textContentType="none"
            keyboardType="ascii-capable"
            returnKeyType="done"
            placeholder={t("multiplayer.joinLobbyPlaceholder")}
            maxLength={6}
          />
        </View>

        <Button
          label={
            isSubmitting
              ? t("multiplayer.connecting")
              : t("multiplayer.joinLobby")
          }
          onPress={onJoinLobby}
          disabled={
            isSubmitting ||
            playerName.trim().length === 0 ||
            matchId.trim().length === 0
          }
        />
      </View>

      {errorMessage.length > 0 ? (
        <Text style={multiplayerScreenStyles.errorText}>{errorMessage}</Text>
      ) : null}

      <Button
        label={t("common.back")}
        variant="secondary"
        onPress={onBack}
        disabled={isSubmitting}
      />
    </View>
  );
}
