import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Modal from '@components/modal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (categoryName: string) => void;
}

const CreateCategoryModal = ({ isVisible, onClose, onSubmit }: Props) => {
  const [categoryName, setCategoryName] = useState('');

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
