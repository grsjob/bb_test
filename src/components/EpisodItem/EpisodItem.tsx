import React, {FC} from 'react';
import {Button, ListGroup} from "react-bootstrap";
import {IEpisode} from "../../types/episode";
import {addCharacter, deleteCharacter, deleteEpisode} from "../EpisodesList/EpisodesListSlice";
import {store} from "../../state/store";

interface EpisodeItem {
    episode: IEpisode
}

const EpisodeItem: FC<EpisodeItem> = ({episode}) => {

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
                <h2>Сезон №{episode.season} Эпизод №{episode.episode}</h2>
                <div className='d-flex align-items-center gap-3'>
                    <Button variant="primary" onClick={()=>minus(episode.episode_id)}>-</Button>
                    {episode.characters.length}
                    <Button variant="primary" onClick={()=>plus(episode.episode_id)}>+</Button>
                    {ending(episode.characters.length)}
                </div>
            </div>
            <div className="align-middle">
                <Button variant="danger" onClick={()=>deleteEp(episode.episode_id)}>Удалить</Button>
            </div>
        </ListGroup.Item>
    );
};

export default EpisodeItem;

async function deleteEp(id:number){
    await store.dispatch(deleteEpisode(id))
}

async function plus(id: number){
    await store.dispatch(addCharacter(id))
}

async function minus(id: number){
    await store.dispatch(deleteCharacter(id))
}

function ending(length: number){
    if(length === 1){
        return `Персонаж`
    } else if(length >=2 && length <=4){
        return `Персонажа`
    } else {
        return `Персонажей`
    }
}