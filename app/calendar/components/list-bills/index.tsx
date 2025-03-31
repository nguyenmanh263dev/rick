import { useCategory } from "hooks";
import { styles } from "node_modules/@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { IBill } from "types";
import { formatCompactNumber } from "utils";
import { formatDate } from "utils/date";

const ListBills = ({ bills }: { bills: IBill[] }) => {
  const { getCategoryLabel, getCategoryColor } = useCategory();
  const renderBillItem = ({ item }: { item: IBill }) => (
    <View
      className={`bg-white rounded-lg p-4 mb-3 flex-row justify-between items-center shadow-sm border-l-4 `}
      style={{ borderLeftColor: getCategoryColor(item.categoryId) }}
    >
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800 mb-1">
          {getCategoryLabel(item.categoryId)}
        </Text>
        <Text className="text-sm text-gray-600">
          At {formatDate(item.date)}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-lg font-bold text-gray-800 mb-1">
          {formatCompactNumber(item.amount)}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4 text-gray-800">
        Upcoming Bills
      </Text>
      <FlatList
        data={bills}
        renderItem={renderBillItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerClassName="pb-5"
        ListEmptyComponent={
          <Text className="text-center mt-10 text-base text-gray-600">
            No bills to display
          </Text>
        }
      />
    </View>
  );
};

export default ListBills;
