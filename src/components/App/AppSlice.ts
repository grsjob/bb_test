import {createSlice} from "@reduxjs/toolkit";


export interface AppState {
    loading: boolean
}

const initialState: AppState = {
    loading: false,
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {


    }
})

export const {} = slice.actions

export default slice.reducer