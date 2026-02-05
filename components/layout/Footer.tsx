import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { footerStyles } from './footer.styles';

interface FooterProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function Footer({ children, style }: FooterProps) {
  return <View style={[footerStyles.container, style]}>{children}</View>;
}
