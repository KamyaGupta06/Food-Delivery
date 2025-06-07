import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = ({url}) => {
  const [list,setList]=useState([])
  const fetchList=async()=>{
    const response =await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }
  useEffect(()=>{
    fetchList();
  },[])

  const removeFood=async(foodID)=>{
        const response=await axios.delete(`${url}/api/food/delete/${foodID}`)
        await fetchList();
        if(response.data.success){
          toast.success(response.data.message)
        }
        else{
          toast.error("Error")
        }
  }
  return (
    <div className=' w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] text-[16px] flex-col gap-[10px] '>
      <p>All Foods List</p>
      <div>
        <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-[10px] py-[15px] px-[12px] border-[1px] border-[#cacaca] text-[13px] bg-[#f9f9f9] max-[600px]:grid-cols-[1fr_3fr_1fr] max-[600px]:gap-[15px] max-[600px]:hidden'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-[10px] py-[15px] px-[12px] border-[1px] border-[#cacaca] text-[13px] max-[600px]:grid-cols-[1fr_3fr_1fr] max-[600px]:gap-[15px]'>
              <img 
              className=''
              src={`${url}/images/`+item.image} 
              alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor-pointer '>X</p>
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default List
