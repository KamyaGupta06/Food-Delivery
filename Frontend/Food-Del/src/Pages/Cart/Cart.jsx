// // USE context

// import React, { useContext } from 'react'
// import { StoreContext } from '../../Context/StoreContext'
// import { useNavigate } from 'react-router-dom';
// const Cart = () => {
//   const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);
//   const navigate=useNavigate();
//   return (
//     <div className='mt-[100px] '>
//       <div className=''>
//       <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-600 text-[max(1vw,_12px)]">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item,index)=>{
//           if(cartItems[item._id]>0){
//             return(
//               <>
//               <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center  text-[max(1vw,_12px)] my-[10px] text-black">
//                  <img src={url+"/images/"+item.image}
//                  className='w-[50px]' 
//                  alt="" />
//                  <p>{item.name}</p>
//                  <p>${item.price}</p>
//                  <p>{cartItems[item._id]}</p>
//                  <p>${item.price*cartItems[item._id]}</p>
//                  <p className='cursor-pointer' onClick={()=>removeFromCart(item._id)}>x</p>
//               </div>
//               <hr className='h-[1px] bg-[#e2e2e2] border-none'/>
//               </>
//             )
//           }

//         })}
//       </div>
//       <div className='mt-[80px] flex justify-between gap-[max(12vw,20px)] max-w-[750px] '>
//         <div className='flex-[1] flex flex-col gap-[20px] '>
//            <h2 className='text-[20px] font-bold'>Cart Total</h2>
//            <div>
//             <div className='flex justify-between text-[#555]'>
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr className='my-[10px] h-[1px] bg-[#e2e2e2] border-none'/>
//             <div className='flex justify-between text-[#555]'>
//               <p>Delivery Charges</p>
//               <p>${2}</p>
//             </div>
//             <hr className='my-[10px] h-[1px] bg-[#e2e2e2] border-none'/>
//             <div className='flex justify-between text-[#555]'>
//               <b>Total</b>
//               <b>${getTotalCartAmount()+2}</b>
//             </div>
//            </div>
//            <button 
//            onClick={()=> navigate('/order')}
//            className='border-none text-white bg-[tomato] w-[max(15vw,200px)] py-[7px] rounded-[4px] cursor-pointer'>Proceed to checkout</button>
//         </div>
//         <div className='flex-[1]'>
//           <div>
//             <p className='text-[#555] '>Enter Promocode</p>
//             <div className='mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-[4px] '>
//               <input type="text" 
//               className='border-none outline-none pl-[10px] bg-transparent'
//               placeholder='Promocode' name="" id="" />
//               <button className='w-[max(10vw,150px)] py-[7px] px-[5px] bg-black border-none text-white rounded-[4px]'>Submit</button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cart



// USE redux toolkit

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setFoodList,
  selectCartItems,
  selectFoodList,
  selectTotalCartAmount,
  removeFromCart,Url
} from '../../Redux/storeSlice';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const food_list = useSelector(setFoodList);
  const totalAmount = useSelector(selectTotalCartAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = useSelector(Url);

  return (
    <div className='mt-[100px]'>
      <div>
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-600 text-[max(1vw,_12px)]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,_12px)] my-[10px] text-black">
                  <img src={url+"/images/"+item.image} className='w-[50px]' alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className='cursor-pointer' onClick={() => dispatch(removeFromCart({ itemId: item._id }))}>x</p>
                </div>
                <hr className='h-[1px] bg-[#e2e2e2] border-none' />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>

      <div className='mt-[80px] flex justify-between gap-[max(12vw,20px)] max-w-[750px]'>
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
            className='border-none text-white bg-[tomato] w-[max(15vw,200px)] py-[7px] rounded-[4px] cursor-pointer'>
            Proceed to checkout
          </button>
        </div>
        <div className='flex-1'>
          <p className='text-[#555]'>Enter Promocode</p>
          <div className='mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-[4px]'>
            <input
              type="text"
              className='border-none outline-none pl-[10px] bg-transparent'
              placeholder='Promocode'
            />
            <button className='w-[max(10vw,150px)] py-[7px] px-[5px] bg-black border-none text-white rounded-[4px]'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

