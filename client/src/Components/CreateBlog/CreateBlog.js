// import React from 'react'
import axios from 'axios';
import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateBlog = () => {
    let nevigate = useNavigate()
    const [disable, setdisable] = useState(false)
    let data = useForm()
    let onSubmit = (data) => {
        setdisable(true)
        // console.log(data);
        // console.log(data.imageName[0].name
            // );
            let blog={
                title:data.title,
                imageName:data.imageName[0],
                desc:"",
                detail:data.detail,
                // comments:["good"],
                likes:""

            }
            const  formData= new FormData()
            formData.append("title",blog.title);
            formData.append("imageName",blog.imageName);
            formData.append("detail",blog.detail);

            


            // console.log(blog);
        let sendingUser = async () => {
               let resp= await axios.post("/createBlog",formData).then(()=>{
                setdisable(false)
                toast("Created Successfully")
                nevigate("/")
                
               })
            //    console.log(resp.data);
            // setCu(resp.data.data)
            // console.log(cu);
            //     dispatch(setUser(resp.data.data))
            //     nevigate("/")
        }
        sendingUser()
    }
    return (
        <div className='text-white'>

            <div>
                <div className='text-white '> <h1 className='font-bold text-center  md:text-5xl lg:text-5xl text-3xl mt-5'>Create your own blog</h1>
                    <form action="">
                        <div className='flex-col flex items-center'>
                            <h1 className='font-bold text-center  md:text-5xl lg:text-5xl text-2xl mt-8'>Title</h1>
                            <input type="text" name="" id="" className='md:text-3xl lg:text-3xl bg-inherit mt-10 p-4 rounded-xl border-2 border-white   ' placeholder='Title' {...data.register('title', { required: true })} />
                            {data.formState.errors.title && <div className="mt-5 text-red-500 "> PLease enter titel</div>}
                            <h1 className='font-bold text-center  md:text-5xl lg:text-5xl text-3xl mt-10'>Description </h1>

                            {/* <input type="text" name="" id="" className='md:text-3xl lg:text-3xl bg-inherit mt-14 p-4 rounded-xl border-2 border-white   ' placeholder='password' {...data.register("password", { required: true })}  /> */}

                            <div>
                                <textarea {...data.register('detail', { required: true })} name="detail" id="" cols="100" rows="50" className='border-3 border-white mt-10 bg-inherit  h-28 rounded-2xl text-white text-xl' placeholder='Enter detail for Blog' />

                            </div>


                            {data.formState.errors.detail && <div className="mt-5 text-red-500 "> PLease enter Description</div>}

                            <div className='flex justify-center text-white mt-14'> <input  {...data.register('imageName', { required: true })} type='file' className='mx-5 text-blue-500 '

                            /></div>

                            <button disabled={disable} className='text-xl bg-blue-500 mt-14  rounded-xl w-72 p-4' onClick={data.handleSubmit(onSubmit)}>Submit your Blog</button>



                        </div>
                    </form>

                </div>


            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateBlog