export interface ModalProps<T> {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  onSubmit?: (values: T) => void;
  isLoading?: boolean;
}
