import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { headerStyles } from './header.styles';

interface HeaderProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function Header({ children, style }: HeaderProps) {
  return <View style={[headerStyles.container, style]}>{children}</View>;
}
