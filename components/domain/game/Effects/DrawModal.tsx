import { useCallback } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { Node } from "../game.types";
import { NodeCard } from "../NodeCard/NodeCard";
import { drawModalStyles } from "./drawModal.styles";

interface DrawModalProps {
  isOpen: boolean;
  options: Node[];
  title?: string;
  onSelect: (node: Node) => void;
  onSkip: () => void;
}

export function DrawModal({
  isOpen,
  options,
  title = "Draw Nodes",
  onSelect,
  onSkip,
}: DrawModalProps) {
  const handleBackdropPress = useCallback(() => {
    onSkip();
  }, [onSkip]);
  const handleCardPress = useCallback(() => {}, []);

  const handleSelect = useCallback(
    (node: Node) => {
      onSelect(node);
    },
    [onSelect],
  );

  const renderOption = useCallback(
    (node: Node) => {
      const handlePress = () => {
        handleSelect(node);
      };
      return (
        <NodeCard key={node.id} node={node} size="sm" onPress={handlePress} />
      );
    },
    [handleSelect],
  );

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onSkip}
    >
      <Pressable style={drawModalStyles.backdrop} onPress={handleBackdropPress}>
        <Pressable style={drawModalStyles.card} onPress={handleCardPress}>
          <View style={drawModalStyles.header}>
            <Text style={drawModalStyles.title}>{title}</Text>
            <Text style={drawModalStyles.subtitle}>
              Select one node to inject into the market.
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={drawModalStyles.optionsRow}
          >
            {options.map(renderOption)}
          </ScrollView>
          <View style={drawModalStyles.footer}>
            <Pressable style={drawModalStyles.skipButton} onPress={onSkip}>
              <Text style={drawModalStyles.skipText}>Skip</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
