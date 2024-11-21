import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Pressable } from 'react-native-gesture-handler';
import { StyleSheet, Platform, useColorScheme, Appearance } from 'react-native';
import { Layout, Text, Datepicker, Icon, useTheme, Input, NativeDateService, Modal, Button, Popover, Toggle, Card } from '@ui-kitten/components';

//Modules
import { formatTime } from '../modules/formatTime';

//Components
import { AninticipateColorPicker } from '../components/UI/AnticipateColorPicker';
import DateTimePicker from '@react-native-community/datetimepicker';

//Actions
import { addEvent } from '../redux/reducers/EventReducer';

//Types
import { returnedResults } from 'reanimated-color-picker';
import { BottomTabParamList } from './AppNavigator';

const calendarIcon = (props: any) => (
    <Icon {...props} name="calendar-outline" />
)

const clockIcon = (props: any) => (
    <Icon {...props} name="clock-outline" />
)

export const AddEventScreen: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<BottomTabParamList>>();
    const [colorScheme, setColorScheme] = useState(useColorScheme());
    const backgroundColor = theme['background-basic-color-1'];
    const dispatch = useDispatch();

    const [eventTitle, setEventTitle] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date>(() => {
        const now = new Date();
        const tomorrow = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1, // Add one day to today's date
            23, // Hours for 11 PM
            59, // Minutes
            0, // Seconds
        );
        return tomorrow;
    });
    const [selectedColor, setSelectedColor] = useState<string>('#868686');
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
    const [is24Hour, setIs24Hour] = useState(true);

    const now = new Date();
    const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const maxDate = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate() + 1);
    const usDateFormat = new NativeDateService('en', { format: 'MMMM DD YYYY' });


    const handleTitleInput = (title: string) => {
        setEventTitle(title);
    }

    const dateConfig = {
        dayNames: {
            short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        monthNames: {
            short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    }

    const handleDateChange = (selectedDate: Date | null) => {
        if (!selectedDate) return;
        setDueDate((prev) => {
            const currentDate = prev || new Date();
            return new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                currentDate.getHours(),
                currentDate.getMinutes(),
                currentDate.getSeconds()
            );
        });
    };

    const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
        // If no time is selected, use 11:59 PM as the default
        const timeToUse = selectedTime || new Date(0, 0, 0, 23, 59, 0); // 11:59 PM

        setDueDate((prev) => {
            const currentDate = prev || new Date();
            return new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                timeToUse.getHours(),
                timeToUse.getMinutes(),
                timeToUse.getSeconds()
            );
        });
    };

    const handleColorSelect = (color: returnedResults) => {
        console.log('Color', color);
        setSelectedColor(color.hex);
    }

    const addNewEvent = () => {

        dispatch(addEvent({
            id: eventTitle,
            title: eventTitle,
            dueDate: dueDate,
            color: selectedColor,
            location: '',
            notes: ''
        }));

        setEventTitle('');
        navigation.navigate('Home');
    }

    return (
        <Layout style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}>
            <Layout style={{ marginTop: 25, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text category='h4'>Add New Event</Text>
            </Layout>
            <Layout style={{ marginHorizontal: 10 }}>
                <Layout style={{ paddingVertical: 15 }}>
                    <Input status='Primary' placeholder='Event Title' value={eventTitle} onChangeText={handleTitleInput} />
                </Layout>
                <Layout style={{ paddingVertical: 10 }}>
                    {/* Date picker */}
                    <Datepicker
                        accessoryRight={calendarIcon}
                        date={dueDate}
                        onSelect={nextDate => handleDateChange(nextDate)}
                        min={minDate}
                        max={maxDate}
                        dateService={usDateFormat}
                    />
                </Layout>
                <Layout style={{
                    paddingVertical: 0,

                }}>
                    <Layout style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                        {!isTimePickerVisible &&
                            <Button
                                style={{ width: '100%' }}
                                appearance='outline'
                                accessoryRight={clockIcon}
                                onPress={() => setIsTimePickerVisible(() => !isTimePickerVisible)}
                            >
                                {`Selected Time: ${formatTime(dueDate)}`}</Button>
                        }
                    </Layout>

                    {/* Time Selector */}
                    <Modal
                        visible={isTimePickerVisible}
                        onBackdropPress={() => setIsTimePickerVisible(() => !isTimePickerVisible)}
                        animationType='slide'
                        backdropStyle={styles.modalBackdrop}
                        style={{ width: '90%' }}>
                        <DateTimePicker
                            value={dueDate}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={is24Hour}
                            onChange={handleTimeChange}
                            themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
                            textColor={colorScheme === 'light' ? 'silver' : 'lightgray'}
                        />
                    </Modal>


                </Layout>
                <Layout style={{
                    paddingVertical: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        onPress={() => setIsColorPickerVisible(() => !isColorPickerVisible)}
                        appearance='filled'
                    >
                        Select Color
                    </Button>
                    <Pressable
                        style={{
                            width: '20%',
                            height: '100%',
                            backgroundColor: selectedColor,
                            justifyContent: 'flex-end',
                            borderWidth: 1,
                            borderColor: theme['theme.color-primary-400']
                        }}
                        onPress={() => setIsColorPickerVisible(() => !isColorPickerVisible)}>
                    </Pressable>
                </Layout>

                <Modal
                    visible={isColorPickerVisible}
                    onBackdropPress={() => setIsColorPickerVisible(() => !isColorPickerVisible)}
                    animationType='slide'
                    backdropStyle={styles.modalBackdrop}
                    style={{
                        width: '90%',
                    }}
                >
                    <AninticipateColorPicker callback={handleColorSelect} selectedColorValue={selectedColor} />
                </Modal>

            </Layout>
            <Layout style={{ width: '90%', position: 'absolute', bottom: 20, left: '5%', right: 0 }}>
                <Button onPress={addNewEvent}>Submit</Button>
            </Layout>
        </Layout >
    )
}

const styles = StyleSheet.create({
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0, 0.8)',
    }
})