import { View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { botNoticeStyles } from "./botNotice.styles";

interface BotNoticeProps {
  message: string;
}

export function BotNotice({ message }: BotNoticeProps) {
  if (!message) {
    return null;
  }

  return (
    <View style={botNoticeStyles.container}>
      <Text style={botNoticeStyles.text}>{message}</Text>
    </View>
  );
}
