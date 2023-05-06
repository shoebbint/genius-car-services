import { async } from '@firebase/util';
import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, Navigate, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import axios from 'axios';
const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  let from = location.state?.from?.pathname || "/";
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  // const notify = () => toast("Email Sent !");
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  if (user) {
    // navigate(from, { replace: true });

  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
   await signInWithEmailAndPassword(email, password);
   const {data}= await axios.post('https://genius-car-server-nu-blond.vercel.app/login',{email});
   console.log(data);
   localStorage.setItem('accessToken',data.accessToken);
   navigate(from, { replace: true });
  }
  const navigateRegister = (event) => {
    navigate('/register');
  }
  const resetPassword = async() => {
    const email = emailRef.current.value;
    await sendPasswordResetEmail(email);
  if(email){
    toast('Sent email');
  }
  else{
    toast('Please enter email address');
  }

  }
  let errorElement;
  if (error) {
    errorElement = <p className='text-danger'>Error: {error?.message}</p>


  }
  return (
    <div className='container w-50 mx-auto mt-5'>
      <PageTitle title="Login"></PageTitle>
      <h1 className='text-primary text-center'>Please login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">

          <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">

          <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
        </Form.Group>
        
        <Button className='w-50 mx-auto d-block mb-3' variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {errorElement}
      <p>New to genius car? <Link to="/register" className='text-primary decoration-none' onClick={navigateRegister}>Please Register</Link ></p>
      <p>Forget Password? <button className="btn btn-link text-primary decoration-none" to="/register" onClick={resetPassword}>Reset Password</button ></p>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;