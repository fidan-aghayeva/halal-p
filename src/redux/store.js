import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';

const store = configureStore({
    devTools: true,
    reducer: rootReducer,
});

export default store;
