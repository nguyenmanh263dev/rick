import { forwardRef, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  View,
} from "react-native";
import InputPin from "../../components/form/input-pin";
import secureStore from "../../libs/axios/secure-store";
import { useAuth } from "../../context/auth.context";
import { useNavigation } from "@react-navigation/native";

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props extends TextInputProps {
  onComplete?: () => void;
  limit?: number;
}

const VerifyPin = () => {
  const ref = useRef<TextInput>(null);
  const { login } = useAuth();
  const { navigate } = useNavigation();
  const focusInput = () => {
    ref.current?.focus();
  };
  useEffect(() => {
    focusInput();
    secureStore.saveTokenSecure("2603");
  }, []);

  const handleComplete = async (e: string) => {
    const token = await secureStore.getTokenSecure();
    if (e === token) {
      login();
      navigate("Dashboard" as never);
    }
  };
  return (
    <View>
      <Text className="pt-10 text-2xl font-semibold text-center">
        Nhập mã mở khóa
      </Text>
      <InputPin ref={ref} focusInput={focusInput} onComplete={handleComplete} />
    </View>
  );
};

export default VerifyPin;
