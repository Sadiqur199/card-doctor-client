import React, { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
const Login = () => {
const {singIn} = useContext(AuthContext)

const handelLogin = (event) =>{
  event.preventDefault()
  const form = event.target
  const email = form.email.value
  const password = form.password.value
  // console.log(name,photo,email,password)
  singIn(email,password)
  .then(result=>{
    const user = result.user
    console.log(user)
  })
  .catch(error=>console.log(error.message))

}

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="mr-24 w-1/2">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-3">Login</h1>
             <form onSubmit={handelLogin} >
             <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" name='email' placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="text" name='password' placeholder="password" className="input input-bordered" />
              <label className="label">
                <Link to='' className="label-text-alt link link-hover">Forgot password?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
             </form>
             <p className='my-4 text-center'>New to car doctor? <Link className='text-orange-600 font-bold ml-1' to='/singup'>Sing Up!</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;