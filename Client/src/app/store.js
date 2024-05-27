import {configureStore} from '@reduxjs/toolkit';
import todoReducer from "../features/TodoSlice.js"
export const store = configureStore({
    reducer :todoReducer
})