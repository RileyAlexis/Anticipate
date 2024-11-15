import { Layout, Text, Button, Radio, Toggle } from '@ui-kitten/components';
import { View } from 'react-native';

interface HomeScreenProps {
    navigation: any
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>
                Home Screen
            </Text>
            <Text category='s1'>
                Home Screen Sub
            </Text>
            <Text category='p1'>
                P1 category text
            </Text>
            <Layout style={{ padding: 20 }}>
                <Button size='large'>Kitten Button</Button>
            </Layout>
            <Layout style={{ padding: 20 }}>
                <Toggle>Setting</Toggle>
            </Layout>
            <Layout style={{ padding: 20 }}>
                <Radio>Radio</Radio>

            </Layout>
        </Layout>
    )
}