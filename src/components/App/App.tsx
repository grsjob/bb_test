import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import {Container, ListGroup, Spinner, Stack} from "react-bootstrap";
import FetchDataButtonsGroup from "../FetchDataButtonsGroup/FetchDataButtonsGroup";
import EpisodesList from "../EpisodesList/EpisodesList";
import SortDataButtonsGroup from "../SortDataButtonsGroup/SortDataButtonsGroup";
import {useStore} from "../../state/storeHooks";


const App = () => {
    const {loading} = useStore(({app}) => app)

    return (
        <Container className="d-xxl-inline-flex flex-column">
            <Stack  gap={3}>
                <Header/>
                <FetchDataButtonsGroup/>
            </Stack>
            {loading && <Spinner animation='border'/>}
            <SortDataButtonsGroup/>
            <EpisodesList/>
        </Container>
    );
};


export default App;

