import React from 'react';
import {useStore} from "../../state/storeHooks";
import {ListGroup} from "react-bootstrap";
import EpisodeItem from "../EpisodItem/EpisodItem";

const EpisodesList = () => {
    const {episodes} = useStore(({list}) => list)
    if (episodes.length !== 0) {
        return (
            <ListGroup variant="flush" className="d-xxl-inline-flex border border-3 border-warning rounded-1 p-3">
                {episodes.map(episode => <EpisodeItem key={episode.episode_id} episode={episode}/>
                        )}
            </ListGroup>
        )
    } else {
        return null
    }
};

export default EpisodesList;