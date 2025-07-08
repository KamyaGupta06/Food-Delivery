// ** Use Context

import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id,name,description,price,image,category}) => {
    const {cartItems,addToCart,removeFromCart,url} =useContext(StoreContext)
  return (
    <div className='w-[100%] m-auto rounded-[15px] shadow-[0px_0px_10px_#00000015] transition-all duration-300 animate-fade-in duration-[1s]'>
        <div className='relative'>
            <img
             className='w-[100%] rounded-t-[15px]'
             src={url+"/images/"+image} alt="foodItem-image" />
                {
                !cartItems[id]?
                <img className='w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-[50%] transition-all duration-300' onClick={()=>addToCart(id)} src={assets.add_icon_white}/>
                :
                <div className='absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-[50px] bg-white transition-all duration-300'>
                    <img className='w-[30px] ' onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img className='w-[30px]' onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
                }

        </div>
        <div className='p-[20px] '>
            <div className='flex justify-between items-center mb-[10px]'>
                <p className='text-[20px] font-[500]'>{name}</p>
                <img className="w-[70px]" src={assets.rating_starts} alt="Rating-Stars-Image" />
            </div>
            <p className='text-[#676767] text-[12px]'>{description}</p>
            <p className='text-[tomato] text-[22px] font-[500] my-[10px]'>${price}</p>
        </div>
    </div>
  )
}

export default FoodItem



