import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICategory } from "types";
import { updateCategory } from "services/category.service";

const CategoryDetailForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const queryClient = useQueryClient();
  const category = route.params?.category as ICategory;

  const [name, setName] = useState(category.name);
  const [color, setColor] = useState(category.color);
  const [keywords, setKeywords] = useState<string[]>(category.keywords || []);
  const [newKeyword, setNewKeyword] = useState("");

  const updateMutation = useMutation({
    mutationFn: (updatedCategory: ICategory) =>
      updateCategory(category.id, updatedCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigation.goBack();
    },
  });

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    updateMutation.mutate({
      ...category,
      name,
      color,
      keywords,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Edit Category</Text>
        <TouchableOpacity onPress={handleSubmit} className="p-2">
          <Ionicons name="checkmark" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Category Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={name}
            onChangeText={setName}
            placeholder="Enter category name"
          />
        </View>

        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Color</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={color}
            onChangeText={setColor}
            placeholder="Enter color hex code"
          />
        </View>

        <View className="bg-white rounded-lg p-4">
          <Text className="text-gray-700 mb-2 font-medium">Keywords</Text>
          <View className="flex-row mb-2">
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2"
              value={newKeyword}
              onChangeText={setNewKeyword}
              placeholder="Add a keyword"
            />
            <TouchableOpacity
              onPress={handleAddKeyword}
              className="bg-blue-500 rounded-lg px-4 justify-center"
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap">
            {keywords.map((keyword, index) => (
              <View
                key={index}
                className="bg-gray-200 rounded-full px-3 py-1 m-1 flex-row items-center"
              >
                <Text className="mr-2">{keyword}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveKeyword(index)}
                  className="ml-1"
                >
                  <Ionicons name="close-circle" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryDetailForm;
