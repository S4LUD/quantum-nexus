import { View } from "react-native";
import { homeStyles } from "./home.styles";
import { Text } from "@/components/ui/Text/Text";

export function HomeHeader() {
  return (
    <View style={homeStyles.header}>
      <Text variant="title">Quantum Nexus</Text>
      <Text variant="caption">Build your network</Text>
    </View>
  );
}

export default HomeHeader;
