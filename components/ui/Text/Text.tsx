import { useMemo } from "react";
import { Text as RNText } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { TextProps } from "./types";
import { createTextStyles } from "./text.styles";

const variantMap = {
  body: (styles: ReturnType<typeof createTextStyles>) => styles.body,
  title: (styles: ReturnType<typeof createTextStyles>) => styles.title,
  subtitle: (styles: ReturnType<typeof createTextStyles>) => styles.subtitle,
  caption: (styles: ReturnType<typeof createTextStyles>) => styles.caption,
};

export function Text({
  children,
  variant = "body",
  style,
  numberOfLines,
  ellipsizeMode,
  allowFontScaling,
}: TextProps) {
  const { theme, isFontScalingEnabled } = useTheme();
  const textStyles = useMemo(() => createTextStyles(theme), [theme]);
  const variantStyle = variantMap[variant](textStyles);
  const resolvedAllowFontScaling = allowFontScaling ?? isFontScalingEnabled;

  return (
    <RNText
      style={[variantStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      allowFontScaling={resolvedAllowFontScaling}
    >
      {children}
    </RNText>
  );
}
