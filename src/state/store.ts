import { configureStore} from "@reduxjs/toolkit";
import app from '../components/App/AppSlice';
import list from '../components/EpisodesList/EpisodesListSlice';
import pagination from "../components/Pagination/PaginationSlice";
export const store = configureStore({
    reducer: { app, list, pagination },
})

export type State = ReturnType<typeof store.getState>

