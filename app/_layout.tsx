import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./login";
import "../global.css";
import { Dashboard } from "./dashboard";
import VerifyPin from "./verify-pin";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Profile } from "./profile";
import { CommonModalProvider } from "../context/modal.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Calendar } from "./calendar";
import Wallet from "./wallet";
import CategoryDetail from "./profile/container/category";
import CategoryDetailForm from "./profile/container/category/components/CategoryDetailForm";
import ReportDetail from "./profile/container/report";
import { AuthProvider } from "../context/auth.context";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <CommonModalProvider>
            <NavigationContainer>
              <AuthProvider>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                      headerShown: true,
                      headerBackVisible: true,
                    }}
                  />
                  <Stack.Screen
                    name="Calendar"
                    component={Calendar}
                    options={{
                      headerShown: true,
                      headerBackVisible: true,
                    }}
                  />
                  <Stack.Screen
                    name="Wallet"
                    component={Wallet}
                    options={{
                      headerShown: true,
                      headerBackVisible: true,
                    }}
                  />
                  <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                      headerShown: true,
                      headerBackVisible: true,
                    }}
                  />
                  <Stack.Screen
                    name="VerifyPin"
                    component={VerifyPin}
                    options={{
                      headerShown: true,
                      headerBackVisible: true,
                      headerTitle: "",
                    }}
                  />
                  <Stack.Screen
                    name="CategoryDetail"
                    component={CategoryDetail}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CategoryDetailForm"
                    component={CategoryDetailForm}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ReportDetail"
                    component={ReportDetail}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </AuthProvider>
            </NavigationContainer>
          </CommonModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
