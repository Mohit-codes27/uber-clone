import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useSocket } from "../context/SocketContext";
import { UserDataContext } from "../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(""); // "pickup" or "destination"
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const panelRef = useRef(null);
  const vehicleRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [fare, setFare] = useState({});
  const confirmRideRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { sendMessage, onMessage } = useSocket();
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user.user._id });
  }, [user]);

  onMessage("ride-confirmed", (ride) => {
    setWaitingForDriver(true);
    setRide(ride);
  });

  onMessage("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Pass ride data here
  });

  // Fetch suggestions from backend
  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoadingSuggestions(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      setSuggestions([]);
    }
    setLoadingSuggestions(false);
  };

  // Animation hooks (unchanged)
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehicleRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanelOpen]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  // Handler for input change
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "pickup") setPickup(value);
    else setDestination(value);
    setActiveField(field);
    setPanelOpen(true);
    fetchSuggestions(value);
  };

  // Handler for input focus
  const handleInputFocus = (field) => {
    setActiveField(field);
    setPanelOpen(true);
    fetchSuggestions(field === "pickup" ? pickup : destination);
  };

  // Handler when user selects a suggestion
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") setPickup(suggestion.description);
    else setDestination(suggestion.description);
    // setPanelOpen(false);
    setSuggestions([]);
  };

  const findTrip = async () => {
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setFare(res.data);
  };

  const createRide = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        <LiveTracking />
      </div>
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[30%]  p-6 bg-white h relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 top-6 right-6 text-xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-16 w-[1.5px] top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onFocus={() => handleInputFocus("pickup")}
              value={pickup}
              onChange={(e) => handleInputChange(e, "pickup")}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
              autoComplete="off"
            />
            <input
              onFocus={() => handleInputFocus("destination")}
              value={destination}
              onChange={(e) => handleInputChange(e, "destination")}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              autoComplete="off"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition-colors w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={suggestions}
            loading={loadingSuggestions}
            onSuggestionClick={handleSuggestionClick}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehicleRef}
        className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white"
      >
        <ConfirmedRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={lookingForDriverRef}
        className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white"
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
