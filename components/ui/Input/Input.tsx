import { useMemo } from "react";
import { TextInput, View } from "react-native";
import { InputProps } from "./types";
import { createInputStyles } from "./input.styles";
import { useTheme } from "@/hooks/useTheme";

export function Input({ containerStyle, inputStyle, ...rest }: InputProps) {
  const { theme } = useTheme();
  const inputStyles = useMemo(() => createInputStyles(theme), [theme]);
  return (
    <View style={[inputStyles.container, containerStyle]}>
      <TextInput {...rest} style={[inputStyles.input, inputStyle]} />
    </View>
  );
}
