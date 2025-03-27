import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import BottomMenu from "../../components/layouts/menu";
import { getBillsByDate } from "services/bill.service";
import { useQuery } from "@tanstack/react-query";
import { formatNumber } from "utils";
import dayjs from "dayjs";

const DAYS: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Interface for marked dates
interface MarkedDate {
  selected?: boolean;
  marked?: boolean;
  dotColor?: string;
}

// Interface for marked dates object
interface MarkedDates {
  [date: string]: MarkedDate;
}

// Interface for Calendar props
interface CalendarProps {
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  markedDates?: MarkedDates;
  onMonthChange?: (month: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  onSelectDate = () => {},
  selectedDate = new Date(),
  minDate,
  maxDate,
  markedDates = {},
  onMonthChange = () => {},
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => dayjs(new Date()));

  const handleDateSelect = useCallback(
    (date: Date) => {
      onSelectDate(date);
    },
    [onSelectDate]
  );

  const { data } = useQuery({
    queryKey: ["bills", currentMonth.toDate()],
    queryFn: (params) => getBillsByDate(currentMonth.toDate(), params),
  });

  const calendarData = useMemo(() => {
    return (
      data?.reduce((result, item) => {
        return { ...result, [item.date as unknown as string]: item };
      }, {}) || {}
    );
  }, [data]);

  const changeMonth = useCallback(
    (amount: number) => {
      const newMonth = currentMonth.add(amount, "month");
      setCurrentMonth(newMonth);
      onMonthChange(newMonth.toDate());
    },
    [currentMonth, onMonthChange]
  );

  const generateMatrix = useCallback((): Array<Array<string | number>> => {
    const matrix: Array<Array<string | number>> = [];
    matrix[0] = DAYS;

    const firstDay = currentMonth.startOf("month").day();
    const daysInMonth = currentMonth.daysInMonth();

    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        if (row === 1 && col < firstDay) {
          matrix[row][col] = "";
        } else if (counter > daysInMonth) {
          matrix[row][col] = "";
        } else {
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  }, [currentMonth]);

  const matrix = useMemo(() => generateMatrix(), [generateMatrix]);

  const isDateDisabled = useCallback(
    (date: string | number): boolean => {
      if (!date || typeof date === "string") return true;

      const fullDate = currentMonth.date(date as number);

      if (minDate && fullDate.isBefore(dayjs(minDate))) return true;
      if (maxDate && fullDate.isAfter(dayjs(maxDate))) return true;

      return false;
    },
    [currentMonth, minDate, maxDate]
  );

  const isDateSelected = useCallback(
    (date: string | number): boolean => {
      if (!date || typeof date === "string") return false;

      const fullDate = currentMonth.date(date as number);
      const selected = dayjs(selectedDate);

      return fullDate.isSame(selected, "day");
    },
    [currentMonth, selectedDate]
  );

  const isDateMarked = useCallback(
    (date: string | number): boolean => {
      if (!date || typeof date === "string") return false;

      const dateString = currentMonth.date(date as number).format("YYYY-MM-DD");
      return !!markedDates[dateString];
    },
    [currentMonth, markedDates]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100 relative h-screen"
    >
      <View>
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity className="p-2" onPress={() => changeMonth(-1)}>
            <Text className="text-blue-500 font-bold text-lg">←</Text>
          </TouchableOpacity>

          <Text className="text-lg font-bold text-gray-800">
            {currentMonth.format("MMMM YYYY")}
          </Text>

          <TouchableOpacity className="p-2" onPress={() => changeMonth(1)}>
            <Text className="text-blue-500 font-bold text-lg">→</Text>
          </TouchableOpacity>
        </View>

        <View>
          {matrix.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} className="flex-row">
              {row.map((item, colIndex) => {
                const fullDate = currentMonth
                  .date(item as number)
                  .format("DD/MM/YYYY");
                const totalMonth = formatNumber(
                  calendarData[fullDate]?.totalAmount
                );
                const isHeader = rowIndex === 0;
                const isEmpty = item === "";
                const disabled = isDateDisabled(item);
                const selected = isDateSelected(item);
                const marked = isDateMarked(item);

                let cellClassName =
                  "flex-1 m-[1px] rounded-lg shadow p-1 bg-white";

                if (marked && !selected)
                  cellClassName += " border border-blue-500";
                if (disabled && !isHeader) cellClassName += " opacity-30";

                let textClassName = "font-semibold";
                if (isHeader) {
                  cellClassName += " bg-transparent text-center border-0";
                  textClassName += " text-center font-bold text-gray-500";
                } else {
                  textClassName += " text-gray-800 ";
                  cellClassName += " h-16";
                }
                if (selected)
                  textClassName += " text-white bg-blue-500 w-6 h-6 font-bold";

                return (
                  <TouchableOpacity
                    key={`col-${colIndex}`}
                    className={cellClassName}
                    disabled={isEmpty || disabled || isHeader}
                    onPress={() => {
                      if (
                        !isEmpty &&
                        !isHeader &&
                        !disabled &&
                        typeof item === "number"
                      ) {
                        const date = currentMonth.date(item).toDate();
                        handleDateSelect(date);
                      }
                    }}
                  >
                    <Text className={textClassName}>{item}</Text>
                    {!isHeader && item && (
                      <>
                        <Text className="text-sm text-red-400 text-right font-semibold mt-auto">
                          {totalMonth}
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
      <BottomMenu />
    </KeyboardAvoidingView>
  );
};
