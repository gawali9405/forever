import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl, setUserData } =
    useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          toast.success("Account created successfully!");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setCurrentState("Login");
        } else {
          toast.error(response.data.message || "Failed to create account");
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          toast.success("Login successful!");
          setToken(response.data.token);
          setUserData(response.data)  
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message || "Login failed");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto mt-14 gap-5 text-gray-800 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="inline-flex items-center gap-3 mb-4">
        <p className="text-3xl font-semibold">{currentState}</p>
        <hr className="h-[2px] w-10 bg-gray-600 border-none" />
      </div>

      {currentState !== "Login" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm text-gray-600 mt-[-4px]">
        <p className="cursor-pointer hover:underline hover:text-blue-600">
          Forgot your password?
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:underline hover:text-blue-600"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:underline hover:text-blue-600"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="w-full bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition-all">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
