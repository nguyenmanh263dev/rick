import BottomMenu from '../../components/layouts/menu';
import TopTabs from '../../components/top-tabs';
import { useLoan } from '../../hooks/useLoan';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ILoan, ACTIVITY } from '@types';
import AddLoan from './components/add-loan';
import { formatNumber } from 'utils';
import { formatDate } from 'utils/date';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const renderRightActions = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} className="justify-center px-4">
    <Ionicons name="checkmark-done-outline" size={24} color="green" />
  </TouchableOpacity>
);
const Wallet = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ACTIVITY>(ACTIVITY.LENDING);
  const { debts, loans, createLoan, updateLoan } = useLoan();

  const showModal = (type: ACTIVITY) => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (formData: Partial<ILoan>) => {
    await createLoan(formData);
    setIsModalVisible(false);
  };

  const changeStatus = async (loan: ILoan) => {
    try {
      await updateLoan({ ...loan, status: 'DONE' });
    } catch (error) {}
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white relative h-screen"
    >
      <View className="p-4">
        <TopTabs
          options={[
            { value: ACTIVITY.LENDING, label: 'Lending' },
            { value: ACTIVITY.BORROWING, label: 'Borrowing' },
          ]}
          value={activeTab}
          onChange={value => setActiveTab(value)}
        />

        <TouchableOpacity
          className="bg-sky-500 p-3 rounded-lg mb-4"
          onPress={() => showModal(activeTab)}
        >
          <Text className="text-white text-center">
            Request {activeTab === ACTIVITY.LENDING ? 'Loan' : 'Rent'}
          </Text>
        </TouchableOpacity>

        <ScrollView>
          {(activeTab === ACTIVITY.LENDING ? loans : debts)
            .filter(item => item.status === 'ACTIVE')
            .map(item => (
              <Swipeable
                key={item.id}
                renderRightActions={() =>
                  renderRightActions({
                    onPress: () => {
                      changeStatus(item);
                    },
                  })
                }
              >
                <View className="bg-white p-4 rounded-lg mb-3 shadow-sm">
                  <Text className="text-gray-400 text-lg">{item.title}</Text>

                  <Text className="text-lg font-semibold">
                    Số tiền: {formatNumber(item.amount)}
                  </Text>
                  {item.duaTo && (
                    <Text className="font-semibold text-neutral-500">
                      Ngay tra: {formatDate(item.duaTo)}
                    </Text>
                  )}
                </View>
              </Swipeable>
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
