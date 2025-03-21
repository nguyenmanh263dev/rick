import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import BottomMenu from "../../components/layouts/menu";

const DAYS: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleDateSelect = useCallback(
    (date: Date) => {
      onSelectDate(date);
    },
    [onSelectDate]
  );

  const changeMonth = useCallback(
    (amount: number) => {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(newMonth.getMonth() + amount);
      setCurrentMonth(newMonth);
      onMonthChange(newMonth);
    },
    [currentMonth, onMonthChange]
  );

  const generateMatrix = useCallback((): Array<Array<string | number>> => {
    const matrix: Array<Array<string | number>> = [];

    // Create header row (Sun, Mon, Tue, etc)
    matrix[0] = DAYS;

    // Get the first day of the month
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    // Get the number of days in the month
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    // Create the matrix
    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        if (row === 1 && col < firstDay) {
          // Add empty spots before the first day of the month
          matrix[row][col] = "";
        } else if (counter > daysInMonth) {
          // Add empty spots after the last day of the month
          matrix[row][col] = "";
        } else {
          // Add the date
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

      const fullDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        date
      );

      if (minDate && fullDate < new Date(minDate)) return true;
      if (maxDate && fullDate > new Date(maxDate)) return true;

      return false;
    },
    [currentMonth, minDate, maxDate]
  );

  const isDateSelected = useCallback(
    (date: string | number): boolean => {
      if (!date || typeof date === "string") return false;

      const fullDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        date
      );
      const selected = new Date(selectedDate);

      return (
        fullDate.getDate() === selected.getDate() &&
        fullDate.getMonth() === selected.getMonth() &&
        fullDate.getFullYear() === selected.getFullYear()
      );
    },
    [currentMonth, selectedDate]
  );

  const isDateMarked = useCallback(
    (date: string | number): boolean => {
      if (!date || typeof date === "string") return false;

      const dateString = `${currentMonth.getFullYear()}-${String(
        currentMonth.getMonth() + 1
      ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
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
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>

          <TouchableOpacity className="p-2" onPress={() => changeMonth(1)}>
            <Text className="text-blue-500 font-bold text-lg">→</Text>
          </TouchableOpacity>
        </View>

        <View>
          {matrix.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} className="flex-row">
              {row.map((item, colIndex) => {
                const isHeader = rowIndex === 0;
                const isEmpty = item === "";
                const disabled = isDateDisabled(item);
                const selected = isDateSelected(item);
                const marked = isDateMarked(item);

                // Dynamically build className string
                let cellClassName =
                  "flex-1 m-[1px] rounded-lg shadow p-1 bg-white";

                if (marked && !selected)
                  cellClassName += " border border-blue-500";
                if (disabled && !isHeader) cellClassName += " opacity-30";

                // Dynamically build text className string
                let textClassName = "font-semibold";
                if (isHeader) {
                  cellClassName += " bg-transparent text-center border-0";
                  textClassName += " text-center font-bold text-gray-500";
                } else {
                  textClassName += " text-gray-800 ";
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
                        const date = new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          item
                        );
                        handleDateSelect(date);
                      }
                    }}
                  >
                    <Text className={textClassName}>{item}</Text>
                    {!isHeader && item && (
                      <>
                        <Text className="text-sm text-green-400 text-right font-semibold">
                          {"1M"}
                        </Text>
                        <Text className="text-sm text-red-400 text-right font-semibold">
                          {"900k"}
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
