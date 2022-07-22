import { NavigationContainer } from '@react-navigation/native'
import SignIn from '../screens/Signin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/Signup';

const { Navigator, Screen } = createNativeStackNavigator();


const AppLoggedOutRoutes = () => {
    return(
      <NavigationContainer>
        <Navigator screenOptions={{ 
          headerShown: false,
          animation: "slide_from_bottom",
        }}>
          <Screen name="signin" component={SignIn}/>
          <Screen name="signup" component={SignUp}/>
        </Navigator>
      </NavigationContainer>
    )
}

export default AppLoggedOutRoutes;