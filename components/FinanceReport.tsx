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
    title: "Total Sales",
    value: "$508",
    period: "This month",
    icon: "arrow-up-outline",
    bgColor: "#4cd97b", // Green
  },
  {
    title: "Total Purchases",
    value: "$387",
    period: "This month",
    icon: "cart-outline",
    bgColor: "#4da1ff", // Blue
  },
  {
    title: "Total Orders",
    value: "$161",
    period: "This month",
    icon: "time-outline",
    bgColor: "#e8596f", // Red
  },
  {
    title: "Total Growth",
    value: "$231",
    period: "This month",
    icon: "trending-up-outline",
    bgColor: "#ffa93b", // Yellow/Orange
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
      {/* First Row - Downloads with Progress Charts */}
      <View className="mb-5 bg-white p-5 rounded-lg shadow-sm">
        <Text className="text-lg font-bold mb-2">Downloads</Text>
        <Text className="text-gray-400 mb-4">
          Watching ice melt. This is fun. Only you could make those words cute.
        </Text>

        <View className="flex-row justify-between">
          <View className="items-center">
            <View className="h-24 w-24 mb-2">
              {/* We're manually creating a circular progress here since ProgressChart doesn't match the design exactly */}
              <View className="h-24 w-24 rounded-full border-[12px] border-gray-100 justify-center items-center">
                <View
                  className="absolute h-24 w-24 rounded-full"
                  style={{
                    borderWidth: 12,
                    borderColor: "rgba(0, 0, 0, 0)",
                    borderLeftColor: "#e8596f", // Red
                    borderTopColor: "#e8596f", // Red
                    borderRadius: 48,
                    transform: [{ rotate: "225deg" }],
                  }}
                />
              </View>
              <View className="absolute inset-0 justify-center items-center">
                <Text className="text-gray-400 text-xs">Offline</Text>
                <Text className="text-2xl font-bold">45,324</Text>
              </View>
            </View>
          </View>

          <View className="items-center">
            <View className="h-24 w-24 mb-2">
              {/* Second circular progress */}
              <View className="h-24 w-24 rounded-full border-[12px] border-gray-100 justify-center items-center">
                <View
                  className="absolute h-24 w-24 rounded-full"
                  style={{
                    borderWidth: 12,
                    borderColor: "rgba(0, 0, 0, 0)",
                    borderLeftColor: "#ffa93b", // Orange/Yellow
                    borderTopColor: "#ffa93b", // Orange/Yellow
                    borderBottomColor: "#ffa93b", // To make more of the circle colored
                    borderRadius: 48,
                    transform: [{ rotate: "135deg" }],
                  }}
                />
              </View>
              <View className="absolute inset-0 justify-center items-center">
                <Text className="text-gray-400 text-xs">Online</Text>
                <Text className="text-2xl font-bold">12,236</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Second Row - Line Chart */}
      <View className="mb-5 bg-white p-5 rounded-lg shadow-sm">
        <LineChart
          data={weeklyData}
          width={screenWidth - 48} // Account for padding
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

      {/* Third Row - Metric Cards */}
      <View className="flex-row flex-wrap justify-between mb-5">
        {metricCards.map((card, index) => (
          <View
            key={index}
            style={{ backgroundColor: card.bgColor }}
            className="w-[48%] p-4 rounded-xl mb-4"
          >
            <View className="flex-row justify-between items-center mb-4">
              <View className="h-12 w-12 bg-white rounded-full items-center justify-center">
                <Ionicons
                  name={card.icon as any}
                  size={20}
                  color={card.bgColor}
                />
              </View>
              <View>
                <Text className="text-white font-medium">{card.title}</Text>
              </View>
            </View>
            <View className="flex-row items-baseline">
              <Text className="text-white text-2xl font-bold">
                {card.value}
              </Text>
              <Text className="text-white text-xs ml-1 opacity-80">
                {card.period}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Fourth Row - List Items */}
      <View className="mb-5">
        <Text className="text-lg font-bold mb-3 px-1">
          Financial Management
        </Text>
        {listItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white p-4 rounded-lg mb-3 shadow-sm"
            onPress={() => navigateToDetail(item.route)}
          >
            <View className="flex-row items-center">
              <View
                className="h-12 w-12 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: `${item.color}15` }} // Using hex with transparency
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-base">{item.title}</Text>
                <Text className="text-gray-500 text-sm">
                  {item.description}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#9ca3af"
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default FinanceReport;
