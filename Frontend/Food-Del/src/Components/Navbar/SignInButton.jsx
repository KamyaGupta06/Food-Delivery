// // Use context
// import React,{useContext}  from 'react';
// import { StoreContext } from '../../Context/StoreContext'
// import {useNavigate} from "react-router-dom"
// import { assets } from '../../assets/assets';


// const SignInButton = ({ onClick }) => {
//    const { token, setToken } = useContext(StoreContext);
//   const navigate=useNavigate();
//   const logout=()=>{
//     localStorage.removeItem("token")
//     setToken("")
//     navigate("/")

//   }
//   return (
//     <>
//     {!token?<button
//     onClick={onClick}
//      className="border  border-Grey-50  text-[#49557e] bg-transparent hover:bg-[#fff4f2] px-[30px] py-[10px] rounded-[50px] cursor-pointer transition-all duration-300
//     max-[1050px]:py-[8px] max-[1050px]:px-[25px] max-[900px]:px-[20px] max-[900px]:py-[7px] max-[900px]:text-[15px]">
//       Sign in
//     </button>:
//     <div className='relative group cursor-pointer'>
//       <img src={assets.profile_icon} alt="" />
//       <ul className='absolute hidden right-0 z-[1] group-hover:flex flex-col gap-[10px] bg-[#fff2ef] py-[12px] px-[25px] rounded-[4px] border-[1px] border-[tomato] list-none z-[1]'>
//           <li className='flex items-center gap-[10px] cursor-pointer'><img className="w-[20px] "src={assets.bag_icon} alt="" /><p className='hover:text-[tomato]'>Orders</p></li>
//           <hr className='w-[80px]'/>
//           <li className='flex items-center gap-[10px] cursor-pointer'><img className="w-[20px] " src={assets.logout_icon} alt="" /><p onClick={logout} className='hover:text-[tomato]' >Logout</p></li>
//       </ul>
//       </div>
//       }
    
//     </>
//   );
// };

// export default SignInButton;





// Redux Toolkit
import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { selectToken, setToken } from '../../Redux/storeSlice'
import {useNavigate} from "react-router-dom"
import { assets } from '../../assets/assets';


const SignInButton = ({ onClick }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token")
    dispatch(setToken(""))
    navigate("/")

  }

  return (
    <>
    {!token?<button
    onClick={onClick}
     className="border  border-Grey-50  text-[#49557e] bg-transparent hover:bg-[#fff4f2] px-[30px] py-[10px] rounded-[50px] cursor-pointer transition-all duration-300
    max-[1050px]:py-[8px] max-[1050px]:px-[25px] max-[900px]:px-[20px] max-[900px]:py-[7px] max-[900px]:text-[15px]">
      Sign in
    </button>:
    <div className='relative group cursor-pointer'>
      <img src={assets.profile_icon} alt="" />
      <ul className='absolute hidden right-0 z-[1] group-hover:flex flex-col gap-[10px] bg-[#fff2ef] py-[12px] px-[25px] rounded-[4px] border-[1px] border-[tomato] list-none z-[1]'>
          <li className='flex items-center gap-[10px] cursor-pointer'><img className="w-[20px] "src={assets.bag_icon} alt="" /><p className='hover:text-[tomato]'>Orders</p></li>
          <hr className='w-[80px]'/>
          <li className='flex items-center gap-[10px] cursor-pointer'><img className="w-[20px] " src={assets.logout_icon} alt="" /><p onClick={logout} className='hover:text-[tomato]' >Logout</p></li>
      </ul>
      </div>
      }
    
    </>
  );
};

export default SignInButton;
