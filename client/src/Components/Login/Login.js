// import React from 'react'
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/store";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  let nevigate = useNavigate();
  let data = useForm();
  let [cu, setCu] = useState({});
  let navifate = useNavigate();
  let dispatch = useDispatch();
  let user = useSelector((store) => store.user);
  useEffect(() => {
    if (user._id != "") {
      nevigate("/");
    }else{
        
    }
  }, [user]);
  let onSubmit = (data) => {
    // console.log(data);

    let sendingUser = async () => {
      let resp = await axios.post("/checkUser", { data });
      // console.log(resp.data);
      if (resp.data.success == true) {
        setCu(resp.data.data);
        // console.log(cu);
        dispatch(setUser(resp.data.data));
        localStorage.setItem("token", resp.data.meratoken);
        nevigate("/");
      }else{
        toast.error("You have entered wrong username/password")
      }
    };
    sendingUser();
  };
  // console.log(cu);
  let [pass, setPas] = useState("");
  return (
    <div>
      <div>
        <div className="text-white ">
          {" "}
          <h1 className="font-bold text-center  md:text-5xl lg:text-5xl text-3xl mt-5">
            Log in to your account
          </h1>
          <form action="">
            <div className="flex-col flex items-center text-center">
              <input
                type="text"
                name=""
                id=""
                className="md:text-3xl lg:text-3xl bg-inherit mt-14 p-4 rounded-xl border-2 border-white   "
                placeholder="username"
                {...data.register("username", { required: true })}
              />
              {data.formState.errors.username && (
                <div className="mt-5 text-red-500 ">
                  {" "}
                  PLease enter your username
                </div>
              )}

<>
        <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        className="md:text-3xl lg:text-3xl bg-inherit mt-14 p-4 rounded-xl border-2 border-white w-full " 
        {...data.register('password', {
          required: 'Password is required',
          pattern: {
            value: /^(?=.*[!@#$%^&*])(?=.*\d.*\d)[a-zA-Z\d!@#$%^&*]{6,}$/,
            message: 'Password must contain at least one special character and two numbers',
          },
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        })}
        onChange={(e) => setPas(e.target.value)}
      />
      <div
        className="absolute inset-y-0 right-5 top-14 flex items-center pr-4 cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <FaEyeSlash size={30} /> : <FaEye size={30} />} 
      </div>
      {data.formState.errors.password && (
        <p className="mt-5 text-red-500">{data.formState.errors.password.message}</p>
      )}
    </div>
        </>

              <button
                className="text-xl bg-blue-500 mt-14  rounded-xl w-72 p-4"
                onClick={data.handleSubmit(onSubmit)}
              >
                Log in
              </button>
            </div>
          </form>
          <div className="flex justify-center text-white mt-14">
            {" "}
            <div>Not have an account?</div>{" "}
            <button
              className="mx-5 text-blue-500 "
              onClick={() => {
                nevigate("/signUp");
              }}
            >
              Sign in
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
