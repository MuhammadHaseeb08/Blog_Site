import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import { Provider } from 'react-redux';
import Protected from './Components/Protected/Protected';
import CreateBlog from './Components/CreateBlog/CreateBlog';
import Crypto from './Components/Crypto/Crypto';

import axios from "axios"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { maintainUser } from './store/store';

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    
     axios.post("/seesion",{SomeToken: localStorage.getItem('token')}).then((res)=>{
      if(res.data){
       
       
        dispatch(maintainUser(res.data))
      }else{
        console.log("not found token");
      }
    })
  },[]);
  return (
    <div className="App">
     
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:id' element={<Protected Comp={Detail}/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Protected Comp={CreateBlog}/>}/>
        <Route path='/crypto' element={<Crypto/>}/>
      </Routes>
      
     
    </div>
  );
}

export default App;
