import { ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  debounceMs?: number;
  disableDebounce?: boolean;
}
