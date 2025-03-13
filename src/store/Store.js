import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import taskReducer from './taskSlice'

const Store = configureStore({
    reducer:{
      auth: authReducer,
      tasks: taskReducer
    }
})

export default Store
