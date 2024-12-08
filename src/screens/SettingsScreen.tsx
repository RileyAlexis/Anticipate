import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Layout, Text } from '@ui-kitten/components';

//Actions
import { resetStore } from '../redux/store';
import { setTheme } from '../redux/reducers/OptionsReducer';

//Types
import { AnticipateRootState } from '../redux/types/AnticipateRootState';

//Components
import { ThreeStateToggle } from '../components/UI/ThreeStateToggle';

export const SettingsScreen: React.FC = () => {
    const events = useSelector((state: AnticipateRootState) => state.events);
    const options = useSelector((state: AnticipateRootState) => state.options);
    const dispatch = useDispatch();

    const resetState = () => {
        dispatch(resetStore());
    }

    return (
        <Layout style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>
                Settings
            </Text>
            <Button onPress={resetState}>Reset State</Button>
            <ThreeStateToggle value={options.theme} onChange={(newTheme) => dispatch(setTheme(newTheme))} />
        </Layout>
    )
}