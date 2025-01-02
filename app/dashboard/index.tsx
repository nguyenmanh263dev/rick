import { useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  return (
    <AuthProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-100 relative h-screen-safe"
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image" onPress={pickImage} />
          {image && <Image source={{ uri: image[0]?.uri }} />}
          {text && <Text>Recognized Text: {text.text}</Text>}
        </View>
        <BottomMenu />
      </KeyboardAvoidingView>
    </AuthProvider>
  );
};
