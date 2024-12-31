import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Login attempted with:", email, password);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100"
    >
      <StatusBar />
      <View className="flex-1 justify-center px-8">
        <View className="bg-white p-8 rounded-2xl shadow-md">
          <Text className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome Back
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

          <TouchableOpacity
            className="bg-blue-500 rounded-md py-3"
            onPress={handleLogin}
          >
            <Text className="text-white text-center font-semibold">Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-4">
            <Text className="text-blue-500 text-center">Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
