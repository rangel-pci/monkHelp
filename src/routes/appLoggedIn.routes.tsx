import Home from "../screens/Home";
import Details from "../screens/Details";
import Register from "../screens/Register";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";

const { Navigator, Screen } = createNativeStackNavigator();

const AppLoggedInRoutes = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ 
        headerShown: false,
        animation: "slide_from_bottom",
      }}>
        <Screen name="home" component={Home}/>
        <Screen name="register" component={Register}/>
        <Screen name="details" component={Details}/>
      </Navigator>
    </NavigationContainer>
  )
}

export default AppLoggedInRoutes;