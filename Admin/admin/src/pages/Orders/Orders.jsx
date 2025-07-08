import axios from 'axios'
import React,{useState} from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({url}) => {

  const [orders,setOrders]=useState([])
  
  const fetchAllOrders=async()=>{
   const response=await axios.get(url+"/api/order/list")
   if(response.data.success){
    setOrders(response.data.data)
    console.log(response.data.data)
   }
   else{
      toast.error("Error")
   }
  }
  
  const statusHandler=async(event,orderId)=>{
    const response=await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value,

    })
    if(response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
    <div className=''>
      <h3 className="text-xl ">Order Page</h3>
      <div className=''>
        {orders.map((order,index)=>(
          <div className='grid grid-cols-[0.5fr_2.5fr_1fr_1fr_1fr] items-start gap-[30px] border-[1px] border-[tomato] p-[20px] my-[30px] text-[14px] text-[#505050] [max-width:1000px]:grid [max-width:1000px]:grid-cols-[0.5fr_2fr_1fr] [max-width:1000px]:text-[12px] [max-width:1000px]:py-[15px] [max-width:1000px]:px-[8px]' key={index}>
             <img src={assets.parcel_icon} alt="" className='[max-width:1000px]:w-[40px]' />
             <div>
              <p className='font-[600]'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name + " x "+ item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                    
                })}
              </p>
              <p className='font-[600] mt-[30px] mb-[5px]'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className='mb-[10px]'>
                <p>{order.address.street+", "}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className=''>{order.address.phone}</p>
             </div>
             <p>Items : {order.items.length}</p>
             <p>${order.amount}</p>
             <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='bg-[#ffe8e4] border-[1px] border-[tomato] w-[max(10vw,120px)] p-[10px] [max-width:1000px]:p-[5px] [max-width:1000px]:text-[12px]'>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
             </select>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Orders
