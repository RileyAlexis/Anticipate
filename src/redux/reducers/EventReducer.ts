import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventType } from "../../types/EventType";

const initalState: EventType[] = [];

const eventSlice = createSlice({
    name: 'events',
    initialState: initalState,
    reducers: {
        addEvent: (state, action: PayloadAction<EventType>) => {
            state.push(action.payload);
        },
        updateEvent: (state, action: PayloadAction<EventType>) => {
            const index = state.findIndex((event) => event.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        removeEvent: (state, action: PayloadAction<string>) => {
            return state.filter((event) => event.id !== action.payload);
        },
        resetEvents: () => initalState,
    },
});

export const {
    addEvent,
    updateEvent,
    removeEvent,
    resetEvents
} = eventSlice.actions;

export default eventSlice.reducer;