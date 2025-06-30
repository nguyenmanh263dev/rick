import React, { Children } from "react";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/FontAwesome";
const renderRightActions = ({
  onDelete,
  onEdit,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) => (
  <>
    {onDelete && (
      <TouchableOpacity onPress={onDelete} className="justify-center px-4">
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    )}
    {onEdit && (
      <TouchableOpacity onPress={onEdit} className="justify-center px-4">
        <Ionicons name="edit" size={24} color="blue" />
      </TouchableOpacity>
    )}
  </>
);

const SwipeableToDelete = ({
  onDelete,
  children,
  onEdit,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Swipeable
      renderRightActions={() =>
        renderRightActions({
          onDelete,
          onEdit,
        })
      }
    >
      {children}
    </Swipeable>
  );
};

export default SwipeableToDelete;
