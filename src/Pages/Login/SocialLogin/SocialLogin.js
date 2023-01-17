import React from 'react';
import google from "../../../images/social/google2.png"
import fb from "../../../images/social/fb.png"
import git from "../../../images/social/GitHub-logo.png"
import { useSignInWithGoogle,useSignInWithGithub } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    let errorElement;
    if (error||error1) {
        errorElement = <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
 

    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user||user1) {
        navigate("/home")
    }

    return (
        <div>
            <div className='d-flex align-items-center '>
                <div style={{ height: "1px" }} className="w-50 bg-primary"></div>
                <p className='px-2 mt-3'>or</p>
                <div style={{ height: "1px" }} className="w-50 bg-primary"></div>
            </div>
            {errorElement}
            <div className=''>
                <button onClick={() => signInWithGoogle()} className='btn btn-info w-50 d-block mx-auto my-2'>
                    <img style={{ width: "35px" }} src={google} alt="" />
                    <span className='px-2'>      Google signin</span>
                </button>
                <button  className='btn btn-info w-50 d-block mx-auto my-2'>
                    <img style={{ width: "35px" }} src={fb} alt="" />
                    <span className='px-2'>      Facebook signin</span>
                </button>
                <button onClick={() => signInWithGithub()} className='btn btn-info w-50 d-block mx-auto'>
                    <img style={{ width: "35px" }} src={git} alt="" />
                    <span className='px-2'>      Github signin</span>
                </button>

            </div>
        </div>
    );
};

export default SocialLogin;