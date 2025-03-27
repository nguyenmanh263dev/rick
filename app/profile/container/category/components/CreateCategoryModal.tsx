import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import withModalWrapper from "../../../../../components/HOC/ModalFormWrapper";
import Modal from "../../../../../components/modal";

const CreateCategoryModal: React.FC = ({
  isVisible,
  onClose,
  onSubmit,
}: any) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = () => {
    onSubmit(categoryName);
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title="Create Category"
      onSubmit={handleSubmit}
    >
      <View className="w-full">
        <Text className="text-gray-700 mb-2 font-medium">Category Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
          placeholder="Enter category name"
          value={categoryName}
          onChangeText={setCategoryName}
        />
      </View>
    </Modal>
  );
};

export default CreateCategoryModal;
