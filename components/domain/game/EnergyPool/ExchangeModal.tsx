import { useCallback, useMemo } from "react";
import { Modal, Pressable, View } from "react-native";
import { EnergyType } from "../game.types";
import { EnergyBadge } from "./EnergyIcon";
import { Text } from "@/components/ui/Text/Text";
import { exchangeModalStyles } from "./exchangeModal.styles";

type ExchangeMode = "one" | "two";

interface ExchangeModalProps {
  isOpen: boolean;
  mode: ExchangeMode;
  takeType: Exclude<EnergyType, "flux"> | null;
  giveSelection: Exclude<EnergyType, "flux">[];
  playerEnergy: Record<EnergyType, number>;
  poolEnergy: Record<EnergyType, number>;
  onModeChange: (mode: ExchangeMode) => void;
  onSelectTakeType: (type: Exclude<EnergyType, "flux">) => void;
  onToggleGive: (type: Exclude<EnergyType, "flux">) => void;
  onConfirm: () => void;
  onClose: () => void;
}

const BASE_ENERGY_TYPES: Exclude<EnergyType, "flux">[] = [
  "solar",
  "hydro",
  "plasma",
  "neural",
];

const EXCHANGE_ONE = 1;
const EXCHANGE_TAKE_TWO = 2;
const EXCHANGE_GIVE_THREE = 3;

export function ExchangeModal({
  isOpen,
  mode,
  takeType,
  giveSelection,
  playerEnergy,
  poolEnergy,
  onModeChange,
  onSelectTakeType,
  onToggleGive,
  onConfirm,
  onClose,
}: ExchangeModalProps) {
  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);
  const handleCardPress = useCallback(() => {}, []);

  const giveCounts = useMemo(() => {
    const counts: Partial<Record<Exclude<EnergyType, "flux">, number>> = {};
    giveSelection.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }, [giveSelection]);

  const handleModeOne = useCallback(() => {
    onModeChange("one");
  }, [onModeChange]);

  const handleModeTwo = useCallback(() => {
    onModeChange("two");
  }, [onModeChange]);

  const renderTakeType = useCallback(
    (type: Exclude<EnergyType, "flux">) => {
      const isActive = type === takeType;
      const handlePress = () => {
        onSelectTakeType(type);
      };
      return (
        <Pressable
          key={`take-${type}`}
          onPress={handlePress}
          style={[
            exchangeModalStyles.energyButton,
            isActive ? exchangeModalStyles.energyButtonActive : null,
          ]}
        >
          <EnergyBadge type={type} count={poolEnergy[type]} size="sm" />
          <Text style={exchangeModalStyles.energyLabel}>{type}</Text>
        </Pressable>
      );
    },
    [onSelectTakeType, poolEnergy, takeType],
  );

  const renderGiveType = useCallback(
    (type: Exclude<EnergyType, "flux">) => {
      const count = giveCounts[type] || 0;
      const handlePress = () => {
        onToggleGive(type);
      };
      return (
        <Pressable
          key={`give-${type}`}
          onPress={handlePress}
          style={[
            exchangeModalStyles.energyButton,
            count > 0 ? exchangeModalStyles.energyButtonActive : null,
          ]}
        >
          <EnergyBadge type={type} count={playerEnergy[type]} size="sm" />
          {count > 0 ? (
            <Text style={exchangeModalStyles.selectedCount}>
              -{String(count)}
            </Text>
          ) : (
            <Text style={exchangeModalStyles.energyLabel}>{type}</Text>
          )}
        </Pressable>
      );
    },
    [giveCounts, onToggleGive, playerEnergy],
  );

  const takeCount = mode === "two" ? EXCHANGE_TAKE_TWO : EXCHANGE_ONE;
  const giveNeeded = mode === "two" ? EXCHANGE_GIVE_THREE : EXCHANGE_ONE;
  const canConfirm =
    Boolean(takeType) && giveSelection.length === giveNeeded;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        style={exchangeModalStyles.backdrop}
        onPress={handleBackdropPress}
      >
        <Pressable style={exchangeModalStyles.card} onPress={handleCardPress}>
          <View style={exchangeModalStyles.header}>
            <Text style={exchangeModalStyles.title}>Exchange Energy</Text>
            <Text style={exchangeModalStyles.subtitle}>
              Choose 1:1 or 2:3 exchange. Flux cannot be exchanged.
            </Text>
          </View>

          <View style={exchangeModalStyles.modeRow}>
            <Pressable
              style={[
                exchangeModalStyles.modeButton,
                mode === "one" ? exchangeModalStyles.modeButtonActive : null,
              ]}
              onPress={handleModeOne}
            >
              <Text style={exchangeModalStyles.modeText}>1 : 1</Text>
            </Pressable>
            <Pressable
              style={[
                exchangeModalStyles.modeButton,
                mode === "two" ? exchangeModalStyles.modeButtonActive : null,
              ]}
              onPress={handleModeTwo}
            >
              <Text style={exchangeModalStyles.modeText}>2 : 3</Text>
            </Pressable>
          </View>

          <View style={exchangeModalStyles.section}>
            <Text style={exchangeModalStyles.sectionLabel}>
              Take {String(takeCount)}
            </Text>
            <View style={exchangeModalStyles.energyRow}>
              {BASE_ENERGY_TYPES.map(renderTakeType)}
            </View>
          </View>

          <View style={exchangeModalStyles.section}>
            <Text style={exchangeModalStyles.sectionLabel}>
              Give {String(giveNeeded)}
            </Text>
            <View style={exchangeModalStyles.energyRow}>
              {BASE_ENERGY_TYPES.map(renderGiveType)}
            </View>
          </View>

          <View style={exchangeModalStyles.footer}>
            <Pressable
              style={exchangeModalStyles.cancelButton}
              onPress={onClose}
            >
              <Text style={exchangeModalStyles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                exchangeModalStyles.confirmButton,
                !canConfirm ? exchangeModalStyles.confirmButtonDisabled : null,
              ]}
              onPress={onConfirm}
              disabled={!canConfirm}
            >
              <Text style={exchangeModalStyles.confirmText}>Confirm</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
