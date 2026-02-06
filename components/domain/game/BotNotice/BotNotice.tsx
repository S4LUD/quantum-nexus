import { Animated, Easing, View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { createBotNoticeStyles } from "./botNotice.styles";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useMemo, useRef } from "react";

export type BotNoticeItem = {
  id: number;
  message: string;
};

interface BotNoticeProps {
  messages: BotNoticeItem[];
}

export function BotNotice({ messages }: BotNoticeProps) {
  const { theme } = useTheme();
  const botNoticeStyles = useMemo(
    () => createBotNoticeStyles(theme),
    [theme],
  );
  const visibilityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(visibilityAnim, {
      toValue: messages.length > 0 ? 1 : 0,
      duration: 260,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [messages.length, visibilityAnim]);

  const animatedContainerStyle = useMemo(
    () => ({
      opacity: visibilityAnim,
      transform: [
        {
          translateY: visibilityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, 0],
          }),
        },
      ],
    }),
    [visibilityAnim],
  );

  if (messages.length === 0) {
    return null;
  }

  const noticeCards = messages.map((notice) => (
    <View key={notice.id} style={botNoticeStyles.card}>
      <Text style={botNoticeStyles.text}>{notice.message}</Text>
    </View>
  ));

  return (
    <Animated.View
      style={[botNoticeStyles.container, animatedContainerStyle]}
      pointerEvents="none"
    >
      {noticeCards}
    </Animated.View>
  );
}
