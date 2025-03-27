import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { Bill } from "./components/bill";
import { IBill } from "../../types";
import Modal from "components/modal";
import { createBills } from "services/bill.service";
import { useMutation } from "@tanstack/react-query";

interface ModalProps {
  isVisible: boolean;
  onClose: (bills?: IBill[]) => void;
  title?: string;
  data: IBill[];
}

const AddBill: React.FC<ModalProps> = ({ isVisible, onClose, title, data }) => {
  const [listData, setListData] = React.useState(
    data.map((item, index) => ({ ...item, id: index }))
  );

  const { mutateAsync: createBillsMutation } = useMutation({
    mutationKey: ["createBills"],
    mutationFn: createBills,
  });

  const handleSubmit = async () => {
    await createBillsMutation(listData)
      .then((res) => {
        onClose(listData);

        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={() => onClose()}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <FlatList
        data={listData}
        renderItem={({ item, index }) => (
          <Bill
            key={item.id}
            onChange={(item) => {
              const updatedData = [...listData];
              updatedData[index] = item;
              setListData(updatedData);
            }}
            onDelete={() => {
              const updatedData = [...listData];
              updatedData.splice(index, 1);
              setListData(updatedData);
            }}
            index={index}
            item={item}
          />
        )}
      />
    </Modal>
  );
};

export default AddBill;
