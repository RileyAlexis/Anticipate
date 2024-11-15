import { Layout, Text, Button, Radio, Toggle } from '@ui-kitten/components';
import { View } from 'react-native';
import { EventBox } from '../components/EventBox';
import { useEffect, useState } from 'react';

interface HomeScreenProps {
    navigation: any
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const [tempDate, setTempDate] = useState(() => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 18);
        return newDate;
    });

    const [tempDate2, setTempDate2] = useState(() => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 4);
        return newDate;
    });

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <EventBox title='Grok This' dueDate={tempDate} color="#71009D" />
            <EventBox title='Destroy Capitalism' dueDate={tempDate2} color="#8C002C" />
        </Layout>
    )
}