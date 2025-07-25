import React from 'react'
import { Clock } from 'lucide-react'
const SeatLayout = () => {
  return (
    <div className='flex flex-col md:flex-row '>
        {/* timings */}
        <div >
          <p>Available Timings</p>
          <p> <Clock className='size-4'/>01:30 PM</p>
          <p>02:30 PM</p>
          <p>05:30 PM</p>
          <p>08:30 PM</p>
        </div>


        {/* Seats */}
        <div>

        </div>

    </div>
  )
}

export default SeatLayout