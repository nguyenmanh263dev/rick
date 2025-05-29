import React, { useRef, useEffect } from "react";
import { Animated, View, Easing } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // hoặc bất kỳ icon nào

const Spinner = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <FontAwesome name="spinner" size={24} color="white" />
    </Animated.View>
  );
};

export default Spinner;
