import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showsearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartitems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  // Fetch products
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch user cart
  const getUserCart = async (authToken) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token: authToken } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Add to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartitems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartitems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get total cart count
  const getCartCount = () => {
    let tc = 0;
    for (const items in cartitems) {
      for (const item in cartitems[items]) {
        tc += cartitems[items][item] || 0;
      }
    }
    return tc;
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    let ta = 0;
    for (const items in cartitems) {
      const iteminfo = products.find((p) => p._id === items);
      for (const item in cartitems[items]) {
        if (cartitems[items][item] > 0) {
          ta += iteminfo?.price * cartitems[items][item] || 0;
        }
      }
    }
    return ta;
  };

  // Auto-fetch products
  useEffect(() => {
    getProductsData();
  }, []);

  // Fetch cart whenever token changes
  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setShowSearch,
    cartitems,
    addToCart,
    getCartCount,
    updateQuantity,
    getTotalCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
  };

  return <Shopcontext.Provider value={value}>{props.children}</Shopcontext.Provider>;
};

export default ShopcontextProvider;
