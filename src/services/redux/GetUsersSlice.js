import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { deleteUsersAPI, getUsersAPI } from '../UsersService'


const initialState = {
    loading : false,
    totalPage : 0,
    data :[],
    Ids : [],
    errorMessage : ""
}

export const fetchUsers = createAsyncThunk(
    'fetch/users/',
    async (payload, thunkAPI) => {
    
      const response = await getUsersAPI(payload.page, payload.size , payload.name)
      
      return {data : response.data.data , totalPage : response.data.total}
    }
)


export const deleteUsers = createAsyncThunk(
    'delete/users/',
    async (payload, {dispatch}) => {
        for(let i = 0;  i < payload.Ids.length ; i++){
            await deleteUsersAPI(payload.Ids[i])
        }

        dispatch(fetchUsers({page : payload.page , size: payload.size, name: payload.name}))

        return payload
    }
)

export const GetUsersSlice = createSlice({
    name: 'GetUsers',
    initialState,
    reducers: {
        changeUsersIds : (state , action) => {
            action.payload.forEach((e) => {
                state.Ids[e] = !state.Ids[e]
            })
        },

        changeUsersByGlobalCheck  : (state, action) =>{
            state.Ids = state.Ids.map((_) => action.payload) 
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = false
            state.Ids = []

            state.totalPage = action.payload.totalPage

            state.data.forEach(_ => {
                state.Ids.push(false)
            });
        })
        .addCase(fetchUsers.pending , (state , action) =>{
            if(action.meta.arg.name == undefined) 
                state.loading = true
        })
    }
})

export const {changeUsersIds , changeUsersByGlobalCheck} =
    GetUsersSlice.actions

export default GetUsersSlice.reducer
