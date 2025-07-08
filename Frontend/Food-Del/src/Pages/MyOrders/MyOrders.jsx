// import React from 'react'
// import { useContext } from 'react';
// import { useState } from 'react'
// import { StoreContext } from '../../Context/StoreContext';
// import axios from "axios"
// import { useEffect } from 'react';
// import { assets } from '../../assets/assets';

// const MyOrders = () => {
//     const {url,token}=useContext(StoreContext)
//     const [data,setData]=useState([]);

//     const fetchOrders=async()=>{
//         const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
//         setData(response.data.data)
//         // console.log(response.data.data)
//     }

//     useEffect(()=>{
//         if(token){
//             fetchOrders()
//         }
//     },[token])

//   return (
//     <div className='my-[50px]'>
//       <h2 className='text-2xl font-bold'>My Orders</h2>
//       <div className='flex flex-col gap-[20px] mt-[30px]'>
//         {data.map((order,index)=>{
//            return(
//              <div key={index} className='grid grid-cols-[0.5fr_2.5fr_1fr_1fr_2fr_1fr]  items-center gap-[30px] text-[14px] py-[10px] px-[20px] text-[#454545] border-[1px] border-[tomato] [max-width:900px]:grid [max-width:900px]:grid-cols-[1fr_2fr_1fr] [max-width:900px]:gap-y-[5px] [max-width:900px]:text-[12px]'>
//                 <img src={assets.parcel_icon} alt=""  className='w-[50px]'/>
//                 <p>{order.items.map((item,index)=>{
//                     if(index===order.items.length-1){
//                         return item.name+" x "+item.quantity
//                     }
//                     else{
//                         return item.name+" x "+item.quantity+", "
//                     }
//                 })}</p>
//                 <p>${order.amount}.00</p>
//                 <p >Items:{order.items.length}</p>
//                 <p><span className='text-[tomato]'>&#x25cf;</span><b className='font-[500] text-[#454545]'>{order.status}</b></p>
//                 <button className='py-[12px] rounded-[4px] bg-[#ffe1e1] cursor-pointer text-[#454545]' onClick={fetchOrders}>Track Order</button>
//             </div>
//            )
//         })}
//       </div>
//     </div>
//   )
// }

// export default MyOrders

import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios";
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, {
      headers: { token }
    });
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-[50px] px-4'>
      <h2 className='text-2xl font-bold'>My Orders</h2>
      <div className='flex flex-col gap-[20px] mt-[30px]'>
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className='
                grid 
                grid-cols-[0.5fr_2.5fr_1fr_1fr_2fr_1fr] 
                items-center 
                gap-[30px] 
                text-[14px] 
                py-[10px] 
                px-[20px] 
                text-[#454545] 
                border 
                border-[tomato] 
                rounded-md 
                w-full

                max-[900px]:grid-cols-1 
                max-[900px]:gap-[12px] 
                max-[900px]:text-[13px] 
                max-[900px]:px-[16px] 
                max-[900px]:py-[14px]
              '
            >
              {/* Parcel Icon */}
              <div className='flex items-center max-[900px]:justify-start'>
                <img src={assets.parcel_icon} alt="parcel" className='w-[50px] max-[900px]:w-[40px]' />
              </div>

              {/* Items */}
              <div>
                <p className='hidden max-[900px]:block font-medium text-[#333] mb-1'>Items:</p>
                <p className='break-words'>
                  {order.items.map((item, i) =>
                    `${item.name} x ${item.quantity}${i !== order.items.length - 1 ? ', ' : ''}`
                  )}
                </p>
              </div>

              {/* Amount */}
              <div>
                <p className='hidden max-[900px]:block font-medium text-[#333] mb-1'>Amount:</p>
                <p>${order.amount}.00</p>
              </div>

              {/* Total Items */}
              <div>
                <p className='hidden max-[900px]:block font-medium text-[#333] mb-1'>Total Items:<p>{order.items.length}</p></p>
                <p className='hidden min-[900px]:block font-medium text-[#333] mb-1'>Items : {order.items.length}</p>
        
              </div>

              {/* Status */}
              <div>
                <p className='hidden max-[900px]:block font-medium text-[#333] mb-1'>Status:</p>
                <p className='flex items-center gap-1'>
                  <span className='text-[tomato]'>&#x25cf;</span>
                  <b className='font-medium text-[#454545]'>{order.status}</b>
                </p>
              </div>

              {/* Track Order Button */}
              <div className='max-[900px]:text-left'>
                <p className='hidden max-[900px]:block font-medium text-[#333] mb-1'>Track:</p>
                <button
                  className='
                    py-2 
                    px-4 
                    rounded 
                    bg-[#ffe1e1] 
                    cursor-pointer 
                    text-[#454545] 
                    text-sm 
                    hover:opacity-90
                  '
                  onClick={fetchOrders}
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
