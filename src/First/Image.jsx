import React from 'react';
import exampleImage from './image.jpg'; // Replace with your image path

function Image() {
  
  return (
    <div className="relative inline">
      <img src={exampleImage} alt="Example" className="w-full shadow pt-14" />
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="text-white sm:text-lg md:text-xl lg:text-2xl xl:text-5xl ml-10 " id='main'>
          Design Your Story...<br/>Frame by Frame          
          <div className="absolute inset-x-0">
          <button className="text-sm h-7 sm:h-9 md:h-11 lg:h-13 xl:h-15  border rounded p-2 ml-11 hover:bg-red-400" >Explore</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image;
