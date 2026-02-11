import { useMemo } from "react";
import { TextInput, View } from "react-native";
import { InputProps } from "./types";
import { createInputStyles } from "./input.styles";
import { useTheme } from "@/hooks/useTheme";

export function Input({
  containerStyle,
  inputStyle,
  ...rest
}: InputProps) {
  const { theme, isFontScalingEnabled } = useTheme();
  const inputStyles = useMemo(() => createInputStyles(theme), [theme]);
  const placeholderTextColor =
    rest.placeholderTextColor ?? theme.colors.textSubtle;
  const allowFontScaling = rest.allowFontScaling ?? isFontScalingEnabled;
  return (
    <View style={[inputStyles.container, containerStyle]}>
      <TextInput
        {...rest}
        allowFontScaling={allowFontScaling}
        placeholderTextColor={placeholderTextColor}
        style={[inputStyles.input, inputStyle]}
      />
    </View>
  );
}
