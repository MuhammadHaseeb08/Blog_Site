import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactLoading from 'react-loading';

const Crypto = () => {
    let [fte,setfte]=useState([])
    useEffect(() => {
    let coming=async()=>{
      let   res= await axios.get("/cryp")
    //   console.log(res.data.data);
      setfte(res.data.data)


    }
    coming()
    }, [])
    // console.log(fte);

    if (fte.length==0) {
      return (
        <div className='text-white flex justify-center text-3xl mt-8'>
        <ReactLoading type={"spinningBubbles"} color={"blue"} height={667} width={375} />
        
        </div>
      )
    }
  return (
    <div className=''>
      <table className='w-full table-auto'>
    <thead className='bg-gray-800'>
        <tr className='text-white md:text-3xl text-xl'>
            <th className='px-4 py-2'>#</th>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Symbol</th>
            <th className='px-4 py-2'>($)Price</th>
            <th className='px-4 py-2'>24th</th>
        </tr>
    </thead>
    <tbody className='bg-gray-900 text-center'>
        {
            fte.map((item, i) => (
                <tr key={i} className='text-white md:text-2xl text-xl'>
                    <td className=' px-4 py-2'>{i + 1}</td>
                    <td className='px-4 py-2  flex items-center justify-center'>
                        <div className='w-8 h-8 mr-4'>
                            <img src={item.logo} alt="logo" className='w-full h-full object-contain' />
                        </div>
                        <div>

                        {item.name}
                        </div>
                    </td>
                    <td className=' px-4 py-2'>{item.symb}</td>
                    <td className=' px-4 py-2'>{item.price}</td>
                    <td className=' px-4 py-2'>{item.prcnt}</td>
                </tr>
            ))
        }
    </tbody>
</table>

       

    </div>
  )
}

export default Crypto