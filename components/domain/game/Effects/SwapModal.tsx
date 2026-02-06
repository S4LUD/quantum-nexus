import { useCallback, useMemo, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { EnergyType } from "../game.types";
import { EnergyBadge } from "../EnergyPool/EnergyIcon";
import { Text } from "@/components/ui/Text/Text";
import { createSwapModalStyles } from "./swapModal.styles";
import { useTheme } from "@/hooks/useTheme";

interface SwapModalProps {
  isOpen: boolean;
  maxSwaps: number;
  playerEnergy: Record<EnergyType, number>;
  poolEnergy: Record<EnergyType, number>;
  onConfirm: (give: EnergyType[], take: EnergyType[]) => void;
  onSkip: () => void;
}

export function SwapModal({
  isOpen,
  maxSwaps,
  playerEnergy,
  poolEnergy,
  onConfirm,
  onSkip,
}: SwapModalProps) {
  const { theme } = useTheme();
  const swapModalStyles = useMemo(() => createSwapModalStyles(theme), [theme]);
  const [giveSelection, setGiveSelection] = useState<EnergyType[]>([]);
  const [takeSelection, setTakeSelection] = useState<EnergyType[]>([]);

  const energyTypes: EnergyType[] = [
    "solar",
    "hydro",
    "plasma",
    "neural",
  ];

  const giveCounts = useMemo(() => {
    const counts: Partial<Record<EnergyType, number>> = {};
    giveSelection.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }, [giveSelection]);

  const takeCounts = useMemo(() => {
    const counts: Partial<Record<EnergyType, number>> = {};
    takeSelection.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }, [takeSelection]);

  const totalGive = giveSelection.length;
  const totalTake = takeSelection.length;

  const resetSelections = useCallback(() => {
    setGiveSelection([]);
    setTakeSelection([]);
  }, []);

  const handleSkip = useCallback(() => {
    resetSelections();
    onSkip();
  }, [onSkip, resetSelections]);
  const handleCardPress = useCallback(() => {}, []);

  const handleConfirm = useCallback(() => {
    if (totalGive === totalTake && totalGive > 0) {
      onConfirm(giveSelection, takeSelection);
      resetSelections();
    }
  }, [giveSelection, onConfirm, resetSelections, takeSelection, totalGive, totalTake]);

  const handleToggleGive = useCallback(
    (type: EnergyType) => {
      setGiveSelection((prev) => {
        const count = prev.filter((item) => item === type).length;
        if (count > 0 && prev.length >= maxSwaps) {
          const index = prev.indexOf(type);
          if (index !== -1) {
            const next = [...prev];
            next.splice(index, 1);
            return next;
          }
          return prev;
        }
        if (count < (playerEnergy[type] || 0) && prev.length < maxSwaps) {
          return [...prev, type];
        }
        if (count > 0) {
          const index = prev.indexOf(type);
          if (index !== -1) {
            const next = [...prev];
            next.splice(index, 1);
            return next;
          }
        }
        return prev;
      });
    },
    [maxSwaps, playerEnergy],
  );

  const handleToggleTake = useCallback(
    (type: EnergyType) => {
      setTakeSelection((prev) => {
        const count = prev.filter((item) => item === type).length;
        if (count > 0 && prev.length >= maxSwaps) {
          const index = prev.indexOf(type);
          if (index !== -1) {
            const next = [...prev];
            next.splice(index, 1);
            return next;
          }
          return prev;
        }
        if (count < (poolEnergy[type] || 0) && prev.length < maxSwaps) {
          return [...prev, type];
        }
        if (count > 0) {
          const index = prev.indexOf(type);
          if (index !== -1) {
            const next = [...prev];
            next.splice(index, 1);
            return next;
          }
        }
        return prev;
      });
    },
    [maxSwaps, poolEnergy],
  );

  const renderGiveButton = useCallback(
    (type: EnergyType) => {
      const count = giveCounts[type] || 0;
      const isDisabled = (playerEnergy[type] || 0) === 0;
      const handlePress = () => {
        handleToggleGive(type);
      };
      return (
        <Pressable
          key={`give-${type}`}
          style={[
            swapModalStyles.energyButton,
            count > 0 ? swapModalStyles.energyButtonSelected : null,
            isDisabled ? swapModalStyles.energyButtonDisabled : null,
          ]}
          onPress={handlePress}
          disabled={isDisabled}
        >
          <EnergyBadge type={type} count={playerEnergy[type]} size="sm" />
          {count > 0 ? (
            <Text style={swapModalStyles.selectedCount}>
              -{String(count)}
            </Text>
          ) : null}
        </Pressable>
      );
    },
    [giveCounts, handleToggleGive, playerEnergy, swapModalStyles],
  );

  const renderTakeButton = useCallback(
    (type: EnergyType) => {
      const count = takeCounts[type] || 0;
      const isDisabled = (poolEnergy[type] || 0) === 0;
      const handlePress = () => {
        handleToggleTake(type);
      };
      return (
        <Pressable
          key={`take-${type}`}
          style={[
            swapModalStyles.energyButton,
            count > 0 ? swapModalStyles.energyButtonSelected : null,
            isDisabled ? swapModalStyles.energyButtonDisabled : null,
          ]}
          onPress={handlePress}
          disabled={isDisabled}
        >
          <EnergyBadge type={type} count={poolEnergy[type]} size="sm" />
          {count > 0 ? (
            <Text style={swapModalStyles.selectedCount}>
              +{String(count)}
            </Text>
          ) : null}
        </Pressable>
      );
    },
    [handleToggleTake, poolEnergy, swapModalStyles, takeCounts],
  );

  const canConfirm = totalGive === totalTake && totalGive > 0;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleSkip}
    >
      <Pressable style={swapModalStyles.backdrop} onPress={handleSkip}>
        <Pressable style={swapModalStyles.card} onPress={handleCardPress}>
          <View style={swapModalStyles.header}>
            <Text style={swapModalStyles.title}>Swap Energy</Text>
            <Text style={swapModalStyles.subtitle}>
              Select up to {String(maxSwaps)} energy to give and take.
            </Text>
          </View>
          <View style={swapModalStyles.section}>
            <Text style={swapModalStyles.sectionTitle}>Give</Text>
            <View style={swapModalStyles.energyRow}>
              {energyTypes.map(renderGiveButton)}
            </View>
          </View>
          <View style={swapModalStyles.section}>
            <Text style={swapModalStyles.sectionTitle}>Take</Text>
            <View style={swapModalStyles.energyRow}>
              {energyTypes.map(renderTakeButton)}
            </View>
          </View>
          <View style={swapModalStyles.footer}>
            <Pressable style={swapModalStyles.skipButton} onPress={handleSkip}>
              <Text style={swapModalStyles.skipText}>Skip</Text>
            </Pressable>
            <Pressable
              style={[
                swapModalStyles.confirmButton,
                !canConfirm ? swapModalStyles.confirmButtonDisabled : null,
              ]}
              onPress={handleConfirm}
              disabled={!canConfirm}
            >
              <Text style={swapModalStyles.confirmText}>Confirm Swap</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
