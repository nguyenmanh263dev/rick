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
  return <Navigation />;
}
