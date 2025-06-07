import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./Redux/store";
import StoreContextProvider from './Context/StoreContext.jsx';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   {/* // For Redux Toolkit */}
    <Provider store={store}>
      <App />
    </Provider> 

    {/* For USECONTEXT */}
     {/* <StoreContextProvider>
      <App/>
    </StoreContextProvider>  */}
  </BrowserRouter>


)
