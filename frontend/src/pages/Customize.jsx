import React, { useContext, useRef } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
  const {
    frontendImage, setFrontendImage,
    backendImage, setBackendImage,
    selectedImage, setSelectedImage
  } = useContext(userDataContext)
  const navigate = useNavigate()

  const inputImage = useRef()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
      setSelectedImage("input")
    }
  }

  return (
    <div className='
      w-full h-[100vh] 
      bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]
      flex flex-col justify-center items-center 
      p-6 sm:p-10
    '>
    <MdKeyboardBackspace className='absolute top-[30px] cursor-pointer left-[30px] text-white w-[25px] h-[25px]' onClick={()=> navigate("/")} />
      <h1 className='
        text-white text-2xl sm:text-3xl md:text-4xl 
        font-semibold text-center mb-8 tracking-wide
      '>
        Select your <span className='text-[#00f2ff]'>Assistant Image</span>
      </h1>

      <div className='
        w-[90%] max-w-[1000px] 
        flex flex-wrap justify-center gap-6
      '>
        {/* Static Cards */}
        {[image1, image2, image3, image4, image5, image6, image7].map((img, i) => (
          <Card key={i} image={img} />
        ))}

        {/* Upload Card */}
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
            flex items-center justify-center
            ${selectedImage === "input"
              ? "border-4 border-white shadow-2xl shadow-[#00f2ff90]"
              : "border-[#00f2ff50] hover:shadow-[0_0_20px_5px_#00f2ff90] hover:border-[#00f2ff]"
            }
          `}
          onClick={() => inputImage.current.click()}
        >
          {!frontendImage
            ? <RiImageAddLine className='text-white w-[25px] h-[25px]' />
            : <img src={frontendImage} className='h-full object-cover' alt="Uploaded preview" />
          }
        </div>

        <input
          type="file"
          accept='image/*'
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {selectedImage && <button className='
        min-w-[150px] h-[60px] mt-10 
        rounded-full 
        bg-[#00f2ff] 
        text-black font-semibold cursor-pointer text-[19px] 
        transition-all duration-300 ease-in-out 
        shadow-md shadow-black/30 
        hover:bg-white hover:text-[#00f2ff] 
        hover:shadow-[0_0_20px_5px_#00f2ff80]
      ' onClick={()=>navigate("/customize2")}>
        Next
      </button>}

      
    </div>
  )
}

export default Customize
