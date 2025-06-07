import React from 'react'
import {menu_list} from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div id='menu' className='flex flex-col gap-[20px]'>
      <h1 className='text-[#262626] text-[30px] font-[500] '>Explore Menu</h1>
      <p className='max-w-[60%] text-[#808080] max-[1050px]:max-w-[100%] max-[1050px]:text-[14px]'> Discover a variety of delicious dishes that cater to all tastes and preferences. Whether you're in the mood for something savory or sweet, our menu has it all, crafted with the finest ingredients to deliver a memorable dining experience.</p>
      < div className='flex justify-between items-center gap-[30px] text-center my-5 overflow-x-scroll '>
        {menu_list.map((item,index)=>{
            return (
                <div 
                onClick={()=>setCategory(prev=> prev===item.menu_name?"All":item.menu_name)}
                key={index}>
                    <img src={item.menu_image} alt="Menu-Photo" 
                   className={`${category === item.menu_name ? 'border-[4px] border-[tomato] p-[2px]' : ''} w-[7.5vw] min-w-[80px] cursor-pointer rounded-[50%] transition-all duration-200`}/>
                    <p className='mt-[10px] text-[#747474] text-[max(1.4vw,16px)] cursor-pointer'>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr  className='my-[10px] h-[2px] bg-[#e2e2e2] border-none'/>
    </div>
  )
}

export default ExploreMenu
