import React, { useEffect, useState, useRef } from "react";
import { Animated, Dimensions } from 'react-native';
import { Layout, Text, Button, Icon } from "@ui-kitten/components";

//Modules
import { hexToRgba } from "../modules/hexToRGBA";
import { formatTime } from "../modules/formatTime";
import { formatDate } from "../modules/formatDate";
import { calculateTimeLeft } from "../modules/calculateTimeLeft";

//Types
import { EventType } from "../redux/types/EventType";
import { MoreVerticalOutline } from "../icons/MoreVerticalOutline";

interface EventBoxProps {
    event: EventType;
    isActive: boolean;
    onLongPress?: () => void;
}

export const EventBox: React.FC<EventBoxProps> = ({ event, isActive, onLongPress }) => {
    const { height, width } = Dimensions.get('window');
    const boxHeight = height * 0.13;
    const { title, dueDate, color } = event;
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: '',
        minutes: '',
        seconds: '',
    });
    const scale = useRef(new Animated.Value(1));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(dueDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [dueDate]);

    useEffect(() => {
        if (isActive) {
            Animated.spring(scale.current, {
                toValue: 1.1,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scale.current, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    }, [isActive])

    return (
        <Layout
            level="2"
            style={{
                backgroundColor: isActive ? hexToRgba(color, 0.4) : hexToRgba(color, 0.7),
                height: boxHeight,
                flexDirection: 'row',
                borderBlockColor: hexToRgba(color, 1),
                borderWidth: 2,
                borderRadius: 12,
                justifyContent: 'space-around',
            }}
        >
            <Layout style={{
                alignItems: 'stretch',
                width: '60%',
                paddingTop: 5,
                marginLeft: 8,
                backgroundColor: 'rgba(0,0,0,0)'
            }}>
                <Text category="h6">{title}</Text>
                <Layout style={{ marginTop: 35, backgroundColor: 'rgba(0,0,0,0)' }}>
                    <Text category="s1">{`${formatDate(dueDate)}`}</Text>
                    <Text category="s2">{`${formatTime(dueDate)}`}</Text>
                </Layout>
            </Layout>
            <Layout style={{
                alignItems: 'flex-start',
                paddingTop: 5,
                paddingRight: 8,
                backgroundColor: 'rgba(0,0,0,0)'
            }}>
                <Text category="h6">
                    {`${timeLeft.days} Days`}
                </Text>
                <Text category="h6">
                    {`${timeLeft.hours} Hours`}
                </Text>
                <Text category="h6">
                    {`${timeLeft.minutes} Minutes `}
                </Text>
                {/* <Text category="h6">
                    {`${timeLeft.seconds} Seconds`}
                </Text> */}

            </Layout>
            <Layout style={{
                backgroundColor: 'rgba(79 79 79 / 0.15)',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(57 57 57 / 0.5)',
                borderWidth: 0.3,
                borderRadius: 12,
                width: 20,
            }}>
                <MoreVerticalOutline width={45} height={50} />

            </Layout>
        </Layout>
    )
}