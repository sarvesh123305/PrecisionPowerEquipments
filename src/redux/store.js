import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './states/adminSlice'

export default configureStore({
    reducer:{
        user:adminReducer,
    }
})