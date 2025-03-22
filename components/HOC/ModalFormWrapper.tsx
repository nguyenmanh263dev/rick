import { FormProvider, useForm } from "react-hook-form";
import Modal from "../modal";

const withModalFormWrapper = (Component: React.FC, withForm = true) => {
  return ({
    isVisible,
    onClose,
    title,
    onSubmit,
    defaultValues = {},
    ...rest
  }: any) => {
    const form = useForm({
      defaultValues,
      mode: "onBlur",
    });
    return (
      <Modal
        isVisible={isVisible}
        onClose={onClose}
        onSubmit={form.handleSubmit(onSubmit)}
        title={title}
      >
        <FormProvider {...form}>
          <Component {...rest} />
        </FormProvider>
      </Modal>
    );
  };
};

export default withModalFormWrapper;
