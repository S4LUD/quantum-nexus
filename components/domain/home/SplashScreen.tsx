import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Image, View } from "react-native";
import { createSplashStyles } from "./splash.styles";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { useTheme } from "@/hooks/useTheme";

interface SplashScreenProps {
  onStart: () => void;
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

export function SplashScreen({ onStart }: SplashScreenProps) {
  const { theme } = useTheme();
  const splashStyles = useMemo(() => createSplashStyles(theme), [theme]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoFloat = useRef(new Animated.Value(0)).current;

  const particlesRef = useRef<ParticleConfig[] | null>(null);
  if (!particlesRef.current) {
    particlesRef.current = createParticles();
  }
  const particles = particlesRef.current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(logoFloat, {
          toValue: -5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoFloat, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

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
  }, [fadeAnim, logoFloat, particles]);

  const handleStart = () => {
    onStart();
  };

  const renderGridLine = (index: number) => (
    <View
      key={`grid-h-${index}`}
      style={[splashStyles.gridLineHorizontal, { top: index * 50 }]}
    />
  );

  const renderGridColumn = (index: number) => (
    <View
      key={`grid-v-${index}`}
      style={[splashStyles.gridLineVertical, { left: index * 50 }]}
    />
  );

  const renderParticle = (particle: ParticleConfig) => (
    <Animated.View
      key={particle.id}
      style={[
        splashStyles.particle,
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
    <Animated.View style={[splashStyles.container, { opacity: fadeAnim }]}>
      <View style={splashStyles.gridOverlay}>
        {GRID_LINES.map(renderGridLine)}
        {GRID_LINES.map(renderGridColumn)}
      </View>

      <Animated.View
        style={[
          splashStyles.logoRow,
          { transform: [{ translateY: logoFloat }] },
        ]}
      >
        <Image
          source={require("@/assets/images/icon.png")}
          style={splashStyles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>

      <Text style={splashStyles.title}>Quantum Nexus</Text>

      <Text style={splashStyles.subtitle}>Build Your Network</Text>
      <Text style={splashStyles.tagline}>Harness energy. Connect nodes.</Text>

      <View style={splashStyles.actions}>
        <Button label="Initialize System" onPress={handleStart} />
      </View>

      <View style={splashStyles.particleLayer}>
        {particles.map(renderParticle)}
      </View>
    </Animated.View>
  );
}

function createParticles(): ParticleConfig[] {
  return Array.from({ length: 8 }, (_, index) => ({
    id: `particle-${index}`,
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
