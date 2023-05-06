// import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import axios from 'axios';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { toast } from 'react-toastify';


const Checkout = () => {

    const {serviceId}=useParams();
    const [service]=useServiceDetail(serviceId);
    const [user]=useAuthState(auth);
    // const [user,setUser]=useState({
    //     name:"abul khan",
    //     email:"abul@bulbul.com",
    //     address:"tajmohopl road",
    //     phone:"01788787787"
    // })
    // const handleAdressChange=e=>{
    //     console.log(e.target.value);
    //     const{address,...rest}=user;
    //     const newAddress=e.target.value;
    //     const newUser={address:newAddress,...rest};
    //     console.log(newUser)
    //     setUser(newUser)

    // }
    const handlePlaceOrder= e =>{
        e.preventDefault();
        const order={
            email:user.email,
            service:service.name,
            serviceId:serviceId,
            address:e.target.address.value,
            phone:e.target.phone.value,
        };
        console.log(order)
    axios.post('https://genius-car-server-nu-blond.vercel.app/order', order)
          .then(function (response) {
const {data}=response;
if(data.insertedId){
    toast('your order is booked!!');
    e.target.reset()
}
          })
          .catch(function (error) {
            console.log(error);
          });
        // .then(response=>{
        //     console.log(response)
        // })
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Please checkout : {service.name}</h1>
            <form onSubmit={handlePlaceOrder} >
<input className='w-100 mb-3' type="text" value={user?.displayName} name='name' readOnly placeholder='name' />
<br />
<input className='w-100 mb-3' type="email" value={user?.email} name='email' readOnly placeholder='email' />
<br />
<input className='w-100 mb-3' type="text" readOnly placeholder={service.name}  name='service'   />
<br />
<input className='w-100 mb-3' type="text"  name='address' placeholder='address' />
<br />
<input className='w-100 mb-3' type="text"  name='phone' placeholder='phone' />
<br />
<input className='btn btn-warning' type="submit" value="Place order" />


            </form>
        </div>
    );
};

export default Checkout;