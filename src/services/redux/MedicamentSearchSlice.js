import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import {getMedicines } from '../MedicineService'

const initialState = {
    loading : false,
    data :[],
    errorMessage : ""
}

export const searchMedicaments = createAsyncThunk(
    'fetch/medicaments/search',
    async (payload, thunkAPI) => {
        const page = 0
        const size= 5
        const response = await getMedicines(page, size , payload.name)
    
      
        return response.data.data 
    }
)


export const MedicamentSearchSlice = createSlice({
    name: 'search medicament',
    initialState,
    reducers: {
        resetSearchMedicament : (state) => {
            state.data = []
        }
    },
    extraReducers : (builder) => {
        builder.addCase(searchMedicaments.fulfilled, (state, action) => {
            state.data = action.payload
        })
        .addCase(searchMedicaments.pending , (state , action) =>{
            state.loading = true
        })
        .addCase(searchMedicaments.rejected , (state , action) => {
            state.errorMessage = action.payload
        })
    }
})

export const {resetSearchMedicament} =
    MedicamentSearchSlice.actions


export default MedicamentSearchSlice.reducer


