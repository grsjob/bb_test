import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../state/storeHooks";
import {Button} from "react-bootstrap";
import {store} from "../../state/store";
import {setCurrentEpisodes, setCurrentPage, setPageNumbers} from "./PaginationSlice";
import {IEpisode} from "../../types/episode";

const Pagination = () => {
    const {episodes} = useStore(({list}) => list)
    const {currentPage, pagesNumbers} = useStore(({pagination}) => pagination)
    const [episodesPerPage] = useState(10)

    const lastEpisodeIndex = useMemo(() => {
        return currentPage * episodesPerPage
    }, [currentPage, episodesPerPage])
    const firstEpisodeIndex = useMemo(() => {
        return lastEpisodeIndex - episodesPerPage
    }, [lastEpisodeIndex, episodesPerPage])


    useEffect(() => {
        setEpisodesSlice(episodes, firstEpisodeIndex, lastEpisodeIndex)
        const pagesNumbersArray = []
        for (let i = 1; i <= Math.ceil(episodes.length / episodesPerPage); i++) {
            pagesNumbersArray.push(i)
        }
        store.dispatch(setPageNumbers(pagesNumbersArray))
    }, [episodes, currentPage, firstEpisodeIndex, lastEpisodeIndex, episodesPerPage ])


    return (
        <nav>
            <ul className="d-flex gap-3" style={{listStyle: 'none'}}>
                {
                    pagesNumbers.map(number => (
                        number === currentPage ?
                            <li key={number}>
                                <Button variant="outline-primary" onClick={() => paginate(number)} active>{number}</Button>
                            </li>
                            :
                            <li key={number}>
                                <Button variant="outline-primary" onClick={() => paginate(number)}>{number}</Button>
                            </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Pagination;

export const paginate = (pageNumber: number) => {
    store.dispatch(setCurrentPage(pageNumber))
}

export async function setEpisodesSlice(
    episodes: IEpisode[],
    firstEpisodeIndex: number,
    lastEpisodeIndex: number) {
    const slice = episodes.slice(firstEpisodeIndex, lastEpisodeIndex)

    if (slice && slice.length !== 0) {
        store.dispatch(setCurrentEpisodes(slice))
    }
    if(episodes.length === 0){
        store.dispatch(setCurrentEpisodes([]))
    }
}
