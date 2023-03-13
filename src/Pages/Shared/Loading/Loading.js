import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div style={{height:"400px"}} className="w-100 d-flex justify-content-center align-items-center">
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="md" />
            <Spinner animation="grow" size="lg" />
        </div>
    );
};

export default Loading;