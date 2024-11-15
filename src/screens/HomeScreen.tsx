import { View, Text } from 'react-native';

interface HomeScreenProps {
    navigation: any
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'red', fontSize: 25 }}>
                Home Screen
            </Text>
        </View>
    )
}