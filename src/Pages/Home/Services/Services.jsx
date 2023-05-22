import React, { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const [services, setServices] = useState([])
  const [ass, setAss] = useState(true)
  const [search , setSearch] = useState('')
  const searchref = useRef(null)
  useEffect(() => {
    fetch(`https://car-doctor-server-tau-two.vercel.app/services?search=${search}&sort=${ass ? 'ass' : 'des'}`)
      .then(res => res.json())
      .then(data => setServices(data))
  }, [ass,search])

 const handelSearch = () =>{
   setSearch(searchref.current.value)
 }

  return (
    <div className='mt-5'>
      <div className='text-center mb-5'>
        <h3 className="text-[#FF3811] mb-5 font-bold text-3xl">Our Services</h3>
        <p className='text-slate-500'>the majority have suffered alteration in some form, by injected humour, or randomised <br />
          words which don't look even slightly believable. </p>
        <button className='btn btn-outline mt-5 mb-5' onClick={() => setAss(!ass)}>{ass ? 'Price High to Low' : 'Price Low to High'}</button>
      </div>
      <div className='mb-10 ml-[500px]'>
      <div className="form-control">
          <div className="input-group">
            <input type="text" ref={searchref} placeholder="Search Products.." className="input input-bordered" />
            <button onClick={handelSearch} className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          services.map(service => <ServiceCard
            key={service._id}
            service={service}
          ></ServiceCard>)
        }
      </div>
    </div>
  );
};

export default Services;