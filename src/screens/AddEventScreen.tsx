import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Platform, useColorScheme, Appearance } from 'react-native';
import { Layout, Text, Datepicker, Icon, useTheme, Input, NativeDateService, Modal, Button, Popover } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';


//Components
import { AninticipateColorPicker } from '../components/UI/AnticipateColorPicker';

//Actions
import { addEvent } from '../redux/reducers/EventReducer';

//Types
import { returnedResults } from 'reanimated-color-picker';
import { Pressable } from 'react-native-gesture-handler';

interface AddEventScreenProps {
    navigation: any
}

const calendarIcon = (props: any) => (
    <Icon {...props} name="calendar-outline" />
)

export const AddEventScreen: React.FC<AddEventScreenProps> = ({ navigation }) => {
    const theme = useTheme();
    const [colorScheme, setColorScheme] = useState(useColorScheme());
    const backgroundColor = theme['background-basic-color-1'];
    const dispatch = useDispatch();

    const [eventTitle, setEventTitle] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [selectedColor, setSelectedColor] = useState<string>('#FFFFF0');
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
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
        if (!selectedTime) return;
        setDueDate((prev) => {
            const currentDate = prev || new Date();
            return new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                selectedTime.getHours(),
                selectedTime.getMinutes(),
                selectedTime.getSeconds()
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
    }

    return (
        <Layout style={{ flex: 1, backgroundColor: backgroundColor, width: '100%', justifyContent: 'space-evenly' }}>
            <Layout style={{ marginTop: 25, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text category='h4'>Add New Event</Text>
            </Layout>
            <Layout style={{ marginHorizontal: 10 }}>
                <Layout style={{ paddingVertical: 15 }}>
                    <Input status='Primary' placeholder='Event Title' value={eventTitle} onChangeText={handleTitleInput} />
                </Layout>
                <Layout style={{ paddingVertical: 15 }}>
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
                    paddingVertical: 15,

                }}>
                    {/* Time Selector */}
                    <DateTimePicker
                        value={dueDate}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={is24Hour}
                        onChange={handleTimeChange}
                        themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
                        textColor={colorScheme === 'light' ? 'silver' : 'lightgray'}
                    />
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
            <Button onPress={addNewEvent}>Submit</Button>
        </Layout >
    )
}

const styles = StyleSheet.create({
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
    }
})