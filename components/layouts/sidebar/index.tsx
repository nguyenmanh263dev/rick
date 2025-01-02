import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

type SidebarProps = {
  menuItems: MenuItem[];
  onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ menuItems, onClose }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="flex-1">
        <View className="p-4 border-b border-gray-200 dark:border-gray-700">
          <TouchableOpacity onPress={onClose} className="self-end">
            <Ionicons
              name="close"
              size={24}
              className="text-gray-600 dark:text-gray-300"
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
            Menu
          </Text>
        </View>
        <ScrollView className="flex-1">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              className="flex-row items-center p-4 border-b border-gray-200 dark:border-gray-700"
            >
              <Ionicons
                name={item.icon}
                size={24}
                className="text-gray-600 dark:text-gray-300 mr-4"
              />
              <Text className="text-gray-800 dark:text-white text-lg">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
