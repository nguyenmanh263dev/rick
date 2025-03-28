import { DatePicker } from "components/form/date-picker";
import BottomMenu from "components/layouts/menu";
import TopTabs from "components/top-tabs";
import { useLoan } from "hooks/useLoan";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LOAN_TYPE } from "types";

interface LoanItem {
  id: number;
  amount: number;
  title: string;
  duration: string;
  status: "Active" | "Pending";
}

interface RentItem {
  id: number;
  amount: number;
  duration: string;
  status: "Active" | "Pending";
}

interface FormData {
  amount: string;
  title: string;
  duration: string;
  duaTo: Date;
}

const Wallet = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<LOAN_TYPE>(LOAN_TYPE.LOAN);
  const [activeTab, setActiveTab] = useState<LOAN_TYPE>(LOAN_TYPE.LOAN);
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    title: "",
    duration: "",
    duaTo: new Date(),
  });
  const { debts, loans } = useLoan();

  const showModal = (type: LOAN_TYPE) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    // if (modalType === "loan") {
    //   setLoans([
    //     ...loans,
    //     { id: loans.length + 1, ...formData, status: "Pending" },
    //   ]);
    // } else {
    //   setRents([
    //     ...rents,
    //     { id: rents.length + 1, ...formData, status: "Pending" },
    //   ]);
    // }
    setIsModalVisible(false);
    setFormData({ amount: "", title: "", duration: "" });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Wallet</Text>
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
          onPress={() => showModal(LOAN_TYPE.LOAN)}
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

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-lg w-5/6">
              <Text className="text-xl font-bold mb-4">
                Request {modalType === LOAN_TYPE.LOAN ? "Loan" : "Rent"}
              </Text>

              <TextInput
                className="border border-gray-300 p-2 rounded-lg mb-3"
                placeholder="Amount"
                keyboardType="numeric"
                value={formData.amount}
                onChangeText={(text) =>
                  setFormData({ ...formData, amount: text })
                }
              />

              {modalType === LOAN_TYPE.LOAN && (
                <TextInput
                  className="border border-gray-300 p-2 rounded-lg mb-3"
                  placeholder="Interest Rate"
                  value={formData.title}
                  onChangeText={(text) =>
                    setFormData({ ...formData, title: text })
                  }
                />
              )}

              <DatePicker
                onValueChange={(date) => {
                  if (!date) return;
                  setFormData({ ...formData, duaTo: date });
                }}
                date={formData.duaTo}
              />

              <View className="flex-row justify-end space-x-2">
                <TouchableOpacity
                  className="bg-gray-300 p-3 rounded-lg flex-1 mr-2"
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text className="text-center">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-500 p-3 rounded-lg flex-1"
                  onPress={handleSubmit}
                >
                  <Text className="text-white text-center">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <BottomMenu />
    </SafeAreaView>
  );
};

export default Wallet;
