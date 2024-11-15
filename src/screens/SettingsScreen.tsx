import { useSelector, useDispatch } from 'react-redux';
import { Button, Layout, Text } from '@ui-kitten/components';

//Actions
import { addEvent } from '../redux/reducers/EventReducer';
import { AnticipateRootState } from '../types/AnticipateRootState';
import { resetStore } from '../redux/store';
interface SettingsScreenProps {
    navigation: any
}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
    const events = useSelector((state: AnticipateRootState) => state.events);
    const dispatch = useDispatch();

    const handleAddEvent = () => (
        dispatch(addEvent({
            id: '565',
            title: 'Apocalypse',
            dueDate: new Date(),
            color: 'green',
            location: 'everywhere',
            notes: 'ngdfjkhgjdksfhfjkhdjk'
        }))
    );

    const resetState = () => {
        dispatch(resetStore());
    }


    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>
                Settings
            </Text>
            <Button onPress={handleAddEvent}>Add New Event</Button>
            <Button onPress={resetState}>Reset State</Button>
            <Layout>
                {events.map((event, index) => (
                    <Layout key={index}>
                        <Text>{event.title}</Text>
                        <Text>{event.color}</Text>
                        <Text>{event.location}</Text>
                    </Layout>

                ))}
            </Layout>
        </Layout>


    )
}