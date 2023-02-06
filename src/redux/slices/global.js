import { createSlice } from '@reduxjs/toolkit';
import { detectClientDevice } from 'utils/device-detection';
import Renderer from 'utils/Renderer';
import Cookie, { COOKIE_KEYS } from 'utils/cookie';

const initialCurrentDevice = Renderer.onClientSide()
    ? detectClientDevice(window.innerWidth)
    : { type: '', breakpoint: '' };

const initialLanguage = Renderer.onClientSide() ? Cookie.getItem(COOKIE_KEYS.language) : '';

const initialState = {
    currentDevice: initialCurrentDevice,
    language: initialLanguage,
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
