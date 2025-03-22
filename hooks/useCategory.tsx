import { useMutation, useQuery } from "@tanstack/react-query";
import { CategoryService } from "../services";
import { ICategory } from "../types";

const getRandomColor = (): string => {
  const colors = [
    "#FF6633", // Orange
    "#FFB399", // Light Pink
    "#FF33FF", // Magenta
    "#FFFF99", // Light Yellow
    "#00B3E6", // Sky Blue
    "#E6B333", // Gold
    "#3366E6", // Royal Blue
    "#99FF99", // Light Green
    "#B34D4D", // Brick Red
    "#80B300", // Olive Green
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const useCategory = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getCategories(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 65,
  });
  const { mutateAsync: createCategoryMutate } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: (categoryName: string) =>
      CategoryService.createCategory({
        name: categoryName,
        color: getRandomColor(),
      }).then((res) => {
        refetch();
        return res;
      }),
  });

  const { mutate: updateCategoryMutate } = useMutation({
    mutationKey: ["update-category"],
    mutationFn: (category: ICategory) =>
      CategoryService.updateCategory(category.id, category).then((res) => {
        refetch();
        return res;
      }),
  });

  const { mutate: deleteCategoryMutate } = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: (id: string) =>
      CategoryService.deleteCategory(id).then((res) => {
        refetch();
        return res;
      }),
  });
  return {
    data: data || [],
    isLoading,
    error,
    createCategory: createCategoryMutate,
    updateCategory: updateCategoryMutate,
    deleteCategory: deleteCategoryMutate,
  };
};
