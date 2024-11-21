import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Text, Button, Radio, Toggle } from '@ui-kitten/components';

//Components
import { EventBox } from '../components/EventBox';

//Types
import { AnticipateRootState } from '../redux/types/AnticipateRootState';
import { DraggableBox } from '../components/DraggableBox';

interface HomeScreenProps {
    navigation: any
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const events = useSelector((state: AnticipateRootState) => state.events);

    useEffect(() => {
        console.log(events);
    })

    return (
        <Layout style={{ flex: 1, paddingHorizontal: 5 }}>
            {events.map((item) => (
                <DraggableBox key={item.id}>
                    <EventBox event={item} />
                </DraggableBox>
            ))}
        </Layout>
    )
}