import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (user, thunkAPI) => {
        const toastId = toast.loading("Registrando usuario...")
        try {
            console.log(user)
            const response = await axios.post("http://localhost:3008/api/v1/register-user", user)
            console.log(response.data)
            toast.update(toastId, {
                render: "Usuario registrado correctamente",
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

export const userSlice = createSlice({
    name: "Registeruser",
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
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { resetStates } = userSlice.actions
export default userSlice.reducer