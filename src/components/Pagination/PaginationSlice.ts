import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IEpisode } from "../../types/episode";


export interface PaginationState {
    pagesNumbers: number[];
    currentEpisodes: IEpisode[];
    currentPage: number;

}

const initialState: PaginationState = {
    pagesNumbers: [],
    currentEpisodes: [],
    currentPage: 1,
}

const slice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, {payload: num}: PayloadAction<number>) => {
            state.currentPage = num
        },
        setPageNumbers:(state, {payload: arr}:PayloadAction<number[]>) =>{
            state.pagesNumbers = arr
        },
        setCurrentEpisodes: (state, {payload: episodes}: PayloadAction<IEpisode[]>) => {
            state.currentEpisodes = episodes
        }


    }
})

export const {setCurrentPage, setPageNumbers, setCurrentEpisodes} = slice.actions

export default slice.reducer