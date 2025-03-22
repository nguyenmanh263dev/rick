import React, { Children } from "react";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const renderRightActions = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} className="justify-center px-4">
    <Ionicons name="trash-outline" size={24} color="red" />
  </TouchableOpacity>
);

const SwipeableToDelete = ({
  onDelete,
  children,
}: {
  onDelete: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Swipeable
      renderRightActions={() =>
        renderRightActions({
          onPress: () => {
            onDelete();
          },
        })
      }
    >
      {children}
    </Swipeable>
  );
};

export default SwipeableToDelete;
