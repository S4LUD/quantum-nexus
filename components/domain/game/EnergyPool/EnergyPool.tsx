import { View, Pressable } from "react-native";
import { createEnergyPoolStyles } from "./energyPool.styles";
import { EnergyType } from "../game.types";
import { EnergyBadge } from "./EnergyIcon";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BeginnerHelpTrigger } from "../BeginnerHelpTrigger";

interface EnergyPoolProps {
  energyPool: Record<EnergyType, number>;
  selectedEnergy: EnergyType[];
  onToggleEnergy: (type: EnergyType) => void;
  onCollect: () => void;
  onExchange: () => void;
  onOpenHelp?: () => void;
  disabled?: boolean;
}

export function EnergyPool({
  energyPool,
  selectedEnergy,
  onToggleEnergy,
  onCollect,
  onExchange,
  onOpenHelp,
  disabled = false,
}: EnergyPoolProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const energyPoolStyles = useMemo(
    () => createEnergyPoolStyles(theme),
    [theme],
  );
  const energyTypes: EnergyType[] = [
    "solar",
    "hydro",
    "plasma",
    "neural",
    "flux",
  ];

  const energyButtons = energyTypes.map((type) => {
    const isSelected = selectedEnergy.includes(type);
    const isDisabled = energyPool[type] === 0 || disabled || type === "flux";

    const handlePress = () => {
      onToggleEnergy(type);
    };

    return (
      <Pressable
        key={type}
        onPress={handlePress}
        disabled={isDisabled}
        style={[
          energyPoolStyles.energyButton,
          isSelected ? energyPoolStyles.energyButtonSelected : null,
        ]}
      >
        <EnergyBadge type={type} count={energyPool[type]} size="md" />
      </Pressable>
    );
  });

  return (
    <View style={energyPoolStyles.container}>
      <View style={energyPoolStyles.titleRow}>
        <Text variant="caption">{t("energyPool.title")}</Text>
        {onOpenHelp ? (
          <BeginnerHelpTrigger
            onPress={onOpenHelp}
            accessibilityLabel={t("beginnerHelp.energyPool.buttonLabel")}
          />
        ) : null}
      </View>
      <View style={energyPoolStyles.energyRow}>{energyButtons}</View>
      {selectedEnergy.length > 0 && (
        <Button
          label={t("energyPool.collectLabel", { count: selectedEnergy.length })}
          onPress={onCollect}
          disabled={disabled}
        />
      )}
      <Button
        label={t("energyPool.exchangeLabel")}
        variant="secondary"
        onPress={onExchange}
        disabled={disabled}
      />
    </View>
  );
}
