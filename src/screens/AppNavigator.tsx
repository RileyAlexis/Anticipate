import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//UI Kitten
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";



//Screens
import { HomeScreen } from "./HomeScreen";
import { SettingsScreen } from "./SettingsScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {

    const HomeIcon = (props: any) => (
        <Icon {...props} name="home-outline" />
    );

    const SettingsIcon = (props: any) => (
        <Icon {...props} name="settings-2-outline" />
    )


    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <HomeIcon style={{ tintColor: color }} width={size} height={size} />
                    }}
                />
                <Tab.Screen name="Settings" component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <SettingsIcon style={{ tintColor: color }} width={size} height={size} />
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}