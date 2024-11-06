import React from 'react'
import Image from '../First/Image'
import Trending from '../First/Trending'
import Newcoll from '../First/Newcoll'
import { useContext } from 'react'
import { Procontext } from '../context/Productcontext'
import LoadingSpinner from '../Spinner'


function Home() {
  const { loading } = useContext(Procontext);

  return (
    <div>
      <Image />
      <div>
        { loading ? (<LoadingSpinner />) : (
        <Newcoll />,
        <Trending />
        )}

      </div>

    </div>
  )
}

export default Home