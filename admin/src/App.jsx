import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className=" min-h-screen font-sans text-gray-800">
      <ToastContainer position="top-right" autoClose={3000} />

      {token === "" ? (
        <div className="flex justify-center items-center h-screen">
          <Login setToken={setToken} />
        </div>
      ) : (
        <>
          <Navbar setToken={setToken} className="shadow-md bg-white" />
            <hr className="border-gray-300" />
            <div className="flex w-full mx-auto  px-4 ">
              <Sidebar className="w-1/5 bg-white p-4 rounded-lg shadow-sm" />
              <div className="w-4/5 ml-6 bg-white p-6 rounded-lg shadow-sm">
                <Routes>
                  <Route path="/" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
        </>
      )}
    </div>
  );
};

export default App;
