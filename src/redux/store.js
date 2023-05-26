import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import Renderer from '../utils/Renderer';

let preloadedState = {};

if (Renderer.onClientSide()) {
    preloadedState = window.__NEXT_DATA__.props.pageProps.preloadedReduxState;
}

const store = configureStore({
    preloadedState,
    devTools: true,
    reducer: rootReducer,
});

export default store;
