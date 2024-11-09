import React, { useContext } from 'react';
import Image from '../First/Image';
import Trending from '../First/Trending';
import Newcoll from '../First/Newcoll';
import { Procontext } from '../context/Productcontext';
import LoadingSpinner from '../Spinner';

function Home() {
  const { loading } = useContext(Procontext);

  return (
    <>


      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Image />
          <Newcoll />
          <Trending />
        </>
      )}

    </>
  );
}

export default Home;
