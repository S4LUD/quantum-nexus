import { View, Pressable } from "react-native";
import { createEnergyPoolStyles } from "./energyPool.styles";
import { EnergyType } from "../game.types";
import { EnergyBadge } from "./EnergyIcon";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";

interface EnergyPoolProps {
  energyPool: Record<EnergyType, number>;
  selectedEnergy: EnergyType[];
  onToggleEnergy: (type: EnergyType) => void;
  onCollect: () => void;
  onExchange: () => void;
  disabled?: boolean;
}

export function EnergyPool({
  energyPool,
  selectedEnergy,
  onToggleEnergy,
  onCollect,
  onExchange,
  disabled = false,
}: EnergyPoolProps) {
  const { theme } = useTheme();
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
    const isDisabled = energyPool[type] === 0 || disabled;

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
    <View
      style={energyPoolStyles.container}
    >
      <Text variant="caption">Energy Pool</Text>
      <View style={energyPoolStyles.energyRow}>{energyButtons}</View>
      {selectedEnergy.length > 0 && (
        <Button
          label={`Collect ${selectedEnergy.length} Energy`}
          onPress={onCollect}
          disabled={disabled}
        />
      )}
      <Button
        label="Exchange Energy"
        variant="secondary"
        onPress={onExchange}
        disabled={disabled}
      />
    </View>
  );
}
