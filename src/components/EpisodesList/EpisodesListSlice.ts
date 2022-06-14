import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEpisode} from "../../types/episode";
import {faker} from "@faker-js/faker";

export interface ListState {
    episodes: IEpisode[];
}

const initialState: ListState = {
    episodes: [],
}

const slice = createSlice({
    name: 'list',
    initialState,
    reducers:{
        loadEpisodes: (state, {payload: episodes}: PayloadAction<IEpisode[]>) =>{
            const bBEpisodes = episodes.filter(episode => episode.series === 'Breaking Bad')
            state.episodes = bBEpisodes
        },
        deleteEpisode:(state, {payload: id}: PayloadAction<number>) =>{
            state.episodes = state.episodes.filter(episode => episode.episode_id !== id)
        },
        addCharacter:(state, {payload: id}: PayloadAction<number>) =>{
            state.episodes = state.episodes.map(episode=>{
                if (episode.episode_id === id){
                    episode.characters.push(getCharacterFullName())
                }
                return episode
            })
        },
        deleteCharacter:(state, {payload: id}: PayloadAction<number>) =>{
            state.episodes = state.episodes.map(episode=>{
                if (episode.episode_id === id){
                    episode.characters.pop()
                }
                return episode
            })
        },
        sortByEpisodeNumber:(state) =>{
            state.episodes = state.episodes.sort((a,b)=> Number(a.episode) - Number(b.episode))
        },
        sortByCharactersDown:(state) =>{
            state.episodes = state.episodes.sort((a,b)=> b.characters.length - a.characters.length)
        },
        sortByCharactersUp:(state) =>{
            state.episodes = state.episodes.sort((a,b)=> a.characters.length - b.characters.length)
        },
    }
})

export const {
    loadEpisodes,
    deleteEpisode,
    addCharacter,
    deleteCharacter,
    sortByEpisodeNumber,
    sortByCharactersUp,
    sortByCharactersDown
} = slice.actions
export default slice.reducer

function getCharacterFullName(){
    return `${faker.name.firstName()} ${faker.name.lastName()}`
}