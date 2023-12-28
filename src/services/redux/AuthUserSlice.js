import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { getAuthUserAPI } from '../UsersService'

export const getAuthUser = createAsyncThunk(
    'fetch/auth/',
    async (payload, thunkAPI) => {
      const response = await getAuthUserAPI()
    
      return response.data
    }
)

const initialState = {
    loading : false,
    user :[],
    errorMessage : ""
}

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers : {

    },

    extraReducers : (builder) => {
        builder.addCase(getAuthUser.fulfilled , (state , action) => {
            state.user = action.payload
            state.loading = false
        })
        .addCase(getAuthUser.pending , (state, action) => {
            state.loading = true
        })
    }
})

export const {} = authUserSlice.actions

export default authUserSlice.reducer