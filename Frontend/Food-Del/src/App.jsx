import React,{useState,useEffect} from 'react'
import NavMain from './Components/Navbar/NavMain'
import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopUp from './Components/LoginPopUp/LoginPopUp'


// IN redux only
import { useDispatch,useSelector } from 'react-redux';
import {loadCartDataAPI, setToken,Url} from './Redux/storeSlice';


const routes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/order", element: <PlaceOrder /> }
];
const App = () => {

  // In redux only
  const dispatch = useDispatch();
  const url = useSelector(Url);
  const localToken = localStorage.getItem("token");
  useEffect(() => {
    if (localToken) {
      dispatch(setToken(localToken));
    }
  }, [dispatch]);

  useEffect(() => {
    if (localToken) {
      dispatch(setToken(localToken)); // Only if you're tracking token in redux
      dispatch(loadCartDataAPI({token: localToken, url }));
    }
  }, [dispatch, localToken, url]);


  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <div className='w-[80%] m-auto '>
        <NavMain setShowLogin={setShowLogin}/>
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />

          ))}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
