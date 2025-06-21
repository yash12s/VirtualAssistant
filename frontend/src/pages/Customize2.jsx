import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MdKeyboardBackspace } from "react-icons/md";

function Customize2() {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext)

  const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() 

  const handleUpdateAssistant = async () => {
    setLoading(true)
    try {
      let formData = new FormData()
      formData.append("assistantName", assistantName)

      if (backendImage) {
        formData.append("assistantImage", backendImage)
      } else {
        formData.append("imageUrl", selectedImage)
      }

      const result = await axios.post(`${serverUrl}/api/user/update`, formData, {
        withCredentials: true,
      })
      setLoading(false)

      console.log(result.data)
      setUserData(result.data)
      navigate("/")
      // No navigate after success
    } catch (error) {
      setLoading(false)
      console.error(error)
    } 
  }

  return (
    <div className='
      w-full h-[100vh] 
      bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]
      flex flex-col justify-center items-center 
      p-6 sm:p-10 relative'>
      <MdKeyboardBackspace className='absolute top-[30px] cursor-pointer left-[30px] text-white w-[25px] h-[25px]' onClick={()=> navigate("/customize")} />

      <h1 className='text-white text-2xl sm:text-3xl md:text-4xl 
          font-semibold text-center mb-8 tracking-wide'>
        Enter Your <span className='text-[#00f2ff]'>Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="Give your assistant a cool name"
        className="w-full max-w-[600px] h-[60px] outline-none 
                   border border-pink-500 bg-transparent 
                   text-white placeholder-pink-200 
                   px-6 py-3 rounded-full text-[18px] 
                   transition duration-300 
                   focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />

      {assistantName && (
        <button
          className='
            min-w-[300px] h-[60px] mt-10 
            rounded-full 
            bg-[#00f2ff] 
            text-black font-semibold cursor-pointer text-[19px] 
            transition-all duration-300 ease-in-out 
            shadow-md shadow-black/30 
            hover:bg-white hover:text-[#00f2ff] 
            hover:shadow-[0_0_20px_5px_#00f2ff80]
          '
          disabled={loading}
          onClick={handleUpdateAssistant}
        >
          {loading ? "Loading..." : "Finally Create Your Assistant"}
        </button>
      )}
    </div>
  )
}

export default Customize2
