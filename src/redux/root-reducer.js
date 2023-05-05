import { combineReducers } from '@reduxjs/toolkit';
import global from './slices/global';
import api from 'utils/service';

const slices = combineReducers({
    [api.reducerPath]: api.reducer,
    global,
});

const rootReducer = (state, action) => {
    return slices(state, action);
};

export default rootReducer;
