import { ReactNode, useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { createCardStyles } from "./card.styles";
import { useTheme } from "@/hooks/useTheme";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  const { theme } = useTheme();
  const cardStyles = useMemo(() => createCardStyles(theme), [theme]);
  return <View style={[cardStyles.container, style]}>{children}</View>;
}
