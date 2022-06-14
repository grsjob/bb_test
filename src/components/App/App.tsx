import React, {useCallback, useMemo, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import {Container, ListGroup, Spinner, Stack} from "react-bootstrap";
import FetchDataButtonsGroup from "../FetchDataButtonsGroup/FetchDataButtonsGroup";
import EpisodesList from "../EpisodesList/EpisodesList";
import SortDataButtonsGroup from "../SortDataButtonsGroup/SortDataButtonsGroup";
import {useStore} from "../../state/storeHooks";
import Pagination from "../Pagination/Pagination";
import {store} from "../../state/store";
import {setCurrentEpisodes} from "../Pagination/PaginationSlice";


const App = () => {
    const {loading} = useStore(({app}) => app)


    return (
        <Container className="container d-xxl-inline-flex flex-column">
            <Stack  gap={3}>
                <Header/>
                <FetchDataButtonsGroup/>
            </Stack>
            {loading && <Spinner animation='border'/>}
            <SortDataButtonsGroup/>
            <EpisodesList/>
            <Pagination />
        </Container>
    );
};


export default App;

