import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { getOrdersAPI } from '../OrderService'

export const fetchOrders = createAsyncThunk(
    'fetch/orders/',
    async (payload, thunkAPI) => {
      const response = await getOrdersAPI(payload.page, payload.size)
    
      return response.data.data
    }
)

const initialState = {
    loading : false,
    data :[],
    Ids : [],
    errorMessage : ""
}

export const OrderUserSlice = createSlice({
    name: 'orders',
    initialState,
    reducers : {
        changeOrdersIds : (state , action) => {
            action.payload.forEach((e) => {
                state.Ids[e] = !state.Ids[e]
            })
        },

        changeOrdersByGlobalCheck  : (state, action) =>{
            state.Ids = state.Ids.map((_) => action.payload) 
        }
    },

    extraReducers : (builder) => {
        builder.addCase(fetchOrders.fulfilled , (state , action) => {
            state.data = action.payload
            state.loading = false
        })
        .addCase(fetchOrders.pending , (state, action) => {
            state.loading = true
        })
    }
})

export const {changeOrdersByGlobalCheck , changeOrdersIds} = OrderUserSlice.actions

export default OrderUserSlice.reducer