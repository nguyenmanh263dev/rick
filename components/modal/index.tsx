import Button from '@components/button';
import React from 'react';
import { Modal as ReactNativeModal, View, Text, Pressable } from 'react-native';

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
  onSubmit,
  isLoading,
}) => {
  return (
    <ReactNativeModal visible={isVisible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-full p-5 rounded-2xl">
          {title && <Text className="text-lg font-bold mb-3">{title}</Text>}
          {children}
          <View className="flex flex-row space-x-2 w-full gap-2">
            <Button
              onPress={onClose}
              className="flex-1 mt-4 bg-sky-500 py-2 rounded-xl"
            >
              <Text className="text-white text-center font-semibold">
                Close
              </Text>
            </Button>
            <Button
              isLoading={isLoading}
              onPress={onSubmit}
              className="flex-1 mt-4 border border-sky-500 py-2 rounded-xl"
            >
              <Text className="text-white text-center font-semibold">Save</Text>
            </Button>
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default Modal;
