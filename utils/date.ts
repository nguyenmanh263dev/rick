import dayjs from 'dayjs';

export const FORMAT_DATE = 'DD/MM/YYYY';
export const FORMAT_MONTH_YEAR = 'DD/MM';

export const formatDate = (
  date: Date | string | number,
  {
    outputFormat = FORMAT_DATE,
    inputFormat,
  }: { outputFormat?: string; inputFormat?: string } | undefined = {}
) => {
  if (!date || !dayjs(date, inputFormat).isValid()) return '';
  return dayjs(date, inputFormat).format(outputFormat);
};

export const formatDateToObject = (date: Date) => {
  return dayjs(date).toDate();
};

export const getStartDateOfCycle = (
  startDate: string,
  cycle: number
): string | null => {
  if (!startDate || !cycle) return null;
  const isFinishOfCycle = dayjs(startDate)
    .add(cycle, 'month')
    .isBefore(dayjs());
  if (isFinishOfCycle) {
    return getStartDateOfCycle(
      dayjs(startDate).add(cycle, 'month').toISOString(),
      cycle
    );
  }
  return dayjs(startDate).toISOString();
};
