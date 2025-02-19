import React, { useMemo, useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomMenu from "../../components/layouts/menu";
import { AuthProvider } from "../../context/auth.context";
import RNPickerSelect from "react-native-picker-select";

export const Dashboard = () => {
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100 relative h-screen-safe"
    >
      <View style={{}}>
        <Text>Pick an image</Text>
      </View>
      <BottomMenu />
    </KeyboardAvoidingView>
  );
};
