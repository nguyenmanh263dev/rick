import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BottomMenu from "../../components/layouts/menu";
import FinanceReport from "../../components/FinanceReport";
import { useAuth } from "../../context/auth.context";

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100 relative h-screen"
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-4 border-b border-gray-200">
          <Text className="text-xl font-bold text-gray-800">
            Hello {user?.username}
          </Text>
          <Text className="text-sm text-gray-600">Welcome back !</Text>
        </View>
        <FinanceReport />
      </SafeAreaView>
      <BottomMenu />
    </KeyboardAvoidingView>
  );
};
