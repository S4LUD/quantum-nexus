import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@/components/ui/Modal/BaseModal";
import { Button } from "@/components/ui/Button/Button";
import { Text } from "@/components/ui/Text/Text";
import { useTheme } from "@/hooks/useTheme";
import { createBeginnerHelpModalStyles } from "./beginnerHelpModal.styles";

export type BeginnerHelpTopic =
  | "energyPool"
  | "marketNodes"
  | "protocols"
  | "players";

interface BeginnerHelpModalProps {
  isOpen: boolean;
  topic: BeginnerHelpTopic | null;
  onClose: () => void;
}

const TOPIC_LINES: Record<BeginnerHelpTopic, string[]> = {
  energyPool: ["line1", "line2", "line3", "line4"],
  marketNodes: ["line1", "line2", "line3", "line4", "line5"],
  protocols: ["line1", "line2", "line3", "line4"],
  players: ["line1", "line2", "line3", "line4"],
};

export function BeginnerHelpModal({
  isOpen,
  topic,
  onClose,
}: BeginnerHelpModalProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const beginnerHelpModalStyles = useMemo(
    () => createBeginnerHelpModalStyles(theme),
    [theme],
  );

  if (!topic) {
    return null;
  }

  const topicPrefix = `beginnerHelp.${topic}`;
  const title = t(`${topicPrefix}.title`);
  const lines = TOPIC_LINES[topic].map((lineKey) =>
    t(`${topicPrefix}.${lineKey}`),
  );

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <View style={beginnerHelpModalStyles.card}>
        <Text style={beginnerHelpModalStyles.title}>{title}</Text>
        <ScrollView
          style={beginnerHelpModalStyles.bodyScroll}
          contentContainerStyle={beginnerHelpModalStyles.body}
          showsVerticalScrollIndicator={false}
        >
          {lines.map((line) => (
            <Text key={line} style={beginnerHelpModalStyles.line}>
              {line}
            </Text>
          ))}
        </ScrollView>
        <Button label={t("tutorial.gotIt")} onPress={onClose} />
      </View>
    </BaseModal>
  );
}
