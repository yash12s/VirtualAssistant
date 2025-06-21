import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const userDataContext = createContext()

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000"
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true) 

  const [frontendImage, setFrontendImage] = useState(null)
  const[backendImage, setBackendImage] = useState(null)
  const[selectedImage, setSelectedImage] = useState(null)

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
      setUserData(result.data)
      console.log("User found:", result.data)
    } catch (error) {
      setUserData(null)
      console.log("User not found:", error)
    } finally {
      setLoading(false)  
    }
  }

  const getGeminiResponse = async(command)=>{
    try {
      const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
      return result.data
    } catch (error) { 
      console.log(error)
    }

  }


  useEffect(() => {
    handleCurrentUser()
  }, [])

  const value = {
    serverUrl,
    userData,
    setUserData,
    loading, frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage,setSelectedImage,getGeminiResponse
  }

  return (
    <userDataContext.Provider value={value}>
  {loading ? null : children}
</userDataContext.Provider>

  )
}

export default UserContext
