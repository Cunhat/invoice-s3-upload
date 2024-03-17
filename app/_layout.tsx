import { Slot } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="bg-black flex flex-1 flex-col w-full justify-center items-center">
      <Slot />
    </View>
  );
}
