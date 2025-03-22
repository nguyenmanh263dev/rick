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
import secureStore from "../../libs/axios/secure-store";

export const Dashboard = () => {
  const { user } = useAuth();
  const getTokenSecure = async () => {
    const token = await secureStore.getTokenSecure();
    console.log(123123, token);
  };
  useEffect(() => {
    getTokenSecure();
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100 relative h-screen"
    >
      <SafeAreaView className="flex-1">
        <View className="px-4 py-3 bg-white border-b border-gray-200">
          <Text className="text-xl font-bold text-gray-800">
            Financial Report {user?.username}
          </Text>
        </View>
        <FinanceReport />
      </SafeAreaView>
      <BottomMenu />
    </KeyboardAvoidingView>
  );
};
