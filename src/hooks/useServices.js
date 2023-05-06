import React, { useEffect, useState } from 'react';

const useServices = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://genius-car-server-nu-blond.vercel.app/service')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])
    return [services,setServices]
};

export default useServices;