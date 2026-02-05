import { TextInput, View } from 'react-native';
import { InputProps } from './types';
import { inputStyles } from './input.styles';

export function Input({ containerStyle, inputStyle, ...rest }: InputProps) {
  return (
    <View style={[inputStyles.container, containerStyle]}>
      <TextInput {...rest} style={[inputStyles.input, inputStyle]} />
    </View>
  );
}
