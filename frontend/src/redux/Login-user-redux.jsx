import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (user, thunkAPI) => {
        const toastId = toast.loading("Iniciando sesión...")
        try {
            console.log(user)
            const response = await axios.post("http://localhost:3008/api/v1/login-user", user)
            console.log(response.data)
            toast.update(toastId, {
                render: "Usuario logeado correctamente",
                type: "success",
                isLoading: false,
                autoClose: 3000
            })
            return response.data
        } catch (error) {
            console.log(error)
            toast.update(toastId, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000
            })
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const loginUserSlice = createSlice({
    name: "Loginuser",
    initialState: {
        user: null,
        isLoading: false,
        error: null,
        isSuccess: false
    },
    reducers: {
        resetStates: (state) => {
            state.user = null
            state.isLoading = false
            state.error = null
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { resetStates } = loginUserSlice.actions
export default loginUserSlice.reducer
