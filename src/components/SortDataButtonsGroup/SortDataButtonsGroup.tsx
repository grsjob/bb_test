import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {store} from "../../state/store";
import {sortByCharactersDown, sortByCharactersUp} from "../EpisodesList/EpisodesListSlice";
import {useStore} from "../../state/storeHooks";

const SortDataButtonsGroup = () => {
    const {episodes} = useStore(({list}) => list)
    const [up, setUp] = useState(false)
    const [down, setDown] = useState(false)

    useEffect(()=>{
        if(up){
            store.dispatch(sortByCharactersUp())
        }
        if(down){
            store.dispatch(sortByCharactersDown())
        }
    },[episodes] )

    function sortActorsUp(){
        store.dispatch(sortByCharactersUp())
        setUp(true)
        setDown(false)
    }
    function sortActorsDown(){
        store.dispatch(sortByCharactersDown())
        setUp(false)
        setDown(true)
    }

    if(!episodes || episodes.length === 0){
        return null
    }
    return (
        <Row className="d-inline-flex flex-column">
            <Col className="d-inline-flex flex-column gap-3" xxl={5}>
                <Button variant="warning" onClick={sortActorsDown} >Cортировать по убыванию количества персонажей</Button>
                <Button variant="warning" onClick={sortActorsUp} className="mb-3">Cортировать по возрастанию количества персонажей</Button>
            </Col>
        </Row>
    );
};

export default SortDataButtonsGroup;



