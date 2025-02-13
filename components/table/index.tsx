import { View, Text, FlatList } from "react-native";
import { HeaderProps } from "../../types";
import { get } from "lodash";

interface Props<T> {
  headers: HeaderProps[];
  data: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  key?: string;
}

export default function Table<T>({
  headers,
  data,
  renderItem,
  key = "id",
}: Props<T>) {
  return (
    <View className="p-4 bg-gray-100 flex-1">
      {/* Header */}
      <View className="flex-row bg-blue-500 p-3 rounded-t-lg">
        {headers.map((header) => (
          <Text className="flex-1 text-white font-bold text-center">
            {header.label}
          </Text>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => get(item, key)}
        renderItem={({ item, index }) => (
          <View
            className={`flex-row p-3 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-200"
            }`}
          >
            {renderItem(item, index)}
          </View>
        )}
      />
    </View>
  );
}
