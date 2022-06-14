import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import {Col, Container, Spinner, Stack} from "react-bootstrap";
import FetchDataButtonsGroup from "../FetchDataButtonsGroup/FetchDataButtonsGroup";
import EpisodesList from "../EpisodesList/EpisodesList";
import SortDataButtonsGroup from "../SortDataButtonsGroup/SortDataButtonsGroup";
import {useStore} from "../../state/storeHooks";
import Pagination from '../Pagination/Pagination';


const App = () => {
    const {loading} = useStore(({app}) => app)


    return (
        <Container className="container d-xxl-inline-flex flex-column justify-content-center">
            <Stack  gap={3}>
                <Header/>
                <FetchDataButtonsGroup/>
            </Stack>
            {loading &&
                <Col className='text-center' >
                    <Spinner animation='border' className='spinner' />
                </Col>}
            <SortDataButtonsGroup/>
            <EpisodesList/>
            <Pagination />
        </Container>
    );
};


export default App;

