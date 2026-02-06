import { Pressable, View } from "react-native";
import { Grid3x3, Zap, Users } from "lucide-react-native";
import { createGameTabsStyles } from "./gameTabs.styles";
import { Icon } from "@/components/ui/Icon/Icon";
import { Text } from "@/components/ui/Text/Text";
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";
import { colors } from "@/constants/colors";
import { useTranslation } from "react-i18next";

export type GameTab = "market" | "protocols" | "players";

interface GameTabsProps {
  selectedTab: GameTab;
  onTabChange: (tab: GameTab) => void;
  marketBadgeCount?: number;
  protocolsBadgeCount?: number;
  playersBadgeCount?: number;
}

export function GameTabs({
  selectedTab,
  onTabChange,
  marketBadgeCount = 0,
  protocolsBadgeCount = 0,
  playersBadgeCount = 0,
}: GameTabsProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const gameTabsStyles = useMemo(() => createGameTabsStyles(theme), [theme]);
  const tabs: {
    key: GameTab;
    label: string;
    icon: typeof Grid3x3;
    accent: string;
    badgeCount: number;
  }[] = useMemo(
    () => [
      {
        key: "market",
        label: t("tabs.market"),
        icon: Grid3x3,
        accent: colors.cyan400,
        badgeCount: marketBadgeCount,
      },
      {
        key: "protocols",
        label: t("tabs.protocols"),
        icon: Zap,
        accent: colors.purple400,
        badgeCount: protocolsBadgeCount,
      },
      {
        key: "players",
        label: t("tabs.players"),
        icon: Users,
        accent: colors.green400,
        badgeCount: playersBadgeCount,
      },
    ],
    [marketBadgeCount, protocolsBadgeCount, playersBadgeCount, t],
  );

  const formatBadge = (count: number) => (count > 9 ? "9+" : String(count));

  const tabItems = tabs.map((tab) => {
    const isActive = selectedTab === tab.key;
    const handlePress = () => {
      onTabChange(tab.key);
    };

    return (
      <Pressable
        key={tab.key}
        onPress={handlePress}
        style={[gameTabsStyles.tab, isActive ? gameTabsStyles.tabActive : null]}
      >
        <View style={gameTabsStyles.tabContent}>
          <Icon
            icon={tab.icon}
            size={14}
            color={isActive ? tab.accent : theme.colors.textMuted}
            style={isActive ? gameTabsStyles.tabIconActive : gameTabsStyles.tabIcon}
            fill="none"
          />
          <Text
            variant="caption"
            style={isActive ? gameTabsStyles.tabLabelActive : gameTabsStyles.tabLabel}
          >
            {tab.label}
          </Text>
        </View>
        {tab.badgeCount > 0 ? (
          <View style={gameTabsStyles.badge}>
            <Text style={gameTabsStyles.badgeText}>
              {formatBadge(tab.badgeCount)}
            </Text>
          </View>
        ) : null}
      </Pressable>
    );
  });

  return <View style={gameTabsStyles.container}>{tabItems}</View>;
}

export default GameTabs;
