// storeSlice.js
import { createSlice, createAsyncThunk,createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { food_list } from "../assets/assets"; // your existing food list

export const fetchFoodList = createAsyncThunk('store/fetchFoodList', async (url) => {
  const response = await axios.get(`${url}/api/food/list`);
  return response.data.data;
});

export const loadCartDataAPI=createAsyncThunk('store/loadCartDataAPI', async ({token,url}) => {
  try{
  const response = await axios.get(`${url}/api/cart/get`,{headers:{token}});
   return response.data.cartData;
  }catch(error){
      console.error('Failed to load cart data:', error);
      return thunkAPI.rejectWithValue(error.response.data);

  }
});
export const addToCartAPI = createAsyncThunk(
  'store/addToCartAPI',
  async ({ itemId, token, url }) => {
    const response = await axios.post(`${url}/api/cart/add`, { itemId }, {
      headers: { token },
    });
    return itemId;
  }
);

export const removeFromCartAPI = createAsyncThunk(
  'store/removeFromCartAPI',
  async ({ itemId, token, url }) => {
    const response = await axios.delete(`${url}/api/cart/remove`, {
      data:{ itemId }, 
      headers: { token }
    },
    );
    return itemId;
  }
);


const storeSlice = createSlice({
  name: "store",
  initialState: {
    // foodList: food_list,
    food_list:[],
    cartItems:{},
    url:"http://localhost:4000",
    token: localStorage.getItem("token") || "", // <-- add token here
    
  },
  reducers: {
    
    addToCart: (state, action) => {
      const {itemId} = action.payload;
      if (state.cartItems[itemId]) {
        state.cartItems[itemId] += 1;
      } else {
        state.cartItems[itemId] = 1;
      }
    },
    removeFromCart: (state, action) => {
      const {itemId} = action.payload;
      if (state.cartItems[itemId] === 1) {
        delete state.cartItems[itemId];
      } else {
        state.cartItems[itemId] -= 1;
      }
    },
    clearCart: (state) => {
      state.cartItems = {};
    },

    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // <-- set the token
    },
  
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFoodList.fulfilled, (state, action) => {
      state.food_list = action.payload;
    });
    builder
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        const itemId = action.payload;
        state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
      });
    builder.addCase(removeFromCartAPI.fulfilled, (state, action) => {
    const itemId = action.payload;
    if (state.cartItems[itemId] > 1) {
      state.cartItems[itemId] -= 1;
    } else {
      delete state.cartItems[itemId];
    }
  })
  builder
    .addCase(loadCartDataAPI.fulfilled, (state, action) => {
      state.cartItems = action.payload || {};
    })
    .addCase(loadCartDataAPI.rejected, (state, action) => {
      console.error("Cart data load failed", action.payload);
    });

  },
});
export const selectTotalCartAmount =(state) => {
  const { cartItems, food_list } = state.store;
  let totalAmount = 0;
  for (const itemId in cartItems) {
    const item = food_list.find((product) => product._id === itemId);
    if (item) {
      totalAmount += item.price * cartItems[itemId];
    }
  }
  return totalAmount;
};

export const selectTotalCartItems = (state) => {
  const cartItems  = state.store?.cartItems ||{};
  // const itemId = action.payload;
  return Object.keys(cartItems).filter((itemId) => cartItems[itemId] > 0).length;
};
// Export the actions
export const { addToCart, removeFromCart, clearCart ,setToken,} = storeSlice.actions;

// Export the url
export const Url = (state) => state.store.url;
export const selectToken= (state) => state.store.token;
export const setFoodList= (state) => state.store.food_list;
// Selector functions
export const selectFoodList = (state) => state.store.foodList;
export const selectCartItems = (state) => state.store.cartItems;

// Export reducer
export default storeSlice.reducer;
