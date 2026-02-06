import { useMemo } from "react";
import { Modal, Pressable, View } from "react-native";
import { EnergyType } from "../game.types";
import { EnergyBadge } from "./EnergyIcon";
import { Text } from "@/components/ui/Text/Text";
import { createEnergyDiscardModalStyles } from "./energyDiscardModal.styles";
import { useTheme } from "@/hooks/useTheme";

interface EnergyDiscardModalProps {
  isOpen: boolean;
  discardCount: number;
  selection: EnergyType[];
  playerEnergy: Record<EnergyType, number>;
  onToggleEnergy: (type: EnergyType) => void;
  onConfirm: () => void;
}

export function EnergyDiscardModal({
  isOpen,
  discardCount,
  selection,
  playerEnergy,
  onToggleEnergy,
  onConfirm,
}: EnergyDiscardModalProps) {
  const { theme } = useTheme();
  const energyDiscardModalStyles = useMemo(
    () => createEnergyDiscardModalStyles(theme),
    [theme],
  );
  const energyTypes: EnergyType[] = [
    "solar",
    "hydro",
    "plasma",
    "neural",
    "flux",
  ];

  const selectedCounts = useMemo(() => {
    const counts: Partial<Record<EnergyType, number>> = {};
    selection.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }, [selection]);

  const remaining = Math.max(discardCount - selection.length, 0);

  const energyButtons = energyTypes.map((type) => {
    const isDisabled = playerEnergy[type] === 0;
    const isSelected = (selectedCounts[type] || 0) > 0;
    const handlePress = () => {
      onToggleEnergy(type);
    };
    return (
      <Pressable
        key={type}
        onPress={handlePress}
        disabled={isDisabled}
        style={[
          energyDiscardModalStyles.energyButton,
          isSelected ? energyDiscardModalStyles.energyButtonSelected : null,
          isDisabled ? energyDiscardModalStyles.energyButtonDisabled : null,
        ]}
      >
        <EnergyBadge type={type} count={playerEnergy[type]} size="sm" />
        {isSelected ? (
          <Text style={energyDiscardModalStyles.selectedCount}>
            -{String(selectedCounts[type])}
          </Text>
        ) : null}
      </Pressable>
    );
  });

  const isConfirmDisabled = selection.length !== discardCount;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onConfirm}
    >
      <View style={energyDiscardModalStyles.backdrop}>
        <View style={energyDiscardModalStyles.modal}>
          <View style={energyDiscardModalStyles.header}>
            <Text style={energyDiscardModalStyles.title}>Discard Energy</Text>
            <Text style={energyDiscardModalStyles.subtitle}>
              Select {String(discardCount)} energy to discard. Remaining:{" "}
              {String(remaining)}.
            </Text>
          </View>
          <View style={energyDiscardModalStyles.energyRow}>
            {energyButtons}
          </View>
          <View style={energyDiscardModalStyles.footer}>
            <Pressable
              onPress={onConfirm}
              disabled={isConfirmDisabled}
              style={[
                energyDiscardModalStyles.confirmButton,
                isConfirmDisabled
                  ? energyDiscardModalStyles.confirmButtonDisabled
                  : null,
              ]}
            >
              <Text style={energyDiscardModalStyles.confirmText}>
                Discard {String(discardCount)} Energy
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
