import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Datepicker, Icon, useTheme, Input, NativeDateService, Modal, Button } from '@ui-kitten/components';

//Components
import { AninticipateColorPicker } from '../components/UI/AnticipateColorPicker';

//Types
import { returnedResults } from 'reanimated-color-picker';

interface AddEventScreenProps {
    navigation: any
}

const calendarIcon = (props: any) => (
    <Icon {...props} name="calendar-outline" />
)

export const AddEventScreen: React.FC<AddEventScreenProps> = ({ navigation }) => {
    const theme = useTheme();
    const backgroundColor = theme['background-basic-color-1'];

    const [eventTitle, setEventTitle] = useState<string>();
    const [dueDate, setDueDate] = useState<Date>();
    const [selectedColor, setSelectedColor] = useState<string>('#FFFFF0');
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

    const now = new Date();
    const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const maxDate = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate() + 1);
    const usDateFormat = new NativeDateService('en', { format: 'MMMM DD YYYY' });

    const ColorSwatch = () => {
        return (
            <View style={{ width: '30%', height: '100%', backgroundColor: selectedColor }} />
        )
    }

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

    const handleColorSelect = (color: returnedResults) => {
        console.log('Color', color);
        setSelectedColor(color.hex);
        // setIsColorPickerVisible(() => !isColorPickerVisible);
    }

    return (
        <Layout style={{ flex: 1, backgroundColor: backgroundColor, width: '100%' }}>
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
                        onSelect={nextDate => setDueDate(nextDate)}
                        min={minDate}
                        max={maxDate}
                        dateService={usDateFormat}
                    />
                </Layout>
                <Layout style={{
                    paddingVertical: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',


                }}>
                    <Button
                        onPress={() => setIsColorPickerVisible(() => !isColorPickerVisible)}
                        appearance='filled'
                    >
                        Select Color
                    </Button>
                    <View style={{ width: '20%', height: '100%', backgroundColor: selectedColor, justifyContent: 'flex-end' }} />


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
            </Layout>
        </Layout >
    )
}

const styles = StyleSheet.create({
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0, 0.5)',


    }
})