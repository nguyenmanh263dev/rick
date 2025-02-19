import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./login";
import "../global.css";
import { Dashboard } from "./dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VerifyPin from "./verify-pin";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Schedule } from "./schedule";
import { Wallet } from "./wallet";
import { Profile } from "./profile";
import { CommonModalProvider } from "../context/modal.context";

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: Login,
      options: {
        headerShown: false,
      },
    },
    Dashboard: {
      screen: Dashboard,
      options: {
        headerShown: true,
        headerBackVisible: false,
      },
    },
    Schedule: {
      screen: Schedule,
      options: {
        headerShown: true,
        headerBackVisible: false,
      },
    },
    Wallet: {
      screen: Wallet,
      options: {
        headerShown: true,
        headerBackVisible: false,
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerShown: true,
        headerBackVisible: false,
      },
    },
    VerifyPin: {
      screen: VerifyPin,

      options: {
        headerShown: true,
        headerBackVisible: true, // Chỉ hiển thị nút back
        headerTitle: "", //
      },
    },
    // Home: HomeScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);
// const BottomNavigation = createBottomTabNavigator({
//   screens: {},
// });
export default function RootLayout() {
  return (
    <CommonModalProvider>
      <Navigation />
    </CommonModalProvider>
  );
}
