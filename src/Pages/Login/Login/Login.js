import { async } from '@firebase/util';
import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, Navigate, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
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

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  if (user) {
    navigate(from, { replace: true });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(email, password);
  }
  const navigateRegister = (event) => {
    navigate('/register');
  }
  const resetPassword = async() => {
    const email = emailRef.current.value;
    await sendPasswordResetEmail(email);
    alert('Sent email');

  }
  let errorElement;
  if (error) {
    errorElement = <p className='text-danger'>Error: {error?.message}</p>


  }
  return (
    <div className='container w-50 mx-auto mt-5'>
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
      <p>Forget Password? <Link to="/register" className='text-primary decoration-none' onClick={resetPassword}>Reset Password</Link ></p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;