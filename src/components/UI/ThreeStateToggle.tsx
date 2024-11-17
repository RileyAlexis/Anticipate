import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';

//Types
import { ThemeType } from '../../redux/types/OptionsType';


interface ThreeStateToggleProps {
    value: ThemeType;
    onChange: (state: ThemeType) => void;
}

export const ThreeStateToggle: React.FC<ThreeStateToggleProps> = ({ value, onChange }) => {
    const theme = useTheme();
    const handlePress = (state: ThemeType) => {
        onChange(state);
    };

    return (
        <Layout
            style={[
                styles.container,
                { borderColor: theme['border-basic-color-3'] },
            ]}
        >
            <TouchableOpacity
                style={[
                    styles.option,
                    value === 'light' && {
                        backgroundColor: theme['color-primary-default'],
                    },
                ]}
                onPress={() => handlePress('light')}
            >
                <Text
                    style={[
                        styles.text,
                        value === 'light' && { color: theme['text-control-color'] },
                    ]}
                >
                    Light
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.option,
                    value === 'dark' && {
                        backgroundColor: theme['color-primary-default'],
                    },
                ]}
                onPress={() => handlePress('dark')}
            >
                <Text
                    style={[
                        styles.text,
                        value === 'dark' && { color: theme['text-control-color'] },
                    ]}
                >
                    Dark
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.option,
                    value === 'auto' && {
                        backgroundColor: theme['color-primary-default'],
                    },
                ]}
                onPress={() => handlePress('auto')}
            >
                <Text
                    style={[
                        styles.text,
                        value === 'auto' && { color: theme['text-control-color'] },
                    ]}
                >
                    Auto
                </Text>
            </TouchableOpacity>
        </Layout>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        overflow: 'hidden',
    },
    option: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    selected: {
        backgroundColor: '#6200ee',
    },
    text: {
        color: '#333',
        fontSize: 16,
    },
    selectedText: {
        color: '#fff',
    },
});
