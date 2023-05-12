import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const [services,setServices] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/services')
    .then(res=>res.json())
    .then(data=>setServices(data))
  },[])
  return (
    <div className='mt-5'>
      <div className='text-center mb-5'>
        <h3 className="text-[#FF3811] mb-5 font-bold text-3xl">Our Services</h3>
        <p className='text-slate-500'>the majority have suffered alteration in some form, by injected humour, or randomised <br/>
          words which don't look even slightly believable. </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          services.map(service=> <ServiceCard
          key={service._id}
          service={service}
          ></ServiceCard>)
        }
      </div>
    </div>
  );
};

export default Services;