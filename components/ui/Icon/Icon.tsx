import { ComponentType } from 'react';
import { ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface IconProps {
  icon: ComponentType<SvgProps>;
  size?: number;
  color?: string;
  fill?: string;
  style?: ViewStyle;
}

export function Icon({
  icon: IconComponent,
  size = 20,
  color = '#FFFFFF',
  fill,
  style,
}: IconProps) {
  return (
    <IconComponent
      width={size}
      height={size}
      color={color}
      fill={fill}
      style={style}
    />
  );
}
