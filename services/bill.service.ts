import axios from "../libs/axios";
import { IBill } from "../types";

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
  const { data } = await axios.put(`/bill/${id}`, category);
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
  console.log("Uploading file:", file);

  const formData = new FormData();
  // For React Native, we need to pass the file object directly as the second argument
  // with the specific properties expected by the server
  formData.append("no", "123");
  // formData.append("file", {
  //   uri: file.uri,
  //   type: file.type || "image/jpeg",
  //   name: file.name || "image.jpg",
  // } as any);

  console.log("FormData created:", formData);

  const { data } = await axios.post("/bill/get-by-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  return data;
};
