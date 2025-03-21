import { useContext } from "react";
import { CommonModalContext } from "../context/modal.context";

export const useDatePicker = () => {
  const context = useContext(CommonModalContext);
  return context.datePicker;
};
