import React from "react";
import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../services";
export const Login = () => {
  const [email, setEmail] = useState("manhdihoc");
  const [password, setPassword] = useState("manhDiHoc@123");
  const { navigate } = useNavigation();
  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.login(email, password),
  });
  const handleLogin = async () => {
    const res = await loginMutation({ email, password });
    console.log(res);
    navigate("Dashboard" as never);
  };
  console.log(process.env.API_BASE_URL);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100"
    >
      <StatusBar />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center px-8">
          <View className="bg-white p-8 rounded-2xl shadow-md">
            <Text className="text-3xl font-bold mb-6 text-center text-gray-800">
              Welcome Back
            </Text>
            <Text className="text-sm mb-6 text-center text-gray-300">
              We're excited to have you back, can't wait to see what you've been
              up since you last logged in
            </Text>

            <TextInput
              className="bg-gray-100 text-gray-700 rounded-md px-4 py-3 mb-4"
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              className="bg-gray-100 text-gray-700 rounded-md px-4 py-3 mb-6"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity>
              <Text className="text-primary text-right">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="button button-primary mt-4"
              onPress={handleLogin}
            >
              <Text className="text-white text-center font-semibold">
                Log In
              </Text>
            </TouchableOpacity>

            <View className="border-t border-gray-300 my-6" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
