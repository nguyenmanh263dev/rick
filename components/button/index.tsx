// src/components/LoadingButton.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps, // Use this for custom buttons
  StyleSheet, // For potential fallback or specific non-tailwind styles
} from "react-native";

// Style the base components that NativeWind will use

// Define the props for our LoadingButton
// We extend TouchableOpacityProps to get all its standard props (like onPress, style, etc.)
// className is automatically handled by NativeWind when using the `styled` HOC.
export interface LoadingButtonProps extends TouchableOpacityProps {
  title?: string; // For simple text buttons, similar to React Native's Button
  isLoading?: boolean;
  loadingText?: string;
  // ClassNames for specific parts if needed, otherwise use `className` for the container
  textClassName?: string;
  loadingIndicatorColor?: string;
  // `children` prop is implicitly available via TouchableOpacityProps if you want to pass complex content
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  title,
  children,
  onPress,
  isLoading = false,
  loadingText = "Loading...",
  disabled,
  className, // This will be applied to the TouchableOpacity
  textClassName,
  loadingIndicatorColor = "white", // Default spinner color
  ...rest // Spread any other TouchableOpacityProps
}) => {
  // The button is disabled if explicitly set or if it's loading
  const isActuallyDisabled = isLoading || disabled;

  // Determine button content: children take precedence over title
  const buttonContent = children || title;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isActuallyDisabled}
      activeOpacity={0.7} // A good default for touchable opacity
      // Base classes + conditional classes + user-provided classes
      className={`
        flex-row items-center justify-center
        py-3 px-6 rounded-lg
        bg-sky-500 
        ${isActuallyDisabled ? "opacity-60 bg-sky-300" : "active:bg-sky-600"}
        ${className || ""} 
      `}
      accessibilityRole="button"
      accessibilityState={{ disabled: isActuallyDisabled, busy: isLoading }}
      {...rest}
    >
      {isLoading ? (
        <>
          <ActivityIndicator
            size="small"
            color={loadingIndicatorColor}
            // Add margin to the right of spinner only if loadingText is present
            className={loadingText ? "mr-2" : ""}
          />
          {/* Only render loadingText if it's provided */}
          {loadingText && (
            <Text
              className={`
                text-base font-semibold
                ${
                  loadingIndicatorColor === "white"
                    ? "text-white"
                    : "text-gray-800"
                } 
                ${textClassName || ""}
              `}
            >
              {loadingText}
            </Text>
          )}
        </>
      ) : (
        <Text
          className={`
            text-white text-base font-semibold
            ${textClassName || ""}
          `}
        >
          {buttonContent}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;
