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
import { formatCurrencyToNumber, formatCurrency } from "utils/number";

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
      <View className="border-b border-gray-300 py-2 border px-4 rounded-xl mb-2 bg-sky-10">
        <View className="flex justify-between items-center flex-row">
          <Text className="text-lg font-bold mb-0 p-0 text-sky-500">
            {index + 1}
          </Text>
          <TextInput
            className="border-0 max-w-1/4 pt-0"
            value={formatCurrency(item.amount || 0)}
            keyboardType="numeric"
            multiline={true}
            placeholder="Enter amount"
            numberOfLines={4}
            onChangeText={(text) => {
              onChange({ ...item, amount: formatCurrencyToNumber(text) });
            }}
          />
          <View className="max-w-40 overflow-hidden">
            <RNPickerSelect
              value={item.categoryId}
              onValueChange={(categoryId) => {
                onChange({ ...item, categoryId });
              }}
              items={defaultCategories}
            />
          </View>

          <DatePicker
            onValueChange={(date) => {
              if (!date) return;
              onChange({ ...item, date });
            }}
            date={item.date}
          />
        </View>
        <TextInput
          className="mt-2 border-0 max-w-1/4"
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
