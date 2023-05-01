import { createSlice } from '@reduxjs/toolkit';
import { detectClientDevice } from 'utils/device-detection';
import Renderer from 'utils/Renderer';
import {DEFAULT_LANGUAGE} from "utils/constants";

const initialCurrentDevice = Renderer.onClientSide()
    ? detectClientDevice(window.innerWidth)
    : { type: '', breakpoint: '' };


const initialState = {
    currentDevice: initialCurrentDevice,
    language: DEFAULT_LANGUAGE,
    headerSearchProps: { isVisible: false, keyword: null },
    mobileMenuVisibility: false,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setCurrentDevice: (state, { payload }) => {
            state.currentDevice = { ...state.currentDevice, ...payload };
        },
        changeLanguage: (state, { payload }) => {
            state.language = payload;
        },
        changeHeaderSearchProps: (state, { payload }) => {
            state.headerSearchProps = { ...state.headerSearchProps, ...payload };
        },
        changeMobileMenuVisibility: (state, { payload }) => {
            state.mobileMenuVisibility = payload;
        },
    },
});

export const globalActions = globalSlice.actions;

const globalReducer = globalSlice.reducer;

export default globalReducer;
