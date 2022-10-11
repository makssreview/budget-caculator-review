import transactionsSlice from "./slice";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        transaction: transactionsSlice
    }
})
export default store
export type AppRootStateType = ReturnType<typeof store.getState>