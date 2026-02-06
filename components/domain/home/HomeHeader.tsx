import { useMemo } from "react";
import { View } from "react-native";
import { createHomeStyles } from "./home.styles";
import { Text } from "@/components/ui/Text/Text";
import { useTheme } from "@/hooks/useTheme";

export function HomeHeader() {
  const { theme } = useTheme();
  const homeStyles = useMemo(() => createHomeStyles(theme), [theme]);

  return (
    <View style={homeStyles.header}>
      <Text variant="title">Quantum Nexus</Text>
      <Text variant="caption">Build your network</Text>
    </View>
  );
}

export default HomeHeader;
