import { RootStackParamList } from "../../../types/navigation.types";

export type MenuItemType = {
  icon: string;
  label: string;
  path: keyof RootStackParamList;
  onPress?: () => void;
};

export const menuItems: MenuItemType[] = [
  {
    icon: "cellular-outline",
    label: "Dashboard",
    path: "Dashboard",
  },
  {
    icon: "calendar-outline",
    label: "Calendar",
    path: "Calendar",
  },
  {
    icon: "trail-sign-outline",
    label: "Debt & Loan",
    path: "Wallet",
  },
  {
    icon: "color-filter-outline",
    label: "Others",
    path: "Profile",
  },
];
