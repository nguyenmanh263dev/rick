import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomMenu from "components/layouts/menu";
import { useNavigation } from "@react-navigation/native";

export const Profile = () => {
  const navigation = useNavigation();

  const listItems = [
    {
      title: "Category",
      icon: "list-outline",
      description: "View expenses by category",
      color: "#4da1ff", // Blue
      route: "CategoryDetail",
    },
    {
      title: "Report",
      icon: "document-text-outline",
      description: "Financial reports and analytics",
      color: "#4cd97b", // Green
      route: "ReportDetail",
    },
  ];

  const navigateToDetail = (route: string) => {
    navigation.navigate(route as never);
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="mb-5">
          <Text className="text-lg font-bold mb-3 px-1">
            Financial Management
          </Text>
          {listItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white p-4 rounded-lg mb-3 shadow-sm"
              onPress={() => navigateToDetail(item.route)}
            >
              <View className="flex-row items-center">
                <View
                  className="h-12 w-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: `${item.color}15` }} // Using hex with transparency
                >
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={item.color}
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-base">{item.title}</Text>
                  <Text className="text-gray-500 text-sm">
                    {item.description}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#9ca3af"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomMenu />
    </SafeAreaView>
  );
};
