import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import BookingRow from './BookingRow';
import Swal from 'sweetalert2';

const BookService = () => {
  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setBookings(data))
  },[url])


  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          // 'Deleted!',
          // 'Your file has been deleted.',
          // 'success'
          fetch(`http://localhost:5000/bookings/${id}`,{
            method:'DELETE'
          })
            .then(res => res.json())
            .then(data => {
              if(data.deletedCount > 0){
              'Deleted!',
              'Your data has been deleted.',
              'success'
             const remaining = bookings.filter(booking=>booking._id !== id)
             setBookings(remaining)
            }
            })

        )
      }
    })
  }

  const handleBookingConfirm = id => {
    fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ status: 'confirm' })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.modifiedCount > 0) {
                // update state
                const remaining = bookings.filter(booking => booking._id !== id);
                const updated = bookings.find(booking => booking._id === id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining];
                setBookings(newBookings);
            }
        })
}

  return (
    <div>
      <h1 className='text-4xl font-bold'> Your Booking:{bookings.length}</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings.map(booking=><BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleBookingConfirm ={handleBookingConfirm}></BookingRow>)
            }
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default BookService;