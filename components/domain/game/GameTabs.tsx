import { Animated, LayoutChangeEvent, Pressable, View } from "react-native";
import { Grid3x3, Zap, Users } from "lucide-react-native";
import { createGameTabsStyles } from "./gameTabs.styles";
import { Icon } from "@/components/ui/Icon/Icon";
import { Text } from "@/components/ui/Text/Text";
import { useTheme } from "@/hooks/useTheme";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { colors } from "@/constants/colors";
import { useTranslation } from "react-i18next";
import { animations } from "@/constants/animations";

export type GameTab = "market" | "protocols" | "players";

interface GameTabsProps {
  selectedTab: GameTab;
  onTabChange: (tab: GameTab) => void;
  marketBadgeCount?: number;
  protocolsBadgeCount?: number;
  playersBadgeCount?: number;
  onTabMeasured?: (
    tab: GameTab,
    layout: { centerX: number; centerY: number; width: number; height: number },
  ) => void;
  playersPulseKey?: number;
}

export function GameTabs({
  selectedTab,
  onTabChange,
  marketBadgeCount = 0,
  protocolsBadgeCount = 0,
  playersBadgeCount = 0,
  onTabMeasured,
  playersPulseKey = 0,
}: GameTabsProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const gameTabsStyles = useMemo(() => createGameTabsStyles(theme), [theme]);
  const tabRefs = useRef<Record<GameTab, View | null>>({
    market: null,
    protocols: null,
    players: null,
  });
  const playerTabScale = useRef(new Animated.Value(1)).current;
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
  const setMarketRef = useCallback((node: View | null) => {
    tabRefs.current.market = node;
  }, []);
  const setProtocolsRef = useCallback((node: View | null) => {
    tabRefs.current.protocols = node;
  }, []);
  const setPlayersRef = useCallback((node: View | null) => {
    tabRefs.current.players = node;
  }, []);

  const refHandlers: Record<GameTab, (node: View | null) => void> = useMemo(
    () => ({
      market: setMarketRef,
      protocols: setProtocolsRef,
      players: setPlayersRef,
    }),
    [setMarketRef, setPlayersRef, setProtocolsRef],
  );

  const measureTab = useCallback(
    (tab: GameTab) => {
      if (!onTabMeasured) {
        return;
      }
      const ref = tabRefs.current[tab];
      if (!ref) {
        return;
      }
      ref.measureInWindow((x, y, width, height) => {
        onTabMeasured(tab, {
          centerX: x + width / 2,
          centerY: y + height / 2,
          width,
          height,
        });
      });
    },
    [onTabMeasured],
  );

  const handleMarketLayout = useCallback(
    (_event: LayoutChangeEvent) => {
      measureTab("market");
    },
    [measureTab],
  );
  const handleProtocolsLayout = useCallback(
    (_event: LayoutChangeEvent) => {
      measureTab("protocols");
    },
    [measureTab],
  );
  const handlePlayersLayout = useCallback(
    (_event: LayoutChangeEvent) => {
      measureTab("players");
    },
    [measureTab],
  );
  const layoutHandlers: Record<GameTab, (event: LayoutChangeEvent) => void> =
    useMemo(
      () => ({
        market: handleMarketLayout,
        protocols: handleProtocolsLayout,
        players: handlePlayersLayout,
      }),
      [handleMarketLayout, handlePlayersLayout, handleProtocolsLayout],
    );

  useEffect(() => {
    measureTab("market");
    measureTab("protocols");
    measureTab("players");
  }, [measureTab, selectedTab]);

  useEffect(() => {
    if (playersPulseKey <= 0) {
      return;
    }
    playerTabScale.setValue(1);
    Animated.sequence([
      Animated.timing(playerTabScale, {
        toValue: animations.tabPulseScale,
        duration: animations.tabPulseDuration,
        useNativeDriver: true,
      }),
      Animated.timing(playerTabScale, {
        toValue: 1,
        duration: animations.tabPulseDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [playerTabScale, playersPulseKey]);

  const tabItems = tabs.map((tab) => {
    const isActive = selectedTab === tab.key;
    const handlePress = () => {
      onTabChange(tab.key);
    };

    const tabItem = (
      <Pressable
        key={tab.key}
        ref={refHandlers[tab.key]}
        onLayout={layoutHandlers[tab.key]}
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

    if (tab.key === "players") {
      return (
        <Animated.View
          key={tab.key}
          style={[
            gameTabsStyles.playersPulseWrap,
            { transform: [{ scale: playerTabScale }] },
          ]}
        >
          {tabItem}
        </Animated.View>
      );
    }

    return tabItem;
  });

  return <View style={gameTabsStyles.container}>{tabItems}</View>;
}

export default GameTabs;
