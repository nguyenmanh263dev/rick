import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ReportDetail = () => {
  const navigation = useNavigation();

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [4000, 4200, 4100, 4300, 4150, 4250], // Income
        color: (opacity = 1) => `rgba(76, 217, 123, ${opacity})`, // Green
        strokeWidth: 2,
      },
      {
        data: [2500, 3200, 2800, 3100, 2700, 3000], // Expenses
        color: (opacity = 1) => `rgba(232, 89, 111, ${opacity})`, // Red
        strokeWidth: 2,
      },
    ],
    legend: ["Income", "Expenses"],
  };

  const quarterlyData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        data: [12300, 13200, 11800, 15400],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 12,
    },
    propsForBackgroundLines: {
      stroke: "#e7e7e7",
      strokeWidth: 1,
    },
  };

  const reportSections = [
    {
      title: "Monthly Summary",
      description: "View your monthly income and expenses",
      icon: "calendar-outline",
      color: "#4da1ff",
    },
    {
      title: "Annual Report",
      description: "Yearly financial overview and trends",
      icon: "trending-up-outline",
      color: "#4cd97b",
    },
    {
      title: "Budget Analysis",
      description: "Compare actual spending to budgets",
      icon: "calculator-outline",
      color: "#e8596f",
    },
    {
      title: "Custom Reports",
      description: "Generate customized financial reports",
      icon: "document-text-outline",
      color: "#ffa93b",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">
          Financial Reports
        </Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="mb-5">
          <Text className="text-lg font-medium mb-2">Income vs Expenses</Text>
          <Text className="text-gray-500 mb-4">Monthly comparison</Text>

          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <LineChart
              data={monthlyData}
              width={screenWidth - 48}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-medium mb-2">Quarterly Revenue</Text>
          <Text className="text-gray-500 mb-4">Revenue by quarter</Text>

          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <BarChart
              data={quarterlyData}
              width={screenWidth - 48}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(77, 161, 255, ${opacity})`,
              }}
              style={{
                borderRadius: 16,
              }}
              yAxisLabel="$"
            />
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-medium mb-2">Report Types</Text>

          {reportSections.map((section, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white p-4 rounded-lg mb-3 shadow-sm"
            >
              <View className="flex-row items-center">
                <View
                  className="h-12 w-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: `${section.color}15` }}
                >
                  <Ionicons
                    name={section.icon as any}
                    size={22}
                    color={section.color}
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-base">{section.title}</Text>
                  <Text className="text-gray-500 text-sm">
                    {section.description}
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
    </SafeAreaView>
  );
};

export default ReportDetail;
