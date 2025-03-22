import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MenuItem } from "./menu-item";

export const MenuList = () => {
  const navigation = useNavigation();

  return (
    <View className="mt-4">
      <MenuItem
        title="Category"
        onPress={() => navigation.navigate("CategoryDetail" as never)}
      />
      <MenuItem
        title="Report"
        onPress={() => navigation.navigate("ReportDetail" as never)}
      />
    </View>
  );
};
