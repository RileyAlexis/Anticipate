import { Layout, Text, Datepicker, Icon } from '@ui-kitten/components';

interface AddEventScreenProps {
    navigation: any
}

const calendarIcon = (props: any) => (
    <Icon {...props} name="calendar-outline" />
)

export const AddEventScreen: React.FC<AddEventScreenProps> = ({ navigation }) => {
    return (
        <Layout style={{ flex: 1 }}>
            <Datepicker
                accessoryRight={calendarIcon}
            />
        </Layout>
    )
}