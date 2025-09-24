import { Pressable, Text, View } from 'react-native';
import { formatDate } from '../../../utils/date';
import dayjs from 'dayjs';
import { useDatePicker } from '@context/modal.context';
interface Props {
  date?: Date | null;
  onValueChange: (value: Date | null) => void;
  mode?: 'date' | 'time' | 'datetime';
}

export const DatePicker = ({ date, onValueChange, mode = 'date' }: Props) => {
  const { onOpen: handlePickDate } = useDatePicker();
  return (
    <Pressable
      onPress={async () => {
        const newDate = await handlePickDate({
          date: dayjs(date).toDate(),
          mode,
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
