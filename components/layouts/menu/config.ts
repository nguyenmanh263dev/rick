import { RootStackParamList } from "../../../types/navigation.types";

export type MenuItemType = {
  icon: string;
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
    icon: "globe",
    label: "Debt & Loan",
    path: "Wallet",
  },
  {
    icon: "user",
    label: "Profile",
    path: "Profile",
  },
];
