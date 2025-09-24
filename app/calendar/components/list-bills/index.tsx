import { useCategory } from '@hooks';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { IBill } from '@types';
import { formatNumber } from '../../../../utils/index';
import { formatDate } from '../../../../utils/date';
import SwipeableToDelete from '@components/swipable-to-delete';

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
            {getCategoryLabel(item.categoryId)}: {formatNumber(item.amount)}
          </Text>
          <Text className="text-sm text-gray-600">{item.description}</Text>
        </View>
      </View>
    </SwipeableToDelete>
  );

  if (!bills || bills.length === 0) {
    return null;
  }
  return (
    <View className="flex-1 bg-white rounded-2xl shadow-slate-400 p-4 m-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold mb-4 text-gray-800">Bills</Text>
        {bills[0]?.date && (
          <Text className="text-lg font-bold text-gray-600">
            Ngày {formatDate(bills[0]?.date)}
          </Text>
        )}
      </View>
      <FlatList
        data={bills}
        renderItem={renderBillItem}
        keyExtractor={item => item.id.toString()}
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
