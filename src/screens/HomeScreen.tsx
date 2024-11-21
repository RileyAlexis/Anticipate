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

    useEffect(() => {
        console.log(events);
    })

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {events.map((item) => (
                <EventBox key={item.id} event={item} />
            ))}
        </Layout>
    )
}