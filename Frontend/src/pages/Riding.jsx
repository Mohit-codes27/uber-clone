import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { sendMessage, onMessage } = useSocket();
  const navigate = useNavigate();

  onMessage('ride-ended', () => {
    navigate('/home');
  });

  return (
    <div className="h-screen">
      <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-home-9-line"></i>
      </Link>
      <div className="h-1/2">
        <LiveTracking/>
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">{ride?.captain?.fullName?.firstName || "Captain"}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain?.vehicle?.plate || "Plate"}</h4>
            <p className="text-sm text-gray-600">{ride?.captain?.vehicle?.vehicleType || "Vehicle"}</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-1 border-gray-300">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">{ride?.pickup || "Pickup"}</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination || "Destination"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-money-rupee-circle-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare || "0.00"}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
