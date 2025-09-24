import React, { useState } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import { BarChart, BarChartData, PieChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { formatNumber } from '../../../utils/index';
import { useQuery } from '@tanstack/react-query';
import { ReportService } from '@services';
import dayjs from 'dayjs';
import { useCategory, useUserConfig } from '@hooks';
import { FORMAT_MONTH_YEAR, formatDate } from '../../../utils/date';
import ChangeReportPeriodModal from './ChangeReportPeriodModal';
import { IUserConfig } from '@types';
const screenWidth = Dimensions.get('window').width;

// Card metrics data
const metricCards = [
  {
    title: 'Tổng chi tiêu',
    value: '$508',
    lastValue: '$453',

    icon: 'arrow-up-outline',
    bgColor: '#4cd97b', // Green
  },
];

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
  propsForLabels: {
    fontSize: 12,
  },
};

const FinanceReport = () => {
  const { getCategoryLabel, getCategoryColor } = useCategory();
  const {
    data: userConfig,
    setUserConfig,
    startDateInPeriod,
    endDateInPeriod,
  } = useUserConfig();
  const [isModalChangeReportVisible, setIsModalChangeReportVisible] =
    useState(false);
  const today = dayjs().toISOString();
  const periodDays = {
    fromDate: dayjs().subtract(7, 'day').toISOString(),
    toDate: today,
  };
  const navigation = useNavigation();

  const { data: generalReport } = useQuery(
    {
      queryKey: ['generalReport'],
      queryFn: () =>
        ReportService.getGeneralReport({
          fromDate: startDateInPeriod,
          toDate: endDateInPeriod,
        }),
      enabled: !!startDateInPeriod && !!endDateInPeriod,
    } // replace 'date' with the actual date parameter
  );

  const { data: targetReport } = useQuery({
    queryKey: ['targetReport'],
    queryFn: () => ReportService.getReportByPeriod(periodDays), // replace 'date' with the actual date parameter
    initialData: [],
  });

  const periodData: BarChartData = targetReport?.reduce(
    (result, item) => {
      const date = formatDate(item.date, { outputFormat: FORMAT_MONTH_YEAR });
      result.labels.push(date);
      result.datasets[0]?.data.push(item.totalAmount);

      return result;
    },
    {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    } as BarChartData
  );

  const { data: reportByCategory } = useQuery({
    queryKey: ['report-by-category'],
    queryFn: () => ReportService.getReportByCategory(today), // replace 'fromDate' and 'toDate' with the actual date parameters
  });

  const handleEditFinanceReport = () => {
    setIsModalChangeReportVisible(true);
  };
  return (
    <View className="flex-1 px-4 pt-4 -mt-16">
      <View className="flex-row flex-wrap justify-between mb-5">
        {metricCards.map((card, index) => (
          <View
            key={index}
            className="w-[48%] p-4 rounded-xl mb-4 bg-neutral-900/35"
          >
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-white text-lg font-semibold">
                  {card.title}
                </Text>
              </View>
              <Pressable onPress={handleEditFinanceReport}>
                <Ionicons name="edit" size={20} color="white" />
              </Pressable>
            </View>
            <View className="flex-row items-baseline">
              <Text className="text-white text-2xl font-bold">
                {formatNumber(generalReport?.currentMonthTotalAmount)}
              </Text>
              <Text className="text-white text-xs ml-1 opacity-80">
                Trong tháng
              </Text>
            </View>
            <View className="flex-row items-baseline opacity-50">
              <Text className="text-white text-xl font-bold">
                {formatNumber(generalReport?.previousMonthTotalAmount)}
              </Text>
              <Text className="text-white text-xs ml-1 opacity-80">
                Tháng trước
              </Text>
            </View>
          </View>
        ))}
        <View className="w-[48%] p-4 rounded-xl mb-4 bg-neutral-900/35">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-white text-lg font-semibold">
                {'Mục tiêu'}
              </Text>
            </View>
            <Ionicons name="edit" size={20} color="white" />
          </View>
          <View className="flex-row items-baseline">
            <Text className="text-white text-xl font-bold">
              {formatNumber(generalReport?.currentMonthTotalAmount)} /{' '}
              {formatNumber(20000000)}
            </Text>
          </View>
        </View>
      </View>
      <View className="mb-5 bg-white rounded-xl shadow-sm">
        <Text className="p-6 font-bold text-lg">Chi tiết theo danh mục</Text>
        <View className="flex items-center">
          {reportByCategory && (
            <PieChart
              chartConfig={chartConfig}
              width={screenWidth - 40}
              height={220}
              data={
                reportByCategory?.map(category => ({
                  name: getCategoryLabel(category.categoryId),
                  amount: Number(category.totalAmount),
                  population: Number(category.totalAmount),
                  color: getCategoryColor(category.categoryId),

                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                })) || []
              }
              backgroundColor="transparent"
              accessor={'population'}
            />
          )}
        </View>
      </View>
      <View className="mb-5 bg-white rounded-lg shadow-sm">
        <BarChart
          data={periodData}
          width={screenWidth - 48}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForBackgroundLines: {
              stroke: '#e7e7e7',
              strokeWidth: 1,
            },
          }}
          withInnerLines={false}
          style={{
            borderRadius: 16,
          }}
        />
      </View>
      {isModalChangeReportVisible && (
        <ChangeReportPeriodModal
          isVisible={isModalChangeReportVisible}
          onClose={() => setIsModalChangeReportVisible(false)}
          startDate={userConfig?.fromDate || periodDays.fromDate}
          cycle={userConfig?.cycle || ''}
          onSubmit={values => {
            setUserConfig(values).then(() => {
              setIsModalChangeReportVisible(false);
            });
          }}
        />
      )}
    </View>
  );
};

export default FinanceReport;
