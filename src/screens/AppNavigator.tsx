import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//UI Kitten
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";



//Screens
import { HomeScreen } from "./HomeScreen";
import { SettingsScreen } from "./SettingsScreen";

interface KittenNavBarProps {
    navigation: any,
    state: any
}

const TabNavigator = createBottomTabNavigator();

const HomeIcon = (props: any) => (
    <Icon {...props} name="home-outline" />
);

const SettingsIcon = (props: any) => (
    <Icon {...props} name="settings-2-outline" />
)

const KittenNavBar: React.FC<KittenNavBarProps> = ({ navigation, state }) => {
    return (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}
        // appearance="indicator"
        >
            <BottomNavigationTab icon={HomeIcon} />
            <BottomNavigationTab icon={SettingsIcon} />

        </BottomNavigation>
    )
}

export const AppNavigator: React.FC = () => {

    return (
        <NavigationContainer>
            <TabNavigator.Navigator
                screenOptions={{
                    headerShown: false
                }}
                tabBar={props => <KittenNavBar {...props} />}
            >
                <TabNavigator.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <HomeIcon style={{ tintColor: color }} width={size} height={size} />
                    }}
                />
                <TabNavigator.Screen name="Settings" component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <SettingsIcon style={{ tintColor: color }} width={size} height={size} />
                    }}
                />
            </TabNavigator.Navigator>
        </NavigationContainer>
    )
}