import React from 'react';
import loader from "../assets/images/loader.gif"
const Loader = () => {
  return (
    <div className='w-full items-center flex justify-center'>
        <img src={loader} alt="Loader" className='w-12 h-12'/>
    </div>
  );
}
export default Loader;