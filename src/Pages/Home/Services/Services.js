import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import { css } from './Services.css'
import useServices from '../../../hooks/useServices';

const Services = () => {
    const [services, setServices] = useServices();
    return (
        <div id="services" className='container mt-5'>
            <h2 className='services-title'>Our Services:{services.length}</h2>
            <div className='services-container'>
                {
                    services?.map(service => <Service key={service._id}
                        service={service}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;