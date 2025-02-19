import { createContext, useContext, ReactNode, useRef, useState } from "react";
import AddBill from "../components/add-bills";
import DatePicker, { DatePickerProps } from "react-native-date-picker";

// Common provider contain create property and create contact modals which have to use global

// how to use
// in the component, call hook const { onOpen } = useCreatePropertyModal()
// const propertyCreated = await onOpen()
// onOpen is Promise, when call opOpen, modal will show, and when modal close, promise finish
// if created successful, promise return new property, if cancel return undefined

interface DateProps extends DatePickerProps {
  isOpen?: boolean;
}

interface UseDisclosureProps<T> {
  isOpen: boolean;
  onOpen: (value: T) => Promise<T | undefined>;
  onClose: (data?: T) => void;
}
interface CommonModalProps {
  addBill: {
    isOpen: boolean;
    onOpen: () => Promise<boolean | undefined>;
    onClose: (value?: boolean) => void;
  };
  datePicker: {
    isOpen: boolean;
    onOpen: (value: DateProps) => Promise<Date | undefined>;
    onClose: (value?: Date) => void;
  };
}

const defaultUseDisclosure = <T,>(defaultValue?: T): UseDisclosureProps<T> => ({
  isOpen: false,
  onOpen: () => new Promise<T | undefined>((resolve) => resolve(defaultValue)),
  onClose: () => {},
});

export const CommonModalContext = createContext<CommonModalProps>({
  addBill: {
    isOpen: false,
    onOpen: () => new Promise<boolean>(() => {}),
    onClose: () => {},
  },
  datePicker: {
    isOpen: false,
    onOpen: () => new Promise<Date>(() => new Date()),
    onClose: () => {},
  },
});

export const useAddBillModal = () => {
  const context = useContext(CommonModalContext);
  return context.addBill;
};

export const useDatePicker = () => {
  const context = useContext(CommonModalContext);
  return context.datePicker;
};

export const CommonModalProvider = ({ children }: { children: ReactNode }) => {
  const [addBillModalVisible, setAddBillModalVisible] = useState(false);
  const [selectDatePickerModalProps, setDatePickerModalProps] =
    useState<DateProps>({
      isOpen: false,
      date: new Date(),
    });

  const promiseAddBillModal = useRef<{
    resolve: (value?: boolean) => void;
  } | null>(null);
  const promiseDatePicker = useRef<{
    resolve: (value?: Date) => void;
  } | null>(null);

  const handleOpenAddBillModal = () => {
    setAddBillModalVisible(true);
    return new Promise<boolean | undefined>((resolve) => {
      promiseAddBillModal.current = { resolve };
    });
  };
  const handleAddBillClose = (value?: boolean) => {
    if (promiseAddBillModal.current) {
      promiseAddBillModal.current.resolve(value);
    }
    setAddBillModalVisible(false);
  };

  const handleOpenDatePickerModal = (dateProps: DatePickerProps) => {
    setDatePickerModalProps(() => ({ isOpen: true, ...dateProps }));
    return new Promise<Date | undefined>((resolve) => {
      promiseDatePicker.current = { resolve };
    }).finally(() => {
      setDatePickerModalProps((pre) => ({ ...pre, isOpen: false }));
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
      }}
    >
      {children}
      <AddBill isVisible={addBillModalVisible} onClose={handleAddBillClose} />
      <DatePicker
        modal
        open={selectDatePickerModalProps.isOpen}
        date={selectDatePickerModalProps.date}
        onConfirm={(date) => {
          handleDatePickerClose(date);
        }}
        onCancel={() => {
          handleDatePickerClose(undefined);
        }}
      />
    </CommonModalContext.Provider>
  );
};
