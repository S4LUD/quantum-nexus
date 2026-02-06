import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Modal, Pressable, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { createModalStyles } from "./modal.styles";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BaseModal({ isOpen, onClose, children }: BaseModalProps) {
  const { theme } = useTheme();
  const modalStyles = useMemo(() => createModalStyles(theme), [theme]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 140,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, isOpen]);

  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Animated.View style={[modalStyles.backdrop, { opacity: fadeAnim }]}>
        <Pressable
          style={modalStyles.backdropPress}
          onPress={handleBackdropPress}
        />
        <View style={modalStyles.content}>{children}</View>
      </Animated.View>
    </Modal>
  );
}
