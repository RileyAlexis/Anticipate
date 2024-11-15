import { View, Text } from 'react-native';

interface SettingsScreenProps {
    navigation: any
}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'red', fontSize: 25 }}>
                Settings
            </Text>
        </View>

    )
}