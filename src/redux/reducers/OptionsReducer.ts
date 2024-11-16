import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { OptionsType } from "../types/OptionsType";
import { light } from "@eva-design/eva";

const initalState: OptionsType = {
    theme: 'light',
}

const optionsSlice = createSlice({
    name: 'options',
    initialState: initalState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
            state.theme = action.payload;
        }
    }
});

export const {
    setTheme,
} = optionsSlice.actions;

export default optionsSlice.reducer;