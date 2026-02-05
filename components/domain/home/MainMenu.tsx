import { useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Play, Users, BookOpen, Settings, Trophy } from "lucide-react-native";
import { Text } from "@/components/ui/Text/Text";
import { colors, gradients } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { mainMenuStyles } from "./mainMenu.styles";
import { Icon } from "@/components/ui/Icon/Icon";

interface MainMenuProps {
  onQuickPlay: () => void;
  onTutorial: () => void;
  onSettings: () => void;
}

interface ParticleConfig {
  id: string;
  left: number;
  top: number;
  size: number;
  color: string;
  animY: Animated.Value;
  animOpacity: Animated.Value;
  animScale: Animated.Value;
  duration: number;
  delay: number;
}

const GRID_LINES = Array.from({ length: 10 }, (_, index) => index);
const PARTICLE_COLORS = [
  "rgba(168,85,247,0.6)",
  "rgba(59,130,246,0.6)",
  "rgba(236,72,153,0.6)",
  "rgba(234,179,8,0.6)",
];

export function MainMenu({
  onQuickPlay,
  onTutorial,
  onSettings,
}: MainMenuProps) {
  const particlesRef = useRef<ParticleConfig[] | null>(null);
  if (!particlesRef.current) {
    particlesRef.current = createParticles();
  }
  const particles = particlesRef.current;

  useEffect(() => {
    particles.forEach((particle) => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(particle.animY, {
              toValue: -20,
              duration: particle.duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
              delay: particle.delay,
            }),
            Animated.timing(particle.animY, {
              toValue: 20,
              duration: particle.duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(particle.animY, {
              toValue: 0,
              duration: particle.duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle.animOpacity, {
              toValue: 0.8,
              duration: particle.duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
              delay: particle.delay,
            }),
            Animated.timing(particle.animOpacity, {
              toValue: 0.3,
              duration: particle.duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle.animScale, {
              toValue: 1.2,
              duration: particle.duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
              delay: particle.delay,
            }),
            Animated.timing(particle.animScale, {
              toValue: 1,
              duration: particle.duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    });
  }, [particles]);

  const handleQuickPlay = useCallback(() => {
    onQuickPlay();
  }, [onQuickPlay]);

  const handleTutorial = useCallback(() => {
    onTutorial();
  }, [onTutorial]);

  const handleSettings = useCallback(() => {
    onSettings();
  }, [onSettings]);

  const handleDisabled = useCallback(() => {}, []);

  const mainActions = useMemo(
    () => [
      {
        key: "quick",
        title: "Quick Play",
        subtitle: "Start solo game",
        icon: Play,
        gradient: gradients.primaryButton,
        onPress: handleQuickPlay,
      },
      {
        key: "multi",
        title: "Multiplayer",
        subtitle: "Play with others",
        icon: Users,
        gradient: gradients.secondaryButton,
        onPress: handleDisabled,
        disabled: true,
      },
      {
        key: "tutorial",
        title: "Tutorial",
        subtitle: "Learn how to play",
        icon: BookOpen,
        gradient: gradients.tabBar,
        onPress: handleTutorial,
        isGlass: true,
      },
    ],
    [handleDisabled, handleQuickPlay, handleTutorial],
  );

  const bottomActions = useMemo(
    () => [
      {
        key: "stats",
        label: "Stats",
        icon: Trophy,
        onPress: handleDisabled,
        disabled: true,
      },
      {
        key: "settings",
        label: "Settings",
        icon: Settings,
        onPress: handleSettings,
      },
    ],
    [handleSettings, handleDisabled],
  );

  const renderMainAction = (action: (typeof mainActions)[number]) => (
    <Pressable
      key={action.key}
      onPress={action.onPress}
      disabled={action.disabled}
      style={[
        mainMenuStyles.actionButton,
        action.isGlass ? mainMenuStyles.actionButtonGlass : null,
        action.disabled ? mainMenuStyles.actionButtonDisabled : null,
      ]}
    >
      <LinearGradient
        colors={action.isGlass ? gradients.tabBar : action.gradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={mainMenuStyles.actionGradient}
      >
        <Icon
          icon={action.icon}
          size={layout.icon.lg}
          color={colors.white}
          fill="none"
        />
        <View style={mainMenuStyles.actionText}>
          <Text style={mainMenuStyles.actionTitle}>{action.title}</Text>
          <Text style={mainMenuStyles.actionSubtitle}>{action.subtitle}</Text>
        </View>
        {action.key === "multi" ? (
          <View style={mainMenuStyles.inProgressBadge}>
            <Text style={mainMenuStyles.inProgressText}>WIP</Text>
          </View>
        ) : null}
      </LinearGradient>
    </Pressable>
  );

  const renderBottomAction = (action: (typeof bottomActions)[number]) => (
    <Pressable
      key={action.key}
      onPress={action.onPress}
      disabled={action.disabled}
      style={[
        mainMenuStyles.bottomButton,
        action.disabled ? mainMenuStyles.actionButtonDisabled : null,
      ]}
    >
      <Icon
        icon={action.icon}
        size={layout.icon.md}
        color={colors.white}
        fill="none"
      />
      <Text style={mainMenuStyles.bottomLabel}>{action.label}</Text>
    </Pressable>
  );

  const renderGridLine = (index: number) => (
    <View
      key={`grid-h-${index}`}
      style={[mainMenuStyles.gridLineHorizontal, { top: index * 50 }]}
    />
  );

  const renderGridColumn = (index: number) => (
    <View
      key={`grid-v-${index}`}
      style={[mainMenuStyles.gridLineVertical, { left: index * 50 }]}
    />
  );

  const renderParticle = (particle: ParticleConfig) => (
    <Animated.View
      key={particle.id}
      style={[
        mainMenuStyles.particle,
        {
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          width: particle.size,
          height: particle.size,
          backgroundColor: particle.color,
          transform: [
            { translateY: particle.animY },
            { scale: particle.animScale },
          ],
          opacity: particle.animOpacity,
        },
      ]}
    />
  );

  return (
    <View style={mainMenuStyles.container}>
      <View style={mainMenuStyles.gridOverlay}>
        {GRID_LINES.map(renderGridLine)}
        {GRID_LINES.map(renderGridColumn)}
      </View>
      <View style={mainMenuStyles.particleLayer}>
        {particles.map(renderParticle)}
      </View>

      <View style={mainMenuStyles.header}>
        <Text style={mainMenuStyles.title}>Quantum Nexus</Text>
        <Text style={mainMenuStyles.subtitle}>Strategic Network Building</Text>
      </View>

      <View style={mainMenuStyles.actions}>
        {mainActions.map(renderMainAction)}
      </View>

      <View style={mainMenuStyles.bottomActions}>
        {bottomActions.map(renderBottomAction)}
      </View>
    </View>
  );
}

function createParticles(): ParticleConfig[] {
  return Array.from({ length: 8 }, (_, index) => ({
    id: `menu-particle-${index}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 8 + Math.random() * 12,
    color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
    animY: new Animated.Value(0),
    animOpacity: new Animated.Value(0.3),
    animScale: new Animated.Value(1),
    duration: 3000 + Math.random() * 2000,
    delay: Math.random() * 2000,
  }));
}
