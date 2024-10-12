import React from 'react'
import { useSelector } from 'react-redux'
import CreateBlog from '../CreateBlog/CreateBlog'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Protected = (props) => {
    const {Comp}=props
    let data=useSelector((store)=>{
        return store.user
    })
 
   console.log(data);
    let nevigate=useNavigate()
        useEffect(() => {
        
            if (!data._id) {
                nevigate("/login")
            }
        }, [])
   
        return (
            <div>
            <Comp user={data}/>
            </div>
            )
  
}

export default Protected