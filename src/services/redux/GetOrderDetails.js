import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { getOrderAPI } from '../OrderService'

export const fetchOrderDetails = createAsyncThunk(
    'fetch/orders/datails',
    async (payload, thunkAPI) => {
      const response = await getOrderAPI(payload.id)
      return response.data
    }
)

const initialState = {
    loading : false,
    data :[],
    totalPrice : 0,
    errorMessage : ""
}

export const OrderDetailsSlice = createSlice({
    name: 'ordersDetails',
    initialState,
    reducers : {
       
    },

    extraReducers : (builder) => {
        builder.addCase(fetchOrderDetails.fulfilled , (state , action) => {
            state.data = action.payload
            
            let totalPrice = 0

            action.payload.forEach(e => {
                totalPrice += (e.pivot.quantity * e.price)
            });


            state.totalPrice = totalPrice
            state.loading = false
        })
        .addCase(fetchOrderDetails.pending , (state, _) => {
            state.loading = true
        })
    }
})

export const {} = OrderDetailsSlice.actions

export default OrderDetailsSlice.reducer