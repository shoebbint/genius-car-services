import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';


const Register = () => {
    const [agree, setAgree] = useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, error1] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate('/login');
    };
    if (user) {
        console.log('user',user);
    }
    const handleRegister = async (event) => {
        event.preventDefault();
        const name = event.target.formBasicName.value;
        const email = event.target.formBasicEmail.value;
        const password = event.target.formBasicPassword.value;
        // const agree = event.target.terms.checked;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        console.log('Updated profile');
        navigate('/home');


    };
    return (
        <div className='container w-50 mx-auto mt-5'>
            <h1 className='text-primary text-center'>Please Register</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">

                    <Form.Control type="text" placeholder="Enter Your Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Control type="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="terms">
                    <Form.Check onClick={() => setAgree(!agree)} className={agree ? 'text-primary' : 'text-danger'} type="checkbox" label="Accept genius car terms and conditions" />
                </Form.Group>
                <Button disabled={!agree} className='w-50 mx-auto d-block mb-3' variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p>Already have an account ? <Link to="/login" className='text-danger decoration-none' onClick={navigateLogin}>Please Login</Link ></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;