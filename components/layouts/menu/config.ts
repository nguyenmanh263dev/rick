export const menuItems = [
  {
    icon: "home",
    label: "Dashboard",
    onPress: () => console.log("Home pressed"),
    path: "/dashboard",
  },
  {
    icon: "calendar",
    label: "Calendar",
    path: "/calendar",
    onPress: () => console.log("Profile pressed"),
  },
  {
    icon: "wallet",
    label: "Wallet",
    path: "/wallet",
    onPress: () => console.log("Settings pressed"),
  },
  {
    icon: "person",
    label: "Profile",
    path: "/profile",
    onPress: () => console.log("Help pressed"),
  },
];
