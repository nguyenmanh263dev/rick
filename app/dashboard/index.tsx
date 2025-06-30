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
    <View className="flex-1 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 relative h-screen"
      >
        <ScrollView>
          <View className="px-4 pt-24 pb-28 border-b border-gray-200 bg-sky-500 rounded-b-2xl">
            <Text className="text-4xl font-bold text-white mb-4 font-mono">
              Hello {user?.username}
            </Text>
            <Text className="text-md text-white">this is version 1.0.0</Text>
            <Text className="text-lg text-white">Welcome back !</Text>
          </View>
          <FinanceReport />
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomMenu />
    </View>
  );
};
