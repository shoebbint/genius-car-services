import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [user]=useAuthState(auth);

    return (
        <div>
            <h2>welcome to detail {serviceId}</h2>
            <div className="text-center">
                <Link to="/checkout">
                    <button className='btn btn-primary'>Proceed checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;