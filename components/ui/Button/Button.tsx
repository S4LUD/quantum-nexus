import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { useTheme } from "@/hooks/useTheme";
import { createButtonStyles } from "./button.styles";
import { Text } from "../Text/Text";
import { ButtonProps } from "./types";

export function Button({
  label,
  onPress,
  variant = "primary",
  containerStyle,
  textStyle,
  disabled = false,
}: ButtonProps) {
  const { theme } = useTheme();
  const buttonStyles = useMemo(() => createButtonStyles(theme), [theme]);
  const gradientColors =
    variant === "secondary"
      ? theme.gradients.secondaryButton
      : theme.gradients.primaryButton;
  const pressableStyle = [
    buttonStyles.container,
    buttonStyles[variant],
    disabled ? buttonStyles.disabled : null,
    containerStyle,
  ];

  return (
    <Pressable onPress={onPress} disabled={disabled} style={pressableStyle}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={buttonStyles.gradient}
      >
        <Text style={[buttonStyles.label, textStyle]}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}
