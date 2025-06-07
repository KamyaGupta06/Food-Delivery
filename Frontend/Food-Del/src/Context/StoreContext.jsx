import { createContext, useEffect, useState } from "react"
import { food_list } from "../assets/assets"
import axios from "axios"
export const StoreContext=createContext(null)

const StoreContextProvider =(props)=>{
    const [cartItems, setcartItems]=useState({});
    const url="http://localhost:4000";
    const [token,setToken]=useState("")
    const [food_list,setFoodList]=useState([])
    const addToCart= async(itemId)=>{
        if(!cartItems[itemId]){
            setcartItems((prev)=>({
                ...prev,[itemId]:1
            }))
        }
        else{
            setcartItems((prev)=>(
                {...prev,[itemId]:prev[itemId]+1}))
        }
      if(token)
      {
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      }
    }
    
    const removeFromCart = async (itemId) => {
        setcartItems((prev) => {
          if (prev[itemId] === 1) {
            const updatedCart = { ...prev };
            delete updatedCart[itemId];
            return updatedCart;
          } else {
            return { ...prev, [itemId]: prev[itemId] - 1 };
          }
          
        })
        if (token) {
        try {
          await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        } catch (err) {
          console.error("Failed to remove from backend:", err);
        }
      }
  }


      // useEffect(() => {
      //   console.log(cartItems);
      // }, [cartItems]);
    const getTotalCartAmount=()=>{
      let totalAmount=0;
      for(const item in cartItems)
      {
        if(cartItems[item]>0)
        {
        let itemInfo=food_list.find((product)=>product._id === item)
        totalAmount +=itemInfo.price*cartItems[item];
        }
      }
      return totalAmount;
    }
    
    // based on distinct item id
    const getTotalCartItems = () => {
      return Object.keys(cartItems).filter((itemId) => cartItems[itemId] > 0).length;
    };


    // for total no. of items

    // const getTotalCartItems = () => {
    //   let totalItems = 0;
    //   for (const item in cartItems) {
    //     totalItems += cartItems[item];
    //   }
    //   return totalItems;
    // };

    const fetchFoodList = async()=>{
      const response =await axios.get(url+"/api/food/list")
      setFoodList(response.data.data)
    }

    const loadCartData=async(token)=>{
      const response=await axios.post(url+"/api/cart/get",{},{headers:token})
      setcartItems(response.data.cartData)
    }
    
    useEffect(()=>{
      async function loadData() {
        await fetchFoodList()
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"))
          await loadCartData(localStorage.getItem("token"))
        }
        
      }
      loadData()
    },[])

    const contextValue={
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        url,
        token,
        setToken,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;