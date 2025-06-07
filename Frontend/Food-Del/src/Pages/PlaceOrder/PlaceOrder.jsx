import React,{useContext} from 'react'
// Use Context
// import { StoreContext } from '../../Context/StoreContext'
// *use Redux toolkit
import { useSelector } from 'react-redux';
import {
  
  selectTotalCartAmount,

} from '../../Redux/storeSlice';
const PlaceOrder = () => {
  //// * Use Context
  // const {getTotalCartAmount}=useContext(StoreContext);
  // const totalAmount=getTotalCartAmount();
  // *USE REdux Toolkit
  const totalAmount = useSelector(selectTotalCartAmount);
  return (
     <form className='flex items-start justify-between gap-[100px] mt-[80px]'>
      <div className='w-full max-w-[max(30%,500px)] '>
        <p className='text-[30px] font-[600] mb-[50px]'>Delivery Information</p>
        <div className='flex gap-[10px]'>
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' type="text" placeholder='First Name' required/>
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' type='text' placeholder='Last Name'/>
        </div>
           <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' type="email" placeholder='Email' required />
           <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' type="text" placeholder='Street' required />
        <div className='flex gap-[10px]'>
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' type="text" placeholder='City' required/>
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' type='text' placeholder='State' required/>
        </div>
        <div className='flex gap-[10px]'>
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' type="text" placeholder='Zip Code' required/>
          <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' type='text' placeholder='Country' required/>
        </div>
        <input className='mb-[15px] w-full p-[10px] border-[1px] border-[#c5c5c5] rounded-[4px] outline-[tomato]' type="text" placeholder='Phone' required />
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
              <p>${totalAmount===0 ?0:2}</p>
            </div>
            <hr className='my-[10px] h-[1px] bg-[#e2e2e2] border-none' />
            <div className='flex justify-between text-[#555]'>
              <b>Total</b>
              <b>${totalAmount===0 ?0:totalAmount+2}</b>
            </div>
          </div>
          <button
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
