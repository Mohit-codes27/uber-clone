import React from 'react';

const UberLoader = () => (
  <div className="flex flex-col items-center justify-center h-full w-full py-20">
    <div className="loader-uber mb-4"></div>
    <span className="text-gray-700 font-semibold text-lg">Finding your ride...</span>
    <style>
      {`
        .loader-uber {
          border: 6px solid #eee;
          border-top: 6px solid #000;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}
    </style>
  </div>
);

export default UberLoader;