import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Shopcontext } from "../context/Shopcontext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign In"); // Sign In | SignUp | Admin
  const { token, setToken, navigate, backendUrl } = useContext(Shopcontext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "SignUp") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/"); // redirect to home
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === "Sign In") {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/"); // redirect to home
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === "Admin") {
        const response = await axios.post(`${backendUrl}/api/user/admin`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          window.location.href = "/admin"; // admin dashboard
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token && currentState !== "Admin") {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30')" }}>
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full sm:max-w-md flex flex-col gap-5 border border-gray-200"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">{currentState}</h2>

        {currentState === "SignUp" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <p className="cursor-pointer hover:text-black">Forgot Password?</p>
          {currentState === "Sign In" ? (
            <p className="cursor-pointer hover:text-black" onClick={() => setCurrentState("SignUp")}>Create Account</p>
          ) : (
            <p className="cursor-pointer hover:text-black" onClick={() => setCurrentState("Sign In")}>Login Here</p>
          )}
        </div>

        <button className="bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 active:scale-95 transition duration-200">
          {currentState === "SignUp" ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
