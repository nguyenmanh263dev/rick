import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "utils";

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
  const navigation = useNavigation();

  const listItems = [
    {
      title: "Category",
      icon: "list-outline",
      description: "View expenses by category",
      color: "#4da1ff", // Blue
      route: "CategoryDetail",
    },
    {
      title: "Report",
      icon: "document-text-outline",
      description: "Financial reports and analytics",
      color: "#4cd97b", // Green
      route: "ReportDetail",
    },
  ];

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
              {/* <View className="h-12 w-12 bg-white rounded-full items-center justify-center">
                <Ionicons
                  name={card.icon as any}
                  size={20}
                  color={card.bgColor}
                />
              </View> */}
              <View>
                <Text className="text-white font-medium">{card.title}</Text>
              </View>
            </View>
            <View className="flex-row items-baseline">
              <Text className="text-white text-2xl font-bold">
                {card.value}
              </Text>
              <Text className="text-white text-xs ml-1 opacity-80">
                Trong tháng
              </Text>
            </View>
            <View className="flex-row items-baseline opacity-50">
              <Text className="text-white text-xl font-bold">
                {card.lastValue}
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
              {formatNumber(18000000)} / {formatNumber(20000000)}
            </Text>
          </View>
        </View>
      </View>

      <View className="mb-5 bg-white rounded-lg shadow-sm">
        <LineChart
          data={{
            // Get last 10 days
            labels: Array.from({ length: 10 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (9 - i));
              return date.getDate().toString();
            }),
            datasets: [
              {
                data: Array.from(
                  { length: 10 },
                  () => Math.floor(Math.random() * 3000) + 1000 // Sample data between 1000-4000
                ),
                color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
                strokeWidth: 2,
              },
              {
                data: Array.from(
                  { length: 10 },
                  () => Math.floor(Math.random() * 3000) + 1000 // Sample data between 1000-4000
                ),
                color: (opacity = 1) => `rgba(179, 102, 155, ${opacity})`,
                strokeWidth: 2,
              },
            ],
            legend: ["Online", "Offline"],
          }}
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
          bezier
          withDots={false}
          withInnerLines={false}
          withOuterLines={true}
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default FinanceReport;
