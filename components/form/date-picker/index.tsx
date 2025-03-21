import { Pressable, Text } from "react-native";
import { useDatePicker } from "../../../hooks";

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
      {date && <Text>{date.toDateString()}</Text>}
    </Pressable>
  );
};
