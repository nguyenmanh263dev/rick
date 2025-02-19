import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import DatePicker from "react-native-date-picker";
import RNPickerSelect from "react-native-picker-select";
import { useDatePicker } from "../../context/modal.context";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const defaultIncomeOutcome = [
  {
    label: "Increase",
    value: "increase",
  },
  {
    label: "Decrease",
    value: "decrease",
  },
];

const defaultCategories = [
  {
    label: "Food",
    value: "Food",
  },
  {
    label: "Drink",
    value: "Drink",
  },
];

const data = [
  {
    type: "increase",
    date: new Date(),
    amount: 1000,
    category: "Food",
    description: "Mua thức ăn",
  },
  {
    type: "increase",
    date: new Date(),
    amount: 1000,
    category: "Food",
    description: "Mua thức ăn",
  },
  {
    type: "increase",
    date: new Date(),
    amount: 1000,
    category: "Food",
    description: "Mua thức ăn",
  },
];
const AddBill: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
}) => {
  const [listData, setListData] = React.useState(data);
  const { onOpen: handlePickDate } = useDatePicker();

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-full p-5 rounded-2xl">
          {title && <Text className="text-lg font-bold mb-3">{title}</Text>}
          <FlatList
            data={listData}
            renderItem={({ item, index }) => (
              <View className=" border-b py-4">
                <View className="flex justify-between items-center flex-row">
                  <Text>{index + 1}</Text>
                  <RNPickerSelect
                    value={item.type}
                    onValueChange={(value) => {
                      const cloneArr = [...listData];
                      cloneArr[index].type = value;
                      setListData(cloneArr);
                    }}
                    items={defaultIncomeOutcome}
                  />
                  <TextInput
                    className=" border-0 max-w-1/4"
                    value={item.amount.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const cloneArr = [...listData];
                      cloneArr[index].amount = Number(text);
                      setListData(cloneArr);
                    }}
                  />
                  <RNPickerSelect
                    value={item.category}
                    onValueChange={(value) => {
                      const cloneArr = [...listData];
                      cloneArr[index].category = value;
                      setListData(cloneArr);
                    }}
                    items={defaultCategories}
                  />
                  <Pressable
                    onPress={async () => {
                      const newDate = await handlePickDate({ date: item.date });
                      if (newDate) {
                        const cloneArr = [...listData];
                        cloneArr[index].date = newDate;
                        setListData(cloneArr);
                      }
                    }}
                  >
                    <Text>{item.date.toDateString()}</Text>
                  </Pressable>
                </View>
                <TextInput
                  className="mt-4 border-0 max-w-1/4"
                  value={item.description}
                  onChangeText={(text) => {
                    const cloneArr = [...listData];
                    cloneArr[index].description = text;
                    setListData(cloneArr);
                  }}
                />
              </View>
            )}
          />

          <Pressable
            onPress={onClose}
            className="mt-4 bg-blue-500 py-2 rounded-xl"
          >
            <Text className="text-white text-center font-semibold">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddBill;
