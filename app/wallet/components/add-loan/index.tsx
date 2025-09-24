import { DatePicker } from 'components/form/date-picker';
import { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { ILoan, ACTIVITY } from '@types';

interface Props {
  onClose: () => void;
  onSubmit: (value: Partial<ILoan>) => void;
  type: ILoan['type'];
}

const defaultLoan = {
  type: ACTIVITY.LENDING,
  amount: 0,
  title: '',
  duaTo: new Date(),
};

const AddLoan = ({ type, onClose, onSubmit }: Props) => {
  const [formData, setFormData] = useState<Partial<ILoan>>({
    ...defaultLoan,
    type,
  });

  return (
    <Modal visible animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg w-5/6">
          <Text className="text-xl font-bold mb-4">
            Request {formData.type === ACTIVITY.LENDING ? 'Loan' : 'Rent'}
          </Text>

          <TextInput
            className="border border-gray-300 p-2 rounded-lg mb-3"
            placeholder="Amount"
            keyboardType="numeric"
            value={formData.amount?.toString()}
            onChangeText={text =>
              setFormData({ ...formData, amount: Number(text) })
            }
          />

          <TextInput
            className="border border-gray-300 p-2 rounded-lg mb-3"
            placeholder="Title"
            value={formData.title}
            onChangeText={text => setFormData({ ...formData, title: text })}
          />

          <DatePicker
            onValueChange={date => {
              if (!date) return;
              setFormData({ ...formData, duaTo: date });
            }}
            date={formData.duaTo}
          />

          <View className="flex-row justify-end space-x-2">
            <TouchableOpacity
              className="bg-gray-300 p-3 rounded-lg flex-1 mr-2"
              onPress={() => onClose()}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-sky-500 p-3 rounded-lg flex-1"
              onPress={() => onSubmit(formData)}
            >
              <Text className="text-white text-center">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddLoan;
