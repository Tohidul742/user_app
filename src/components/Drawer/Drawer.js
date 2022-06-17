import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../../screen/home/Home";
import Profile from "../Profile/Profile";
const Drawer = createDrawerNavigator();

const DrawerRoute = () => {
    return (
        <>
            <Drawer.Navigator initialRouteName="home">
                <Drawer.Screen name="home" component={Home} options={{ headerTransparent: true }} />
                <Drawer.Screen name="profile" component={Profile} options={{ headerTransparent: false }} />
            </Drawer.Navigator>
        </>

    )
}
export default DrawerRoute;