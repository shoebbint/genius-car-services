import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service,setService]=useState({});
    useEffect(()=>{
        fetch(`http://localhost:5000/service/${serviceId}`)
        .then(res=>res.json())
        .then(data=>setService(data))
    },[])
    const [user]=useAuthState(auth);

    return (
        <div>
            <h2>You are about to book: {service.name}</h2>
            <div className="text-center">
                <Link to="/checkout">
                    <button className='btn btn-primary'>Proceed checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;