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

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props extends TextInputProps {
  onComplete?: () => void;
  limit?: number;
}

const VerifyPin = () => {
  const ref = useRef<TextInput>(null);
  const focusInput = () => {
    ref.current?.focus();
  };
  useEffect(() => {
    focusInput();
  }, []);

  const handleComplete = (e: string) => {
    alert(JSON.stringify(e));
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
