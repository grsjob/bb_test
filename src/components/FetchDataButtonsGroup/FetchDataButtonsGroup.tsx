import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import DataService from "../../services/DataService";
import {useStore} from "../../state/storeHooks";
import {loadEpisodes, sortByEpisodeNumber} from "../EpisodesList/EpisodesListSlice";
import {store} from "../../state/store";
import {IEpisode} from "../../types/episode";

const FetchDataButtonsGroup = () => {
    const {episodes} = useStore(({list}) => list)
    if(!episodes.length || episodes.length === 0) {
        return (
            <Row>
                <Col>
                    <Button variant="primary" onClick={load} className="mb-3">Загрузить эпизоды</Button>
                </Col>
            </Row>
        );
    } else{
        return null
    }
};

export default FetchDataButtonsGroup;

async function load(){
    try {
        const episodes = await DataService.fetchData()
       store.dispatch(loadEpisodes(episodes))
        store.dispatch(sortByEpisodeNumber())
    } catch (e) {
        console.log(e) //TODO Errors
    }
}

