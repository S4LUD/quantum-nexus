import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Node } from "@/components/domain/game/game.types";
import { Text } from "@/components/ui/Text/Text";
import { useTheme } from "@/hooks/useTheme";
import { createNodeBuildFlyoverStyles } from "./nodeBuildFlyover.styles";
import { CategoryBadge } from "./CategoryBadge";
import { animations } from "@/constants/animations";

export interface BuildFlyoverEvent {
  id: number;
  node: Node;
}

interface NodeBuildFlyoverProps {
  event: BuildFlyoverEvent | null;
  viewportWidth: number;
  viewportHeight: number;
  mode: "full" | "reduced";
  behavior: "toPlayersTab" | "toPlayerArea";
  destination: { x: number; y: number } | null;
  onComplete: (eventId: number) => void;
  onArrive: () => void;
}

const FLYOVER_NODE_WIDTH = 148;
const FLYOVER_NODE_HEIGHT = 76;

export function NodeBuildFlyover({
  event,
  viewportWidth,
  viewportHeight,
  mode,
  behavior,
  destination,
  onComplete,
  onArrive,
}: NodeBuildFlyoverProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createNodeBuildFlyoverStyles(theme), [theme]);
  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!event || !destination) {
      return;
    }
    progress.setValue(0);
    opacity.setValue(0);

    const travelDuration =
      behavior === "toPlayerArea" || mode === "reduced"
        ? 220
        : animations.nodeBuildFlyoverTravel;
    const fadeDuration =
      behavior === "toPlayerArea" || mode === "reduced"
        ? 120
        : animations.nodeBuildFlyoverFade;
    const travelSequence = Animated.parallel([
      Animated.timing(progress, {
        toValue: 1,
        duration: travelDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: animations.nodeBuildFlyoverPop,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    const fadeOutSequence = Animated.timing(opacity, {
      toValue: 0,
      duration: fadeDuration,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    });

    Animated.sequence([travelSequence, fadeOutSequence]).start(() => {
      onArrive();
      onComplete(event.id);
    });
  }, [
    behavior,
    destination,
    event,
    mode,
    onArrive,
    onComplete,
    opacity,
    progress,
  ]);

  if (!event || !destination) {
    return null;
  }

  const startX = viewportWidth / 2 - FLYOVER_NODE_WIDTH / 2;
  const startY = viewportHeight / 2 - FLYOVER_NODE_HEIGHT / 2;
  const fullDeltaX = destination.x - FLYOVER_NODE_WIDTH / 2 - startX;
  const fullDeltaY = destination.y - FLYOVER_NODE_HEIGHT / 2 - startY;
  const reducedDeltaX = behavior === "toPlayerArea" ? 0 : fullDeltaX * 0.2;
  const reducedDeltaY = behavior === "toPlayerArea" ? fullDeltaY * 0.45 : 28;
  const deltaX = mode === "reduced" ? reducedDeltaX : fullDeltaX;
  const deltaY = mode === "reduced" ? reducedDeltaY : fullDeltaY;
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, deltaX],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, deltaY],
  });
  const scale = progress.interpolate({
    inputRange: [0, 0.45, 1],
    outputRange: mode === "reduced" ? [0.9, 1.02, 0.92] : [0.84, 1, 0.38],
  });

  return (
    <Animated.View style={styles.overlay}>
      <Animated.View
        style={[
          styles.flyoverNode,
          {
            left: startX,
            top: startY,
            opacity,
            transform: [{ translateX }, { translateY }, { scale }],
          },
        ]}
      >
        <Animated.View style={styles.topRow}>
          <Animated.View style={styles.badgeWrap}>
            <CategoryBadge category={event.node.category} />
          </Animated.View>
          <Animated.View style={styles.efficiencyPill}>
            <Text variant="caption" style={styles.efficiencyValue}>
              {String(event.node.efficiency)}
            </Text>
          </Animated.View>
        </Animated.View>
        <Text variant="caption" style={styles.nodeId}>
          {event.node.id}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
