import { UserService } from '@services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IUserConfig } from '@types';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { getStartDateOfCycle } from '@utils/date';

const useUserConfig = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user-config'],
    queryFn: () => UserService.getUserConfig(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 65,
  });
  const { mutateAsync: setUserConfig } = useMutation({
    mutationKey: ['set-user-config'],
    mutationFn: (config: { key: string; value: string }[]) =>
      UserService.setUserConfig(config).then(res => {
        refetch();
        return res;
      }),
  });

  const startDateInPeriod = useMemo(() => {
    if (!data || !data?.cycle || !data?.fromDate) return null;
    console.log(2222, getStartDateOfCycle(data.fromDate, Number(data.cycle)));

    return getStartDateOfCycle(data.fromDate, Number(data.cycle));
  }, [data]);

  const endDateInPeriod = useMemo(() => {
    if (!data || !data?.cycle || !startDateInPeriod) return null;
    return dayjs(startDateInPeriod)
      .clone()
      .add(Number(data.cycle), 'month')
      .toISOString();
  }, [data]);

  console.log(9898, startDateInPeriod, endDateInPeriod);

  return {
    data,
    isLoading,
    error,
    setUserConfig,
    startDateInPeriod,
    endDateInPeriod,
  };
};

export { useUserConfig };
