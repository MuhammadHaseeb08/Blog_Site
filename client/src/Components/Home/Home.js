import React, { useState,useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';

const Home = () => {
    let [data,setData]=useState([])
    const [flag, setflag] = useState(false)
    let coming=async()=>{
            let resp= await axios.get("/get")
            // console.log(resp.data.founded);
            setData(resp.data.founded)
            
    }
    useEffect(() => {
      
    coming()
    setflag(!flag)
    }, [])
    useEffect(() => {
    coming()
    }, [flag])
    console.log(data);
    if (data.length==0) {
      return (
        <div className='text-white flex justify-center text-3xl mt-8'>
        <ReactLoading type={'spinningBubbles'} color={"blue"} height={667} width={375} />
        
        </div>
      )
    }
    console.log(data);
    
  return (

    <div>
    <section className="bg-inherit py-16">
<div className="container px-4 mx-auto">
 {/* <h2 className="text-3xl font-bold mb-8 text-center" >Men</h2> */}
 <h2 className="text-3xl font-semibold mb-14 text-center text-white" > Latest Blogs</h2>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
     {
         data.map((item)=>{
             return(
                 <div>
                         <Link to={`/detail/${item._id}`}>
<div className="bg-inherit rounded-lg shadow-lg overflow-hidden border-2 border-white p-8 h-96 mb-8">
     <img
       src={item.imageName}
       alt="Product Image"
       className="w-full h-48 object-cover rounded-lg border-2 border-white" 
     />
     <div className="p-6">
       <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
       <p className='text-white'>{item.detail.length>70?item.detail.slice(0,70)+"...":item.detail}</p>
                {/* {
                  item.detail && (
                    <p className="text-gray-600 mb-4">
                    {item.detail.length>14?data.detail.slice(0,14)+"...":data.detail}
                    </p>

                  )
                } */}
     
       <div className="flex justify-between items-center">
         {/* <span className="font-bold text-lg"> Rs.{item.price}</span> */}
         {/* <Link to={`/detail/${item._id}`}>
         <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full" >
           View Detail
         </button>
         </Link> */}
       </div>
     </div>
   </div></Link>
                     </div>
                 )
         })
     }

   
  
   
 </div>
</div>
</section>
 </div>
  )
}

export default Home