import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import useServiceDetail from '../../hooks/useServiceDetail';

const ServiceDetail = () => {
    const { serviceId } = useParams();
const [service]=useServiceDetail(serviceId)
    const [user]=useAuthState(auth);

    return (
        <div>
            <h2>You are about to book: {service.name}</h2>
            <div className="text-center">
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-primary'>Proceed checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;