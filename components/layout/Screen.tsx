import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "@/constants/colors";
import { screenStyles } from "./screen.styles";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

interface ScreenProps {
  children: ReactNode;
  disableHorizontalPadding?: boolean;
  disableTopPadding?: boolean;
  disableTopSafeArea?: boolean;
  disableBottomPadding?: boolean;
}

export function Screen({
  children,
  disableHorizontalPadding = false,
  disableTopPadding = false,
  disableTopSafeArea = false,
  disableBottomPadding = false,
}: ScreenProps) {
  const safeAreaEdges: readonly Edge[] = disableTopSafeArea
    ? ["left", "right", "bottom"]
    : ["left", "right", "top", "bottom"];

  return (
    <SafeAreaView style={screenStyles.safeArea} edges={safeAreaEdges}>
      <LinearGradient
        colors={gradients.appBackground}
        style={screenStyles.gradient}
      >
        <View
          style={[
            screenStyles.content,
            disableHorizontalPadding ? screenStyles.contentNoHorizontalPadding : null,
            disableTopPadding ? screenStyles.contentNoTopPadding : null,
            disableBottomPadding ? screenStyles.contentNoBottomPadding : null,
          ]}
        >
          {children}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
