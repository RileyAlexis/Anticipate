export const formatTime = (time: Date): string => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const isPM = hours >= 12;

    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const amPm = isPM ? 'PM' : 'AM';

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
};
