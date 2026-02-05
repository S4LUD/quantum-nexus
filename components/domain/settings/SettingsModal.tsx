import { useEffect, useMemo, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { X, Moon, Sun, Volume2, Palette } from "lucide-react-native";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { settingsModalStyles } from "./settingsModal.styles";

interface SettingsModalProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onClose: () => void;
}

export function SettingsModal({
  isDarkMode,
  onToggleDarkMode,
  onClose,
}: SettingsModalProps) {
  const toggleAnim = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isDarkMode ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isDarkMode, toggleAnim]);

  const translateX = useMemo(() => {
    const travel =
      layout.toggle.width - layout.toggle.thumb - layout.toggle.padding * 2;
    return toggleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, travel],
    });
  }, [toggleAnim]);

  const handleToggle = () => {
    onToggleDarkMode();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <View style={settingsModalStyles.wrapper}>
      <View style={settingsModalStyles.header}>
        <Text style={settingsModalStyles.title}>Settings</Text>
        <Pressable onPress={handleClose} style={settingsModalStyles.closeButton}>
          <Icon icon={X} size={layout.icon.lg} color={colors.white} />
        </Pressable>
      </View>

      <View style={settingsModalStyles.content}>
        <View style={settingsModalStyles.row}>
          <View style={settingsModalStyles.rowLeft}>
            <Icon
              icon={isDarkMode ? Moon : Sun}
              size={layout.icon.lg}
              color={isDarkMode ? colors.purple400 : colors.yellow400}
            />
            <View>
              <Text style={settingsModalStyles.rowTitle}>Dark Mode</Text>
              <Text style={settingsModalStyles.rowSubtitle}>
                {isDarkMode ? "Enabled" : "Disabled"}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={handleToggle}
            style={[
              settingsModalStyles.toggle,
              isDarkMode ? settingsModalStyles.toggleActive : null,
            ]}
          >
            <Animated.View
              style={[
                settingsModalStyles.toggleThumb,
                { transform: [{ translateX }] },
              ]}
            />
          </Pressable>
        </View>

        <View style={[settingsModalStyles.row, settingsModalStyles.disabledRow]}>
          <View style={settingsModalStyles.rowLeft}>
            <Icon icon={Volume2} size={layout.icon.lg} color={colors.cyan400} />
            <View>
              <Text style={settingsModalStyles.rowTitle}>Sound Effects</Text>
              <Text style={settingsModalStyles.rowSubtitle}>Coming soon</Text>
            </View>
          </View>
          <View style={settingsModalStyles.toggleDisabled}>
            <View style={settingsModalStyles.toggleThumbDisabled} />
          </View>
        </View>

        <View style={[settingsModalStyles.row, settingsModalStyles.disabledRow]}>
          <View style={settingsModalStyles.rowLeft}>
            <Icon icon={Palette} size={layout.icon.lg} color={colors.pink400} />
            <View>
              <Text style={settingsModalStyles.rowTitle}>Color Blind Mode</Text>
              <Text style={settingsModalStyles.rowSubtitle}>Coming soon</Text>
            </View>
          </View>
          <View style={settingsModalStyles.toggleDisabled}>
            <View style={settingsModalStyles.toggleThumbDisabled} />
          </View>
        </View>

        <View style={settingsModalStyles.infoCard}>
          <View style={settingsModalStyles.infoRow}>
            <Text style={settingsModalStyles.infoLabel}>Version</Text>
            <Text style={settingsModalStyles.infoValue}>1.0.0</Text>
          </View>
          <View style={settingsModalStyles.infoRow}>
            <Text style={settingsModalStyles.infoLabel}>Game Mode</Text>
            <Text style={settingsModalStyles.infoValue}>Quantum Nexus</Text>
          </View>
          <View style={settingsModalStyles.infoRow}>
            <Text style={settingsModalStyles.infoLabel}>Platform</Text>
            <Text style={settingsModalStyles.infoValue}>Mobile</Text>
          </View>
        </View>

        <View style={settingsModalStyles.legal}>
          <Text style={settingsModalStyles.legalText}>Quantum Nexus © 2026</Text>
          <Text style={settingsModalStyles.legalText}>
            Strategic Network Building Game
          </Text>
        </View>
      </View>

      <View style={settingsModalStyles.footer}>
        <Button label="Close" onPress={handleClose} />
      </View>
    </View>
  );
}
