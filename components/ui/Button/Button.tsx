import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { animations } from "@/constants/animations";
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
  debounceMs,
  disableDebounce = false,
}: ButtonProps) {
  const { theme } = useTheme();
  const buttonStyles = useMemo(() => createButtonStyles(theme), [theme]);
  const lastPressAtRef = useRef(0);
  const debounceWindowMs = debounceMs ?? animations.pressDebounce;
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
  const handlePress = useCallback(() => {
    if (disabled) {
      return;
    }
    if (disableDebounce) {
      onPress();
      return;
    }
    const now = Date.now();
    if (now - lastPressAtRef.current < debounceWindowMs) {
      return;
    }
    lastPressAtRef.current = now;
    onPress();
  }, [debounceWindowMs, disableDebounce, disabled, onPress]);

  return (
    <Pressable onPress={handlePress} disabled={disabled} style={pressableStyle}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={buttonStyles.gradient}
      >
        <Text
          style={[buttonStyles.label, textStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
