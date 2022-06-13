import { configureStore} from "@reduxjs/toolkit";
import app from '../components/App/AppSlice';
import list from '../components/EpisodesList/EpisodesListSlice';
export const store = configureStore({
    reducer: { app, list },
})

export type State = ReturnType<typeof store.getState>

