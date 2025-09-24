import { createContext, useContext, ReactNode, useRef, useState } from 'react';
import AddBill from '../components/add-bills';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import {
  useForm,
  FormProvider,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';
import { IBill } from '@types';

// Common provider contain create property and create contact modals which have to use global

// how to use
// in the component, call hook const { onOpen } = useCreatePropertyModal()
// const propertyCreated = await onOpen()
// onOpen is Promise, when call opOpen, modal will show, and when modal close, promise finish
// if created successful, promise return new property, if cancel return undefined

interface DateProps extends Omit<DatePickerProps, 'date'> {
  isOpen?: boolean;
  date?: Date | null;
}

interface UseDisclosureProps<T> {
  isOpen: boolean;
  onOpen: (value: T) => Promise<T | undefined>;
  onClose: (data?: T) => void;
}

interface FormModalProps<T extends FieldValues> {
  isOpen: boolean;
  onOpen: (defaultValues?: T) => Promise<T | undefined>;
  onClose: (data?: T) => void;
  formMethods?: UseFormReturn<T>;
}

interface CommonModalProps {
  addBill: {
    isOpen: boolean;
    onOpen: (bills: IBill[]) => Promise<IBill[] | undefined>;
    onClose: (value?: IBill[]) => void;
  };
  datePicker: {
    isOpen: boolean;
    onOpen: (value: DateProps) => Promise<Date | undefined>;
    onClose: (value?: Date) => void;
  };
  formModal: FormModalProps<any>;
}

const defaultUseDisclosure = <T,>(defaultValue?: T): UseDisclosureProps<T> => ({
  isOpen: false,
  onOpen: () => new Promise<T | undefined>(resolve => resolve(defaultValue)),
  onClose: () => {},
});

export const CommonModalContext = createContext<CommonModalProps>({
  addBill: {
    isOpen: false,
    onOpen: (bills: IBill[]) => Promise.resolve(bills),
    onClose: () => {},
  },
  datePicker: {
    isOpen: false,
    onOpen: () => new Promise<Date>(() => new Date()),
    onClose: () => {},
  },
  formModal: {
    isOpen: false,
    onOpen: () => new Promise<any>(() => {}),
    onClose: () => {},
  },
});

export const useAddBillModal = () => {
  const context = useContext(CommonModalContext);
  return context.addBill;
};

export const useFormModal = <T extends FieldValues>() => {
  const context = useContext(CommonModalContext);
  return context.formModal as FormModalProps<T>;
};

export const CommonModalProvider = ({ children }: { children: ReactNode }) => {
  const [addBillModalVisible, setAddBillModalVisible] = useState(false);
  const [billData, setBillData] = useState<IBill[]>([]);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [selectDatePickerModalProps, setDatePickerModalProps] =
    useState<DateProps>({
      isOpen: false,
      date: new Date(),
    });

  const promiseAddBillModal = useRef<{
    resolve: (value?: IBill[]) => void;
  } | null>(null);
  const promiseFormModal = useRef<{
    resolve: (value?: any) => void;
  } | null>(null);
  const promiseDatePicker = useRef<{
    resolve: (value?: Date) => void;
  } | null>(null);

  const formMethods = useForm();

  const handleOpenAddBillModal = (bills: IBill[]) => {
    setBillData(bills);
    setAddBillModalVisible(true);
    return new Promise<IBill[] | undefined>(resolve => {
      promiseAddBillModal.current = { resolve };
    });
  };
  const handleAddBillClose = (value?: IBill[]) => {
    if (promiseAddBillModal.current) {
      promiseAddBillModal.current.resolve(value);
    }
    setBillData([]);
  };

  const handleOpenFormModal = (defaultValues?: any) => {
    if (defaultValues) {
      formMethods.reset(defaultValues);
    }
    setFormModalVisible(true);
    return new Promise<any>(resolve => {
      promiseFormModal.current = { resolve };
    });
  };

  const handleFormModalClose = (data?: any) => {
    if (promiseFormModal.current) {
      promiseFormModal.current.resolve(data);
    }
    setFormModalVisible(false);
  };

  const handleOpenDatePickerModal = (dateProps: DateProps) => {
    setDatePickerModalProps(() => ({ isOpen: true, ...dateProps }));
    return new Promise<Date | undefined>(resolve => {
      promiseDatePicker.current = { resolve };
    }).finally(() => {
      setDatePickerModalProps(pre => ({ ...pre, isOpen: false }));
    });
  };

  const handleDatePickerClose = (value?: Date) => {
    promiseDatePicker.current?.resolve(value);
  };

  return (
    <CommonModalContext.Provider
      value={{
        addBill: {
          isOpen: addBillModalVisible,
          onOpen: handleOpenAddBillModal,
          onClose: handleAddBillClose,
        },
        datePicker: {
          isOpen: false,
          onOpen: handleOpenDatePickerModal,
          onClose: handleDatePickerClose,
        },
        formModal: {
          isOpen: formModalVisible,
          onOpen: handleOpenFormModal,
          onClose: handleFormModalClose,
          formMethods,
        },
      }}
    >
      {children}
      {!!billData.length && (
        <AddBill
          data={billData}
          isVisible={!!billData.length}
          onClose={handleAddBillClose}
        />
      )}
      <DatePicker
        modal
        open={selectDatePickerModalProps.isOpen}
        date={selectDatePickerModalProps.date || new Date()}
        mode={selectDatePickerModalProps.mode || 'date'}
        onConfirm={date => {
          handleDatePickerClose(date);
        }}
        onCancel={() => {
          handleDatePickerClose(undefined);
        }}
      />
    </CommonModalContext.Provider>
  );
};

export const useDatePicker = () => {
  const context = useContext(CommonModalContext);
  return context.datePicker;
};
