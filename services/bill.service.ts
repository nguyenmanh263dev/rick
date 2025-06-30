import axios from "../libs/axios";
import { IBill, IBillCalendar } from "../types";
import dayjs from "dayjs";
// Get all category
export const getBills = async (): Promise<IBill[]> => {
  const { data } = await axios.get("/bill");
  return data;
};

// Get single category
export const getBill = async (id: string): Promise<IBill> => {
  const { data } = await axios.get(`/bill/${id}`);
  return data;
};

// Create new category
export const createBill = async (category: Partial<IBill>): Promise<IBill> => {
  const { data } = await axios.post("/bill", category);
  return data;
};

// Update category
export const updateBill = async (
  id: string,
  category: Partial<IBill>
): Promise<IBill> => {
  const { data } = await axios.patch(`/bill/${id}`, category);
  return data;
};

// Delete category
export const deleteBill = async (id: string): Promise<void> => {
  await axios.delete(`/bill/${id}`);
};

export const getBillByImage = async (date: string): Promise<IBill[]> => {
  const { data } = await axios.post(`/bill/image/${date}`);
  return data;
};

export const uploadBillImage = async (file: any): Promise<IBill[]> => {
  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    type: file.type || "image/jpeg",
    name: file.fileName || "image.jpg",
  } as any);

  const { data } = await axios.post("/bill/get-by-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const createBills = async (bills: IBill[]): Promise<IBill[]> => {
  const { data } = await axios.post("/bill/insert-many", bills);
  return data;
};

export const getBillsByDate = async (
  date: Date,
  params: any
): Promise<IBillCalendar[]> => {
  const { data } = await axios.get(
    `/bill/calendar?date=${dayjs(params.queryKey[1]).toISOString()}`
  );
  return data;
};
