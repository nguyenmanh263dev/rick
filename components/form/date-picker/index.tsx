import { Pressable, Text, View } from "react-native";
import { useDatePicker } from "../../../hooks";
import { formatDate } from "../../../utils/date";
interface Props {
  date?: Date | null;
  onValueChange: (value: Date | null) => void;
}

export const DatePicker = ({ date, onValueChange }: Props) => {
  const { onOpen: handlePickDate } = useDatePicker();
  return (
    <Pressable
      onPress={async () => {
        const newDate = await handlePickDate({
          date,
        });
        onValueChange(newDate || null);
      }}
    >
      <View className="min-w-4">
        {date ? (
          <Text>{formatDate(date)}</Text>
        ) : (
          <Text className="text-gray-600">'DD/MM/YYYY'</Text>
        )}
      </View>
    </Pressable>
  );
};
