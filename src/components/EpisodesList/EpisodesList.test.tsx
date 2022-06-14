import {act, render} from "@testing-library/react";
import {store} from "../../state/store";
import {deleteEpisode, initializeList, loadBBEpisodes} from "./EpisodesListSlice";
import DataService from "../../services/DataService";
import Header from "../Header/Header";
import App from "../App/App";


describe('EpisodesListSlice testing', function () {
    const episodes = [
        {
            air_date: '01-20-2008',
            characters: ['Walter White', 'Jesse Pinkman'],
            episode: "1",
            episode_id: 1,
            season: '1',
            series: "Breaking Bad",
            title: 'Pilot',
        },
        {
            air_date: '01-20-2008',
            characters: ['Walter White', 'Jesse Pinkman'],
            episode: "1",
            episode_id: 2,
            season: '1',
            series: "Breaking Bad",
            title: 'Went',
        },
        {
            air_date: '01-20-2008',
            characters: ['Walter White', 'Jesse Pinkman'],
            episode: "1",
            episode_id: 3,
            season: '1',
            series: "Bad",
            title: 'Go',
        },

    ]


    beforeEach(async () => {
        await act(async ()=>{
            store.dispatch(loadBBEpisodes(episodes))
        })
    })
    it('should be load BB Episodes', async () => {
        const episodesArray = store.getState().list.episodes
        expect(episodes.length === 3).toBeTruthy()
    });
    it('should be remove Episode from the episodes array ', function () {
        const  episodesArrayBefore = store.getState().list.episodes
        console.log(episodesArrayBefore)
        store.dispatch(deleteEpisode(1))
        const episodesArrayAfter = store.getState().list.episodes
        expect(episodesArrayAfter.length === 2).toBe(2)
    });
});