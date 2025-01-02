import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./login";
import "../global.css";
import { Dashboard } from "./dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const RootStack = createNativeStackNavigator();

// const Navigation = createStaticNavigation(RootStack);
const BottomNavigation = createBottomTabNavigator({
  screens: {
    Test: RootStack,
  },
});
export default function RootLayout() {
  return (
    <NavigationContainer>
      <RootStack.Screen name="Login" component={() => <Login />} />
    </NavigationContainer>
  );
}
