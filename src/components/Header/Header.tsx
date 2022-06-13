import React from 'react';
import {Col, Row} from "react-bootstrap";

const Header = () => {
    return (
        <Row as='h1'>
            <Col>
                Список эпизодов Breaking Bad
            </Col>
        </Row>
    );
};

export default Header;