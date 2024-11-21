import React, { useEffect, useState } from "react";
import { Dimensions } from 'react-native';
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
    event: EventType
}

export const EventBox: React.FC<EventBoxProps> = ({ event }) => {
    const { height, width } = Dimensions.get('window');
    const boxHeight = height * 0.13;
    const { title, dueDate, color } = event;
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: '',
        minutes: '',
        seconds: '',
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(dueDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [dueDate]);

    return (
        <Layout
            level="2"
            style={{
                backgroundColor: hexToRgba(color, 0.7),
                height: boxHeight,
                flexDirection: 'row',
                borderBlockColor: hexToRgba(color, 1),
                borderWidth: 1,
                borderRadius: 12,
                marginTop: 5,
                paddingLeft: 5,
                justifyContent: 'space-around'
            }}
        >
            <Layout style={{
                alignItems: 'stretch',
                width: '60%',
                paddingTop: 5,
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
                // alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(57 57 57 / 0.5)',
                borderWidth: 0.3,
                borderRadius: 12
            }}>
                <MoreVerticalOutline width={45} height={50} />

            </Layout>
        </Layout>
    )
}