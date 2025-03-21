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

import { Profile } from "./profile";
import { CommonModalProvider } from "../context/modal.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Calendar } from "./calendar";
import Wallet from "./wallet";
import CategoryDetail from "./profile/container/category";
import ReportDetail from "./profile/container/report";

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
        headerBackVisible: true,
      },
    },
    Calendar: {
      screen: Calendar,
      options: {
        headerShown: true,
        headerBackVisible: true,
      },
    },
    Wallet: {
      screen: Wallet,
      options: {
        headerShown: true,
        headerBackVisible: true,
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerShown: true,
        headerBackVisible: true,
      },
    },
    VerifyPin: {
      screen: VerifyPin,
      options: {
        headerShown: true,
        headerBackVisible: true,
        headerTitle: "",
      },
    },
    CategoryDetail: {
      screen: CategoryDetail,
      options: {
        headerShown: false,
      },
    },
    ReportDetail: {
      screen: ReportDetail,
      options: {
        headerShown: false,
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
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView>
        <CommonModalProvider>
          <Navigation />
        </CommonModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
