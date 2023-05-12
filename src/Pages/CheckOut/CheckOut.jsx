import React, { useContext } from 'react';
import img from '../../assets/images/checkout/checkout.png'
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const CheckOut = () => {
  const service = useLoaderData()
  const { title, _id,price,img } = service
  const {user} = useContext(AuthContext)

  const handelOrder =(event)=>{
    event.preventDefault()
    const form = event.target;
    const name =form.name.value
    const date = form.date.value
    const email = user?.email;
    const price = form.amount.value

    const order = {
      customerName: name,
      email,
      date,
      img,
      service:title,
      service_id:_id,
      price:price
    }
    console.log(order)

    fetch('http://localhost:5000/bookings',{
      method:"POST",
      headers:{
        'content-type':'application/Json'
      },
      body: JSON.stringify(order)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.insertedId){
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'You book has been confirm',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  return (
    <div>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img src={img} className="w-full" />
        </div>
      </div>

      <h2 className='text-center text-3xl mt-5 mb-5 font-bold'>Check Out:{title}</h2>

       <form onSubmit={handelOrder}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input type="text" defaultValue={user?.displayName} name='name' className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date:</span>
          </label>
          <input type="date" name='date' className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" name='email' defaultValue={user?.email} className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due Amount:</span>
          </label>
          <input type="text" name='amount' defaultValue={'$'+ price} className="input input-bordered" />
        </div>
        </div>

        <div className="form-control mt-6">
          <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
        </div>
       </form>
      </div>
  );
};

export default CheckOut;