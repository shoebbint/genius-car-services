import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

// axios.get('/orders', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
const Order = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth);
    console.log(user)
    const [orders, setOrders] = useState([]);



    useEffect(() => {
        const getOrders = async () => {
            const email = user.email;
            const url = `http://localhost:5000/orders?email=${email}`;
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                setOrders(data);
            }
            catch (error) {
                console.log(error.message)
                if (error.res.status === 403 || error.res.status === 401) {
                    signOut(auth);
                    navigate('/login');
                }
            }


        }
        getOrders();
    }, [user])
    return (
        <div>
            <h1>Your orders {orders.length}</h1>
        </div>
    );
};

export default Order;