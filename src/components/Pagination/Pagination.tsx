import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
        setEpisodesSlice(episodes,firstEpisodeIndex, lastEpisodeIndex )
        const pagesNumbersArray = []
        for (let i = 1; i <= Math.ceil(episodes.length / episodesPerPage); i++) {
            pagesNumbersArray.push(i)
        }
        store.dispatch(setPageNumbers(pagesNumbersArray))
    }, [episodes,currentPage])


    return (
        <nav>
            <ul className="d-flex gap-3" style={{listStyle: 'none'}}>
                {
                    pagesNumbers.map(number => (
                        <li key={number}>
                            <Button variant="outline-primary" onClick={()=>paginate(number)}>{number}</Button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Pagination;

const paginate = (pageNumber: number) => {
    store.dispatch(setCurrentPage(pageNumber))
}
async function setEpisodesSlice(episodes:IEpisode[],firstEpisodeIndex:number,lastEpisodeIndex:number){
     const arr = episodes.slice(firstEpisodeIndex, lastEpisodeIndex)
    if(arr && arr.length !==0){
        store.dispatch(setCurrentEpisodes(arr))
    }
}

// async function calculate(currentPage: number, episodesPerPage: number, episodes: IEpisode[]) {
//     const lastEpisodeIndex = useMemo(() => {
//         return currentPage * episodesPerPage
//     }, [currentPage, episodesPerPage])
//     console.log(lastEpisodeIndex)
//     const firstEpisodeIndex = useMemo(() => {
//         return lastEpisodeIndex - episodesPerPage
//     }, [lastEpisodeIndex, episodesPerPage])
//     console.log(firstEpisodeIndex)
//
//     const currentEpisodes = useMemo(() => {
//         const arr = episodes.slice(firstEpisodeIndex, lastEpisodeIndex)
//         console.log(arr)
//         return arr
//     }, [firstEpisodeIndex, lastEpisodeIndex])
// }