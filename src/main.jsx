import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Productcontext from './context/Productcontext.jsx'
import Cartcontext from './context/Cartcontext.jsx'
import UserProvider from './context/Usercontext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <UserProvider>
        <Productcontext>
          <Cartcontext>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition:Bounce
            />
          </Cartcontext>
        </Productcontext>
      </UserProvider>
    </BrowserRouter>

  </React.StrictMode>,
)
