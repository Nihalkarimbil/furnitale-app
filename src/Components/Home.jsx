import React, { useContext } from 'react';
import Image from '../Home/Image';
import Trending from '../Home/Trending';
import Newcoll from '../Home/Newcoll';
import { Procontext } from '../context/Productcontext';
import LoadingSpinner from '../Spinner';
import Specialities from '../Home/Specialities';
import ProductCategory from '../Home/categories';

function Home() {
  const { loading } = useContext(Procontext);

  return (
    <>


      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='bg-gray-100'>
          <Image />
          <Specialities/>
          <ProductCategory/>
          <Newcoll />
          
          </div>
          
        </>
      )}

    </>
  );
}

export default Home;
