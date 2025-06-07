import React from 'react'
import {assets} from '../../assets/assets'
const Footer = () => {
  return (
    <div className='text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-[20px] py-[20px] px-[8vw] pt-[80px] mt-[100px]' id='footer'>
      <div className='w-full grid grid-cols-[2fr_1fr_1fr] gap-[80px] max-[750px]:flex max-[750px]:flex-col max-[750px]:gap-[35px]'>
        <div className='flex flex-col items-start gap-[20px]'>
            <img src={assets.logo} alt="Footer-Logo-Image" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa aliquid saepe doloribus porro quae. Commodi ducimus, quae perspiciatis voluptatibus porro quo corporis aliquam officiis, ab hic autem? Nulla, nam sequi?</p>
            <div className='flex flex-row'>
                <img className="w-[40px] mr-[15px]" src={assets.facebook_icon} alt="" />
                <img className="w-[40px] mr-[15px]"  src={assets.twitter_icon} alt="" />
                <img className="w-[40px] mr-[15px]" src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className='flex flex-col items-start gap-[20px]'>
            <h2 className='text-white text-[24px] font-[600]'>Company</h2>
            <ul>
                <li className='list-none mt-[10px] cursor-ponter'>Home</li>
                <li className='list-none mt-[10px] cursor-ponter'>About us</li>
                <li className='list-none mt-[10px] cursor-ponter'>Delivery</li>
                <li className='list-none mt-[10px] cursor-ponter'>Privacy Policy</li>
            </ul>
        </div>
        <div className='flex flex-col items-start gap-[20px]'>
            <h2 className='text-white text-[24px] font-[600]'>GET IN TOUCH</h2>
            <ul>
                <li className='list-none mt-[10px] cursor-ponter'>+1-212-456-7890</li>
                <li className='list-none mt-[10px] cursor-ponter'>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <div className='w-full'>
        <hr className='w-full h-[2px] my-[20px] bg-[grey]'/>
        <p className='max-[750px]:text-center'>Copyright  2025 © Tomato.com - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
