import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'

function Card({ image }) {

    const{serverUrl, userData, setUserData, loading, frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage,setSelectedImage} = useContext(userDataContext)

  return (
    <div
  className={`
    w-[70px] h-[140px]
    lg:w-[150px] lg:h-[200px] 
    bg-[#0f0f20] 
    border 
    rounded-2xl 
    overflow-hidden 
    cursor-pointer 
    transition-all duration-300 ease-in-out 
    ${selectedImage === image 
      ? "border-4 border-white shadow-2xl shadow-[#00f2ff90]" 
      : "border-[#00f2ff50] hover:shadow-[0_0_20px_5px_#00f2ff90] hover:border-[#00f2ff]"}
  `}
  onClick={() => {
    setSelectedImage(image)
    setBackendImage(null)
    setFrontendImage(null)}}
>
  <img src={image} className='h-full w-full object-cover' alt="Assistant avatar" />
</div>

  )
}

export default Card
