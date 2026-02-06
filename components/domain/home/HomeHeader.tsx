import { useMemo } from "react";
import { View } from "react-native";
import { createHomeStyles } from "./home.styles";
import { Text } from "@/components/ui/Text/Text";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

export function HomeHeader() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const homeStyles = useMemo(() => createHomeStyles(theme), [theme]);

  return (
    <View style={homeStyles.header}>
      <Text variant="title">{t("home.title")}</Text>
      <Text variant="caption">{t("home.subtitle")}</Text>
    </View>
  );
}

export default HomeHeader;
