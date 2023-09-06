import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'




const MercadoPago = () => {
    const [preferenceId, setPreferenceId] = useState(null)
    initMercadoPago('TEST-3aa1ff4a-f517-4dcf-8fb3-15640d67a3d3');

    const createPreference = async ()=>{
        try {
            const response = await axios.post('http://localhost:3001/hotel/mercadoPago/create_preference',{
                "items": [
                {
                  "title": "Habitacion 11223",
                  "unit_price": 30.00,
                  "quantity": 1
                },
                {
                  "title": "Habitacion 41122",
                  "unit_price": 45.00,
                  "quantity": 1
                }
              ], 
                "reservaId":"ddd620aa-f62a-476c-ab5c-17c72f5e4b71"    
            })
            const initPoint = response.data.init_point;
            console.log(initPoint);
            return initPoint;
        } catch (error) {
            console.log(error);
        }
    }
    const handleBuy = async ()=>{
        const initPoint = await createPreference();
        if (initPoint) {
          setPreferenceId(initPoint);
          // Redireccionar al usuario al initPoint para completar el pago
          window.location.href = initPoint;
        }
    }
  return (
    <div>
            <div className="flex flex-col bg-white rounded-3xl">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="grid items-center justify-center w-full grid-cols-1 text-left">
          <div>
            <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
              Habitacion simple
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Suitable to grow steadily.
            </p>
          </div>
          <div className="mt-6">
            <p>
              <span className="text-5xl font-light tracking-tight text-black">
                $250
              </span>
              <span className="text-base font-medium text-gray-500"> /mo </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-6 pb-8 sm:px-8">
        <button
        onClick={handleBuy}
          aria-describedby="tier-company"
          className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
        >
          Pagar
        </button>
        {preferenceId && <Wallet initialization={{ preferenceId}} />}
      </div>
    </div>
    </div>
  )
}

export default MercadoPago