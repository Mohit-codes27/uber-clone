import React, { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom' // import useLocation
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'


const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const ride = location.state?.ride; // get ride data

    useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel]);
  

  return (
    <div className="h-screen">
        
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img
            className="w-16"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt=""
          />
          <Link to="/captain-login" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-lg font-medium ri-logout-circle-r-line"></i>
        </Link>
        </div>
      <div className="h-4/5 relative">
      
        <LiveTracking />
      </div>
      <div className="h-1/5 p-6 bg-yellow-400 relative flex items-center justify-between">
      <h5
        onClick={() => {
            setFinishRidePanel(true);
        }}
        className="p-1 text-center absolute top-0 w-[85%]"
      >
        <i className="text-3xl ri-arrow-up-wide-line"></i>
      </h5>
      {ride && (
        <div>
          <h4 className="text-lg font-semibold">
            {ride.pickup} &rarr; {ride.destination}
          </h4>
          <div>
            Fare: ₹{ride.fare}
          </div>
        </div>
      )}
      <button onClick={() => {
            setFinishRidePanel(true)
        }} className="px-10 mt-1 bg-green-600 text-white font-semibold p-3 rounded-lg">Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-6 pt-12 bg-white">
        <FinishRide ride={ride} setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  )
}

export default CaptainRiding
