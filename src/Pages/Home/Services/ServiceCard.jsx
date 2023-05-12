import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
  const {_id,img,price,title} = service
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10">
          <img src={img} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>
          <h3 className='text-[#FF3811] text-xl'>Price:${price}</h3>
          <div className="card-actions">
            <Link to={`/checkout/${_id}`}>
            <button className="btn btn-primary">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;