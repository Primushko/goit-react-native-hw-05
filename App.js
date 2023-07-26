import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Home from "./src/Screens/Home";
import LoginScreen from "./src/Screens/LoginScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import CreatePostsScreen from "./src/Screens/CreatePostsScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoBold: require("./src/fonts/Roboto-Bold.ttf"),
    RobotoRegular: require("./src/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./src/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
