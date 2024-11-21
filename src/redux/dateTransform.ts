import { createTransform } from "redux-persist";

import { EventType } from "./types/EventType";

type SerializedEventType = Omit<EventType, 'dueDate'> & { dueDate: string };

export const dateTransform = createTransform<EventType[], SerializedEventType[]>(
    // Transform for serialization
    (inboundState) => {
        return inboundState.map(event => ({
            ...event,
            dueDate: event.dueDate instanceof Date ? event.dueDate.toISOString() : event.dueDate,
        }));
    },
    // Transform for deserialization
    (outboundState) => {
        return outboundState.map(event => ({
            ...event,
            dueDate: typeof event.dueDate === 'string' ? new Date(event.dueDate) : event.dueDate,
        }));
    },
    // Specify the reducer this applies to
    { whitelist: ['events'] }, // Replace 'events' with your actual reducer key
);