// ** USING USECONTEXT

import React,{useContext} from 'react'
import { StoreContext } from '../../Context/StoreContext'

import FoodItem from '../FoodItem/FoodItem';
const FoodDisplay = ({category}) => {
    const { food_list } = useContext(StoreContext);

  return (
    <div id='food-display' className='mt-[30px]'>
      <h2 className='text-[max(2vw,24px)] font-[600]'>Top dishes near you</h2>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] row-gap-[50px] '>
        {food_list.map((item,index)=>
        {
         if(category==="All" || category===item.category)
            {
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }  
        })}
      </div>

    </div>
  )
}

export default FoodDisplay


