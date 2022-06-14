import React from 'react';
import {Button, Col} from "react-bootstrap";
import DataService from "../../services/DataService";
import {useStore} from "../../state/storeHooks";
import {loadBBEpisodes, sortByEpisodeNumber} from "../EpisodesList/EpisodesListSlice";
import {store} from "../../state/store";
import {loading, loadingSuccess} from "../App/AppSlice";

const FetchDataButtonsGroup = () => {
    const {episodes} = useStore(({list}) => list)
    if(!episodes.length || episodes.length === 0) {
        return (
                <Col className='d-flex justify-content-center'>
                    <Button variant="primary" onClick={load} className="mb-3">Загрузить эпизоды</Button>
                </Col>
        );
    } else{
        return null
    }
};

export default FetchDataButtonsGroup;

async function load(){
    try {
        store.dispatch(loading())
        const episodes = await DataService.fetchData()
        store.dispatch(loadingSuccess())
        store.dispatch(loadBBEpisodes(episodes))
        store.dispatch(sortByEpisodeNumber())
    } catch (e) {
        console.log(e) //TODO Errors
    }
}

