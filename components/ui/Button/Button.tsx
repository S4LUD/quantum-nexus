import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "@/constants/colors";
import { buttonStyles } from "./button.styles";
import { Text } from "../Text/Text";
import { ButtonProps } from "./types";

const gradientMap = {
  primary: gradients.primaryButton,
  secondary: gradients.secondaryButton,
};

export function Button({
  label,
  onPress,
  variant = "primary",
  containerStyle,
  textStyle,
  disabled = false,
}: ButtonProps) {
  const gradientColors = gradientMap[variant];
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
