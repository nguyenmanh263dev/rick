import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface MenuItemProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
}

export const MenuItem = ({ title, onPress, icon }: MenuItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200"
    >
      <View className="flex-row items-center">
        {icon && <View className="mr-3">{icon}</View>}
        <Text className="text-lg text-gray-800">{title}</Text>
      </View>
      <Text className="text-gray-400">›</Text>
    </TouchableOpacity>
  );
};
