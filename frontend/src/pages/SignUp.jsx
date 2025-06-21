import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from "axios"


function SignUp() {
    const[showPassword, setShowPassword] =useState(false)
    const {serverUrl,userData,setUserData}= useContext(userDataContext)

    const navigate = useNavigate()
    const [name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[err,setErr] = useState("")
    const [loading, setLoading] = useState(false)


    const handleSignUp =async(e)=>{
      e.preventDefault()
      setErr("")
      setLoading(true)
      try {
        let result = await axios.post(`${serverUrl}/api/auth/signup`,{
          name,email,password
        },{withCredentials:true})
        setUserData(result.data)
        setLoading(false)
        navigate("/customize")
      } catch (error) {
        console.log(error)
        setUserData(null)
        setLoading(false)
        setErr(error.response.data.message)
      }
    }


  return (
    <div className='w-full h-screen bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`}}>
    <form className='w-[90%] h-[500px] max-w-[500px] bg-[#0000004e] backdrop-blur shadow-lg shadow-black-950 flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignUp}>

    <h1 className='text-[30px] font-semibold mb-[30px]'>
    <span style={{ color: '#00FFF7' }}>Register to</span>{' '}
    <span style={{ color: '#FF00D4' }}>Virtual Assistant</span>
    </h1>
    <input
  type="text"
  placeholder="Enter your name"
  className="w-full h-[60px] outline-none border-2 border-cyan-400 bg-transparent 
             text-white placeholder-cyan-200 px-[20px] py-[10px] rounded-full 
             text-[18px] transition duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500" required onChange={(e)=>setName(e.target.value)} value={name}
/>

<input
  type="email"
  placeholder="Enter email id"
  className="w-full h-[60px] outline-none border-2 border-pink-500 bg-transparent 
             text-white placeholder-pink-200 px-[20px] py-[10px] rounded-full 
             text-[18px] transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400" required onChange={(e)=>setEmail(e.target.value)} value={email}
/>
<div className="w-full h-[60px] border-2 border-purple-500 bg-transparent text-white rounded-full text-[18px] transition duration-300 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400 relative">

  <input
    type={showPassword? "text": "password"}
    placeholder="Enter password"
    className="w-full h-full rounded-full outline-none bg-transparent 
               text-white placeholder-purple-200 px-[20px] py-[10px]" required onChange={(e)=>setPassword(e.target.value)} value={password}
  />

  
  {!showPassword && <IoEye className='absolute top-[18px] right-[20px] w-[25px] h-[22px] text-white cursor-pointer hover:text-pink-400 transition duration-300' onClick={()=>setShowPassword(true)} />}

  {showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[22px] text-white cursor-pointer hover:text-pink-400 transition duration-300' onClick={()=>setShowPassword(false)} />}
  
</div>

{err.length>0 && <p className='text-red-500'>*{err}</p>}

<button
  className="min-w-[150px] h-[60px] mt-[10px] rounded-full text-black font-semibold 
             text-[19px] bg-white hover:bg-pink-500 hover:text-white 
             transition duration-300 shadow-md shadow-black/30" disabled={loading}>{loading? "Loading...":"Sign Up"}
  
</button>

<p
  className="text-white text-[18px] cursor-pointer hover:underline transition duration-300"
  onClick={() => navigate("/signin")}
>
  Already have an account ?  <span className="text-blue-400 hover:text-blue-500">Sign In</span>
</p>


    </form>
    
    </div>
  )
}

export default SignUp