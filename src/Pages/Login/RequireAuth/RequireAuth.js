import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import {Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const RequireAuth = ({children}) => {
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    const [user,loading] = useAuthState(auth);
    const location=useLocation();
    if(loading){
      return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    if (user.providerData[0]?.providerId==="password" && !user.emailVerified) {
        return (
          <div>
          <h1 className='text-danger'>Your email is not verified</h1>
          <h3 className='text-primary'>Please verify your email</h3>
          <button className='btn btn-warning'
                  onClick={async () => {
                    const success = await sendEmailVerification();
                    if (success) {
                      toast('Sent email');
                    }
                  }}
                >
                  Send Verification email again
                </button>
                <ToastContainer></ToastContainer>
                  </div>
        )

      }

      return children;
};

export default RequireAuth;