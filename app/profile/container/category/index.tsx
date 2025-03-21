import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CategoryDetail = () => {
  const navigation = useNavigation();

  const categories = [
    { name: "Housing", amount: 1200, color: "#FF5733", percentageValue: 35 },
    { name: "Food", amount: 600, color: "#33FF57", percentageValue: 18 },
    { name: "Transport", amount: 400, color: "#3357FF", percentageValue: 12 },
    {
      name: "Entertainment",
      amount: 300,
      color: "#FF33A8",
      percentageValue: 9,
    },
    { name: "Others", amount: 500, color: "#33FFF3", percentageValue: 15 },
    { name: "Utilities", amount: 220, color: "#FFBB33", percentageValue: 6 },
    { name: "Healthcare", amount: 180, color: "#9D33FF", percentageValue: 5 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">
          Expense Categories
        </Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="mb-4">
          <Text className="text-lg font-medium mb-2">Expense Breakdown</Text>
          <Text className="text-gray-500 mb-2">Your spending by category</Text>
        </View>

        {categories.map((category, index) => (
          <View key={index} className="bg-white p-4 rounded-lg mb-3 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View
                  className="h-10 w-10 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                />
                <Text className="font-medium">{category.name}</Text>
              </View>
              <View className="items-end">
                <Text className="font-bold">${category.amount}</Text>
                <Text className="text-gray-500 text-xs">
                  {category.percentageValue}%
                </Text>
              </View>
            </View>
            <View className="mt-3 bg-gray-200 h-2 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  backgroundColor: category.color,
                  width: `${category.percentageValue}%`,
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryDetail;
