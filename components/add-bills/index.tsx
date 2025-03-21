import React from "react";
import { Modal, View, Text, Pressable, FlatList } from "react-native";

import { Bill } from "./Bill";
import { IBill } from "../../types";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const data: IBill[] = [
  {
    id: 1,
    type: "increase",
    date: new Date(),
    amount: 1000,
    category: "Food",
    description: "Mua thức ăn",
  },
  {
    id: 2,
    type: "increase",
    date: new Date(),
    amount: 1000,
    category: "Food",
    description: "Mua thức ăn",
  },
  {
    id: 3,
    type: "increase",
    date: new Date(),
    amount: 1000,
    category: "Food",
    description: "Mua thức ăn",
  },
];
const AddBill: React.FC<ModalProps> = ({ isVisible, onClose, title }) => {
  const [listData, setListData] = React.useState(data);

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-full p-5 rounded-2xl">
          {title && <Text className="text-lg font-bold mb-3">{title}</Text>}
          <FlatList
            data={listData}
            renderItem={({ item, index }) => (
              <Bill
                key={item.id}
                onChange={(item) => {
                  const updatedData = [...listData];
                  updatedData[index] = item;
                  setListData(updatedData);
                }}
                onDelete={() => {
                  const updatedData = [...listData];
                  updatedData.splice(index, 1);
                  setListData(updatedData);
                }}
                index={index}
                item={item}
              />
            )}
          />
          <View className="flex ">
            <Pressable
              onPress={onClose}
              className="mt-4 bg-blue-500 py-2 rounded-xl"
            >
              <Text className="text-white text-center font-semibold">
                Close
              </Text>
            </Pressable>
            <Pressable
              onPress={onClose}
              className="mt-4 border border-blue-500 py-2 rounded-xl"
            >
              <Text className="text-white text-center font-semibold">Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddBill;
