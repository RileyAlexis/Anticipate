import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Layout, Text } from '@ui-kitten/components';

//Actions
import { addEvent } from '../redux/reducers/EventReducer';
import { resetStore } from '../redux/store';
import { setTheme } from '../redux/reducers/OptionsReducer';

//Types
import { AnticipateRootState } from '../redux/types/AnticipateRootState';
import { useEffect } from 'react';
import { ThreeStateToggle } from '../components/UI/ThreeStateToggle';

interface SettingsScreenProps {
    navigation: any
}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
    const events = useSelector((state: AnticipateRootState) => state.events);
    const options = useSelector((state: AnticipateRootState) => state.options);
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
        <Layout style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>
                Settings
            </Text>
            <Button onPress={handleAddEvent}>Add New Event</Button>
            <Button onPress={resetState}>Reset State</Button>
            <ThreeStateToggle value={options.theme} onChange={(newTheme) => dispatch(setTheme(newTheme))} />
        </Layout>


    )
}