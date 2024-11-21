export const calculateTimeLeft = (dueDate: Date) => {
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