import { useCategory } from "hooks/index";
import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { IBill } from "types";
import { formatCompactNumber, formatNumber } from "../../../../utils/index";
import { formatDate } from "../../../../utils/date";
import SwipeableToDelete from "components/swipable-to-delete";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ListBills = ({
  bills,
  onEdit,
}: {
  bills: IBill[];
  onEdit: (bill: IBill) => void;
}) => {
  const { getCategoryLabel, getCategoryColor } = useCategory();

  const renderBillItem = ({ item }: { item: IBill }) => (
    <SwipeableToDelete
      onEdit={() => {
        onEdit(item);
      }}
    >
      <View
        className={`bg-white rounded-lg p-4 mb-3 flex-row justify-between items-center shadow-sm border-l-4 `}
        style={{ borderLeftColor: getCategoryColor(item.categoryId) }}
      >
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800 mb-1">
            {getCategoryLabel(item.categoryId)}
          </Text>
          <Text className="text-sm text-gray-600">
            Ngày {formatDate(item.date)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-lg font-bold text-gray-800 mb-1">
            {formatNumber(item.amount)}
          </Text>
        </View>
      </View>
    </SwipeableToDelete>
  );

  if (!bills || bills.length === 0) {
    return null;
  }
  return (
    <View className="flex-1 bg-white rounded-2xl shadow-slate-400 p-4 m-2">
      <Text className="text-xl font-bold mb-4 text-gray-800">Bills</Text>
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
