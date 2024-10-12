import axios from "axios";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();
  const password = useRef({});
  let data = useForm();
  password.current = data.watch("password", "");
  let nevigate = useNavigate();
  let onSubmit = (data) => {
    console.log(data);

    let sendingUser = async () => {
      let resp = await axios.post("/createUser", { data });
      if (resp.data.success == true) {
        nevigate("/");
      }
    };
    sendingUser();
  };
  let [pass, setPas] = useState("");
  return (
    <div>
      <div className="text-white ">
        {" "}
        <h1 className="font-bold text-center  md:text-5xl lg:text-5xl text-3xl mt-5">
          Create an account
        </h1>
        <form action="">
          <div className="flex-col flex items-center text-center">
            <input
              type="text"
              name=""
              id=""
              className=" md:text-3xl lg:text-3xl bg-inherit mt-14 p-4 rounded-xl border-2 border-white   "
              placeholder="name"
              {...data.register("name", { required: true })}
            />
            {data.formState.errors.name &&
              data.formState.errors.name.type == "required" && (
                <div className="mt-5 text-red-500 ">
                  {" "}
                  PLease enter your name
                </div>
              )}
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
              <input
          type="email"
          className="md:text-3xl lg:text-3xl bg-inherit mt-14 p-4 rounded-xl border-2 border-white "
          placeholder="Email"

          {...data.register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
        />
            {data.formState.errors.email && <p className="mt-5 text-red-500 ">{data.formState.errors.email.message}</p>}
           
            {/* <input
          type="password"
          placeholder="Password"
          className="md:text-3xl lg:text-3xl bg-inherit mt-14 p-4 rounded-xl border-2 border-white "
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
          onChange={(e)=>{setPas(e.target.value)}}
        />
        {data.formState.errors.password && <p className="mt-5 text-red-500 ">{data.formState.errors.password.message}
        
        </p>} */}

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








            {/* <input type="text" name="" id="" className='md:text-3xl lg:text-3xl bg-inherit mt-14 p-4 rounded-xl border-2 border-white   ' placeholder='confirm password' {...data.register("cPassword", {
                            required: true, 
                        })} /> */}
            {/* {data.formState.errors.cPassword &&
              data.formState.errors.cPassword.type == "check" && (
                <div className="mt-5 text-red-500 ">
                  {" "}
                  PLease check your password
                </div>
              )} */}
            <button
              className="text-xl bg-blue-500 mt-14  rounded-xl w-72 p-4"
              onClick={data.handleSubmit(onSubmit)}
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="flex justify-center text-white mt-14">
          {" "}
          <div>Already have an account?</div>{" "}
          <button
            className="mx-5 text-green-500 "
            onClick={() => {
              nevigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
