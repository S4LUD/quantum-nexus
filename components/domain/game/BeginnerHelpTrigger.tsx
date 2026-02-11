import { useMemo } from "react";
import { Pressable } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { useTheme } from "@/hooks/useTheme";
import { createBeginnerHelpTriggerStyles } from "./beginnerHelpTrigger.styles";

interface BeginnerHelpTriggerProps {
  onPress: () => void;
  accessibilityLabel: string;
}

export function BeginnerHelpTrigger({
  onPress,
  accessibilityLabel,
}: BeginnerHelpTriggerProps) {
  const { theme } = useTheme();
  const beginnerHelpTriggerStyles = useMemo(
    () => createBeginnerHelpTriggerStyles(theme),
    [theme],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={beginnerHelpTriggerStyles.button}
    >
      <Text style={beginnerHelpTriggerStyles.label}>?</Text>
    </Pressable>
  );
}
