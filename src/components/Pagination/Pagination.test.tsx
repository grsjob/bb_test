import {setCurrentPage, setPageNumbers, setCurrentEpisodes} from './PaginationSlice'
import {setEpisodesSlice, paginate} from './Pagination'
import {store} from "../../state/store";

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

describe('testing paginations functions', function () {
    it('should be set current page', function () {
        paginate(2)
        const currentPage = store.getState().pagination.currentPage
        expect(currentPage).toBe(2)
    });
    it('should be set episodes slice', function () {
        setEpisodesSlice(ep, 0, 10)
        const currentEpisodes = store.getState().pagination.currentEpisodes
        expect(ep[0]).toEqual(currentEpisodes[0])
        expect(ep[1]).toEqual(currentEpisodes[1])
        expect(ep[2]).toEqual(currentEpisodes[2])
    });
    it('should be set to [] after calling the setEpisodesSlice with an empty array ', function () {
        setEpisodesSlice([], 0, 10)
        const currentEpisodes = store.getState().pagination.currentEpisodes
        expect(currentEpisodes.length).toBe(0)

    });

});

describe('PaginationSlice testing', function () {
    it('should be set current page', function () {
        store.dispatch(setCurrentPage(1))
        const currentPage = store.getState().pagination.currentPage
        expect(currentPage).toBe(1)
        expect(currentPage === 8).toBeFalsy()
    });
    it('should be set page numbers array', function () {
        const arrayExample = [1, 2, 3, 4]
        store.dispatch(setPageNumbers(arrayExample))
        const pagesNumbers = store.getState().pagination.pagesNumbers
        expect(arrayExample === pagesNumbers).toBeTruthy()
    });
    it('should be set current episodes', function () {
        store.dispatch(setCurrentEpisodes(ep))
        const episodes = store.getState().pagination.currentEpisodes
        expect(ep === episodes).toBeTruthy()
    });
});