
import React, { useEffect, useState,useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
   const { clearCart } = useContext(StoreContext);

  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    if (success === "true") {
      clearCart();
      setMessage("✅ Payment successful! Redirecting to your orders...");
      setTimeout(() => navigate("/myorders"), 3000);
      
    } else {
      setMessage("❌ Payment failed. Redirecting to home...");
      setTimeout(() => navigate("/"), 3000);
    }
  }, [success, navigate]);

  return (
    <div className='min-h-[60vh] grid place-items-center'>
      <div className='w-[100px] h-[100px] border-[5px] border-[#bdbdbd] border-t-[tomato] rounded-full animate-spin'></div>
      <p className="text-lg font-medium text-center mt-4">{message}</p>
    </div>
  );
};

export default Verify;
