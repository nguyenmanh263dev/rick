import dayjs from "dayjs";

export const FORMAT_DATE = "DD/MM/YYYY";
export const FORMAT_MONTH_YEAR = "DD/MM";

export const formatDate = (
  date: Date | string | number,
  {
    outputFormat = FORMAT_DATE,
    inputFormat,
  }: { outputFormat?: string; inputFormat?: string } | undefined = {}
) => {
  if (!date || !dayjs(date, inputFormat).isValid()) return "";
  return dayjs(date, inputFormat).format(outputFormat);
};

export const formatDateToObject = (date: Date) => {
  return dayjs(date).toDate();
};
