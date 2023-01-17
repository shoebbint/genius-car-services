import React from 'react';
import notFound from '../../../../src/images/404.jpg'
const NotFound = () => {
    return (
        <div>
            <h1 className='text-primary text-center'>Error 404 not found</h1>
            <img src={notFound} alt="" />
        </div>
    );
};

export default NotFound;