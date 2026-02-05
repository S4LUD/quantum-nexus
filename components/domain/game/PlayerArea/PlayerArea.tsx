import { ENERGY_LIMIT } from "@/logic/rules";
import { calculatePlayerOutputs, getTotalEnergy } from "@/logic/selectors";
import { useCallback } from "react";
import { View } from "react-native";
import { Star } from "lucide-react-native";
import { EnergyIcon, EnergyBadge } from "../EnergyPool/EnergyIcon";
import { Player, EnergyType, Node } from "../game.types";
import { NodeCard } from "../NodeCard/NodeCard";
import { ProtocolCard } from "../ProtocolCard/ProtocolCard";
import { playerAreaStyles } from "./playerArea.styles";
import { Text } from "@/components/ui/Text/Text";
import { Icon } from "@/components/ui/Icon/Icon";
import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";

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
  const outputs = calculatePlayerOutputs(player);
  const totalEnergy = getTotalEnergy(player);
  const energyEntries = Object.entries(player.energy) as [EnergyType, number][];
  const renderReservedNode = useCallback(
    (node: Node) => {
      const handlePress = onReservedNodePress
        ? () => onReservedNodePress(node)
        : undefined;
      return (
        <NodeCard key={node.id} node={node} size="sm" onPress={handlePress} />
      );
    },
    [onReservedNodePress],
  );

  if (compact) {
    const compactStyles = [
      playerAreaStyles.compactContainer,
      isCurrentPlayer ? playerAreaStyles.compactActive : null,
      disabled ? playerAreaStyles.compactDisabled : null,
    ];
    return (
      <View style={compactStyles}>
        <View style={playerAreaStyles.compactHeader}>
          <View>
            <Text variant="subtitle">{player.name}</Text>
            <View style={playerAreaStyles.compactEfficiencyRow}>
              <Text variant="caption">{player.efficiency}</Text>
              <Icon icon={Star} size={layout.icon.sm} color={colors.yellow400} />
              <Text variant="caption">Efficiency</Text>
            </View>
          </View>
          <View>
            <Text variant="caption">Nodes</Text>
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
          <Text variant="title">{player.name}</Text>
          {isCurrentPlayer ? (
            <Text style={playerAreaStyles.turnTag}>YOUR TURN</Text>
          ) : null}
        </View>
        <View style={playerAreaStyles.efficiencyBlock}>
          <Text style={playerAreaStyles.efficiencyValue}>
            {String(player.efficiency)}
          </Text>
          <Text style={playerAreaStyles.efficiencyLabel}>Efficiency</Text>
        </View>
      </View>

      <View style={playerAreaStyles.statsRow}>
        <View style={playerAreaStyles.statCard}>
          <Text variant="subtitle">{String(player.nodes.length)}</Text>
          <Text variant="caption">Nodes</Text>
        </View>
        <View style={playerAreaStyles.statCard}>
          <Text variant="subtitle">{String(player.protocols.length)}</Text>
          <Text variant="caption">Protocols</Text>
        </View>
        <View style={playerAreaStyles.statCard}>
          <Text variant="subtitle">
            {String(totalEnergy)}/{String(ENERGY_LIMIT)}
          </Text>
          <Text variant="caption">Energy</Text>
        </View>
      </View>

      <View style={playerAreaStyles.section}>
        <Text style={playerAreaStyles.sectionLabel}>Energy Held</Text>
        <View style={playerAreaStyles.badgeRow}>
          {energyEntries.map(([type, count]) => (
            <EnergyBadge key={type} type={type} count={count} size="sm" />
          ))}
        </View>
      </View>

      <View style={playerAreaStyles.section}>
        <Text style={playerAreaStyles.sectionLabel}>Output Generation</Text>
        <View style={playerAreaStyles.outputRow}>
          {Object.entries(outputs).map(([type, count]) => (
            <View key={type} style={playerAreaStyles.outputItem}>
              <EnergyIcon type={type as EnergyType} size="sm" />
              <Text style={playerAreaStyles.outputValue}>x{String(count)}</Text>
            </View>
          ))}
        </View>
      </View>

      {player.nodes.length > 0 ? (
        <View style={playerAreaStyles.section}>
          <Text style={playerAreaStyles.sectionLabel}>
            Owned Nodes ({player.nodes.length})
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
            Reserved ({player.reservedNodes.length}/3)
          </Text>
          <View style={playerAreaStyles.horizontalRow}>
            {player.reservedNodes.map(renderReservedNode)}
          </View>
        </View>
      ) : null}

      {player.protocols.length > 0 ? (
        <View style={playerAreaStyles.section}>
          <Text style={playerAreaStyles.sectionLabel}>Claimed Protocols</Text>
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
