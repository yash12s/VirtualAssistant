// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { userDataContext } from '../context/userContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import aiImg from "../assets/ai.gif";
// import userImg from "../assets/user.gif";
// import { CgMenuRight } from "react-icons/cg";
// import { RxCross1 } from "react-icons/rx";

// function Home() {
//   const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
//   const navigate = useNavigate();
//   const [listening, setListening] = useState(false);
//   const [userText, setUserText] = useState("");
//   const [aiText, setAiText] = useState("");
//   const recognitionRef = useRef(null);
//   const isSpeakingRef = useRef(false);
//   const isRecognizingRef = useRef(false);
//   const manuallyStoppedRef = useRef(false);
//   const synth = window.speechSynthesis;
//   const [ham, setHam] = useState(false);

//   const startRecognition = () => {
//     if (!isSpeakingRef.current && !isRecognizingRef.current) {
//       try {
//         recognitionRef.current?.start();
//       } catch (err) {
//         if (err.name !== "InvalidStateError") console.error(err);
//       }
//     }
//   };

//   const speak = (text) => {
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = 'en-IN';

//     const voices = window.speechSynthesis.getVoices();
//     const hindiVoice = voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN');
//     if (hindiVoice) {
//       utter.voice = hindiVoice;
//     }

//     isSpeakingRef.current = true;

//     utter.onend = () => {
//       isSpeakingRef.current = false;
//       setAiText("");
//       setTimeout(() => {
//         startRecognition();
//       }, 1000);
//     };

//     synth.cancel();
//     synth.speak(utter);
//   };

//   const handleCommand = (data) => {
//     const { type, userInput, response } = data;
//     speak(response);

//     const openInNewTab = (url) => window.open(url, "_blank");
//     const query = encodeURIComponent(userInput);

//     const actions = {
//       "google-search": () => openInNewTab(`https://www.google.com/search?q=${query}`),
//       "calculator-open": () => openInNewTab("https://www.google.com/search?q=calculator"),
//       "instagram-open": () => openInNewTab("https://www.instagram.com/"),
//       "facebook-open": () => openInNewTab("https://www.facebook.com/"),
//       "weather-show": () => openInNewTab("https://www.google.com/search?q=weather"),
//       "youtube-search": () => openInNewTab(`https://www.youtube.com/results?search_query=${query}`),
//       "youtube-play": () => openInNewTab(`https://www.youtube.com/results?search_query=${query}`),
//     };

//     actions[type]?.();
//   };

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;

//     recognitionRef.current = recognition;
//     let isMounted = true;

//     const greet = new SpeechSynthesisUtterance(`Hello ${userData.name}, how can I help you today?`);
//     greet.lang = 'en-IN';

//     greet.onend = () => {
//       startRecognition();
//     };

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(greet);

//     recognition.onstart = () => {
//       isRecognizingRef.current = true;
//       setListening(true);
//     };

