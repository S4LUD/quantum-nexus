import { useMemo } from "react";
import { View } from "react-native";
import { BaseModal } from "@/components/ui/Modal/BaseModal";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { useTheme } from "@/hooks/useTheme";
import { createLeaveGameModalStyles } from "./leaveGameModal.styles";

interface LeaveGameModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LeaveGameModal({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: LeaveGameModalProps) {
  const { theme } = useTheme();
  const leaveGameModalStyles = useMemo(
    () => createLeaveGameModalStyles(theme),
    [theme],
  );

  return (
    <BaseModal isOpen={isOpen} onClose={onCancel}>
      <View style={leaveGameModalStyles.card}>
        <Text style={leaveGameModalStyles.title}>{title}</Text>
        <Text style={leaveGameModalStyles.message}>{message}</Text>
        <View style={leaveGameModalStyles.actions}>
          <Button
            label={cancelLabel}
            variant="secondary"
            onPress={onCancel}
            containerStyle={leaveGameModalStyles.actionButton}
          />
          <Button
            label={confirmLabel}
            onPress={onConfirm}
            containerStyle={leaveGameModalStyles.actionButton}
          />
        </View>
      </View>
    </BaseModal>
  );
}
