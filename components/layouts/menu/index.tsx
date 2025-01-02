import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { menuItems } from "./config";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

type BottomMenuProps = {};

const BottomMenu: React.FC<BottomMenuProps> = () => {
  return (
    <View className="bg-white border-t border-gray-200 absolute bottom-0 left-0 right-0">
      <View className="flex-row justify-around items-center h-16">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-1 items-center justify-center h-full"
          >
            <Ionicons name={item.icon as any} size={24} color="#4B5563" />
            <Text className="text-xs mt-1 text-gray-600">{item.label}1</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomMenu;
