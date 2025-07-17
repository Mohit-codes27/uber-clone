import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/userContext";

const UserSignUp = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullName:{
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status === 201){
          const data = response.data;

          setUser(data.user)
          localStorage.setItem('token', data.token);
          navigate('/home');

        }
        
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
    }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) =>{
                setFirstName(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 w-1/2 py-2 text-lg placeholder:text-base"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) =>{
                setLastName(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Register
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 ">
              Create Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-xs leading-tight">
          By clicking on a social option you may recieve an SMS for
          verification. Message and data rates may apply.
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
