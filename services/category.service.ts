import axios from "../libs/axios";
import { ICategory } from "../types";

// Get all category
export const getCategories = async (): Promise<ICategory[]> => {
  const { data } = await axios.get("/category");
  return data;
};

// Get single category
export const getCategory = async (id: string): Promise<ICategory> => {
  const { data } = await axios.get(`/category/${id}`);
  return data;
};

// Create new category
export const createCategory = async (
  category: Partial<ICategory>
): Promise<ICategory> => {
  const { data } = await axios.post("/category", category);
  return data;
};

// Update category
export const updateCategory = async (
  id: number,
  category: Partial<ICategory>
): Promise<ICategory> => {
  const { data } = await axios.patch(`/category/${id}`, category);
  return data;
};

// Delete category
export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`/category/${id}`);
};
