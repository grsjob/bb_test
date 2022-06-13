import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import DataService from "../../services/DataService";
import {useStore} from "../../state/storeHooks";
import {loadEpisodes} from "../EpisodesList/EpisodesListSlice";
import {store} from "../../state/store";

const FetchDataButtonsGroup = () => {
    const {episodes} = useStore(({list}) => list)
    if(!episodes.length || episodes.length === 0) {
        return (
            <Row>
                <Col>
                    <Button variant="primary" onClick={load}>Загрузить эпизоды</Button>
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
       store.dispatch(loadEpisodes(await DataService.fetchData()))
    } catch (e) {
        console.log(e) //TODO Errors
    }
}