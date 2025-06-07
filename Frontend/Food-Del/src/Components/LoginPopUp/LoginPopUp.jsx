// USE context

// import React,{useContext, useEffect, useState} from 'react'

// import { assets } from '../../assets/assets'
// import { StoreContext } from '../../Context/StoreContext'
// import axios from "axios"

// const LoginPopUp = ({setShowLogin}) => {

//    const {url,token,setToken}=useContext(StoreContext)



//   const [currState,setCurrState]=useState("Sign Up")
//   const [data,setData]=useState({
//     name:"",
//     email:"",  
//     password:""
//   })
//   const onChangeHandler =(event) =>{
//     const name=event.target.name;
//     const value=event.target.value;
//     setData(data=>({...data,[name]:value}))
//   }
  
//   const onLogin=async(event)=>{
//      event.preventDefault()
//     let newUrl=url;
//     if(currState==="Login")
//     {
//       newUrl +="/api/user/login"
//     }
//     else{
//       newUrl +="/api/user/register"
//     }

//     const response=await axios.post(newUrl,data)

//     if(response.data.success){
//         setToken(response.data.token);
//         localStorage.setItem("token",response.data.token)
//         setShowLogin(false)
//     }
//     else{
//       alert(response.data.message)
//     }

//   }
//   useEffect(()=>{
//     console.log(data)
//   },[data])
//   return (
//     <div className='absolute top-0 left-0 z-100 w-full h-full bg-[#00000090] grid place-items-center'>
//        <form onSubmit={onLogin} className='  w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 py-6 px-8 rounded-[8px] text-[14px] animation:fadeIn 0.5s'>
//         <div className='flex justify-between items-center text-black'>
//           <h2 className='text-[20px] font-bold'>{currState}</h2>
//           <img  
//           className='w-[16px] cursor-pointer'
//           onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
//         </div>
//         <div className='flex flex-col gap-[20px]'>
//           {currState==="Login"?<></>:
//           <input name='name' onChange={onChangeHandler} value={data.name} type="text " placeholder='Your name' required className='outline-none border-[1px] border-[#c9c9c9] p-[8px] rounded-[4px] ' />}
//           <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required className='outline-none border-[1px] border-[#c9c9c9] p-[8px] rounded-[4px] '/>
//           <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required className='outline-none border-[1px] border-[#c9c9c9] p-[8px] rounded-[4px] '/>
//         </div>
//         <button type="submit" className='border-none p-[8px] rounded-[4px] text-white bg-[tomato] text-[15px] cursor-pointer'>{currState==="Sign Up"?"Create account":"Login"} </button>
//         <div className='flex items-start gap-[8px] mt-[-15px]'>
//           <input type="checkbox" required className='mt-[5px]'/>
//           <p>By continuing, I agree to the terms of use & privacy policy</p>
//         </div>
//         {currState==="Login"?
//         <p >Create a new account? <span className='text-[tomato] font-[500px] cursor-pointer' onClick={()=>setCurrState("Sign Up")} >Click here</span></p>
//         :
//         <p>Already have an account? <span className='text-[tomato] font-[500px] cursor-pointer' onClick={()=>setCurrState("Login")}>Login here</span></p>}
//        </form>
      
//     </div>
//   )
// }

// export default LoginPopUp


// Redux Toolkit
import React,{ useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { assets } from '../../assets/assets'
import { Url,selectToken, setToken } from '../../Redux/storeSlice'
import axios from "axios"

const LoginPopUp = ({setShowLogin}) => {
   const url=useSelector(Url)
  const dispatch = useDispatch();
  const token = useSelector(selectToken);


  const [currState,setCurrState]=useState("Sign Up")
  const [data,setData]=useState({
    name:"",
    email:"",  
    password:""
  })
  const onChangeHandler =(event) =>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  
  const onLogin=async(event)=>{
     event.preventDefault()
    let newUrl=url;
    if(currState==="Login")
    {
      newUrl +="/api/user/login"
    }
    else{
      newUrl +="/api/user/register"
    }

    const response=await axios.post(newUrl,data)
    console.log("Login response:", response.data)

    if(response.data.success){
        dispatch(setToken(response.data.token));
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }

  }
  useEffect(()=>{
    console.log(data)
  },[data])
  return (
    <div className='absolute top-0 left-0 z-100 w-full h-full bg-[#00000090] grid place-items-center'>
       <form onSubmit={onLogin} className='  w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 py-6 px-8 rounded-[8px] text-[14px] animation:fadeIn 0.5s'>
        <div className='flex justify-between items-center text-black'>
          <h2 className='text-[20px] font-bold'>{currState}</h2>
          <img  
          className='w-[16px] cursor-pointer'
          onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className='flex flex-col gap-[20px]'>
          {currState==="Login"?<></>:
          <input name='name' onChange={onChangeHandler} value={data.name} type="text " placeholder='Your name' required className='outline-none border-[1px] border-[#c9c9c9] p-[8px] rounded-[4px] ' />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required className='outline-none border-[1px] border-[#c9c9c9] p-[8px] rounded-[4px] '/>
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required className='outline-none border-[1px] border-[#c9c9c9] p-[8px] rounded-[4px] '/>
        </div>
        <button type="submit" className='border-none p-[8px] rounded-[4px] text-white bg-[tomato] text-[15px] cursor-pointer'>{currState==="Sign Up"?"Create account":"Login"} </button>
        <div className='flex items-start gap-[8px] mt-[-15px]'>
          <input type="checkbox" required className='mt-[5px]'/>
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Login"?
        <p >Create a new account? <span className='text-[tomato] font-[500px] cursor-pointer' onClick={()=>setCurrState("Sign Up")} >Click here</span></p>
        :
        <p>Already have an account? <span className='text-[tomato] font-[500px] cursor-pointer' onClick={()=>setCurrState("Login")}>Login here</span></p>}
       </form>
      
    </div>
  )
}

export default LoginPopUp