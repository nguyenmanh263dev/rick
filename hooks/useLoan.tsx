import { useMutation, useQuery } from "@tanstack/react-query";
import { LoanService } from "../services";
import { ILoan, ACTIVITY } from "../types";
import { useMemo } from "react";

export const useLoan = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["loans"],
    queryFn: () => LoanService.getLoans(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 65,
  });

  const { mutateAsync: createLoanMutate } = useMutation({
    mutationKey: ["create-loan"],
    mutationFn: (loan: Partial<ILoan>) =>
      LoanService.createLoan(loan).then((res) => {
        refetch();
        return res;
      }),
  });

  const { mutateAsync: updateLoanMutate } = useMutation({
    mutationKey: ["update-loan"],
    mutationFn: (loan: ILoan) =>
      LoanService.updateLoan(loan).then((res) => {
        refetch();
        return res;
      }),
  });

  const { mutate: deleteLoanMutate } = useMutation({
    mutationKey: ["delete-loan"],
    mutationFn: (id: string) =>
      LoanService.deleteLoan(id).then((res) => {
        refetch();
        return res;
      }),
  });

  const loans = useMemo(() => {
    return data?.filter((loan) => loan.type === ACTIVITY.LENDING) || [];
  }, [data]);

  const debts = useMemo(() => {
    return data?.filter((loan) => loan.type === ACTIVITY.BORROWING) || [];
  }, [data]);
  return {
    data: data || [],
    isLoading,
    error,
    loans,
    debts,
    createLoan: createLoanMutate,
    updateLoan: updateLoanMutate,
    deleteLoan: deleteLoanMutate,
  };
};
