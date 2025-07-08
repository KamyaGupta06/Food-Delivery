import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext.jsx';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>

    {/* For USECONTEXT */}
     <StoreContextProvider>
      <App/>
    </StoreContextProvider> 
  </BrowserRouter>


)
