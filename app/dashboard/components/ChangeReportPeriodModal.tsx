import { DatePicker } from '@components/form/date-picker';
import Modal from '@components/modal';
import { ModalProps } from '@types';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { View } from 'react-native';
import React from 'react';
import ReactNativePickerSelect from 'react-native-picker-select';

interface IForm {
  key: string;
  value: string;
}

interface Props extends ModalProps<IForm[]> {
  startDate: string;
  cycle: string;
}

const ChangeReportPeriodModal = ({
  startDate,
  cycle,
  onSubmit,
  ...rest
}: Props) => {
  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      startDate: dayjs(startDate).toDate(),
      cycle,
    },
  });

  const preSubmit = (values: { startDate: Date; cycle: string }) => {
    const { startDate, cycle } = values;
    onSubmit?.([
      { key: 'fromDate', value: startDate.toISOString() },
      { key: 'cycle', value: cycle },
    ]);
  };

  return (
    <Modal
      onSubmit={handleSubmit(preSubmit)}
      {...rest}
      title="Thay đổi khoảng thời gian"
    >
      <View className="flex-row space-x-2 justify-around p-10">
        <Controller
          control={control}
          name="startDate"
          render={({ field: { value, onChange } }) => (
            <DatePicker date={value} onValueChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="cycle"
          render={({ field: { value, onChange } }) => (
            <ReactNativePickerSelect
              value={value}
              onValueChange={onChange}
              items={[
                {
                  label: '1 month',
                  value: '1',
                },
                {
                  label: '2 months',
                  value: '2',
                },
                {
                  label: '3 months',
                  value: '3',
                },
                {
                  label: '6 months',
                  value: '6',
                },
                {
                  label: '1 year',
                  value: '12',
                },
              ]}
            />
          )}
        />
      </View>
    </Modal>
  );
};

export default ChangeReportPeriodModal;
