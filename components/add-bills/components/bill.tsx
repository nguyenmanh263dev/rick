import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { IBill } from "../../../types";
import { DatePicker } from "../../form/date-picker";
import { useCategory } from "../../../hooks";

const renderRightActions = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} className="justify-center px-4">
    <Ionicons name="trash" size={24} color="red" />
  </TouchableOpacity>
);

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

interface Props {
  onDelete: () => void;
  onChange: (value: IBill) => void;
  index: number;
  item: IBill;
}
export const Bill = ({ onDelete, index, item, onChange }: Props) => {
  const { data: categories } = useCategory();
  const defaultCategories = categories?.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <Swipeable
      renderRightActions={() =>
        renderRightActions({
          onPress: () => {
            onDelete();
          },
        })
      }
    >
      <View className=" border-b py-4">
        <View className="flex justify-between items-center flex-row">
          <Text>{index + 1}</Text>
          <Text>{item.amount}</Text>

          <RNPickerSelect
            value={item.categoryId}
            onValueChange={(categoryId) => {
              onChange({ ...item, categoryId });
            }}
            items={defaultCategories}
          />
          <DatePicker
            onValueChange={(date) => {
              if (!date) return;
              onChange({ ...item, date });
            }}
            date={item.date}
          />
        </View>
        <TextInput
          className="mt-4 border-0 max-w-1/4"
          value={item.description}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => {
            onChange({ ...item, description: text });
          }}
        />
      </View>
    </Swipeable>
  );
};
