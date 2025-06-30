import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import BottomMenu from "../../components/layouts/menu";
import { useAuth } from "../../context/auth.context";

export const Profile = () => {
  const navigation = useNavigation();

  const listItems = [
    {
      title: "Category",
      icon: "list",
      description: "View expenses by category",
      color: "#4da1ff", // Blue
      route: "CategoryDetail",
    },
    {
      title: "Report",
      icon: "file-text",
      description: "Financial reports and analytics",
      color: "#4cd97b", // Green
      route: "ReportDetail",
    },
  ];

  const navigateToDetail = (route: string) => {
    navigation.navigate(route as never);
  };
  const { logout } = useAuth();
  return (
    <KeyboardAvoidingView className="flex-1 bg-white p-4">
      <ScrollView>
        <View className="mb-5">
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
                <Ionicons name="chevron-right" size={20} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className="bg-white p-4 rounded-lg mb-3 shadow-sm"
            onPress={() => {
              logout();
            }}
          >
            <View className="flex-row items-center">
              <View className="h-12 w-12 rounded-full items-center justify-center mr-4">
                <Ionicons name="sign-out" size={22} color={"red"} />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-base">{"Logout"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomMenu />
    </KeyboardAvoidingView>
  );
};
