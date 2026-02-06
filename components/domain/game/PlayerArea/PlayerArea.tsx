import { ENERGY_LIMIT } from "@/logic/rules";
import { calculatePlayerOutputs, getTotalEnergy } from "@/logic/selectors";
import { canAffordNode } from "@/logic/gameEngine";
import { useCallback, useMemo } from "react";
import { View } from "react-native";
import { Star } from "lucide-react-native";
import { EnergyIcon, EnergyBadge } from "../EnergyPool/EnergyIcon";
import { Player, EnergyType, Node } from "../game.types";
import { NodeCard } from "../NodeCard/NodeCard";
import { ProtocolCard } from "../ProtocolCard/ProtocolCard";
import { createPlayerAreaStyles } from "./playerArea.styles";
import { Text } from "@/components/ui/Text/Text";
import { Icon } from "@/components/ui/Icon/Icon";
import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { getLocalizedPlayerName } from "@/utils/helpers";

interface PlayerAreaProps {
  player: Player;
  isCurrentPlayer: boolean;
  compact?: boolean;
  onReservedNodePress?: (node: Node) => void;
  disabled?: boolean;
}

export function PlayerArea({
  player,
  isCurrentPlayer,
  compact = false,
  onReservedNodePress,
  disabled = false,
}: PlayerAreaProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const playerAreaStyles = useMemo(
    () => createPlayerAreaStyles(theme),
    [theme],
  );
  const displayName = useMemo(
    () => getLocalizedPlayerName(player.name, t),
    [player.name, t],
  );
  const outputs = calculatePlayerOutputs(player);
  const totalEnergy = getTotalEnergy(player);
  const energyEntries = Object.entries(player.energy) as [EnergyType, number][];
  const renderReservedNode = useCallback(
    (node: Node) => {
      const handlePress = onReservedNodePress
        ? () => onReservedNodePress(node)
        : undefined;
      return (
        <NodeCard
          key={node.id}
          node={node}
          size="sm"
          onPress={handlePress}
          isAffordable={
            isCurrentPlayer && !player.isBot && canAffordNode(node, player)
          }
        />
      );
    },
    [isCurrentPlayer, onReservedNodePress, player],
  );

  if (compact) {
    const compactContainerStyles = [
      playerAreaStyles.compactContainer,
      isCurrentPlayer ? playerAreaStyles.compactActive : null,
      disabled ? playerAreaStyles.compactDisabled : null,
    ];

    return (
      <View style={compactContainerStyles}>
        <View style={playerAreaStyles.compactHeader}>
          <View>
            <Text variant="subtitle">{displayName}</Text>
            <View style={playerAreaStyles.compactEfficiencyRow}>
              <Text variant="caption">{player.efficiency}</Text>
              <Icon
                icon={Star}
                size={layout.icon.sm}
                color={colors.yellow400}
                fill="none"
              />
              <Text variant="caption">{t("game.efficiency")}</Text>
            </View>
          </View>
          <View>
            <Text variant="caption">{t("game.nodes")}</Text>
            <Text variant="subtitle">{String(player.nodes.length)}</Text>
          </View>
        </View>
        <View style={playerAreaStyles.compactEnergyRow}>
          {energyEntries.map(([type, count]) =>
            count > 0 ? (
              <EnergyIcon key={type} type={type} size="sm" count={count} />
            ) : null,
          )}
        </View>
      </View>
    );
  }

  const containerStyles = [
    playerAreaStyles.container,
    isCurrentPlayer ? playerAreaStyles.activeContainer : null,
    disabled ? playerAreaStyles.containerDisabled : null,
  ];

  return (
    <View style={containerStyles}>
      <View style={playerAreaStyles.header}>
        <View>
          <Text variant="title">{displayName}</Text>
          {isCurrentPlayer ? (
            <Text style={playerAreaStyles.turnTag}>
              {t("playerArea.yourTurn")}
            </Text>
          ) : null}
        </View>
        <View style={playerAreaStyles.efficiencyBlock}>
          <Text style={playerAreaStyles.efficiencyValue}>
            {String(player.efficiency)}
          </Text>
          <Text style={playerAreaStyles.efficiencyLabel}>
            {t("game.efficiency")}
          </Text>
        </View>
      </View>

      <View style={playerAreaStyles.statsRow}>
        <View style={playerAreaStyles.statCard}>
          <Text variant="subtitle">{String(player.nodes.length)}</Text>
          <Text variant="caption">{t("game.nodes")}</Text>
        </View>
        <View style={playerAreaStyles.statCard}>
          <Text variant="subtitle">{String(player.protocols.length)}</Text>
          <Text variant="caption">{t("game.protocols")}</Text>
        </View>
        <View style={playerAreaStyles.statCard}>
          <Text variant="subtitle">
            {String(totalEnergy)}/{String(ENERGY_LIMIT)}
          </Text>
          <Text variant="caption">{t("game.energy")}</Text>
        </View>
      </View>

      <View style={playerAreaStyles.section}>
        <Text style={playerAreaStyles.sectionLabel}>
          {t("playerArea.energyHeld")}
        </Text>
        <View style={playerAreaStyles.badgeRow}>
          {energyEntries.map(([type, count]) => (
            <EnergyBadge key={type} type={type} count={count} size="sm" />
          ))}
        </View>
      </View>

      <View style={playerAreaStyles.section}>
        <Text style={playerAreaStyles.sectionLabel}>
          {t("game.outputGeneration")}
        </Text>
        <View style={playerAreaStyles.outputRow}>
          {Object.entries(outputs).map(([type, count]) => (
            <View key={type} style={playerAreaStyles.outputItem}>
              <EnergyIcon type={type as EnergyType} size="sm" colored />
              <Text style={playerAreaStyles.outputValue}>x{String(count)}</Text>
            </View>
          ))}
        </View>
      </View>

      {player.nodes.length > 0 ? (
        <View style={playerAreaStyles.section}>
          <Text style={playerAreaStyles.sectionLabel}>
            {t("playerArea.ownedNodes", { count: player.nodes.length })}
          </Text>
          <View style={playerAreaStyles.horizontalRow}>
            {player.nodes.slice(0, 5).map((node) => (
              <NodeCard key={node.id} node={node} size="sm" showCost={false} />
            ))}
          </View>
        </View>
      ) : null}

      {player.reservedNodes.length > 0 ? (
        <View style={playerAreaStyles.section}>
          <Text style={playerAreaStyles.sectionLabel}>
            {t("playerArea.reservedNodes", {
              count: player.reservedNodes.length,
              max: 3,
            })}
          </Text>
          <View style={playerAreaStyles.horizontalRow}>
            {player.reservedNodes.map(renderReservedNode)}
          </View>
        </View>
      ) : null}

      {player.protocols.length > 0 ? (
        <View style={playerAreaStyles.section}>
          <Text style={playerAreaStyles.sectionLabel}>
            {t("playerArea.claimedProtocols")}
          </Text>
          <View style={playerAreaStyles.protocolList}>
            {player.protocols.map((protocol) => (
              <ProtocolCard key={protocol.id} protocol={protocol} compact />
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}
