import { Button } from "@/components/ui/Button/Button";
import { Text } from "@/components/ui/Text/Text";
import { View } from "react-native";
import { themeToggleStyles } from "./themeToggle.styles";
import { useTranslation } from "react-i18next";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  const { t } = useTranslation();
  const label = isDarkMode
    ? t("settings.disableDarkMode")
    : t("settings.enableDarkMode");

  return (
    <View style={themeToggleStyles.container}>
      <Text variant="subtitle">{t("settings.theme")}</Text>
      <Button label={label} onPress={onToggle} variant="secondary" />
    </View>
  );
}
