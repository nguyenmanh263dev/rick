import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { menuItems } from "./config";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

type BottomMenuProps = {};

const CustomAddButton = ({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" absolute left-1/2 bottom-1/2 -translate-x-1/2 z-10 bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white"
      style={{ top: -30 }} // Đẩy nút lên trên
    >
      {children}
    </TouchableOpacity>
  );
};

const BottomMenu: React.FC<BottomMenuProps> = () => {
  const [item1, item2, item3, item4] = menuItems;
  const leftMenu = [item1, item2];
  const rightMenu = [item3, item4];
  const route = useRoute();
  const navigation = useNavigation();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });
  };
  return (
    <View className=" border-t border-gray-200 absolute bottom-0 left-0 right-0">
      <View className="flex-row justify-around items-center h-[84px] ">
        <View className="relative bg-white flex-1 flex-row justify-around items-center h-full">
          {leftMenu.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-1 items-center justify-center h-full"
              onPress={() => navigation.navigate(item.label as never)}
            >
              <Ionicons
                name={
                  (route.name === item.label
                    ? `${item.icon}`
                    : `${item.icon}-outline`) as never
                }
                size={24}
                color="#4B5563"
              />
              <Text className="text-xs mt-1 text-gray-600">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <CustomAddButton onPress={pickImage}>
          <Ionicons name="add" size={24} color="white" />
        </CustomAddButton>
        <View className=" bg-white flex-1 flex-row justify-around items-center h-full">
          {rightMenu.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-1 items-center justify-center h-full"
              onPress={() => navigation.navigate(item.label as never)}
            >
              <Ionicons
                name={
                  (route.name === item.label
                    ? `${item.icon}`
                    : `${item.icon}-outline`) as never
                }
                size={24}
                color="#4B5563"
              />
              <Text className="text-xs mt-1 text-gray-600">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default BottomMenu;
