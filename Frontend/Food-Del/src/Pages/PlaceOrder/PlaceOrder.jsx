import React, { useContext, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

   useEffect(() => {
    console.log(data);

  }, [data])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("placeOrder trigreered")
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    console.log(orderItems)
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      const options = response.data.razorpayOptions; // expect backend to return Razorpay options

      options.handler = function (razorpayResponse) {
        // After successful payment, verify order on backend
        axios.post(url + "/api/order/verify", {
          razorpay_payment_id: razorpayResponse.razorpay_payment_id,
          razorpay_order_id: razorpayResponse.razorpay_order_id,
          razorpay_signature: razorpayResponse.razorpay_signature,
          orderId: response.data.orderId, // you must send this from backend
          success: "true",
        })
          .then(() => {
            navigate(`/verify?success=true&orderId=${response.data.orderId}`);
          })
          .catch(() => {
            navigate(`/verify?success=false&orderId=${response.data.orderId}`);
          });
      };

      // Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

    } else {
      alert("Error");
    }
  }
  
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form className='flex items-start justify-between gap-[100px] mt-[80px]' onSubmit={placeOrder}>
      <div className='w-full max-w-[max(30%,500px)] '>
        <p className='text-[30px] font-[600] mb-[50px]'>Delivery Information</p>
        <div className='flex gap-[10px]'>
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name' />
        </div>
        <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
        <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
        <div className='flex gap-[10px]'>
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' required />
        </div>
        <div className='flex gap-[10px]'>
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required />
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' required />
        </div>
        <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
      </div>
      <div className='w-full max-w-[(max(40%,500px)]'>
        <div className='flex-1 flex flex-col gap-[20px]'>
          <h2 className='text-[20px] font-bold'>Cart Total</h2>
          <div>
            <div className='flex justify-between text-[#555]'>
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <hr className='my-[10px] h-[1px] bg-[#e2e2e2] border-none' />
            <div className='flex justify-between text-[#555]'>
              <p>Delivery Charges</p>
              <p>${totalAmount === 0 ? 0 : 2}</p>
            </div>
            <hr className='my-[10px] h-[1px] bg-[#e2e2e2] border-none' />
            <div className='flex justify-between text-[#555]'>
              <b>Total</b>
              <b>${totalAmount === 0 ? 0 : totalAmount + 2}</b>
            </div>
          </div>
          <button
            type='submit'
            onClick={() => navigate('/order')}
            className='border-none text-[15px] text-white bg-[tomato] w-[max(15vw,200px)] py-[7px] rounded-[4px] cursor-pointer mt-[30px]'>
            PROCEED to PAYMENT
          </button>
        </div>

      </div>
    </form>
  )
}
export default PlaceOrder
