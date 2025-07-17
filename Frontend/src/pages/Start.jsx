import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className=" bg-[url(https://i.pinimg.com/736x/61/5a/69/615a692f3d1720f1aef9802b4d9a5ebb.jpg)] bg-bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full">
        <img
            className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started With Uber</h2>
          <Link to='/login' className="w-full flex items-center justify-center bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
