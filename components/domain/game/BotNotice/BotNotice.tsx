import { View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { createBotNoticeStyles } from "./botNotice.styles";
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";

interface BotNoticeProps {
  message: string;
}

export function BotNotice({ message }: BotNoticeProps) {
  const { theme } = useTheme();
  const botNoticeStyles = useMemo(
    () => createBotNoticeStyles(theme),
    [theme],
  );

  if (!message) {
    return null;
  }

  return (
    <View style={botNoticeStyles.container}>
      <Text style={botNoticeStyles.text}>{message}</Text>
    </View>
  );
}
