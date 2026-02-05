import { TextInputProps, ViewStyle, TextStyle } from 'react-native';

export interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}
