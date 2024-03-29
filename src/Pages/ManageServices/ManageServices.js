import React from 'react';
import useServices from '../../hooks/useServices';

const ManageServices = () => {
    const [services, setServices] = useServices();
    const handleDelete = id => {
        const Proceed = window.confirm('Are you sure?');
        if (Proceed) {
            const url = `https://genius-car-server-nu-blond.vercel.app/service/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then((data) => {
                    console.log("deleted:", data);

                    const remaining = services.filter(service => service._id !== id)
                    setServices(remaining);

                })
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Manage Your services</h2>
            {
                services.map(service =>
                    <div key={service._id}>
                        <h5>{service.name} <button onClick={() => handleDelete(service._id)}>X</button> </h5>
                    </div>)
            }
        </div>
    );
};

export default ManageServices;