import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Award, Lock, CheckCircle, Star } from "lucide-react-native";
import { gradients, colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { canClaimProtocol } from "@/logic/gameEngine";
import { EnergyIcon } from "../EnergyPool/EnergyIcon";
import { Protocol, Player, EnergyType } from "../game.types";
import { createProtocolCardStyles } from "./protocolCard.styles";
import { Text } from "@/components/ui/Text/Text";
import { Icon } from "@/components/ui/Icon/Icon";
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";

interface ProtocolCardProps {
  protocol: Protocol;
  player?: Player;
  onPress?: () => void;
  compact?: boolean;
}

export function ProtocolCard({
  protocol,
  player,
  onPress,
  compact = false,
}: ProtocolCardProps) {
  const { theme } = useTheme();
  const protocolCardStyles = useMemo(
    () => createProtocolCardStyles(theme),
    [theme],
  );
  const canClaim = player ? canClaimProtocol(protocol, player) : false;
  const isClaimed = protocol.claimed;

  if (compact) {
    return (
      <LinearGradient
        colors={gradients.protocolActive}
        style={protocolCardStyles.compactContainer}
      >
        <Award color={theme.colors.text} size={layout.icon.md} />
        <Text style={protocolCardStyles.compactLabel}>{protocol.name}</Text>
        <View style={protocolCardStyles.compactValueRow}>
          <Text style={protocolCardStyles.compactValue}>
            +{protocol.efficiency}
          </Text>
          <Icon
            icon={Star}
            size={layout.icon.sm}
            color={theme.colors.text}
            fill="none"
          />
        </View>
      </LinearGradient>
    );
  }

  const gradientColors = isClaimed
    ? gradients.protocolClaimed
    : canClaim
      ? gradients.protocolActive
      : theme.gradients.bottomBar;

  const handlePress = () => {
    if (canClaim && !isClaimed && onPress) {
      onPress();
    }
  };

  const StatusIcon = isClaimed ? CheckCircle : canClaim ? Award : Lock;
  const statusColor = isClaimed
    ? colors.green400
    : canClaim
      ? colors.yellow400
      : theme.colors.textSubtle;

  return (
    <Pressable
      onPress={handlePress}
      disabled={!canClaim || isClaimed || !onPress}
    >
      <LinearGradient
        colors={gradientColors}
        style={protocolCardStyles.container}
      >
        <View style={protocolCardStyles.statusIcon}>
          <StatusIcon color={statusColor} size={layout.icon.lg} />
        </View>

        <View style={protocolCardStyles.header}>
          <Text variant="subtitle">{protocol.name}</Text>
          <View style={protocolCardStyles.efficiencyRow}>
            <View style={protocolCardStyles.efficiencyValueRow}>
              <Text style={protocolCardStyles.efficiencyValue}>
                +{protocol.efficiency}
              </Text>
              <Icon
                icon={Star}
                size={layout.icon.sm}
                color={colors.yellow400}
                fill="none"
              />
            </View>
            <Text style={protocolCardStyles.efficiencyLabel}>Efficiency</Text>
          </View>
        </View>

        <View style={protocolCardStyles.requirements}>
          <Text style={protocolCardStyles.sectionLabel}>Requirements</Text>
          <View style={protocolCardStyles.requirementsRow}>
            {Object.entries(protocol.requirements).map(([type, count]) => (
              <View key={type} style={protocolCardStyles.requirementItem}>
                <EnergyIcon type={type as EnergyType} size="sm" />
                <Text style={protocolCardStyles.requirementValue}>
                  {String(count)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={protocolCardStyles.effect}>
          <Text style={protocolCardStyles.effectLabel}>Effect:</Text>
          <Text style={protocolCardStyles.effectValue}>{protocol.effect}</Text>
        </View>

        {isClaimed ? (
          <View style={protocolCardStyles.claimedOverlay}>
            <CheckCircle color={colors.green400} size={layout.icon.xl} />
            <Text style={protocolCardStyles.claimedLabel}>CLAIMED</Text>
          </View>
        ) : null}
      </LinearGradient>
    </Pressable>
  );
}
