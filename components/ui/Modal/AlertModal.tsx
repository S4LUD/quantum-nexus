import { useCallback } from "react";
import { Modal, Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { alertModalStyles } from "./alertModal.styles";

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  actionLabel?: string;
  onClose: () => void;
}

export function AlertModal({
  isOpen,
  title,
  message,
  actionLabel = "OK",
  onClose,
}: AlertModalProps) {
  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={alertModalStyles.backdrop} onPress={handleBackdropPress}>
        <Pressable style={alertModalStyles.card} onPress={onClose}>
          <View style={alertModalStyles.content}>
            <Text style={alertModalStyles.title}>{title}</Text>
            <Text style={alertModalStyles.message}>{message}</Text>
          </View>
          <View style={alertModalStyles.footer}>
            <Pressable style={alertModalStyles.button} onPress={onClose}>
              <Text style={alertModalStyles.buttonText}>{actionLabel}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
