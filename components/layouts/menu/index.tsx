import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { menuItems, MenuItemType } from "./config";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useAddBillModal } from "../../../context/modal.context";
import { useMutation } from "@tanstack/react-query";
import { uploadBillImage } from "../../../services/bill.service";
import { RootStackParamList } from "../../../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
      style={{ top: -30 }}
    >
      {children}
    </TouchableOpacity>
  );
};

const BottomMenu: React.FC<BottomMenuProps> = () => {
  // Define left and right menu items
  const leftMenu = menuItems.slice(0, 2).filter(Boolean) as MenuItemType[];
  const rightMenu = menuItems.slice(2, 4).filter(Boolean) as MenuItemType[];

  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { onOpen } = useAddBillModal();

  const { mutateAsync: uploadBillImageMutation } = useMutation({
    mutationFn: uploadBillImage,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (result.assets) {
      const data = await uploadBillImageMutation(result.assets[0]);
      await onOpen(data);
    }
  };

  return (
    <View className=" border-t border-gray-200 absolute bottom-0 left-0 right-0">
      <View className="flex-row justify-around items-center h-[84px] ">
        <View className="relative bg-white flex-1 flex-row justify-around items-center h-full">
          {leftMenu.map((item: MenuItemType, index: number) => (
            <TouchableOpacity
              key={index}
              className="flex-1 items-center justify-center h-full"
              onPress={() => navigation.navigate(item.path as never)}
            >
              <Ionicons
                name={
                  route.name === item.label
                    ? item.icon
                    : (`${item.icon}-outline` as keyof typeof Ionicons.glyphMap)
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
          {rightMenu.map((item: MenuItemType, index: number) => (
            <TouchableOpacity
              key={index}
              className="flex-1 items-center justify-center h-full"
              onPress={() => navigation.navigate(item.path as never)}
            >
              <Ionicons
                name={
                  route.name === item.label
                    ? item.icon
                    : (`${item.icon}-outline` as keyof typeof Ionicons.glyphMap)
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
