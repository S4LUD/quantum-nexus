import { useCallback, useMemo, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { EnergyType } from "../game.types";
import { EnergyBadge } from "../EnergyPool/EnergyIcon";
import { Text } from "@/components/ui/Text/Text";
import { createReclaimModalStyles } from "./reclaimModal.styles";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

interface ReclaimModalProps {
  isOpen: boolean;
  maxCollect: number;
  poolEnergy: Record<EnergyType, number>;
  onConfirm: (selection: Exclude<EnergyType, "flux">[]) => void;
  onSkip: () => void;
}

const BASE_ENERGY_TYPES: Exclude<EnergyType, "flux">[] = [
  "solar",
  "hydro",
  "plasma",
  "neural",
];

export function ReclaimModal({
  isOpen,
  maxCollect,
  poolEnergy,
  onConfirm,
  onSkip,
}: ReclaimModalProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const reclaimModalStyles = useMemo(
    () => createReclaimModalStyles(theme),
    [theme],
  );
  const [selection, setSelection] = useState<Exclude<EnergyType, "flux">[]>([]);

  const selectionCounts = useMemo(() => {
    const counts: Partial<Record<Exclude<EnergyType, "flux">, number>> = {};
    selection.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }, [selection]);

  const totalSelected = selection.length;

  const resetSelection = useCallback(() => {
    setSelection([]);
  }, []);

  const handleSkip = useCallback(() => {
    resetSelection();
    onSkip();
  }, [onSkip, resetSelection]);

  const handleCardPress = useCallback(() => {}, []);

  const handleConfirm = useCallback(() => {
    if (totalSelected > 0) {
      onConfirm(selection);
      resetSelection();
    }
  }, [onConfirm, resetSelection, selection, totalSelected]);

  const handleToggleSelection = useCallback(
    (type: Exclude<EnergyType, "flux">) => {
      setSelection((prev) => {
        const count = prev.filter((item) => item === type).length;
        if (count < (poolEnergy[type] || 0) && prev.length < maxCollect) {
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
    [maxCollect, poolEnergy],
  );

  const renderEnergyButton = useCallback(
    (type: Exclude<EnergyType, "flux">) => {
      const selectedCount = selectionCounts[type] || 0;
      const isDisabled = (poolEnergy[type] || 0) === 0;
      const handlePress = () => {
        handleToggleSelection(type);
      };
      return (
        <Pressable
          key={type}
          style={[
            reclaimModalStyles.energyButton,
            selectedCount > 0 ? reclaimModalStyles.energyButtonSelected : null,
            isDisabled ? reclaimModalStyles.energyButtonDisabled : null,
          ]}
          onPress={handlePress}
          disabled={isDisabled}
        >
          <EnergyBadge type={type} count={poolEnergy[type]} size="sm" />
          {selectedCount > 0 ? (
            <Text style={reclaimModalStyles.selectedCount}>
              +{String(selectedCount)}
            </Text>
          ) : null}
        </Pressable>
      );
    },
    [
      handleToggleSelection,
      poolEnergy,
      reclaimModalStyles.energyButton,
      reclaimModalStyles.energyButtonDisabled,
      reclaimModalStyles.energyButtonSelected,
      reclaimModalStyles.selectedCount,
      selectionCounts,
    ],
  );

  const canConfirm = totalSelected > 0;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleSkip}
    >
      <Pressable style={reclaimModalStyles.backdrop} onPress={handleSkip}>
        <Pressable style={reclaimModalStyles.card} onPress={handleCardPress}>
          <View style={reclaimModalStyles.header}>
            <Text style={reclaimModalStyles.title}>{t("reclaim.title")}</Text>
            <Text style={reclaimModalStyles.subtitle}>
              {t("reclaim.subtitle", { count: maxCollect })}
            </Text>
          </View>

          <View style={reclaimModalStyles.section}>
            <Text style={reclaimModalStyles.sectionTitle}>
              {t("reclaim.collect")}
            </Text>
            <View style={reclaimModalStyles.energyRow}>
              {BASE_ENERGY_TYPES.map(renderEnergyButton)}
            </View>
          </View>

          <View style={reclaimModalStyles.footer}>
            <Pressable style={reclaimModalStyles.skipButton} onPress={handleSkip}>
              <Text style={reclaimModalStyles.skipText}>{t("common.skip")}</Text>
            </Pressable>
            <Pressable
              style={[
                reclaimModalStyles.confirmButton,
                !canConfirm ? reclaimModalStyles.confirmButtonDisabled : null,
              ]}
              onPress={handleConfirm}
              disabled={!canConfirm}
            >
              <Text style={reclaimModalStyles.confirmText}>
                {t("reclaim.confirm")}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
