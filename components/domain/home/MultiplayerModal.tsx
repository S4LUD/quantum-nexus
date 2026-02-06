import { useCallback, useMemo } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@/components/ui/Text/Text";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { createMultiplayerModalStyles } from "./multiplayerModal.styles";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

interface MultiplayerModalProps {
  playerName: string;
  matchId: string;
  errorMessage: string;
  isSubmitting: boolean;
  onPlayerNameChange: (value: string) => void;
  onMatchIdChange: (value: string) => void;
  onCreate: () => void;
  onJoin: () => void;
}

export function MultiplayerModal({
  playerName,
  matchId,
  errorMessage,
  isSubmitting,
  onPlayerNameChange,
  onMatchIdChange,
  onCreate,
  onJoin,
}: MultiplayerModalProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createMultiplayerModalStyles(theme), [theme]);

  const handleCreate = useCallback(() => {
    onCreate();
  }, [onCreate]);

  const handleJoin = useCallback(() => {
    onJoin();
  }, [onJoin]);

  return (
    <LinearGradient colors={theme.gradients.modalBackground} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("menu.multiplayer")}</Text>
        <Text style={styles.subtitle}>{t("menu.multiplayerSubtitle")}</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Player Name</Text>
          <Input
            value={playerName}
            onChangeText={onPlayerNameChange}
            editable={!isSubmitting}
            autoCapitalize="words"
            placeholder="Your Name"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Match ID</Text>
          <Input
            value={matchId}
            onChangeText={onMatchIdChange}
            editable={!isSubmitting}
            autoCapitalize="none"
            placeholder="Enter Match ID to join"
          />
        </View>

        {errorMessage.length > 0 ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.actions}>
          <Button
            label={isSubmitting ? "Connecting..." : "Create Match"}
            onPress={handleCreate}
            disabled={isSubmitting || playerName.trim().length === 0}
          />
          <Button
            label={isSubmitting ? "Connecting..." : "Join Match"}
            onPress={handleJoin}
            variant="secondary"
            disabled={
              isSubmitting ||
              playerName.trim().length === 0 ||
              matchId.trim().length === 0
            }
          />
        </View>
      </View>
    </LinearGradient>
  );
}
