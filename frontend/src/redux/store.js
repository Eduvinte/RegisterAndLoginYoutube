"use client"
import { configureStore } from "@reduxjs/toolkit"
import userSlice  from "./Register-user-redux"
import loginUserSlice from "./Login-user-redux"
export const store = configureStore({
    reducer: {
        user: userSlice,
        loginUser: loginUserSlice
    }
})