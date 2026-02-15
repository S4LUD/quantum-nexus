import { NodeCategory } from "@/components/domain/game/game.types";
import { colors } from "@/constants/colors";
import Svg, { Circle, Path, Rect } from "react-native-svg";

interface CategoryBadgeProps {
  category: NodeCategory;
  size?: number;
}

const CATEGORY_COLORS: Record<NodeCategory, string> = {
  research: colors.cyan500,
  production: colors.pink500,
  network: colors.orange500,
  control: colors.green500,
};

export function CategoryBadge({ category, size = 24 }: CategoryBadgeProps) {
  const stroke = colors.whiteAlpha90;
  const fill = CATEGORY_COLORS[category];

  if (category === "research") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="11" fill={fill} />
        <Circle cx="12" cy="12" r="4.5" stroke={stroke} strokeWidth="1.5" />
        <Circle cx="6.5" cy="12" r="1.5" fill={stroke} />
        <Circle cx="17.5" cy="12" r="1.5" fill={stroke} />
      </Svg>
    );
  }

  if (category === "production") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="11" fill={fill} />
        <Rect x="5" y="12" width="3" height="6" rx="1" fill={stroke} />
        <Rect x="10.5" y="9" width="3" height="9" rx="1" fill={stroke} />
        <Rect x="16" y="6" width="3" height="12" rx="1" fill={stroke} />
      </Svg>
    );
  }

  if (category === "network") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="11" fill={fill} />
        <Path
          d="M7 8h10l-4 5h4l-10 3 4-5H7Z"
          fill={stroke}
          stroke={stroke}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="11" fill={fill} />
      <Path
        d="M12 5 7 8v4c0 3 2.2 5.7 5 6.6 2.8-.9 5-3.6 5-6.6V8l-5-3Z"
        fill={stroke}
      />
    </Svg>
  );
}
