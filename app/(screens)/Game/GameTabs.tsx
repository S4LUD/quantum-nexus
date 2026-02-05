import { Pressable, View } from "react-native";
import { Grid3x3, Zap, Users } from "lucide-react-native";
import { gameTabsStyles } from "./gameTabs.styles";
import { colors } from "@/constants/colors";
import { Icon } from "@/components/ui/Icon/Icon";
import { Text } from "@/components/ui/Text/Text";

export type GameTab = "market" | "protocols" | "players";

interface GameTabsProps {
  selectedTab: GameTab;
  onTabChange: (tab: GameTab) => void;
}

export function GameTabs({ selectedTab, onTabChange }: GameTabsProps) {
  const tabs: { key: GameTab; label: string; icon: typeof Grid3x3 }[] = [
    { key: "market", label: "Market", icon: Grid3x3 },
    { key: "protocols", label: "Protocols", icon: Zap },
    { key: "players", label: "Players", icon: Users },
  ];

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
          <Icon icon={tab.icon} size={14} color={colors.white} />
          <Text variant="caption">{tab.label}</Text>
        </View>
      </Pressable>
    );
  });

  return <View style={gameTabsStyles.container}>{tabItems}</View>;
}

export default GameTabs;
