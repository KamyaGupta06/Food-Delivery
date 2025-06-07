import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'


const Add = ({url}) => {
  const [image,setImage] =useState(false)
  const [data,setdata]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  const onChangeHandler=(event)=>{
          const name=event.target.name;
          const value=event.target.value;
          setdata(data=>({...data,[name]:value}))
  }


  // For checking if data is changing or not
  // useEffect(()=>{
  //     console.log(data)
  // },[data])

  const onSubmitHandler=async(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response= await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success)
        {
             setdata({
              name:"",
              description:"",
              price:"",
              category:"Salad"
            }) 
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
  }
  return (
    <div className='w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] text-[16px] '>
      <form action="" onSubmit={onSubmitHandler} className='gap-[20px] flex flex-col gap-[10px] '>
        <div className=' flex flex-col gap-[10px]'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img 
            src={image?URL.createObjectURL(image):assets.upload_area} 
            alt=""
            className='w-[120px] ' />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image" hidden required />
        </div>
        <div className="w-[max(40%,280px)] flex flex-col gap-[10px]"> 
          <p>Product name</p>
          <input
           onChange={onChangeHandler}
           value={data.name}
          type="text" 
          name="name" 
          placeholder='Type here' 
          className='p-[10px] border-[2px] border-[#8a81814b] rounded-[5px]'/>
        </div>
        <div className=' w-[max(40%,280px)] flex flex-col gap-[10px]'>
          <p>Product description</p>
          <textarea name="description" 
          onChange={onChangeHandler}
           value={data.description}
          rows="6" 
          placeholder='Write Content here' 
          required 
          className='p-[10px] border-[2px] border-[#8a81814b] rounded-[5px]'></textarea>
        </div>
        <div className='flex  gap-[30px]'>
          <div className='add-category  flex flex-col gap-[10px]'>
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" className='max-w-[120px] p-[10px] border-[2px] border-[#8a81814b] rounded-[5px]' >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Ice Cream">Ice Cream</option>
              <option value="Desert">Deserts</option>
              <option value="Sandwhich">Sandwhich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className='add-price flex flex-col gap-[10px]'>
            <p>Product Price</p>
            <input onChange={onChangeHandler}
           value={data.price} type="Number" name="price" placeholder='$20' className='max-w-[120px] p-[10px] border-[2px] border-[#8a81814b] rounded-[5px]'/>
          </div>
        </div>
        <button type='submit' className='max-w-[120px] p-[10px] bg-black text-white cursor-pointer'>ADD</button>
      </form>
    </div>
  )
}

export default Add
