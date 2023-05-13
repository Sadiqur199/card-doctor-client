import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handelGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const user = result.user
        navigate(from,{replace:true})
      })
      .catch(error => console.log(error.message))
  }
  return (
    <div>
      <div className="divider">OR</div>
      <div className='text-center'>
        <button onClick={handelGoogleSignIn} className="btn btn-circle btn-outline">
          <FaGoogle></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;