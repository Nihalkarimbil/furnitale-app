import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;