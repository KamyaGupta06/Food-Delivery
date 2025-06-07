import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalCartItems } from '../../Redux/storeSlice';
import { StoreContext } from '../../Context/StoreContext';

const Icons = () => {

  // Use CONTEXT
  // const { getTotalCartItems } = useContext(StoreContext);
  // const totalItems = getTotalCartItems();

  // USE redux toolkit
  const totalItems = useSelector(selectTotalCartItems);
  return (
    <div className="flex items-center gap-8 max-[1050px]:gap-[30px] max-[900px]:gap-[20px]">
      <img src={assets.search_icon} alt="Search" className="w-6 h-6 max-[1050px]:w-[22px] max-[900px]:w-[20px] cursor-pointer" />
      <div className="relative">
        <Link to='/cart'><img src={assets.basket_icon} alt="Basket" className="w-6 h-6 max-[1050px]:w-[22px] max-[900px]:w-[20px] cursor-pointer" /></Link>
        {/* You can add a badge for cart count later */}
        {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </div>
          )}
      </div>
    </div>
  );
};

export default Icons;
