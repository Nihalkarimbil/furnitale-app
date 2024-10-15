import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Productcontext from './context/Productcontext.jsx'
import Cartcontext from './context/Cartcontext.jsx'
import UserProvider from './context/Usercontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Productcontext>
          <Cartcontext>
            <App />
          </Cartcontext>
        </Productcontext>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
