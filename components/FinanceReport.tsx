import React, { useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  BarChart,
  BarChartData,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "../utils/index";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "services/index";
import dayjs from "dayjs";
import { useCategory } from "hooks/index";
import { FORMAT_MONTH_YEAR, formatDate } from "../utils/date";
import { Toast } from "react-native-toast-notifications";
const screenWidth = Dimensions.get("window").width;

// Weekly activity data (for the line chart)
const weeklyData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      data: [200, 250, 290, 220, 180, 190], // Blue line
      color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [130, 200, 300, 170, 250, 170], // Purple line
      color: (opacity = 1) => `rgba(179, 102, 155, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ["Online", "Offline"],
};

// Progress chart data (for circular progress)
const progressData = {
  offlinePercentage: 0.78, // Represented as 45,324 in the image
  onlinePercentage: 0.65, // Represented as 12,236 in the image
};

// Card metrics data
const metricCards = [
  {
    title: "Tổng chi tiêu",
    value: "$508",
    lastValue: "$453",

    icon: "arrow-up-outline",
    bgColor: "#4cd97b", // Green
  },
];

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
  propsForLabels: {
    fontSize: 12,
  },
};

const FinanceReport = () => {
  const { getCategoryLabel, getCategoryColor } = useCategory();
  const today = dayjs().toISOString();
  const periodDays = {
    fromDate: dayjs().subtract(7, "day").toISOString(),
    toDate: today,
  };
  const navigation = useNavigation();
  const { data: generalReport } = useQuery(
    {
      queryKey: ["generalReport"],
      queryFn: () => ReportService.getGeneralReport(today),
    } // replace 'date' with the actual date parameter
  );

  const {
    data: targetReport,
    isLoading: targetReportLoading,
    error: targetReportError,
  } = useQuery({
    queryKey: ["targetReport"],
    queryFn: () => ReportService.getReportByPeriod(periodDays), // replace 'date' with the actual date parameter
    initialData: [],
  });
  console.log(44, targetReport);

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
    queryKey: ["report-by-category"],
    queryFn: () => ReportService.getReportByCategory(today), // replace 'fromDate' and 'toDate' with the actual date parameters
  });

  const navigateToDetail = (route: string) => {
    navigation.navigate(route as never);
  };

  return (
    <ScrollView className="flex-1 px-4 pt-4">
      {/* Third Row - Metric Cards */}
      <View className="flex-row flex-wrap justify-between mb-5">
        {metricCards.map((card, index) => (
          <View
            key={index}
            style={{ backgroundColor: card.bgColor }}
            className="w-[48%] p-4 rounded-xl mb-4"
          >
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-white font-medium">{card.title}</Text>
              </View>
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
        <View className="w-[48%] p-4 rounded-xl mb-4 bg-blue-400">
          <View className="flex-row justify-between items-center mb-4">
            {/* <View className="h-12 w-12 bg-white rounded-full items-center justify-center">
                <Ionicons
                  name={card.icon as any}
                  size={20}
                  color={card.bgColor}
                />
              </View> */}
            <View>
              <Text className="text-white font-medium">{"Mục tiêu"}</Text>
            </View>
          </View>
          <View className="flex-row items-baseline">
            <Text className="text-white text-xl font-bold">
              {formatNumber(generalReport?.currentMonthTotalAmount)} /{" "}
              {formatNumber(20000000)}
            </Text>
          </View>
        </View>
      </View>
      <View className="mb-5 bg-white rounded-lg shadow-sm">
        <Text className="px-4 py-2 font-bold">Chi tiết theo danh mục</Text>
        <View className="flex items-center">
          {reportByCategory && (
            <PieChart
              chartConfig={chartConfig}
              width={screenWidth - 40}
              height={220}
              data={
                reportByCategory?.map((category) => ({
                  name: getCategoryLabel(category.categoryId),
                  amount: Number(category.totalAmount),
                  population: Number(category.totalAmount),
                  color: getCategoryColor(category.categoryId),

                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                })) || []
              }
              backgroundColor="transparent"
              accessor={"population"}
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
              stroke: "#e7e7e7",
              strokeWidth: 1,
            },
          }}
          withInnerLines={false}
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default FinanceReport;
