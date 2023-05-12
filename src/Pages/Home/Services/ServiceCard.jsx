import React from 'react';

const ServiceCard = ({service}) => {
  const {img,price,title} = service
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={img} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>
          <h3 className='text-[#FF3811] text-xl'>Price:${price}</h3>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;