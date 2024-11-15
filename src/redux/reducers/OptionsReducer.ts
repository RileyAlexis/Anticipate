import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { OptionsType } from "../types/OptionsType";
import { light } from "@eva-design/eva";

const initalState: OptionsType = {
    theme: 'dark',
}

const optionsSlice = createSlice({
    name: 'options',
    initialState: initalState,
    reducers: {
        toggleDarkMode: (state) => {
            state.theme = state.theme === 'light' ? 'light' : 'dark';
        }
    }
});

export const {
    toggleDarkMode
} = optionsSlice.actions;

export default optionsSlice.reducer;