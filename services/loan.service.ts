import axios from "../libs/axios";
import { ILoan } from "../types";

// Get all loans
export const getLoans = async (): Promise<ILoan[]> => {
  const { data } = await axios.get("/loan");
  return data;
};

// Get single loan
export const getLoan = async (id: string): Promise<ILoan> => {
  const { data } = await axios.get(`/loan/${id}`);
  return data;
};

// Create new loan
export const createLoan = async (loan: Partial<ILoan>): Promise<ILoan> => {
  const { data } = await axios.post("/loan", loan);
  return data;
};

// Update loan
export const updateLoan = async (id: string): Promise<ILoan> => {
  const { data } = await axios.put(`/loan/${id}`, {});
  return data;
};

// Delete loan
export const deleteLoan = async (id: string): Promise<void> => {
  await axios.delete(`/loan/${id}`);
};
