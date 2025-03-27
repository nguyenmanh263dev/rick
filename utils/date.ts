import dayjs from "dayjs";

export const formatDate = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatDateToObject = (date: Date) => {
  return dayjs(date).toDate();
};
