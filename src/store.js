import { configureStore } from '@reduxjs/toolkit'
import GetMedicinesReducer from './services/redux/GetMedicinesState'

import GetAuthUserReducer from './services/redux/AuthUserSlice'

import GetUsersReducer from "./services/redux/GetUsersSlice"

import GetOrderSlice from "./services/redux/OrderSlice"

import OrderDetailsSlice  from './services/redux/GetOrderDetails'

import MedicamentSearchSlice from './services/redux/MedicamentSearchSlice'

export const store = configureStore({
    reducer: {
        GetMedicinesSlice : GetMedicinesReducer,
        GetAuthUserReducer : GetAuthUserReducer,
        GetUsersReducer : GetUsersReducer,
        GetOrderReducer : GetOrderSlice,
        OrderDetailsReducer : OrderDetailsSlice,
        MedicamentSearchReducer : MedicamentSearchSlice
    },
})