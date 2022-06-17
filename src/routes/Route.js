import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerRoute from "../components/Drawer/Drawer";
import Login from "../screen/login/Login";
const Stact = createNativeStackNavigator();


const Route = () => {


    return (
        <>
            <NavigationContainer>
                <Stact.Navigator initialRouteName="Dashboard">
                    <Stact.Screen name="login" component={Login} options={{ headerShown: false}} />
                    <Stact.Screen name="Dashboard" component={DrawerRoute} options={{ headerShown: false}} />
                </Stact.Navigator>
            </NavigationContainer>
        </>
    )
}

export default Route
