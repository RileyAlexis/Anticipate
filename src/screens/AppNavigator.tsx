import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//UI Kitten
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";

//Screens
import { HomeScreen } from "./HomeScreen";
import { SettingsScreen } from "./SettingsScreen";
import { AddEventScreen } from "./AddEventScreen";

interface KittenNavBarProps {
    navigation: any,
    state: any
}

export type BottomTabParamList = {
    AddEvent: undefined;
    Home: undefined;
    Settings: undefined;
}

const TabNavigator = createBottomTabNavigator<BottomTabParamList>();

const HomeIcon = (props: any) => (
    <Icon {...props} name="home-outline" />
);

const CalendarIcon = (props: any) => (
    <Icon {...props} name="calendar-outline" />
)

const SettingsIcon = (props: any) => (
    <Icon {...props} name="settings-2-outline" />
)

const PlusIcon = (props: any) => (
    <Icon {...props} name="plus-outline" />
)

const KittenNavBar: React.FC<KittenNavBarProps> = ({ navigation, state }) => {
    return (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}
        // appearance="indicator"
        >
            <BottomNavigationTab icon={PlusIcon} />
            <BottomNavigationTab icon={CalendarIcon} />
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
                <TabNavigator.Screen name="AddEvent" component={AddEventScreen} />
                <TabNavigator.Screen name="Home" component={HomeScreen} />
                <TabNavigator.Screen name="Settings" component={SettingsScreen} />
            </TabNavigator.Navigator>
        </NavigationContainer>
    )
}