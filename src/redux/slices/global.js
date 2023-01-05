import { createSlice } from '@reduxjs/toolkit';
import { detectClientDevice } from 'utils/device-detection';
import Renderer from 'utils/Renderer';

const initialCurrentDevice = Renderer.onClientSide()
    ? detectClientDevice(window.innerWidth)
    : { type: '', breakpoint: '' };


const initialState = {
    currentDevice: initialCurrentDevice,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setCurrentDevice: (state, { payload }) => {
            state.currentDevice = { ...state.currentDevice, ...payload };
        },
    },
});

export const globalActions = globalSlice.actions;

const globalReducer = globalSlice.reducer;

export default globalReducer;
