import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { deleteMedicines, getMedicines } from '../MedicineService'

const initialState = {
    loading : false,
    totalPage : 0,
    data :[],
    Ids : [],
    errorMessage : ""
}

export const fetchMedicaments = createAsyncThunk(
    'fetch/medicaments/',
    async (payload, thunkAPI) => {
      const response = await getMedicines(payload.page, payload.size , payload.name)
    
      
      return {data : response.data.data , totalPage : response.data.total}
    }
)

export const deleteMedicaments = createAsyncThunk(
    'delete/medicaments/',
    async (payload, {dispatch}) => {
        for(let i = 0;  i < payload.Ids.length ; i++){
            await deleteMedicines(payload.Ids[i])
        }

        dispatch(fetchMedicaments({page : payload.page , size: payload.size, name: payload.name}))

        return payload
    }
)

export const GetMedicinesSlice = createSlice({
    name: 'GetMedicines',
    initialState,
    reducers: {
        changeMedicineIds : (state , action) => {
            action.payload.forEach((e) => {
                state.Ids[e] = !state.Ids[e]
            })
        },

        changeMedicinesByGlobalCheck  : (state, action) =>{
            state.Ids = state.Ids.map((_) => action.payload) 
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchMedicaments.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = false
            state.Ids = []

            state.totalPage = action.payload.totalPage

            state.data.forEach(_ => {
                state.Ids.push(false)
            });
        })
        .addCase(fetchMedicaments.pending , (state , action) =>{
            if(action.meta.arg.name == undefined) 
                state.loading = true
        })
        .addCase(deleteMedicaments.fulfilled , (state , action) => {

        })
    }
})

export const {getMedicine , changeMedicineIds , changeMedicinesByGlobalCheck} =
    GetMedicinesSlice.actions

export const selectAllMedicines = state => state.GetMedicinesSlice.data

export default GetMedicinesSlice.reducer


