import { createStaticNavigation, DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './login';
import "../global.css"

const RootStack = createNativeStackNavigator({
  screens: {
    Login,
    // Home: HomeScreen,
  },
});


const Navigation = createStaticNavigation(RootStack);
export default function RootLayout() {
  return<Navigation />
;
}

