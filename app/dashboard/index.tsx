import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import BottomMenu from "../../components/layouts/menu";
import { AuthProvider } from "../../context/auth.context";

export const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-100 relative h-screen-safe"
      >
        <BottomMenu />
      </KeyboardAvoidingView>
    </AuthProvider>
  );
};
