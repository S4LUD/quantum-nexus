import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { cardStyles } from './card.styles';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return <View style={[cardStyles.container, style]}>{children}</View>;
}
