import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Text, Button, Radio, Toggle } from '@ui-kitten/components';

//Components
import { EventBox } from '../components/EventBox';

//Types
import { AnticipateRootState } from '../redux/types/AnticipateRootState';

interface HomeScreenProps {
    navigation: any
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const events = useSelector((state: AnticipateRootState) => state.events);

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
            {events.map((item) => (
                <EventBox key={item.id} title={item.title} dueDate={item.dueDate} color={item.color} />
            ))}
        </Layout>
    )
}