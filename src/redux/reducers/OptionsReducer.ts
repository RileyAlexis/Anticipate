import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { OptionsType } from "../../types/OptionsType";

const initalState: OptionsType = {
    dark: true,
}

const optionsSlice = createSlice({
    name: 'options',
    initialState: initalState,
    reducers: {
        toggleDarkMode: (state) => {
            state.dark = !state.dark;
        }
    }
});

export const {
    toggleDarkMode
} = optionsSlice.actions;

export default optionsSlice.reducer;