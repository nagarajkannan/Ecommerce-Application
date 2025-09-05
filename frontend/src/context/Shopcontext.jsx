import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from 'axios'

export const Shopcontext = createContext();
const ShopcontextProvider = (props) => {
  const currency = "₹";
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [products,setProducts]=useState([]) 
  const [token,setToken]=useState('')

  const [showsearch, setShowSearch] = useState(false)
  const [cartitems, setCartItems] = useState({})
  const navigate=useNavigate();



  const addToCart = async(itemId,size)=>{
    if(!size){
        toast.error("Select Product Size");
        return
    }
     let cartData=structuredClone(cartitems)
     if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1;
        }
        else{
            cartData[itemId][size]=1;
        }

     }
     else{
        cartData[itemId]={}
        cartData[itemId][size]=1
     }
     setCartItems(cartData);
     if(token){
      try {
         await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
     }
  }
   const getCartCount=()=>{
    let tc=0;
    for(const items in cartitems){
        for(const item in cartitems[items]){
            try{
                 if(cartitems[items][item]>0){
                tc+=cartitems[items][item]
            }

            }
            catch(error){

            }
           
        }
    }
    return tc

   }
   const updateQuantity=async (itemId,size,quantity)=>{
    let cartData=structuredClone(cartitems)
    cartData[itemId][size]=quantity;
    setCartItems(cartData)
    if(token){
      try {
        await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
        
      }
    }
   }
  const getTotalCartAmount=()=>{
    let ta=0;
    for(const items in cartitems){
        let iteminfo=products.find((product)=>product._id===items);
        for(const item in cartitems[items]){
            try {
                if(cartitems[items][item]>0){
                    ta+=iteminfo.price*cartitems[items][item]                }
            } catch (error) {
                
            }
        }
    }
    return ta;
  }

    const getProductsData=async ()=>{
      try {
        const response=await axios.get(`${backendUrl}/api/product/list`)
        if(response.data.success){
          setProducts(response.data.products)
        }
        else{
          toast.error(response.data.message)
        }
        
        
      } catch (error) {
         console.log(error);
         toast.error(error.message)
         
      }
    }
    const getUserCart=async(token)=>{
      try {
        const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
        if(response.data.success){
          setCartItems(response.data.cartData)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
        
      }

    }
    useEffect(()=>{
        getProductsData();
    },[])
     useEffect(()=>{
      if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
      }
     },[])

  
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
    setCartItems
  };
  return (
    <Shopcontext.Provider value={value}>{props.children}</Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
