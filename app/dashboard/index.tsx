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
import Sidebar from "../../components/layouts/sidebar";
import BottomMenu from "../../components/layouts/menu";

export const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100 relative h-screen-safe"
    >
      <BottomMenu />
    </KeyboardAvoidingView>
  );
};
