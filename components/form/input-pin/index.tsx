import { forwardRef, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props extends TextInputProps {
  onComplete?: (code: string) => void;
  limit?: number;
  focusInput?: () => void;
}

const InputPin = forwardRef<TextInput, Props>(
  ({ onComplete, limit = 4, focusInput, ...props }, ref) => {
    const [pinValue, setPinValue] = useState<string>("");
    const handleChangePin = (
      e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
      if (e.nativeEvent.text.length > 4) {
        return;
      }
      setPinValue(e.nativeEvent.text);
      if (e.nativeEvent.text.length === 4) {
        onComplete?.(e.nativeEvent.text);
        return;
      }
    };

    const pins = pinValue.split("");
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className=""
      >
        <View className="p-0  focus-within:p-10 my-auto">
          <View className="flex flex-row justify-between">
            {list
              .filter((_, index) => index < 4)
              .map((item, index) => (
                <TouchableOpacity
                  key={`${index}-${item}`}
                  className="border border-gray-400 rounded-md h-20 w-20 text-center flex items-center justify-center bg-white shadow-slate-200"
                  onPress={() => focusInput?.()}
                >
                  <Text className=" text-black text-3xl font-semibold">
                    {pins[index] || "*"}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <TextInput
          {...props}
          ref={ref}
          value={pinValue}
          onChange={handleChangePin}
          className="invisible"
          autoFocus
          keyboardType="numeric"
        />
      </KeyboardAvoidingView>
    );
  }
);

InputPin.displayName = "InputPin";

export default InputPin;