//     recognition.onend = () => {
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (isMounted && !isSpeakingRef.current && !manuallyStoppedRef.current) {
//         setTimeout(() => {
//           try {
//             recognition.start();
//           } catch (err) {
//             if (err.name !== "InvalidStateError") console.error(err);
//           }
//         }, 1000);
//       }
//       manuallyStoppedRef.current = false;
//     };

//     recognition.onerror = (e) => {
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (isMounted && !isSpeakingRef.current && !manuallyStoppedRef.current) {
//         setTimeout(() => {
//           try {
//             recognition.start();
//           } catch (err) {
//             if (err.name !== "InvalidStateError") console.error(err);
//           }
//         }, 1000);
//       }
//     };

//     recognition.onresult = async (e) => {
//       const transcript = e.results[e.results.length - 1][0].transcript.trim();
//       if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
//         setUserText(transcript);
//         manuallyStoppedRef.current = true;
//         recognition.stop();
//         isRecognizingRef.current = false;
//         setListening(false);

//         const data = await getGeminiResponse(transcript);
//         handleCommand(data);
//         setAiText(data.response);
//         setUserText("");
//       }
//     };

//     return () => {
//       isMounted = false;
//       recognition.stop();
//       isRecognizingRef.current = false;
//       setListening(false);
//     };
//   }, []);

//   const handleLogOut = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//       setUserData(null);
//       navigate("/signin");
//     } catch (err) {
//       console.error(err);
//       setUserData(null);
//     }
//   };

//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex justify-center items-center flex-col gap-[15px] overflow-hidden relative'>
//       <CgMenuRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(true)} />

//       <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000036] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start z-50 ${ham ? "translate-x-0" : "translate-x-full"} transition-transform`}>
//         <RxCross1 className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(false)} />
//         <div className='mt-[60px] flex flex-col gap-4 w-full'>
//           <button className="w-full h-[50px] rounded-full bg-[#00f2ff] text-black font-semibold" onClick={handleLogOut}>Log Out</button>
//           <button className="w-full h-[50px] rounded-full bg-[#00f2ff] text-black font-semibold" onClick={() => navigate("/customize")}>Customize your Assistant</button>
//         </div>
//         <hr className='w-full border-gray-500 my-4' />
//         <h2 className='text-white text-lg font-semibold'>History</h2>
//         <div className='overflow-y-auto max-h-[300px] text-white text-sm w-full'>
//           {userData.history?.map((item, index) => (
//             <p key={index} className='truncate'>{item}</p>
//           ))}
//         </div>
//       </div>

//       <div className="hidden lg:flex flex-col gap-3 absolute top-[20px] right-[20px] z-50">
//         <button className="min-w-[150px] h-[45px] rounded-full bg-[#00f2ff] cursor-pointer text-black font-semibold" onClick={handleLogOut}>Log Out</button>
//         <button className="min-w-[200px] h-[45px] rounded-full cursor-pointer bg-[#00f2ff] text-black font-semibold" onClick={() => navigate("/customize")}>Customize your Assistant</button>
//       </div>

//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
//         <img src={userData?.assistantImage} alt="Assistant" className='h-full object-cover' />
//       </div>

//       <h1 className='text-[#00f2ff] text-[18px] font-semibold'>Nice to meet you. I’m {userData?.assistantName}</h1>
//       {!aiText && <img src={userImg} alt="User" className='w-[200px]' />}
//       {aiText && <img src={aiImg} alt="AI" className='w-[200px]' />}
//       <h1 className='text-white text-[18px] font-semibold text-wrap'>{userText || aiText || null}</h1>
//     </div>
//   );
// }

// export default Home;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);
  const manuallyStoppedRef = useRef(false);
  const synth = window.speechSynthesis;
  const [ham, setHam] = useState(false);

  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start();
      } catch (err) {
        if (err.name !== "InvalidStateError") console.error(err);
      }
    }
  };

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-IN';

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN');
    if (hindiVoice) {
      utter.voice = hindiVoice;
    }

    isSpeakingRef.current = true;

    utter.onend = () => {
      isSpeakingRef.current = false;
      setAiText("");
      setTimeout(() => {
        startRecognition();
      }, 1000);
    };

    synth.cancel();
    synth.speak(utter);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    const openInNewTab = (url) => window.open(url, "_blank");
    const query = encodeURIComponent(userInput);

    const actions = {
      "google-search": () => openInNewTab(`https://www.google.com/search?q=${query}`),
      "calculator-open": () => openInNewTab("https://www.google.com/search?q=calculator"),
      "instagram-open": () => openInNewTab("https://www.instagram.com/"),
      "facebook-open": () => openInNewTab("https://www.facebook.com/"),
      "weather-show": () => openInNewTab("https://www.google.com/search?q=weather"),
      "youtube-search": () => openInNewTab(`https://www.youtube.com/results?search_query=${query}`),
      "youtube-play": () => openInNewTab(`https://www.youtube.com/results?search_query=${query}`),
    };

    actions[type]?.();
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognitionRef.current = recognition;
    let isMounted = true;

    const greet = new SpeechSynthesisUtterance(`Hello ${userData.name}, how can I help you today?`);
    greet.lang = 'en-IN';

    greet.onend = () => {
      startRecognition();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(greet);

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);
      if (isMounted && !isSpeakingRef.current && !manuallyStoppedRef.current) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (err) {
            if (err.name !== "InvalidStateError") console.error(err);
          }
        }, 1000);
      }
      manuallyStoppedRef.current = false;
    };

    recognition.onerror = (e) => {
      isRecognizingRef.current = false;
      setListening(false);
      if (isMounted && !isSpeakingRef.current && !manuallyStoppedRef.current) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (err) {
            if (err.name !== "InvalidStateError") console.error(err);
          }
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setUserText(transcript);
        manuallyStoppedRef.current = true;
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);

        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
      }
    };

    return () => {
      isMounted = false;
      recognition.stop();
      isRecognizingRef.current = false;
      setListening(false);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (err) {
      console.error(err);
      setUserData(null);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex justify-center items-center flex-col gap-[15px] overflow-hidden relative'>
      <CgMenuRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(true)} />

      <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000036] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start z-50 ${ham ? "translate-x-0" : "translate-x-full"} transition-transform`}>
        <RxCross1 className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(false)} />
        <div className='mt-[60px] flex flex-col gap-4 w-full'>
          <button className="w-full h-[50px] rounded-full bg-[#00f2ff] text-black font-semibold" onClick={handleLogOut}>Log Out</button>
          <button className="w-full h-[50px] rounded-full bg-[#00f2ff] text-black font-semibold" onClick={() => navigate("/customize")}>Customize your Assistant</button>
        </div>
        <hr className='w-full border-gray-500 my-4' />
        <h2 className='text-white text-lg font-semibold'>History</h2>
        <div className='overflow-y-auto max-h-[300px] text-white text-sm w-full'>
          {userData.history?.map((item, index) => (
            <p key={index} className='truncate'>{item}</p>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-3 absolute top-[20px] right-[20px] z-50">
        <button className="min-w-[150px] h-[45px] rounded-full bg-[#00f2ff] cursor-pointer text-black font-semibold" onClick={handleLogOut}>Log Out</button>
        <button className="min-w-[200px] h-[45px] rounded-full cursor-pointer bg-[#00f2ff] text-black font-semibold" onClick={() => navigate("/customize")}>Customize your Assistant</button>
      </div>

      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        <img src={userData?.assistantImage} alt="Assistant" className='h-full object-cover' />
      </div>

      <h1 className='text-[#00f2ff] text-[18px] font-semibold'>Nice to meet you. I’m {userData?.assistantName}</h1>
      {!aiText && <img src={userImg} alt="User" className='w-[200px] mix-blend-screen' />}
      {aiText && <img src={aiImg} alt="AI" className='w-[200px] mix-blend-screen' />}
      <h1 className='text-white text-[18px] font-semibold text-wrap'>{userText || aiText || null}</h1>
    </div>
  );
}

export default Home;
