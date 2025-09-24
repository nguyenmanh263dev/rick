import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import BottomMenu from '../../components/layouts/menu';
import { getBillsByDate } from '../../services/bill.service';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { formatNumber } from '../../utils/index';
import dayjs from 'dayjs';
// Import BottomSheet from the package
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from 'node_modules/@gorhom/bottom-sheet/lib/typescript/types';
import { IBill } from '@types';
import ListBills from './components/list-bills';
import { set, get } from 'lodash';
import { FORMAT_DATE } from '../../utils/date';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Bill } from '@components/add-bills/components/bill';
import { BillService } from '@services';
import Button from '@components/button';

const DAYS: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
  // Add state for selected date items
  const [billsOfDay, setBillsOfDay] = useState<IBill[]>([]);
  const [billDetail, setBillDetail] = useState<IBill>();
  const sheetRef = useRef<BottomSheet>(null);
  // Create a ref for the bottom sheet
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  // Define snap points for the bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  const handleDateSelect = useCallback(
    (date: Date) => {
      onSelectDate(date);
    },
    [onSelectDate]
  );
  const queryClient = new QueryClient();
  const { data } = useQuery({
    queryKey: ['bills', currentMonth.toDate()],
    queryFn: params => getBillsByDate(currentMonth.toDate(), params),
  });

  const { mutate: editBill, isPending } = useMutation({
    mutationFn: (data: IBill) => BillService.updateBill(data.id, data),
    onSuccess: () => {
      sheetRef.current?.close();
      queryClient.invalidateQueries({
        queryKey: ['bills', currentMonth.toDate()],
      });
    },
  });

  const onSubmit = useCallback(() => {
    if (billDetail) {
      editBill(billDetail);
    }
  }, [billDetail, editBill]);

  const calendarData = useMemo(() => {
    return (
      data?.reduce((result, item) => {
        return { ...result, [item.date as unknown as string]: item };
      }, {}) || {}
    );
  }, [data]);

  // Add function to handle calendar item click
  const handleCalendarItemClick = useCallback(
    (date: string) => {
      const items = get(calendarData, `${date}.items`);
      setBillsOfDay(items || []);
    },
    [calendarData]
  );

  const changeMonth = useCallback(
    (amount: number) => {
      const newMonth = currentMonth.add(amount, 'month');
      setCurrentMonth(newMonth);
      onMonthChange?.(newMonth.toDate());
    },
    [currentMonth, onMonthChange]
  );

  const generateMatrix = useCallback((): Array<Array<string | number>> => {
    const matrix: Array<Array<string | number>> = [];

    const firstDay = currentMonth.startOf('month').day();
    const daysInMonth = currentMonth.daysInMonth();

    let counter = 1;
    for (let row = 1; row < 6; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        if (row === 1 && col < firstDay) {
          set(matrix, [row, col], '');
        } else if (counter > daysInMonth) {
          set(matrix, [row, col], '');
        } else {
          set(matrix, [row, col], counter++);
        }
      }
    }

    return matrix;
  }, [currentMonth]);

  const matrix = useMemo(() => generateMatrix(), [generateMatrix]);

  const isDateDisabled = useCallback(
    (date: string | number): boolean => {
      if (!date || typeof date === 'string') return true;

      const fullDate = currentMonth.date(date as number);

      if (minDate && fullDate.isBefore(dayjs(minDate))) return true;
      if (maxDate && fullDate.isAfter(dayjs(maxDate))) return true;

      return false;
    },
    [currentMonth, minDate, maxDate]
  );

  const isDateSelected = useCallback(
    (date: string | number): boolean => {
      if (!date || typeof date === 'string') return false;

      const fullDate = currentMonth.date(date as number);
      const selected = dayjs(selectedDate);

      return fullDate.isSame(selected, 'day');
    },
    [currentMonth, selectedDate]
  );

  const isDateMarked = useCallback(
    (date: string | number): boolean => {
      if (!date || typeof date === 'string') return false;

      const dateString = currentMonth.date(date as number).format('YYYY-MM-DD');
      return !!markedDates[dateString];
    },
    [currentMonth, markedDates]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-100 relative h-screen"
    >
      <View className="p-4 m-2 bg-white rounded-xl shadow-slate-400">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="p-2" onPress={() => changeMonth(-1)}>
            <Text className="text-sky-500 font-bold text-2xl">←</Text>
          </TouchableOpacity>

          <Text className="text-xl font-bold text-gray-800">
            {currentMonth.format('MMMM YYYY')}
          </Text>

          <TouchableOpacity className="p-2" onPress={() => changeMonth(1)}>
            <Text className="text-sky-500 font-bold text-2xl">→</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View className="flex-row">
            {DAYS.map(day => (
              <View
                key={`col-${day}`}
                className="flex-1 m-[1px] px-1 py-2 text-center bg-white"
              >
                <Text className="font-bold text-gray-500 text-center">
                  {day}
                </Text>
              </View>
            ))}
          </View>
          {matrix.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} className="flex-row">
              {row.map((item, colIndex) => {
                const fullDate = currentMonth
                  .date(item as number)
                  .format(FORMAT_DATE);
                const totalMonth = formatNumber(
                  get(calendarData, `${fullDate}.totalAmount`) || 0
                );
                const disabled = isDateDisabled(item);
                const selected = isDateSelected(item);
                const marked = isDateMarked(item);

                let cellClassName =
                  'flex-1 m-[1px] rounded-lg shadow-sm p-1 bg-white h-14';

                if (marked && !selected)
                  cellClassName += ' border border-sky-500';
                if (disabled) cellClassName += ' opacity-30';

                let textClassName = 'font-semibold text-gray-800 ';
                if (selected)
                  textClassName += ' text-sky-500 w-6 h-6 font-bold';

                return (
                  <TouchableOpacity
                    key={`col-${colIndex}`}
                    className={cellClassName}
                    disabled={disabled}
                    onPress={() => {
                      if (!disabled && typeof item === 'number') {
                        const date = currentMonth.date(item).toDate();
                        handleDateSelect(date);
                        handleCalendarItemClick(fullDate);
                      }
                    }}
                  >
                    <Text className={textClassName}>{item}</Text>
                    {!disabled && item && totalMonth !== '0' && (
                      <Text className="text-sm text-sky-400 text-right font-semibold mt-auto tracking-tighter">
                        {totalMonth}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      <ListBills
        bills={billsOfDay}
        onEdit={bill => {
          sheetRef.current?.expand();
          setBillDetail(bill);
        }}
      />

      <BottomMenu />
      <BottomSheet
        ref={sheetRef}
        snapPoints={['50%']}
        enablePanDownToClose
        index={-1}
      >
        <BottomSheetView className="py-16">
          {billDetail && (
            <Bill
              onDelete={() => {}}
              index={0}
              item={billDetail}
              onChange={setBillDetail}
            />
          )}
        </BottomSheetView>
        <Button
          isLoading={isPending}
          onPress={onSubmit}
          className="mt-4 border border-sky-500 bg-sky-500 py-2 rounded-xl"
          title="Save"
        />
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};
