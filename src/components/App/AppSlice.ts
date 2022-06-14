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
        loadingStart: (state) => {
            state.loading = true
        },
        loadingSuccess: (state) => {
            state.loading = false
        }

    }
})

export const {loadingStart,loadingSuccess} = slice.actions

export default slice.reducer