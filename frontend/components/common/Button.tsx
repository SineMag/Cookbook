import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { colors, dimensions } from "../../constants";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: dimensions.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.textSecondary : colors.primary,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: disabled ? "#F5F5F5" : colors.background,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "small":
        return {
          paddingHorizontal: dimensions.padding.md,
          paddingVertical: dimensions.padding.sm,
          minHeight: 36,
        };
      case "medium":
        return {
          paddingHorizontal: dimensions.padding.lg,
          paddingVertical: dimensions.padding.md,
          minHeight: 44,
        };
      case "large":
        return {
          paddingHorizontal: dimensions.padding.xl,
          paddingVertical: dimensions.padding.lg,
          minHeight: 52,
        };
      default:
        return {};
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: "600",
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          color: colors.background,
        };
      case "secondary":
        return {
          ...baseStyle,
          color: disabled ? colors.textSecondary : colors.text,
        };
      case "outline":
        return {
          ...baseStyle,
          color: colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case "small":
        return { fontSize: dimensions.fontSize.sm };
      case "medium":
        return { fontSize: dimensions.fontSize.md };
      case "large":
        return { fontSize: dimensions.fontSize.lg };
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), getSizeStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[getTextStyle(), getTextSize(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
