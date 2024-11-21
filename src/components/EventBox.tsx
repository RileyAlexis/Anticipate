import React, { useEffect } from "react";
import { useState } from "react";

import { Layout, Text } from "@ui-kitten/components";
import { hexToRgba } from "../modules/hexToRGBA";

interface EventBoxProps {
    title: string;
    dueDate: Date;
    color: string;
}

export const EventBox: React.FC<EventBoxProps> = ({ title, dueDate, color }) => {

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
                backgroundColor: hexToRgba(color, 0.3),
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
                borderBlockColor: hexToRgba(color, 1),
                borderWidth: 1,
                paddingVertical: 15,
                borderRadius: 12,
                margin: 5,
            }}
        >

            <Text category="h5">
                {title}
            </Text>
            <Text category="h6">
                {`${timeLeft.days}:${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
            </Text>
        </Layout>
    )
}