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

interface LoanItem {
  id: number;
  amount: number;
  interest: string;
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
  interest: string;
  duration: string;
}

const Wallet = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"loan" | "rent">("loan");
  const [activeTab, setActiveTab] = useState<"loans" | "rents">("loans");
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    interest: "",
    duration: "",
  });

  const [loans, setLoans] = useState<LoanItem[]>([
    {
      id: 1,
      amount: 1000,
      interest: "5%",
      duration: "3 months",
      status: "Active",
    },
  ]);

  const [rents, setRents] = useState<RentItem[]>([
    { id: 1, amount: 500, duration: "1 month", status: "Pending" },
  ]);

  const showModal = (type: "loan" | "rent") => {
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
    setFormData({ amount: "", interest: "", duration: "" });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Wallet</Text>

        <View className="flex-row mb-4">
          <TouchableOpacity
            className={`flex-1 p-3 ${
              activeTab === "loans" ? "bg-blue-500" : "bg-gray-300"
            }`}
            onPress={() => setActiveTab("loans")}
          >
            <Text
              className={`text-center ${
                activeTab === "loans" ? "text-white" : "text-gray-700"
              }`}
            >
              Loans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-3 ${
              activeTab === "rents" ? "bg-blue-500" : "bg-gray-300"
            }`}
            onPress={() => setActiveTab("rents")}
          >
            <Text
              className={`text-center ${
                activeTab === "rents" ? "text-white" : "text-gray-700"
              }`}
            >
              Rents
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg mb-4"
          onPress={() => showModal(activeTab === "loans" ? "loan" : "rent")}
        >
          <Text className="text-white text-center">
            Request {activeTab === "loans" ? "Loan" : "Rent"}
          </Text>
        </TouchableOpacity>

        <ScrollView>
          {(activeTab === "loans" ? loans : rents).map((item) => (
            <View
              key={item.id}
              className="bg-white p-4 rounded-lg mb-3 shadow-sm"
            >
              <Text className="text-lg font-semibold">
                Amount: ${item.amount}
              </Text>
              {/* {item.interest && (
                <Text className="text-gray-600">Interest: {item.interest}</Text>
              )} */}
              <Text className="text-gray-600">Duration: {item.duration}</Text>
              <Text
                className={`${
                  item.status === "Active"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                Status: {item.status}
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
                Request {modalType === "loan" ? "Loan" : "Rent"}
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

              {modalType === "loan" && (
                <TextInput
                  className="border border-gray-300 p-2 rounded-lg mb-3"
                  placeholder="Interest Rate"
                  value={formData.interest}
                  onChangeText={(text) =>
                    setFormData({ ...formData, interest: text })
                  }
                />
              )}

              <TextInput
                className="border border-gray-300 p-2 rounded-lg mb-4"
                placeholder="Duration"
                value={formData.duration}
                onChangeText={(text) =>
                  setFormData({ ...formData, duration: text })
                }
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
    </SafeAreaView>
  );
};

export default Wallet;
