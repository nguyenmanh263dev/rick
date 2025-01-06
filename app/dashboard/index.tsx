import { useMemo, useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import TextRecognition, {
  TextRecognitionResult,
} from "@react-native-ml-kit/text-recognition";

export const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [text, setText] = useState<TextRecognitionResult>();

  const pickImage2 = async () => {
    // Request permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the gallery is required!");
      return;
    }

    // Open image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets); // Adjust based on the result structure
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets);
      recognizeText(result.assets[0].uri || "");
    }
  };

  const recognizeText = async (imageUri: string) => {
    try {
      const recognizedText = await TextRecognition.recognize(imageUri);
      setText(recognizedText);
    } catch (error) {
      console.error("Error recognizing text: ", error);
    }
  };

  const bills = useMemo(() => {
    return text?.text.split("Sao chép").map((item) => item.split("\n")) || [];
  }, [text?.text]);

  const result = bills[0] || [];
  console.log(123, result[2], bills[1]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100 relative h-screen-safe"
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={pickImage}>
          <Text>Pick an image</Text>
        </TouchableOpacity>
        <Button title="Pick an image" onPress={pickImage} />
        {image[0] && <Image source={{ uri: image[0]?.uri }} />}
        {text && <Text>Recognized Text: 12,{JSON.stringify(bills)}</Text>}
      </View>
      <BottomMenu />
    </KeyboardAvoidingView>
  );
};
