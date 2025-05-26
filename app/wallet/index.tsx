import BottomMenu from "../../components/layouts/menu";
import TopTabs from "../../components/top-tabs";
import { useLoan } from "../../hooks/useLoan";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ILoan, LOAN_TYPE } from "types";
import AddLoan from "./components/add-loan";

const Wallet = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<LOAN_TYPE>(LOAN_TYPE.LOAN);
  const { debts, loans, createLoan } = useLoan();

  const showModal = (type: LOAN_TYPE) => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (formData: Partial<ILoan>) => {
    await createLoan(formData);
    setIsModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white relative h-screen"
    >
      <View className="p-4">
        <TopTabs
          options={[
            { value: LOAN_TYPE.LOAN, label: "Loans" },
            { value: LOAN_TYPE.DEBT, label: "Debts" },
          ]}
          value={activeTab}
          onChange={(value) => setActiveTab(value)}
        />

        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg mb-4"
          onPress={() => showModal(activeTab)}
        >
          <Text className="text-white text-center">
            Request {activeTab === LOAN_TYPE.LOAN ? "Loan" : "Rent"}
          </Text>
        </TouchableOpacity>

        <ScrollView>
          {(activeTab === LOAN_TYPE.LOAN ? loans : debts).map((item) => (
            <View
              key={item.id}
              className="bg-white p-4 rounded-lg mb-3 shadow-sm"
            >
              <Text className="text-gray-600">Duration: {item.title}</Text>

              <Text className="text-lg font-semibold">
                Amount: ${item.amount}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {isModalVisible && (
        <AddLoan
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleSubmit}
          type={activeTab}
        />
      )}
      <BottomMenu />
    </KeyboardAvoidingView>
  );
};

export default Wallet;
