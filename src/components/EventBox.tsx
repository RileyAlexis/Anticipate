import React, { useEffect } from "react";
import { useState } from "react";

import { Layout, Text } from "@ui-kitten/components";

//Modules
import { hexToRgba } from "../modules/hexToRGBA";
import { formatTime } from "../modules/formatTime";
import { formatDate } from "../modules/formatDate";

//Types
import { EventType } from "../redux/types/EventType";

interface EventBoxProps {
    event: EventType
}

export const EventBox: React.FC<EventBoxProps> = ({ event }) => {

    const { title, dueDate, color } = event;
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: '',
        minutes: '',
        seconds: '',
    });

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = dueDate.getTime() - now.getTime();

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
                .toString()
                .padStart(2, '0');
            const minutes = Math.floor((difference / (1000 * 60)) % 60)
                .toString()
                .padStart(2, '0');
            const seconds = Math.floor((difference / 1000) % 60)
                .toString()
                .padStart(2, '0');

            return { days, hours, minutes, seconds };
        }

        return { days: 0, hours: '00', minutes: '00', seconds: '00' };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [dueDate]);

    return (
        <Layout
            level="2"
            style={{
                backgroundColor: hexToRgba(color, 0.7),
                width: '95%',
                height: '13%',
                flexDirection: 'row',
                borderBlockColor: hexToRgba(color, 1),
                borderWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderRadius: 12,
                margin: 5,
            }}
        >
            <Layout style={{
                alignItems: 'flex-start',
                width: '40%',
                paddingVertical: 6,
                backgroundColor: 'rgba(0,0,0,0)'
            }}>
                <Text category="h5">{title}</Text>
                <Text category="s1">{`${formatDate(dueDate)}`}</Text>
                <Text category="s2">{`${formatTime(dueDate)}`}</Text>
            </Layout>
            <Layout style={{
                alignItems: 'flex-end',
                width: '60%',
                paddingVertical: 6,
                backgroundColor: 'rgba(0,0,0,0)'
            }}>
                <Text category="h6">
                    {`${timeLeft.days} Days ${timeLeft.hours} Hours ${timeLeft.minutes} Minutes ${timeLeft.seconds} Seconds`}
                </Text>
            </Layout>

        </Layout>
    )
}