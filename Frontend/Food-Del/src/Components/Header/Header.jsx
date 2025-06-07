import React from 'react'

const Header = () => {
  return (

    <div className="h-[34vw] my-[30px] mx-auto bg-[url('/header_img.png')] bg-no-repeat bg-contain relative ">
      <div className="animate-fade-in  absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]  max-[1050px]:max-w-[45%] 
               max-[750px]:max-w-[65%]">
        <h2 className="font-medium text-white text-[max(4.5vw,22px)]">Savor the Flavors You Love</h2>
        <p className="text-white text-[1vw] max-[750px]:hidden ">Explore a wide variety of mouth-watering dishes, crafted with the finest ingredients and a passion for perfection. 
        Indulge your cravings and let us bring an unforgettable dining experience to your doorstep. </p>
        <button className="border-none text-[#747474] font-medium px-[2.3vw] py-[1vw] bg-white text-[max(1vw,13px)] rounded-full hover:text-[#49557e]  hover:shadow-lg hover:scale-105 max-[750px]:px-[4vw] max-[750px]:py-[2vw]">View Menu</button>
      </div>
    </div>
  )
}

export default Header
