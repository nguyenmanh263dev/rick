import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface TopTabsProps<T extends { value: string; label: string }> {
  options: T[];
  value: T["value"];
  onChange: (value: T["value"]) => void;
}

function TopTabs<T extends { value: string; label: string }>({
  options,
  value,
  onChange,
}: TopTabsProps<T>) {
  return (
    <View className="flex-row bg-gray-100 rounded-full p-1 mb-4">
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onChange(option.value)}
          className={`flex-1 py-2 px-4 rounded-full ${
            value === option.value ? "bg-white" : ""
          }`}
        >
          <Text
            className={`text-center text-sm ${
              value === option.value
                ? "font-medium text-black"
                : "text-gray-500"
            }`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default TopTabs;
