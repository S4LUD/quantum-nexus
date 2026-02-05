import { Text as RNText } from 'react-native';
import { TextProps } from './types';
import { textStyles } from './text.styles';

const variantMap = {
  body: textStyles.body,
  title: textStyles.title,
  subtitle: textStyles.subtitle,
  caption: textStyles.caption,
};

export function Text({ children, variant = 'body', style }: TextProps) {
  const variantStyle = variantMap[variant];

  return <RNText style={[variantStyle, style]}>{children}</RNText>;
}
