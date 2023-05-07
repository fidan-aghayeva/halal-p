import { combineReducers } from '@reduxjs/toolkit';
import global from './slices/global';

const slices = combineReducers({
    global,
});

const rootReducer = (state, action) => {
    return slices(state, action);
};

export default rootReducer;
