import {v1} from "uuid";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type CategoryType = {
    value: string
    src: string
}

export type TransactionType = {
    id: string
    text: string
    amount: number
    date: Date
    category: CategoryType
}


type InitialState = {
    transactions: Array<TransactionType>
    copyOfTransactions: Array<TransactionType>
    popUpForm: boolean
    month: number
    popUpCalendar: boolean
    dateRange: DateType
}
const initialState: InitialState = {
    transactions: [],
    copyOfTransactions: [],
    popUpForm: false,
    month: new Date().getMonth(),
    popUpCalendar: false,
    dateRange: {start: new Date(), end: new Date()}
}
export type PayloadType = {
    text: string,
    amount: number
    date: Date
    category: { value: string, src: string }
}
export type DateType = {
    start: Date
    end: Date
}

const transactionsSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        addTransaction(state, action: PayloadAction<PayloadType>) {
            const text = action.payload.text
            const amount = action.payload.amount
            const date = action.payload.date
            const category = action.payload.category
            state.transactions = [
                {id: v1(), text, amount, date, category}, ...state.transactions]

            state.copyOfTransactions = state.transactions
        },

        deleteTransaction(state, action: PayloadAction<string>) {
            state.copyOfTransactions = state.copyOfTransactions.filter(el => el.id !== action.payload)
            state.transactions = state.copyOfTransactions
        },
        //Filter for This month & Previous Month
        filterTransaction(state, action: PayloadAction<number>) {
            console.log(action.payload)
            state.copyOfTransactions = state.transactions.filter(el => el.date.getMonth() === action.payload)
        },
        //Filter for date range
        filterDateTransaction(state, action: PayloadAction<DateType>) {
            state.dateRange = action.payload
            state.copyOfTransactions = state.transactions.filter
            (el => el.date >= action.payload.start
                && el.date <= action.payload.end)
        },
        //PopUp Transaction Form
        changePopUp(state, action: PayloadAction<boolean>) {
            state.popUpForm = action.payload
        },
        //PopUp Calendar
        changePopUpCalendar(state, action: PayloadAction<boolean>) {
            state.popUpCalendar = action.payload
        },
    }

})

export const {
    addTransaction,
    deleteTransaction,
    changePopUp,
    changePopUpCalendar,
    filterTransaction,
    filterDateTransaction
} = transactionsSlice.actions;
export default transactionsSlice.reducer