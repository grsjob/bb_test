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
        loading: (state) => {
            state.loading = true
        },
        loadingSuccess: (state) => {
            state.loading = false
        }

    }
})

export const {loading,loadingSuccess} = slice.actions

export default slice.reducer