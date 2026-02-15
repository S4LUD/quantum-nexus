import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing } from "react-native";
import { EnergyType } from "@/types/game";
import { animations } from "@/constants/animations";
import { useTheme } from "@/hooks/useTheme";
import { EnergyIcon } from "../EnergyPool/EnergyIcon";
import { createEnergyCollectFlyoverStyles } from "./energyCollectFlyover.styles";

type BaseEnergyType = Exclude<EnergyType, "flux">;

export interface EnergyCollectFlyoverEvent {
  id: number;
  energy: BaseEnergyType[];
}

interface EnergyCollectFlyoverProps {
  event: EnergyCollectFlyoverEvent | null;
  origin: { x: number; y: number };
  destination: { x: number; y: number };
  mode: "full" | "reduced";
  onComplete: (eventId: number) => void;
}

const TOKEN_SPACING = 16;
const TOKEN_HALF = 14;

export function EnergyCollectFlyover({
  event,
  origin,
  destination,
  mode,
  onComplete,
}: EnergyCollectFlyoverProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createEnergyCollectFlyoverStyles(theme), [theme]);
  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!event) {
      return;
    }
    progress.setValue(0);
    opacity.setValue(0);
    const travelDuration =
      mode === "reduced"
        ? Math.max(animations.energyCollectFlyoverTravel - 140, 180)
        : animations.energyCollectFlyoverTravel;
    const fadeDuration =
      mode === "reduced"
        ? Math.max(animations.energyCollectFlyoverFade - 40, 80)
        : animations.energyCollectFlyoverFade;
    const sequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(progress, {
          toValue: 1,
          duration: travelDuration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 140,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacity, {
        toValue: 0,
        duration: fadeDuration,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]);
    sequence.start(() => {
      onComplete(event.id);
    });
  }, [event, mode, onComplete, opacity, progress]);

  if (!event) {
    return null;
  }

  const tokenCount = event.energy.length;
  const deltaX = destination.x - origin.x;
  const deltaY = destination.y - origin.y;
  const tokenItems = event.energy.map((type, index) => {
    const rowOffset = (index - (tokenCount - 1) / 2) * TOKEN_SPACING;
    const left = origin.x - TOKEN_HALF + rowOffset;
    const top = origin.y - TOKEN_HALF;
    const travelX =
      mode === "reduced" ? deltaX * 0.5 + rowOffset * 0.3 : deltaX + rowOffset * -0.2;
    const travelY = mode === "reduced" ? deltaY * 0.6 + 12 : deltaY;
    const localProgress = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const translateX = localProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, travelX],
    });
    const translateY = localProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, travelY],
    });
    const scale = localProgress.interpolate({
      inputRange: [0, 0.45, 1],
      outputRange: mode === "reduced" ? [0.92, 1, 0.88] : [0.86, 1, 0.76],
    });
    const entryDelay = index * animations.energyCollectFlyoverStagger;
    const tokenOpacity = localProgress.interpolate({
      inputRange: [0, Math.min(entryDelay / 420, 0.7), 1],
      outputRange: [0, 1, 1],
    });

    return (
      <Animated.View
        key={`${event.id}-${type}-${index}`}
        style={[
          styles.tokenWrap,
          {
            left,
            top,
            opacity: Animated.multiply(opacity, tokenOpacity),
            transform: [{ translateX }, { translateY }, { scale }],
          },
        ]}
      >
        <EnergyIcon type={type} size={14} colored />
      </Animated.View>
    );
  });

  return <Animated.View style={styles.overlay}>{tokenItems}</Animated.View>;
}
