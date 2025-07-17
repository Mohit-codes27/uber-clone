import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%]"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Availabe</h3>

        <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='h-12 object-cover w-12 rounded-full' src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTu-GSY_bXjggu92Go8I0Od4bEoIE-RnSuaCRmN5xcL4lfSDQI169Wyg5hK0VegSLUJjpqlG47veDZ33C0" alt="" />
                <h2 className='text-lg font-medium'>{props.ride?.userId.fullName.firstName + " " + props.ride?.userId.fullName.lastName}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-1 border-gray-300">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1 border-gray-300">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Cash Cash
              </p>
            </div>
          </div>
        </div>
        <div className='flex mt-5 w-full items-center justify-between'>
        <button onClick={()=>{
            props.setRidePopUpPanel(false);
        }} className="px-10 mt-1 bg-gray-300 text-gray-700 font-semibold p-3 rounded-lg">
          Ignore
        </button>
          <button onClick={()=>{
            props.setConfirmRidePopUpPanel(true);
            props.setRidePopUpPanel(false);
            props.confirmRide();
        }} className="px-10 mt-1 bg-green-600 text-white font-semibold p-3 rounded-lg">
          Accept
        </button>
        </div>
      </div>
    </div>
  )
}

export default RidePopUp
