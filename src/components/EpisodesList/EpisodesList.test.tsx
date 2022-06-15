import {act, fireEvent, render, screen} from "@testing-library/react";
import {store} from "../../state/store";
import '@testing-library/jest-dom'
import {
    deleteEpisode,
    loadBBEpisodes,
    addCharacter,
    deleteCharacter,
    sortByEpisodeNumber,
    sortByCharactersDown,
    sortByCharactersUp} from "./EpisodesListSlice";
import EpisodesList from "./EpisodesList";
import App from "../App/App";
import userEvent from "@testing-library/user-event";

const ep = [
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
        characters: ['Walter White', 'Jesse Pinkman', 'Jesse Pinkman'],
        episode: "2",
        episode_id: 2,
        season: '1',
        series: "Breaking Bad",
        title: 'Went',
    },
    {
        air_date: '01-20-2008',
        characters: ['Walter White', 'Jesse Pinkman'],
        episode: "3",
        episode_id: 3,
        season: '1',
        series: "Bad",
        title: 'Go',
    },

]

describe('EpisodesListSlice testing', function () {


    beforeEach(async () => {
        await act(async ()=>{
            store.dispatch(loadBBEpisodes(ep))
        })
    })
    describe('download testing', function () {
        it('should be load BB Episodes', async () => {
            const episodesArray = store.getState().list.episodes
            expect(episodesArray.length > 0).toBeTruthy()
        });
        it('should be load only BB Episodes', async () => {
            const episodesArray = store.getState().list.episodes
            const arrayOfEpisodesOfAnotherSeries = episodesArray.filter(episode => episode.series !== 'Breaking Bad')
            expect(episodesArray.length === 2).toBeTruthy()
            expect(arrayOfEpisodesOfAnotherSeries.length === 0).toBeTruthy()
        });
    });
    describe('remove episode testing', function () {
        it('should be remove Episode from the episodes array ', function () {
            store.dispatch(deleteEpisode(1))
            const episodesArrayAfterDelete = store.getState().list.episodes
            expect(episodesArrayAfterDelete.length).toBe(1)
        });
        it('should be remove all episodes ', function () {
            const episodesArrayBeforeRemoveAllEpisodes = store.getState().list.episodes
            for (let i = 1; i <= episodesArrayBeforeRemoveAllEpisodes.length; i++) {
                store.dispatch(deleteEpisode(i))
            }
            const episodesArrayAfterRemoveAllEpisodes = store.getState().list.episodes
            expect(episodesArrayAfterRemoveAllEpisodes.length).toBe(0)
        });
        it('should be impossible to delete an episode with an invalid id ', function () {
            const episodesArrayBeforeRemoveAllEpisodes = store.getState().list.episodes
            store.dispatch(deleteEpisode(8))
            const episodesArrayAfterRemoveAllEpisodes = store.getState().list.episodes
            expect(episodesArrayAfterRemoveAllEpisodes.length).toBe(episodesArrayBeforeRemoveAllEpisodes.length)
        });
    });
    describe('testing adding an actor', function () {
        it('should be add an actor to the episode ', function () {
            const episodesArrayBeforeAddingAnActor = store.getState().list.episodes
            const firsEpisodeBeforeAdding = episodesArrayBeforeAddingAnActor.find(episode => episode.episode_id === 1)
            store.dispatch(addCharacter(1))
            const episodesArrayAfterAddingAnActor = store.getState().list.episodes
            const firsEpisodeAfterAdding = episodesArrayAfterAddingAnActor.find(episode => episode.episode_id === 1)
            expect(firsEpisodeAfterAdding!.characters.length >firsEpisodeBeforeAdding!.characters.length).toBeTruthy()
        });
        it('should be impossible to add an actor to the episode, if id is invalid ', function () {
            const episodes = store.getState().list.episodes
            const idMap = new Map()
            for (let i = 0; i < episodes.length; i++) {
                idMap.set(episodes[i].episode_id, episodes[i]!.characters.length)
            }
            const invalidId = 9
            const valuesBefore = idMap.values()
            store.dispatch(addCharacter(invalidId))
            const valuesAfter = idMap.values()
            expect(idMap.has(invalidId)).toBeFalsy()
            expect(JSON.stringify(valuesBefore)===JSON.stringify(valuesAfter)).toBeTruthy()
        });
    });
    describe('testing removing an actor', function () {
        it('should be remove an actor to the episode', function () {
            const episodesArrayBeforeRemoveAnActor = store.getState().list.episodes
            const firsEpisodeBeforeRemoving = episodesArrayBeforeRemoveAnActor.find(episode => episode.episode_id === 1)
            store.dispatch(deleteCharacter(1))
            const episodesArrayAfterRemoveAnActor = store.getState().list.episodes
            const firsEpisodeAfterRemoving = episodesArrayAfterRemoveAnActor.find(episode => episode.episode_id === 1)
            expect(firsEpisodeAfterRemoving!.characters.length < firsEpisodeBeforeRemoving!.characters.length).toBeTruthy()
        });
        it('t should be impossible to make the number of actors in an episode < 0 ', function () {
            store.dispatch(deleteCharacter(1))
            store.dispatch(deleteCharacter(1))
            store.dispatch(deleteCharacter(1))
            const episodesArrayAfterRemoveAnActor = store.getState().list.episodes
            const firsEpisodeAfterRemoving = episodesArrayAfterRemoveAnActor.find(episode => episode.episode_id === 1)
            expect(firsEpisodeAfterRemoving!.characters.length < 0).toBeFalsy()
        });
    });
    describe('episodes sorting testing ', function () {
        it('should be sorted in ascending episode number', function () {
            const episodes = store.getState().list.episodes
            store.dispatch(sortByEpisodeNumber())
            const index = 0
            expect(Number(episodes[index].episode) < Number(episodes[index+1].episode)).toBeTruthy()
            expect(Number(episodes[index].episode) > Number(episodes[index+1].episode)).toBeFalsy()
        });
        it('should be sorted in descending order by the number of actors in the episode', function () {
            store.dispatch(sortByCharactersDown())
            const index = 0
            const episodes = store.getState().list.episodes
            expect(episodes[index].characters.length > episodes[index+1].characters.length ).toBeTruthy()
        });
        it('should be sorted in ascending order by the number of actors in the episode', function () {
            store.dispatch(sortByCharactersUp())
            const index = 0
            const episodes = store.getState().list.episodes
            expect(episodes[index].characters.length < episodes[index+1].characters.length ).toBeTruthy()
        });
    });
});
describe('component EpisodesList testing', function () {
    beforeEach(() => {
        act(() => {
            store.dispatch(loadBBEpisodes(ep))
            render(<App />);
        });
    });
    it('should be render 2 list items', function () {
        expect(screen.getByText('Сезон №1 Эпизод №2')).toBeInTheDocument()
        expect(screen.getByText('Сезон №1 Эпизод №1')).toBeInTheDocument()
    });
});