import { useMemo, useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
} from "react-native";
import BottomMenu from "../../components/layouts/menu";
import { AuthProvider } from "../../context/auth.context";
import * as ImagePicker from "expo-image-picker";
import TextRecognition, {
  TextRecognitionResult,
  TextRecognitionScript,
} from "@react-native-ml-kit/text-recognition";
import { set } from "lodash";
export const Profile = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100 relative h-screen-safe"
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile</Text>
      </View>
      <BottomMenu />
    </KeyboardAvoidingView>
  );
};
