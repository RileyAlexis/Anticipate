import { StyleSheet, View, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useTheme } from "@ui-kitten/components";
import ColorPicker, { Panel1, Swatches, colorKit, HueCircular } from "reanimated-color-picker";

import type { returnedResults } from "reanimated-color-picker";

interface AnticipateColorPickerProps {
    callback: (color: returnedResults) => void;
    selectedColorValue: string;
}

const { width } = Dimensions.get('window');
const PANEL_SIZE = Math.min(width * 0.45, 300);

export const AninticipateColorPicker: React.FC<AnticipateColorPickerProps> = ({ callback, selectedColorValue }) => {
    const theme = useTheme();
    const selectedColor = useSharedValue(selectedColorValue);
    const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value, borderRadius: 20 }));
    const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

    const onColorSelect = (color: returnedResults) => {
        'worklet';
        selectedColor.value = color.hex;
    };

    const onCompletedSelect = (color: returnedResults) => {
        callback(color);
        selectedColor.value = color.hex;
    }

    return (
        <Animated.View style={[styles.container, backgroundColorStyle]}>
            <View style={[styles.pickerContainer, { borderColor: theme['color-primary-default-border'], borderWidth: 2 }]}>
                <ColorPicker value={selectedColor.value} sliderThickness={20} thumbSize={40} onChange={onColorSelect} onComplete={onCompletedSelect} boundedThumb>
                    <HueCircular containerStyle={styles.hueContainer} thumbShape="pill" thumbColor={theme['color-basic-400']}>
                        <Panel1 style={styles.panelStyle} />
                    </HueCircular>
                    <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} />
                </ColorPicker>
            </View>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    pickerContainer: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#00000000',
        padding: 20,
        borderRadius: 20,
        // shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    hueContainer: {
        justifyContent: 'center',
    },
    panelStyle: {
        width: PANEL_SIZE,
        height: PANEL_SIZE,
        alignSelf: 'center',
        borderRadius: 16,
    },
    swatchesContainer: {
        paddingTop: 20,
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#bebdbe',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: 10,
    },
    swatchStyle: {
        borderRadius: 20,
        height: 30,
        width: 30,
        margin: 0,
        marginBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
    }
});