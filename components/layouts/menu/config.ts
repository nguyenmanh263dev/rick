import { RootStackParamList } from "../../../types/navigation.types";

export type MenuItemType = {
  icon: "home" | "calendar" | "wallet" | "person";
  label: string;
  path: keyof RootStackParamList;
  onPress?: () => void;
};

export const menuItems: MenuItemType[] = [
  {
    icon: "home",
    label: "Dashboard",
    path: "Dashboard",
  },
  {
    icon: "calendar",
    label: "Calendar",
    path: "Calendar",
  },
  {
    icon: "wallet",
    label: "Debt & Loan",
    path: "Wallet",
  },
  {
    icon: "person",
    label: "Profile",
    path: "Profile",
  },
];
