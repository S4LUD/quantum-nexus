import { StyleProp, TextStyle, TextProps as RNTextProps } from 'react-native';
import { ReactNode } from 'react';

export type TextVariant = 'body' | 'title' | 'subtitle' | 'caption';

export interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
  numberOfLines?: RNTextProps["numberOfLines"];
  ellipsizeMode?: RNTextProps["ellipsizeMode"];
}
