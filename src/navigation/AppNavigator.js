import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Home from "./screens/Home";
const Stack=createNativeStackNavigator();
export default AppNavigator=()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Home" component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}