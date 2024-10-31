import React, { useContext } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { Cartcon } from '../context/Cartcontext'

const stripePromise = loadStripe('pk_test_51Q7YVcRxy6hGX3ZUkqhdD2NSbcJyZJ5JxvqNAybvOpSNjCMtYvtReReIZRzV3zxuhBWBsfT6KByMohUX8sOXu0eX001tF322L2');
export default function Checkoutpayment () {
    
    const { clientSecret} = useContext(Cartcon)
    

    const option={clientSecret}

    return (
      <div className='bg-gray-50'>
        <div className="m-auto max-w-3xl p-5 text-orange-900 pt-20 bg-gray-50">
          <h1 className="text-2xl py-3 text-center">Payment</h1>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={option}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
        
    )
}




