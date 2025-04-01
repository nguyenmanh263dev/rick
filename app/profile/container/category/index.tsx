import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../../../services/category.service";
import CreateCategoryModal from "./components/CreateCategoryModal";
import { useCategory } from "../../../../hooks";
import SwipeableToDelete from "../../../../components/swipable-to-delete";
import { ICategory } from "types";
import { Toast } from "react-native-toast-notifications";

const CategoryDetail = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [isCreateCategoryModalVisible, setIsCreateCategoryModalVisible] =
    useState(false);

  const { data: categories, isLoading, createCategory } = useCategory();

  // Delete category mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      Toast.show("Deleted", {
        type: "success",
      });
    },
  });

  const handleCreateCategory = () => {
    setIsCreateCategoryModalVisible(true);
  };

  const handleCreateCategorySubmit = (categoryName: string) => {
    createCategory(categoryName).then(() =>
      setIsCreateCategoryModalVisible(false)
    );
  };

  const handleUpdateCategory = (category: ICategory) => {
    navigation.navigate("CategoryDetailForm" as never, { category });
  };

  const handleDeleteCategory = (category: ICategory) => {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete ${category.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteMutation.mutate(category.id);
          },
        },
      ]
    );
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">
            Expense Categories
          </Text>
          <TouchableOpacity onPress={handleCreateCategory} className="p-2">
            <Ionicons name="add-circle-outline" size={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="mb-4">
            <Text className="text-lg font-medium mb-2">Expense Breakdown</Text>
            <Text className="text-gray-500 mb-2">
              Your spending by category
            </Text>
          </View>

          {isLoading ? (
            <Text className="text-center text-gray-500">
              Loading categories...
            </Text>
          ) : categories.length === 0 ? (
            <Text className="text-center text-gray-500">
              No categories found
            </Text>
          ) : (
            categories.map((category) => (
              <SwipeableToDelete
                key={category.id}
                onDelete={() => handleDeleteCategory(category)}
              >
                <TouchableOpacity
                  onPress={() => handleUpdateCategory(category)}
                  onLongPress={() => handleDeleteCategory(category)}
                  className="bg-white p-4 rounded-lg mb-3 shadow-sm"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <View
                        className="h-10 w-10 rounded-full mr-3"
                        style={{ backgroundColor: category.color }}
                      />
                      <Text className="font-medium">{category.name}</Text>
                    </View>
                    <View className="items-end">
                      <Text className="font-bold">${category.name}</Text>
                      <Text className="text-gray-500 text-xs">{50}%</Text>
                    </View>
                  </View>
                  {/* <View className="mt-3 bg-gray-200 h-2 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: category.color,
                    width: `${category.percentageValue}%`,
                  }}
                />
              </View> */}
                </TouchableOpacity>
              </SwipeableToDelete>
            ))
          )}
        </ScrollView>

        <CreateCategoryModal
          isVisible={isCreateCategoryModalVisible}
          onClose={() => setIsCreateCategoryModalVisible(false)}
          onSubmit={handleCreateCategorySubmit}
          title="Create Category"
        />
      </SafeAreaView>
    </>
  );
};

export default CategoryDetail;
