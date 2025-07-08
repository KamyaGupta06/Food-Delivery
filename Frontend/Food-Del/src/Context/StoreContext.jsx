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
          await axios.delete(url + "/api/cart/remove", {
        headers: { token },
        data: { itemId },  // <-- itemId goes here under data
      });
        } catch (err) {
          console.error("Failed to remove from backend:", err);
        }
      }
  }


      useEffect(() => {
        console.log(cartItems);
      }, [cartItems]);
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
  if (!cartItems || typeof cartItems !== "object") return 0;
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

 const loadCartData = async (token) => {
  try {
    const response = await axios.get(url + "/api/cart/get", {
      headers: { token },
    });

    console.log("✅ Cart data from backend:", response.data);

    setcartItems(response.data.cartData || {});
  } catch (err) {
    console.error("Failed to load cart data:", err);
    setcartItems({});
  }
};


    
    useEffect(() => {
  async function loadData() {
    await fetchFoodList();
    
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken); // safe, only once
      await loadCartData(localToken); // pass directly
    }
  }

  loadData();
}, []);




// Clear cart and token on logout
// Load the correct cart when a new token is set
const logout = () => {
  localStorage.removeItem("token");
  setToken("");
  setcartItems({});
};


// Add useEffect to load cart whenever token changes
// This makes sure cart is updated when a new token is set (e.g. on login):
useEffect(() => {
  if (token) {
    loadCartData(token);
  } else {
    setcartItems({});
  }
}, [token]);

const clearCart = () => {
  setcartItems({});
};

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
        loadCartData,
        logout,
        clearCart,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;