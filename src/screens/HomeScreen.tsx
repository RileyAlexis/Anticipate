import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Text, Button, Radio, Toggle } from '@ui-kitten/components';

//Components
import { EventBox } from '../components/EventBox';

//Types
import { AnticipateRootState } from '../redux/types/AnticipateRootState';
import { DraggableBox } from '../components/DraggableBox';
import { SortableList } from '../components/SortableList';
import { EventDragList } from '../components/EventDragList';



export const HomeScreen: React.FC = () => {

    const events = useSelector((state: AnticipateRootState) => state.events);

    return (
        <Layout style={{ flex: 1, paddingHorizontal: 5 }}>
            <EventDragList />
        </Layout>
    )
}