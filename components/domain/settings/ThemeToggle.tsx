import { Button } from "@/components/ui/Button/Button";
import { Text } from "@/components/ui/Text/Text";
import { View } from "react-native";
import { themeToggleStyles } from "./themeToggle.styles";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  const label = isDarkMode ? "Disable Dark Mode" : "Enable Dark Mode";

  return (
    <View style={themeToggleStyles.container}>
      <Text variant="subtitle">Theme</Text>
      <Button label={label} onPress={onToggle} variant="secondary" />
    </View>
  );
}
